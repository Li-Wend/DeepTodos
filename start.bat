@echo off
REM 切换到脚本所在目录（确保路径正确）
cd /d "%~dp0"

REM 启动 Flask 服务（隐藏命令行窗口）
start /B pythonw app.py

REM 等待服务启动后打开浏览器
timeout /t 2 /nobreak >nul
start http://localhost:5000

REM 自动关闭当前命令窗口（可选）
exit