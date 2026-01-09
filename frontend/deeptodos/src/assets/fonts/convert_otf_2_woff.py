from fontTools.ttLib import TTFont

# 加载字体文件
font = TTFont('SourceHanSansCN-Regular.otf')

# 设置输出格式为woff
font.flavor = 'woff'

# 保存为woff格式
font.save('SourceHanSansCN-Regular.woff')