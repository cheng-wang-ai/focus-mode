import * as vscode from 'vscode';
import { Mode, applyGlobalMode, applyLanguageMode, clearLanguageMode } from './configManager';
import { InstalledPlugins } from './pluginDetector';

const GLOBAL_MODE_KEY = 'focusMode.globalMode';
const LANGUAGE_MODES_KEY = 'focusMode.languageModes';

export { Mode };

export class ModeManager {
    private context: vscode.ExtensionContext;
    private plugins: InstalledPlugins;

    constructor(context: vscode.ExtensionContext, plugins: InstalledPlugins) {
        this.context = context;
        this.plugins = plugins;
    }

    getGlobalMode(): Mode {
        return this.context.globalState.get<Mode>(GLOBAL_MODE_KEY, 'productivity');
    }

    getLanguageModes(): Record<string, Mode> {
        return this.context.globalState.get<Record<string, Mode>>(LANGUAGE_MODES_KEY, {});
    }

    /** Returns the mode that actually applies to the given language. */
    getEffectiveMode(languageId?: string): Mode {
        if (languageId) {
            const overrides = this.getLanguageModes();
            if (overrides[languageId] !== undefined) {
                return overrides[languageId];
            }
        }
        return this.getGlobalMode();
    }

    async setGlobalMode(mode: Mode): Promise<void> {
        await this.context.globalState.update(GLOBAL_MODE_KEY, mode);
        await applyGlobalMode(mode, this.plugins);
        // Re-apply language overrides on top so they continue to win.
        for (const [langId, langMode] of Object.entries(this.getLanguageModes())) {
            await applyLanguageMode(langMode, this.plugins, langId);
        }
    }

    async toggleGlobalMode(): Promise<Mode> {
        const next: Mode = this.getGlobalMode() === 'learning' ? 'productivity' : 'learning';
        await this.setGlobalMode(next);
        return next;
    }

    async setLanguageMode(languageId: string, mode: Mode): Promise<void> {
        const overrides = this.getLanguageModes();
        overrides[languageId] = mode;
        await this.context.globalState.update(LANGUAGE_MODES_KEY, overrides);
        await applyLanguageMode(mode, this.plugins, languageId);
    }

    async resetLanguageMode(languageId: string): Promise<void> {
        const overrides = this.getLanguageModes();
        delete overrides[languageId];
        await this.context.globalState.update(LANGUAGE_MODES_KEY, overrides);
        await clearLanguageMode(this.plugins, languageId);
    }

    /** Re-apply all persisted settings (called on activation to restore state). */
    async restoreState(): Promise<void> {
        await applyGlobalMode(this.getGlobalMode(), this.plugins);
        for (const [langId, langMode] of Object.entries(this.getLanguageModes())) {
            await applyLanguageMode(langMode, this.plugins, langId);
        }
    }
}
