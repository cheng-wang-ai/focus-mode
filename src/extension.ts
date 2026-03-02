import * as vscode from 'vscode';
import { ModeManager, Mode } from './modeManager';
import { detectInstalledPlugins } from './pluginDetector';
import { getStrings, fmt } from './i18n';

let statusBarItem: vscode.StatusBarItem;
let modeManager: ModeManager;
let lastToastTime = 0;

function updateStatusBar(): void {
    const s = getStrings();
    const activeEditor = vscode.window.activeTextEditor;
    const languageId = activeEditor?.document.languageId;
    const effectiveMode = modeManager.getEffectiveMode(languageId);
    const hasOverride = !!languageId && modeManager.getLanguageModes()[languageId] !== undefined;

    const isLearning = effectiveMode === 'learning';
    vscode.commands.executeCommand('setContext', 'focusMode.isLearning', isLearning);

    if (isLearning) {
        statusBarItem.text = hasOverride ? `${s.learningShort} [${languageId}]` : s.learningLabel;
        statusBarItem.tooltip = s.learningTooltip;
    } else {
        statusBarItem.text = hasOverride ? `${s.productivityShort} [${languageId}]` : s.productivityLabel;
        statusBarItem.tooltip = s.productivityTooltip;
    }
}

export async function activate(context: vscode.ExtensionContext): Promise<void> {
    const plugins = detectInstalledPlugins();
    modeManager = new ModeManager(context, plugins);

    // Restore the mode from the previous session.
    await modeManager.restoreState();

    // Status bar item (left side, high priority = further left).
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'focus-mode.toggleMode';
    context.subscriptions.push(statusBarItem);

    // Toggle global mode command (also bound to keyboard shortcut).
    context.subscriptions.push(
        vscode.commands.registerCommand('focus-mode.toggleMode', async () => {
            const s = getStrings();
            const newMode = await modeManager.toggleGlobalMode();
            updateStatusBar();
            const label = newMode === 'learning' ? s.learningLabel : s.productivityLabel;
            vscode.window.showInformationMessage(fmt(s.switchedGlobal, label));
        })
    );

    // Set per-language mode for the currently open file.
    context.subscriptions.push(
        vscode.commands.registerCommand('focus-mode.setLanguageMode', async () => {
            const s = getStrings();
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage(s.noFileOpen);
                return;
            }
            const languageId = editor.document.languageId;
            const currentMode = modeManager.getEffectiveMode(languageId);
            const hasOverride = modeManager.getLanguageModes()[languageId] !== undefined;

            type PickItem = vscode.QuickPickItem & { value: Mode | 'global' };
            const items: PickItem[] = [
                {
                    label: s.learningPickLabel,
                    description: s.learningPickDesc,
                    value: 'learning',
                    picked: currentMode === 'learning',
                },
                {
                    label: s.productivityPickLabel,
                    description: s.productivityPickDesc,
                    value: 'productivity',
                    picked: currentMode === 'productivity',
                },
                {
                    label: s.followGlobalLabel,
                    description: hasOverride ? s.followGlobalDescYes : s.followGlobalDescNo,
                    value: 'global',
                },
            ];

            const choice = await vscode.window.showQuickPick(items, {
                title: fmt(s.pickTitle, languageId),
                placeHolder: s.pickPlaceholder,
            });

            if (!choice) { return; }

            if (choice.value === 'global') {
                await modeManager.resetLanguageMode(languageId);
                vscode.window.showInformationMessage(fmt(s.resetDone, languageId));
            } else {
                await modeManager.setLanguageMode(languageId, choice.value);
                const label = choice.value === 'learning' ? s.learningLabel : s.productivityLabel;
                vscode.window.showInformationMessage(fmt(s.setDone, languageId, label));
            }

            updateStatusBar();
        })
    );

    // Show a toast when the user tries to trigger autocomplete in learning mode.
    context.subscriptions.push(
        vscode.commands.registerCommand('focus-mode.notifyBlocked', () => {
            const now = Date.now();
            if (now - lastToastTime < 2000) { return; }
            lastToastTime = now;
            vscode.window.showInformationMessage(getStrings().blockedToast);
        })
    );

    // Refresh the status bar whenever the user switches editor tabs.
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(() => updateStatusBar())
    );

    updateStatusBar();
    statusBarItem.show();
}

export function deactivate(): void {
    // Nothing to clean up; VSCode disposes subscriptions automatically.
}
