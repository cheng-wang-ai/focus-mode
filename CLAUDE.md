# Focus Mode VSCode Extension

## 项目目标
做一个学习/效率模式切换的 VSCode 插件，方便学生在"自己练习写代码"
和"需要AI辅助"之间一键切换，避免每次手动去设置里开关补全选项。

## 功能需求

### 核心功能
- 状态栏左下角显示当前模式，点击即可切换：
  - 🎓 学习模式：关闭所有自动补全
  - ⚡ 效率模式：开启所有自动补全
- 切换时右下角弹出提示告知当前模式

### 补全控制范围
学习模式需关闭以下配置：
- editor.quickSuggestions
- editor.suggestOnTriggerCharacters
- editor.inlineSuggest.enabled
- editor.parameterHints.enabled
- github.copilot.enable（如已安装）
- codeium.enableConfig（如已安装）
- tabnine.experimentalAutoImports（如已安装）

效率模式恢复以上所有配置为默认值。
插件启动时自动检测已安装的 AI 补全插件，只控制已安装的部分。

### 状态持久化
- 记住用户上次的模式选择，VS Code 重启后自动恢复

### 按语言单独控制
- 支持对不同编程语言单独设置模式
- 例如：Python 文件用学习模式，HTML 文件用效率模式
- 可在设置页面配置每种语言的默认模式

### 跨平台支持
- Mac：Cmd+Shift+F 切换模式
- Windows/Linux：Ctrl+Shift+F 切换模式
- 插件需在 package.json 中分别声明两套快捷键绑定

## 技术栈
- 语言：TypeScript
- 框架：VSCode Extension API
- 状态存储：vscode.ExtensionContext.globalState

## 目标用户
学生、编程初学者、刷算法题的开发者

## 项目结构建议
src/
├── extension.ts        # 入口，注册命令和状态栏
├── modeManager.ts      # 模式切换核心逻辑
├── configManager.ts    # 补全配置的读写
└── pluginDetector.ts   # 检测已安装的AI插件