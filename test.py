import sqlite3

conn = sqlite3.connect('deeptodo.db')
c = conn.cursor()

# # 删除数据库表及表数据
# c.execute('''
#     DROP TABLE tasks
# ''')

# # 创建新表tasks_copy
# c.execute('''
#     CREATE TABLE IF NOT EXISTS tasks_copy (
#         id INTEGER PRIMARY KEY AUTOINCREMENT,
#         task TEXT NOT NULL,
#         task_date DATE NOT NULL,
#         is_completed BOOLEAN DEFAULT 0,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         changed_on TIMESTAMP
#     )    
# ''')

# # 复制表tasks内容到新表tasks_copy
# c.execute('''
#     INSERT INTO tasks_copy SELECT * FROM tasks;
# ''')

# # 删除已存在的同名触发器（如果存在）
# c.execute('''
#     DROP TRIGGER IF EXISTS update_tasks_changed_on;
# ''')
# # 新建触发器
# c.execute('''
#     CREATE TRIGGER update_tasks_changed_on
#     AFTER UPDATE ON tasks
#     BEGIN
#         UPDATE tasks
#             SET changed_on = CURRENT_TIMESTAMP
#             WHERE task_uuid = OLD.task_uuid;
#         END;
# ''')

# # 删除表 tasks 所有数据
# c.execute('''
#     DELETE FROM tasks;
# ''')

# 复制表内容到另外一个表中(仅复制指定字段)
c.execute('''
    INSERT INTO tasks (task_uuid, task, task_date, is_completed, created_at, changed_on)
    SELECT 
        substr(hex, 1, 8) || '-' ||
        substr(hex, 9, 4) || '-' ||
        '4' || substr(hex, 13, 3) || '-' ||
        substr('89ab', (abs(random()) % 4) + 1, 1) || substr(hex, 17, 3) || '-' ||
        substr(hex, 21, 12) AS task_uuid,
        task, 
        task_date,
        is_completed,
        created_at,
        changed_on
    FROM (
        SELECT 
            hex(randomblob(16)) AS hex,
            task,
            task_date,
            is_completed,
            created_at,
            changed_on
        FROM tasks_copy
    );          
''')

conn.commit()
conn.close()