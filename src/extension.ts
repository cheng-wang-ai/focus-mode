import * as vscode from 'vscode';
import { ModeManager, Mode } from './modeManager';
import { detectInstalledPlugins } from './pluginDetector';

let statusBarItem: vscode.StatusBarItem;
let modeManager: ModeManager;

function updateStatusBar(): void {
    const activeEditor = vscode.window.activeTextEditor;
    const languageId = activeEditor?.document.languageId;
    const effectiveMode = modeManager.getEffectiveMode(languageId);
    const hasOverride = !!languageId && modeManager.getLanguageModes()[languageId] !== undefined;

    if (effectiveMode === 'learning') {
        statusBarItem.text = hasOverride ? `🎓 学习 [${languageId}]` : '🎓 学习模式';
        statusBarItem.tooltip = '学习模式：已关闭自动补全\n点击切换全局模式';
    } else {
        statusBarItem.text = hasOverride ? `⚡ 效率 [${languageId}]` : '⚡ 效率模式';
        statusBarItem.tooltip = '效率模式：已开启自动补全\n点击切换全局模式';
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
            const newMode = await modeManager.toggleGlobalMode();
            updateStatusBar();
            const label = newMode === 'learning' ? '🎓 学习模式' : '⚡ 效率模式';
            vscode.window.showInformationMessage(`已切换到${label}（全局）`);
        })
    );

    // Set per-language mode for the currently open file.
    context.subscriptions.push(
        vscode.commands.registerCommand('focus-mode.setLanguageMode', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showWarningMessage('Focus Mode：请先打开一个文件');
                return;
            }
            const languageId = editor.document.languageId;
            const currentMode = modeManager.getEffectiveMode(languageId);
            const hasOverride = modeManager.getLanguageModes()[languageId] !== undefined;

            type PickItem = vscode.QuickPickItem & { value: Mode | 'global' };
            const items: PickItem[] = [
                {
                    label: '🎓 学习模式',
                    description: '关闭此语言的自动补全',
                    value: 'learning',
                    picked: currentMode === 'learning',
                },
                {
                    label: '⚡ 效率模式',
                    description: '开启此语言的自动补全',
                    value: 'productivity',
                    picked: currentMode === 'productivity',
                },
                {
                    label: '↩ 跟随全局模式',
                    description: hasOverride ? '移除此语言的单独设置' : '（当前已跟随全局）',
                    value: 'global',
                },
            ];

            const choice = await vscode.window.showQuickPick(items, {
                title: `设置 "${languageId}" 的模式`,
                placeHolder: '选择此语言的补全模式',
            });

            if (!choice) { return; }

            if (choice.value === 'global') {
                await modeManager.resetLanguageMode(languageId);
                vscode.window.showInformationMessage(`${languageId}：已恢复为全局模式`);
            } else {
                await modeManager.setLanguageMode(languageId, choice.value);
                const label = choice.value === 'learning' ? '🎓 学习模式' : '⚡ 效率模式';
                vscode.window.showInformationMessage(`${languageId}：已设置为${label}`);
            }

            updateStatusBar();
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
