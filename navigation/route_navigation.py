from flask import Blueprint, redirect, render_template, session, url_for

route_navigation = Blueprint('route_navigation', __name__)

# 初始页面 login
@route_navigation.route('/')
def index():
    if session.get('logged_in'):
        return redirect(url_for("route_navigation.tasks"))
    return redirect(url_for("route_navigation.login"))

@route_navigation.route('/login')
def login():
    return render_template('login/login.html')

# 注册用户页面
@route_navigation.route('/register')
def register():
    return render_template('login/register.html')

# 待办事项页面 - 登录后才可以加载
@route_navigation.route('/tasks')
def tasks():
    # 如果没有登陆重定向到登录界面
    if not session.get('logged_in'):
        return redirect(url_for("route_navigation.login"))
    return render_template('tasks.html')


