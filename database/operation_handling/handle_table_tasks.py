from flask import Blueprint, request, jsonify
import sqlite3

handle_tasks_api = Blueprint('handle_tasks_api', __name__)


# 获取单日任务
@handle_tasks_api.route('/api/tasks', methods=['GET'])
def get_tasks():
    date = request.args.get('date')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT id, task, is_completed
        FROM tasks
        WHERE task_date = ?
        ORDER BY created_at DESC
    ''', (date,))
    tasks = [{"id": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

# 添加任务
@handle_tasks_api.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (task, task_date) VALUES (?, ?)",
             (data['task'], data['date']))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    return jsonify({"id": task_id, "task": data['task'], "completed": False}), 201

# 更新任务状态
@handle_tasks_api.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET is_completed = ? WHERE id = ?", (data['completed'], task_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 删除任务
@handle_tasks_api.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 获取全部未完成任务
@handle_tasks_api.route('/api/allUnfinishedTasks', methods=['GET'])
def get_all_unfinished_tasks():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT id, task, is_completed 
        FROM tasks 
        WHERE is_completed = 0
        ORDER BY created_at DESC
    ''')
    allUnfinishedTasks = [{"id": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(allUnfinishedTasks)

