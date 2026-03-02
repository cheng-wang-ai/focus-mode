# Change Log

All notable changes to the "focus-mode" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.1] - 2026-03-02

### Added
- Status bar item (bottom-left) showing current mode; click to toggle globally
- **Learning Mode** (🎓): disables `editor.quickSuggestions`, `editor.suggestOnTriggerCharacters`, `editor.inlineSuggest.enabled`, `editor.parameterHints.enabled`
- **Productivity Mode** (⚡): restores all autocomplete settings to VS Code defaults
- Auto-detection of installed AI completion plugins (GitHub Copilot, Codeium, Tabnine) — only controls what is actually installed
- Per-language mode overrides via Command Palette → "Focus Mode: Set Mode for Current Language"
- Global mode toggle via Command Palette or keyboard shortcut (Cmd+Shift+F on Mac, Ctrl+Shift+F on Windows/Linux)
- State persistence across VS Code restarts using `ExtensionContext.globalState`
- Internationalization (i18n) with automatic switching based on VS Code display language:
  - English (`en`) — default
  - 简体中文 (`zh-cn`)
  - 日本語 (`ja`)
  - 한국어 (`ko`)
  - Français (`fr`)
  - Deutsch (`de`)
  - Español (`es`)
  - Português (`pt`, `pt-br`)
  - Русский (`ru`)
- Command palette titles localized via VS Code NLS (`package.nls.*.json`)

### Fixed
- `editor.quickSuggestions` sub-properties now correctly use boolean values (`false`/`true`) instead of strings (`'off'`/`'on'`) that VS Code silently ignored
