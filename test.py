import sqlite3

conn = sqlite3.connect('deeptodo.db')
c = conn.cursor()

# # 删除数据库表及表数据
# c.execute('''
#     DROP TABLE tasks_copy
# ''')

# # 创建新表tasks_copy
# c.execute('''
#     CREATE TABLE IF NOT EXISTS tasks_copy (
#         task_uuid TEXT(36) PRIMARY KEY NOT NULL,
#         task TEXT NOT NULL,
#         task_date DATE NOT NULL,
#         is_completed BOOLEAN DEFAULT 0,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         changed_on TIMESTAMP
#     )    
# ''')

# # 复制表 table1 内容到新表 table2
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
c.execute('''
    DELETE FROM tasks_priority;
''')

# # 复制表 table1 内容到另外一个表 table2 中 (仅复制指定字段)
# c.execute('''
#     INSERT INTO tasks_priority (task_uuid, task_priority, created_at, created_by, changed_on, changed_by)
#     SELECT 
#         task_uuid,
#         'medium',
#         created_at,
#         'jarod_father',
#         '2025-07-14 00:00:00',
#         'jarod_father'
#     FROM tasks;     
# ''')

conn.commit()
conn.close()