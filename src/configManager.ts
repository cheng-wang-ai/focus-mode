import * as vscode from 'vscode';
import { InstalledPlugins } from './pluginDetector';

export type Mode = 'learning' | 'productivity';

const LEARNING_QUICK_SUGGESTIONS = { other: false, comments: false, strings: false };
const PRODUCTIVITY_QUICK_SUGGESTIONS = { other: true, comments: false, strings: false };

/**
 * Apply mode at the global (all-languages) level.
 * Learning: explicitly disables completions.
 * Productivity: removes overrides so VSCode defaults (enabled) take effect.
 */
export async function applyGlobalMode(mode: Mode, plugins: InstalledPlugins): Promise<void> {
    const isLearning = mode === 'learning';
    const target = vscode.ConfigurationTarget.Global;

    const editorCfg = vscode.workspace.getConfiguration('editor');
    await editorCfg.update('quickSuggestions', isLearning ? LEARNING_QUICK_SUGGESTIONS : undefined, target);
    await editorCfg.update('suggestOnTriggerCharacters', isLearning ? false : undefined, target);
    await editorCfg.update('inlineSuggest.enabled', isLearning ? false : undefined, target);
    await editorCfg.update('parameterHints.enabled', isLearning ? false : undefined, target);

    if (plugins.copilot) {
        const copilotCfg = vscode.workspace.getConfiguration('github.copilot');
        const current = copilotCfg.get<Record<string, boolean>>('enable') ?? {};
        await copilotCfg.update('enable', { ...current, '*': !isLearning }, target);
    }

    if (plugins.codeium) {
        const codeiumCfg = vscode.workspace.getConfiguration('codeium');
        await codeiumCfg.update('enableConfig', { '*': !isLearning }, target);
    }

    if (plugins.tabnine) {
        const tabnineCfg = vscode.workspace.getConfiguration('tabnine');
        await tabnineCfg.update('experimentalAutoImports', !isLearning, target);
    }
}

/**
 * Apply mode as a language-specific override.
 * Both learning and productivity use explicit values so they correctly
 * override any global setting in the opposite direction.
 */
export async function applyLanguageMode(mode: Mode, plugins: InstalledPlugins, languageId: string): Promise<void> {
    const isLearning = mode === 'learning';
    const target = vscode.ConfigurationTarget.Global;
    const scope = { languageId };

    const editorCfg = vscode.workspace.getConfiguration('editor', scope);
    await editorCfg.update('quickSuggestions', isLearning ? LEARNING_QUICK_SUGGESTIONS : PRODUCTIVITY_QUICK_SUGGESTIONS, target, true);
    await editorCfg.update('suggestOnTriggerCharacters', !isLearning, target, true);
    await editorCfg.update('inlineSuggest.enabled', !isLearning, target, true);
    await editorCfg.update('parameterHints.enabled', !isLearning, target, true);

    if (plugins.copilot) {
        const copilotCfg = vscode.workspace.getConfiguration('github.copilot');
        const current = copilotCfg.get<Record<string, boolean>>('enable') ?? {};
        await copilotCfg.update('enable', { ...current, [languageId]: !isLearning }, target);
    }
}

/**
 * Remove all language-specific overrides for the given language,
 * reverting it to inherit from the global mode.
 */
export async function clearLanguageMode(plugins: InstalledPlugins, languageId: string): Promise<void> {
    const target = vscode.ConfigurationTarget.Global;
    const scope = { languageId };

    const editorCfg = vscode.workspace.getConfiguration('editor', scope);
    await editorCfg.update('quickSuggestions', undefined, target, true);
    await editorCfg.update('suggestOnTriggerCharacters', undefined, target, true);
    await editorCfg.update('inlineSuggest.enabled', undefined, target, true);
    await editorCfg.update('parameterHints.enabled', undefined, target, true);

    if (plugins.copilot) {
        const copilotCfg = vscode.workspace.getConfiguration('github.copilot');
        const current = copilotCfg.get<Record<string, boolean>>('enable') ?? {};
        const updated = { ...current };
        delete updated[languageId];
        await copilotCfg.update('enable', Object.keys(updated).length > 0 ? updated : undefined, target);
    }
}
