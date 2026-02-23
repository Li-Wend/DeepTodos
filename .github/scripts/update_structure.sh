#!/bin/bash
set -e

# 1. 生成项目结构（忽略指定目录，限制深度为3）
TREE_CONTENT=$(tree -I "node_modules|.git|dist|venv|__pycache__" -L 3 --noreport)

# 2. 拼接Markdown格式的结构内容
NEW_CONTENT="\`\`\`
$TREE_CONTENT
\`\`\`"

# 3. 替换README中标记位之间的内容（保留其他内容）
# 注意：macOS需用 sed -i ''，Linux用 sed -i
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS 系统
  sed -i '' -e "/<!-- PROJECT_STRUCTURE_START -->/,/<!-- PROJECT_STRUCTURE_END -->/c\<!-- PROJECT_STRUCTURE_START -->\n$NEW_CONTENT\n<!-- PROJECT_STRUCTURE_END -->" README.md
else
  # Linux/Windows(WSL) 系统
  sed -i -e "/<!-- PROJECT_STRUCTURE_START -->/,/<!-- PROJECT_STRUCTURE_END -->/c\<!-- PROJECT_STRUCTURE_START -->\n$NEW_CONTENT\n<!-- PROJECT_STRUCTURE_END -->" README.md
fi

echo "✅ 项目结构已更新到README.md指定位置"