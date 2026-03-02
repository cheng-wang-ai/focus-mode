[English](README.md) | 简体中文

# Focus Mode

一款为学生和开发者设计的 VS Code 插件 —— 在不需要 AI 辅助时专注练习写代码，一键切换回全补全模式。

## 功能特性

### 一键切换模式

点击状态栏左下角的图标，或使用快捷键，在以下两种模式之间切换：

| 模式 | 状态栏显示 | 自动补全 |
|------|-----------|----------|
| 🎓 学习模式 | `🎓 学习模式` | 已关闭 |
| ⚡ 效率模式 | `⚡ 效率模式` | 已开启 |

### 键盘快捷键

| 平台 | 快捷键 |
|------|--------|
| macOS | `Cmd+Shift+F` |
| Windows / Linux | `Ctrl+Shift+F` |

### 按语言单独控制

可以为每种编程语言单独设置模式。打开命令面板，运行：

> **Focus Mode: 设置当前语言的模式**

例如：Python 文件使用学习模式，HTML 文件使用效率模式。

### AI 插件支持

Focus Mode 会自动检测并控制以下已安装的插件：

- **GitHub Copilot** — `github.copilot.enable`
- **Codeium** — `codeium.enableConfig`
- **Tabnine** — `tabnine.experimentalAutoImports`

### 学习模式下关闭的设置项

```
editor.quickSuggestions
editor.suggestOnTriggerCharacters
editor.inlineSuggest.enabled
editor.parameterHints.enabled
```

### 状态持久化

插件会记住上次的模式选择，VS Code 重启后自动恢复。

### 国际化支持

UI 语言根据 VS Code 显示语言自动切换：

| 语言代码 | 学习模式 | 效率模式 |
|----------|---------|---------|
| `en` | 🎓 Learning Mode | ⚡ Productivity Mode |
| `zh-cn` | 🎓 学习模式 | ⚡ 效率模式 |
| `ja` | 🎓 学習モード | ⚡ 生産性モード |
| `ko` | 🎓 학습 모드 | ⚡ 생산성 모드 |
| `fr` | 🎓 Mode Apprentissage | ⚡ Mode Productivité |
| `de` | 🎓 Lernmodus | ⚡ Produktivitätsmodus |
| `es` | 🎓 Modo Aprendizaje | ⚡ Modo Productividad |
| `pt` | 🎓 Modo Aprendizado | ⚡ Modo Produtividade |
| `ru` | 🎓 Режим обучения | ⚡ Режим продуктивности |

## 插件设置

| 设置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `focusMode.defaultLanguageModes` | `object` | `{}` | 每种语言的默认模式。例如：`{ "python": "learning", "html": "productivity" }` |

## 命令列表

| 命令 | 说明 |
|------|------|
| `Focus Mode: 切换全局模式` | 在学习模式和效率模式之间全局切换 |
| `Focus Mode: 设置当前语言的模式` | 为当前语言设置或清除单独的模式覆盖 |

## 适合哪些用户？

- 正在练习算法题或编程训练的学生
- 希望专注打字、屏蔽 AI 提示的开发者
- 不想每次手动去设置里开关补全选项的任何人

## 更新日志

### 0.0.1

首次发布。完整内容请参阅 [CHANGELOG](CHANGELOG.md)。
