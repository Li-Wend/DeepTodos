from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

# 初始化数据库
def init_db():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    
    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            task_date DATE NOT NULL,
            is_completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')
    
#    # 检查旧表结构升级
#    c.execute("PRAGMA table_info(todos)")
#    columns = [col[1] for col in c.fetchall()]
#    
#    if 'changed_on' not in columns:
#        # 新增字段 changed_on
#        c.execute('ALTER TABLE todos ADD COLUMN changed_on TIMESTAMP')
#
#        # 初始化新增字段值
#        c.execute('''
#                UPDATE todos
#                SET changed_on = created_at
#                WHERE changed_on IS NULL
#            ''')
#
#        # 设置触发器         
#        c.execute('''
#                CREATE TRIGGER update_todos_changed_on
#                AFTER UPDATE ON todos
#                BEGIN
#                    UPDATE todos
#                    SET changed_on = CURRENT_TIMESTAMP
#                    WHERE id = OLD.id;
#                END;
#            ''')
        
    conn.commit()
    conn.close()

# 获取单日任务
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    date = request.args.get('date')
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('''
        SELECT id, task, is_completed 
        FROM todos 
        WHERE task_date = ?
        ORDER BY created_at DESC
    ''', (date,))
    tasks = [{"id": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(tasks)

# 获取周统计数据
@app.route('/api/tasks/week', methods=['GET'])
def get_week_tasks():
    week_start = request.args.get('start')
    week_end = request.args.get('end')
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('''
        SELECT
            task_date,
            COUNT(*) AS total,
            SUM(is_completed) AS completed
        FROM todos
        WHERE task_date BETWEEN ? AND ?
        GROUP BY task_date
    ''', (week_start, week_end))
    stats = {row[0]: {"total": row[1], "completed": row[2]} for row in c.fetchall()}
    conn.close()
    return jsonify(stats)

# 获取全部未完成任务
@app.route('/api/allUnfinishedTasks', methods=['GET'])
def get_all_unfinished_tasks():
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute('''
        SELECT id, task, is_completed 
        FROM todos 
        WHERE is_completed = 0
        ORDER BY created_at DESC
    ''')
    allUnfinishedTasks = [{"id": row[0], "task": row[1], "completed": bool(row[2])} for row in c.fetchall()]
    conn.close()
    return jsonify(allUnfinishedTasks)

# app.py 添加以下路由
@app.route('/api/stats/range', methods=['GET'])
def get_date_range_stats():
    start_date = request.args.get('start')
    end_date = request.args.get('end')
    
    # 验证日期格式
    try:
        datetime.strptime(start_date, '%Y-%m-%d')
        datetime.strptime(end_date, '%Y-%m-%d')
        if start_date > end_date:
            return jsonify({"error": "起始日期不能晚于结束日期"}), 400
    except ValueError:
        return jsonify({"error": "日期格式错误，请使用 YYYY-MM-DD"}), 400
    
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    
    # 执行统计查询
    c.execute('''
        SELECT 
            COUNT(*) AS total,
            SUM(is_completed) AS completed,
            ROUND(100.0 * SUM(is_completed) / COUNT(*), 2) AS rate
        FROM todos 
        WHERE task_date BETWEEN ? AND ?
    ''', (start_date, end_date))
    
    result = c.fetchone()
    stats = {
        "total": result[0] or 0,
        "completed": result[1] or 0,
        "completion_rate": result[2] or 0
    }
    conn.close()
    return jsonify(stats)

# 添加任务
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute("INSERT INTO todos (task, task_date) VALUES (?, ?)",
             (data['task'], data['date']))
    conn.commit()
    task_id = c.lastrowid
    conn.close()
    return jsonify({"id": task_id, "task": data['task'], "completed": False}), 201

# 更新任务状态
@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute("UPDATE todos SET is_completed = ? WHERE id = ?", (data['completed'], task_id))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 删除任务
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = sqlite3.connect('todos.db')
    c = conn.cursor()
    c.execute("DELETE FROM todos WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})

# 前端页面
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    init_db()
    
    app.run(debug=True)