from flask import Flask
from datetime import timedelta

from session.handle_login_session import handle_login_session_api

from database.initialization import initialize_table_users
from database.initialization import initialize_table_tasks

from database.operation_handling.handle_table_users import handle_users_api
from database.operation_handling.handle_table_tasks import handle_tasks_api

from navigation.route_navigation import route_navigation

app = Flask(__name__)

app.config['SECRET_KEY'] = 'deeptodo_login_secret_key'
app.permanent_session_lifetime = timedelta(minutes=60) # 设置 session 时效为 60 分钟


# 初始化数据库
def init_db():
    initialize_table_users.initialize_table_users()
    initialize_table_tasks.initialize_table_tasks()


# route - session - 登录相关 cookie 操作
app.register_blueprint(handle_login_session_api)

# route - 数据库操作 - 登录注册相关
app.register_blueprint(handle_users_api)

# route - 数据库操作 - 任务相关
app.register_blueprint(handle_tasks_api)


# route - 页面导航
app.register_blueprint(route_navigation)


if __name__ == '__main__':
    init_db()
    app.run(debug=True)