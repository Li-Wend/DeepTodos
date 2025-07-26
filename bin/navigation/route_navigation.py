from flask import Blueprint, redirect, render_template, session, url_for

route_navigation = Blueprint('route_navigation', __name__)

# 初始页面 login
@route_navigation.route('/')
def index():
    if session.get('logged_in'):
        return render_template('tasks/tasks.html')
    return render_template('login/login.html')

# 用户登录页面 login
@route_navigation.route('/login')
def login():
    if session.get('logged_in'):
        return render_template('tasks/tasks.html')
    return render_template('login/login.html')

# 数据隐私保护界面 DataPrivacyProtection
@route_navigation.route('/DataPrivacyProtection')
def DataPrivacyProtection():
    return render_template('login/DataPrivacyProtection.html')

# 隐私政策界面 privacyPolicy
@route_navigation.route('/privacyPolicy')
def privacyPolicy():
    return render_template('login/privacyPolicy.html')

# 服务条款页面 termsOfService
@route_navigation.route('/termsOfService')
def termsOfService():
    return render_template('login/termsOfService.html')

# 帮助中心页面 helpCenter
@route_navigation.route('/helpCenter')
def helpCenter():
    return render_template('login/helpCenter.html')

# 注册用户页面 register
@route_navigation.route('/register')
def register():
    return render_template('login/register.html')

# 待办事项页面 tasks - 登录后才可以加载
@route_navigation.route('/tasks')
def tasks():
    # 如果没有登陆重定向到登录界面
    if not session.get('logged_in'):
        return redirect(url_for("route_navigation.login"))
    return render_template('tasks/tasks.html')

# 修改用户密码页面 changePassword
@route_navigation.route('/changePassword')
def changePassword():
    # 如果没有登陆重定向到登录界面
    if not session.get('logged_in'):
        return redirect(url_for("route_navigation.login"))
    return render_template('login/changePassword.html')

# 测试页面
@route_navigation.route('/test')
def test():
    return render_template('test.html')

