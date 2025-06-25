from flask import Flask

from database.initialization import initialize_table_users
from database.initialization import initialize_table_tasks
from database.initialization import initialize_table_task_notes

from database.operation_handling.handle_table_users import handle_users_api
from database.operation_handling.handle_table_tasks import handle_tasks_api

from navigation.route_navigation import route_navigation

app = Flask(__name__)

# 初始化数据库
def init_db():
    initialize_table_users.initialize_table_users()
    initialize_table_tasks.initialize_table_tasks()
    initialize_table_task_notes.initialize_table_task_notes()

# route - 数据库操作 - 登录注册相关
app.register_blueprint(handle_users_api)

# route - 数据库操作 - 任务相关
app.register_blueprint(handle_tasks_api)

# route - 数据库操作 - 任务备注相关
# app.register_blueprint(handle_task_note_api)


# route - 页面导航
app.register_blueprint(route_navigation)


if __name__ == '__main__':
    init_db()
    app.run(debug=True)