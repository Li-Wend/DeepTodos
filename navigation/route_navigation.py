from flask import Blueprint, render_template

route_navigation = Blueprint('route_navigation', __name__)

# 初始页面 login
@route_navigation.route('/')
def index():
    # return render_template('login/login.html')
    return render_template('login/register.html')

# 注册用户页面
@route_navigation.route('/register')
def register():
    return render_template('login/register.html')

# 临时测试使用跳转页面到 task.html
@route_navigation.route('/tasks')
def tasks():
    return render_template('tasks.html')


