from flask import Flask
from datetime import timedelta
from bin.tools.session.handle_login_session import handle_login_session_api
from bin.database.initialization import initialize_table_users
from bin.database.initialization import initialize_table_sms_codes
from bin.database.initialization import initialize_table_tasks
from bin.database.operation_handling.handle_table_users import handle_users_api
from bin.database.operation_handling.handle_table_sms_codes import handle_sms_codes_api
from bin.database.operation_handling.handle_table_tasks import handle_tasks_api
from bin.navigation.route_navigation import route_navigation

app = Flask(__name__)

app.config['SECRET_KEY'] = 'deeptodo_login_secret_key'
app.permanent_session_lifetime = timedelta(days=1) # 设置 session 时效为 1 天 [默认 60 分钟 (minutes=360)]

# 初始化数据库
def init_db():
    initialize_table_users.initialize_table_users()
    initialize_table_sms_codes.initialize_table_sms_codes()
    initialize_table_tasks.initialize_table_tasks()

# route - session - 登录相关 cookie 操作
app.register_blueprint(handle_login_session_api)
# route - 数据库操作 - 登录注册相关
app.register_blueprint(handle_users_api)
# route - 数据库操作 - 短信验证码相关
app.register_blueprint(handle_sms_codes_api)
# route - 数据库操作 - 任务相关
app.register_blueprint(handle_tasks_api)
# route - 页面导航
app.register_blueprint(route_navigation)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
    app.config['TEMPLATES_AUTO_RELOAD'] = True  # 强制模板自动重载