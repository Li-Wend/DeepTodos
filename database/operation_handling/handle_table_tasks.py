import uuid
from flask import Blueprint, request, jsonify, session
import sqlite3

handle_tasks_api = Blueprint('handle_tasks_api', __name__)


# 获取单日任务
@handle_tasks_api.route('/api/tasks', methods=['GET'])
def get_tasks():
    date = request.args.get('date')
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT tasks.task_uuid, tasks.task, tasks.is_completed, tasks_priority.task_priority
        FROM tasks
        INNER JOIN tasks_priority
        ON tasks.task_uuid = tasks_priority.task_uuid
        WHERE tasks.user_uuid = ?
          AND tasks.task_date = ?
        ORDER BY tasks.created_at DESC
    ''', (user_uuid, date))

    tasks = [{"task_uuid": row[0], "task": row[1], "completed": bool(row[2]), "task_priority": row[3]} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

# 添加任务
@handle_tasks_api.route('/api/tasks', methods=['POST'])
def add_task():
    # 生成标准格式UUID（带连字符的36字符版本）
    task_uuid = str(uuid.uuid4())
    user_uuid = session.get('user_uuid')
    username = session.get('username')
    data = request.get_json()
    task_priority = data.get('task_priority')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (task_uuid, user_uuid, task, task_date) VALUES (?, ?, ?, ?)",
             (task_uuid, user_uuid, data['task'], data['date']))
    conn.commit()
    c.execute("INSERT INTO tasks_priority (task_uuid, task_priority, created_by) VALUES (?, ?, ?)",
             (task_uuid, task_priority, username))
    conn.commit()
    conn.close()
    return jsonify({"task_uuid": task_uuid, "task": data['task'], "completed": False, "task_priority": task_priority}), 201

# 更新任务状态
@handle_tasks_api.route('/api/tasks', methods=['PUT'])
def update_task_is_completed():
    data = request.get_json()
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    task_uuid = data.get('task_uuid')
    user_uuid = session.get('user_uuid')
    c.execute("UPDATE tasks SET is_completed = ? WHERE user_uuid = ? AND task_uuid = ?", (data['completed'], user_uuid, task_uuid))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 更新任务内容
@handle_tasks_api.route('/api/tasks', methods=['PUT'])
def update_task_content():
    data = request.get_json()
    task_uuid = data.get('task_uuid')
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c.execute("UPDATE tasks SET task = ? WHERE user_uuid = ? AND task_uuid = ?", (data['task'], user_uuid, task_uuid))
    c = conn.cursor()
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 删除任务
@handle_tasks_api.route('/api/tasks', methods=['DELETE'])
def delete_task():
    data = request.get_json()
    task_uuid = data.get('task_uuid')
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE user_uuid = ? AND task_uuid = ?", (user_uuid, task_uuid))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 获取全部未完成任务
@handle_tasks_api.route('/api/allUnfinishedTasks', methods=['GET'])
def get_all_unfinished_tasks():
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT task_uuid, task, is_completed 
        FROM tasks 
        WHERE user_uuid = ?
          AND is_completed = 0
        ORDER BY created_at DESC
    ''', (user_uuid,))
    tasks = [{"task_uuid": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

# 获取全部已完成任务
@handle_tasks_api.route('/api/allFinishedTasks', methods=['GET'])
def get_all_finished_tasks():
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT task_uuid, task, is_completed 
        FROM tasks 
        WHERE user_uuid = ?
          AND is_completed = 1
        ORDER BY created_at DESC
    ''', (user_uuid,))
    tasks = [{"task_uuid": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

# 获取全部任务
@handle_tasks_api.route('/api/allTasks', methods=['GET'])
def get_all_tasks():
    user_uuid = session.get('user_uuid')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT task_uuid, task, is_completed 
        FROM tasks 
        WHERE user_uuid = ?
        ORDER BY created_at DESC
    ''', (user_uuid,))
    tasks = [{"task_uuid": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)    