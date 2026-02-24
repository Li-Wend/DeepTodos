# DeepTodos 📝
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub release](https://img.shields.io/github/v/release/Jarod-father/DeepTodos)](https://github.com/Jarod-father/DeepTodos/releases)
[![CI for Full-Stack Deeptodos App](https://github.com/Li-Wend/DeepTodos/actions/workflows/ci.yml/badge.svg?event=push)](https://github.com/Li-Wend/DeepTodos/actions/workflows/ci.yml)

[DeepTodos Wiki 文档](https://github.com/Li-Wend/DeepTodos/wiki)

DeepTodos是一个现代化的个人生产力工具，旨在通过系统化的任务管理和安全保障，帮助用户提升效率。

**核心功能与价值：**

**智能任务管理：** 用户可以轻松创建待办事项，按项目或上下文进行分类，设定优先级（如高、中、低），并实时跟踪完成进度。这使日常工作生活条理清晰，重点突出。

**安全的用户认证管理：** 新加入的用户注册与登录系统，是产品的核心升级。它确保了每个用户的任务数据独立、私密且安全。您可以随时随地登录自己的账户，访问完全个人化的任务清单，无需担心信息泄露。

通过将强大的任务管理能力与可靠的用户认证相结合，本应用致力于成为您值得信赖的个人效率助手。

## 🧩 产品特点
- ✅ 用户注册、登录、注销、密码重置、电子邮件验证
- ✅ 添加、删除、任务
- ✅ 任务状态（已完成/未完成）

## 🔫 快速启动

开发指南文档旨在为所有开发人员提供统一、标准的开发规范、环境配置、工作流程和最佳实践。确保团队成员能够快速上手，保持代码风格一致，提高协作效率和项目可维护性。

### 前提条件

- **Python 3.13+** (建议使用 Python 3.13.2 或更高版本)
- **pip 24.3+** (建议使用 pip 24.3.1 或更高版本)
- **Node.js 22.18+** (建议使用 Node.js 22.18.0 或更高版本)
- **Git 2.38+** (建议使用 Git 2.38.1 或更高版本)
- **VSCode** 

### 开发环境设置

* TODO: Docker从头开始配置项目。如何使用Docker？现阶段不考虑使用 Docker 对项目进行管理。

* TODO: 如何保证其他人也是用相同的Python 版本 Python版本：3.13

* 克隆项目

```bash
git clone https://github.com/Jarod-father/DeepTodos.git
cd deeptodos
```

### 后端

* VS code Terminal 进入如下路径
```cmd
cd .\backend\deeptodos\
```

* 安装 uv
```bash
# 方法一
pip install uv
# 方法二
curl -LsSf https://astral.sh/uv/install.sh | sh
```

* 安装 DeepTodos 后端所有依赖
```bash
uv sync  # 这会根据 uv.lock 安装所有依赖
```

* 安装并激活虚拟环境
```bash
uv venv
.venv\Scripts\activate #在虚拟环境中运行！重要！
```

* 运行应用
```bash
uv run main.py
```

* 同步依赖变化的流程：
```bash
# 1. 开发者A添加新依赖：
uv add <new package>

# 2. 提交 pyproject.toml和 uv.lock

# 3. 开发者B拉取更新后：
uv sync
```

### 前端

* VS code Terminal 进入如下路径
```cmd
cd .\frontend\deeptodos\
```

* 安装 nvm (nvm 的安装方法取决于您的操作系统)
```bash
# 1. macOS / Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# 2. Windows
# 请安装独立的 nvm-windows版本。访问其 [GitHub 发布页面](https://github.com/coreybutler/nvm-windows/releases)，下载并运行 .exe安装程序。

# 3. 安装后，重新打开终端，运行 nvm -v验证。
nvm -v
```

* 根据 .nvmrc 文件获取该项目推荐使用的 Node 版本 (22.18.0 (Currently using 64-bit executable))
```bash
nvm install 22.18.0 # 安装指定版本
nvm use 16.14.0 # 切换版本 [example]
nvm list # 查看已安装版本
```

* 安装 pnpm
```bash
npm install -g pnpm
```

* 安装依赖
```bash
pnpm install 
# 或
pnpm i
```

* 运行应用
```bash
pnpm dev
```

* 同步依赖变化的流程：

```bash
# 1. 添加新依赖
pnpm add <package-name>
# 2. 更新指定包
pnpm update <package-name>
# 3. 移除不需要的包
pnpm remove <package-name>
# 4. 执行安装，同步所有变更到 node_modules
pnpm install
```

### 前端 UI 设计规范

使用 Pixso 进行前端 UI 设计。为团队建立一种可持续的、高效的协作秩序。

Pixso 设计文件只有被指定的协作者才有访问权限。

[邀请您加入 Pixso 设计文件「DeepTodos 设计文件」](https://pixso.cn/app/design/i8mKsgtnWmgJ1KeYW4_NPA?file_type=10&icon_type=1&page-id=2%3A2&item-id=24%3A63)


## 🖱️ 使用方法 
登录页<br>
![alt text](image/loginPage.png)<br>
注册页<br>
![alt text](image/registerPage.png)<br>
任务管理页面<br>
![alt text](image/tasksPage.png)<br>

## ✊ 技术栈
### 后端
- **uv - 项目管理**
- **venv - 虚拟环境**
- **Python 3.13+​ - 编程语言**
- **SQLAlchemy 2.0+ - 同步异步 ORM**
- **FastAPI​ - 现代、快速（高性能）的 Web 框架**
- **FastAPI-Users​ - 用户认证管理库**

### 前端
- **nvm - 管理 Node 版本**
- **pnpm - 项目搭建与依赖管理**
- **Vite - 脚手架搭建**
- **Vue3 + Composition API - 现代、轻量、性能好**
- **Vue Router - 处理前端路由**
- **unplugin-vue-router - 基于文件的自动路由**
- **vite-plugin-vue-layouts - 全局布局设置**
- **Pinia - 状态管理**
- **Pixso - UI 设计与管理 - 自定义 UI 组件**
- **Typescript**
- **SCSS**

## 🚧 项目结构
<!-- PROJECT_STRUCTURE_START -->
<!-- TODO: 自动更新项目结构 - 这里的内容可以被 GitHub Action 自动更新，不要手动修改 -->
<!-- PROJECT_STRUCTURE_END -->


## 👩‍💻 发展与贡献 
- Create a branch: For example: dev
- After the code has been modified, open the Terminal in the root directory ./deeptodos
- git status // Check the Git status
- git checkout dev // Switch to the branch "dev"
- git add . 
- git commit -m "message"
- git push origin dev
- merge dev to main branch

## ⚖️ 许可证 
[Licenses: MIT](https://choosealicense.com/licenses/mit/)