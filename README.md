English | [简体中文](README.zh-CN.md)

# Focus Mode

A VS Code extension for students and developers who want to practice coding without AI assistance — and switch back to full autocomplete with a single keystroke.

## Features

### One-click mode toggle

Click the status bar item (bottom-left) or use the keyboard shortcut to switch between:

| Mode | Status bar | Autocomplete |
|------|-----------|--------------|
| 🎓 Learning Mode | `🎓 Learning Mode` | Disabled |
| ⚡ Productivity Mode | `⚡ Productivity Mode` | Enabled |

### Autocomplete blocked notification

When in Learning Mode, pressing `Ctrl+Space` (or `Tab` while a suggestion is visible) shows a toast in the bottom-right corner instead of opening autocomplete:

> 🎓 Learning Mode is active — autocomplete is disabled

The notification auto-dismisses and is rate-limited to once every 2 seconds. The message is localized for all supported languages.

### Keyboard shortcut

| Platform | Shortcut |
|----------|----------|
| macOS | `Cmd+Shift+F` |
| Windows / Linux | `Ctrl+Shift+F` |

### Per-language overrides

Set a different mode for each programming language independently. Open the Command Palette and run:

> **Focus Mode: Set Mode for Current Language**

For example: use Learning Mode for Python while keeping Productivity Mode for HTML.

### AI plugin support

Focus Mode automatically detects and controls the following plugins if installed:

- **GitHub Copilot** — `github.copilot.enable`
- **Codeium** — `codeium.enableConfig`
- **Tabnine** — `tabnine.experimentalAutoImports`

### Settings controlled in Learning Mode

```
editor.quickSuggestions
editor.suggestOnTriggerCharacters
editor.inlineSuggest.enabled
editor.parameterHints.enabled
```

### State persistence

Your last mode is saved and restored automatically when VS Code restarts.

### Internationalization

The UI automatically switches language based on your VS Code display language:

| Locale | Learning Mode | Productivity Mode |
|--------|--------------|-------------------|
| `en` | 🎓 Learning Mode | ⚡ Productivity Mode |
| `zh-cn` | 🎓 学习模式 | ⚡ 效率模式 |
| `ja` | 🎓 学習モード | ⚡ 生産性モード |
| `ko` | 🎓 학습 모드 | ⚡ 생산성 모드 |
| `fr` | 🎓 Mode Apprentissage | ⚡ Mode Productivité |
| `de` | 🎓 Lernmodus | ⚡ Produktivitätsmodus |
| `es` | 🎓 Modo Aprendizaje | ⚡ Modo Productividad |
| `pt` | 🎓 Modo Aprendizado | ⚡ Modo Produtividade |
| `ru` | 🎓 Режим обучения | ⚡ Режим продуктивности |

## Extension Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `focusMode.defaultLanguageModes` | `object` | `{}` | Default mode per language. Example: `{ "python": "learning", "html": "productivity" }` |

## Commands

| Command | Description |
|---------|-------------|
| `Focus Mode: Toggle Global Mode` | Toggle between Learning and Productivity mode globally |
| `Focus Mode: Set Mode for Current Language` | Set or clear a per-language mode override |

## Who is this for?

- Students practicing algorithms or coding exercises
- Developers who want distraction-free typing sessions
- Anyone who wants to quickly mute AI suggestions without digging through settings

## Release Notes

### 0.0.2

- Toast notification when autocomplete shortcut is pressed in Learning Mode

### 0.0.1

Initial release. See [CHANGELOG](CHANGELOG.md) for full details.
