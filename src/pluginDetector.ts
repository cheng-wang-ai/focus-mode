import * as vscode from 'vscode';

export interface InstalledPlugins {
    copilot: boolean;
    codeium: boolean;
    tabnine: boolean;
}

export function detectInstalledPlugins(): InstalledPlugins {
    return {
        copilot: vscode.extensions.all.some(e => e.id === 'GitHub.copilot'),
        codeium: vscode.extensions.all.some(e => e.id === 'Codeium.codeium'),
        tabnine: vscode.extensions.all.some(e => e.id === 'TabNine.tabnine-vscode'),
    };
}
