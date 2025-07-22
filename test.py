import sqlite3

conn = sqlite3.connect('deeptodo.db')
c = conn.cursor()

# # 删除数据库表及表数据
# c.execute('''
#     DROP TABLE tasks_priority
# ''')

# # 创建新表 tasks_copy
# c.execute('''
#     CREATE TABLE IF NOT EXISTS tasks (
#         task_uuid TEXT(36) PRIMARY KEY NOT NULL,
#         user_uuid TEXT(36) NOT NULL,
#         task TEXT NOT NULL,
#         task_priority TEXT NOT NULL,
#         task_category TEXT NOT NULL,
#         task_date DATE NOT NULL,
#         is_completed BOOLEAN DEFAULT 0,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         changed_on TIMESTAMP
#     )
# ''')

# # 创建新表 users_copy
# c.execute('''
#     CREATE TABLE IF NOT EXISTS users_copy (
#         user_uuid TEXT(36) PRIMARY KEY NOT NULL,
#         user TEXT NOT NULL UNIQUE,
#         password_hash TEXT NOT NULL,
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
# c.execute('''
#     DELETE FROM tasks_priority;
# ''')

# # 复制表 table1 内容到另外一个表 table2 中 (仅复制指定字段)
# c.execute('''
#     INSERT INTO tasks (task_uuid, user_uuid, task, task_priority, task_category, task_date, is_completed, created_at, changed_on)
#     SELECT 
#         task_uuid,
#         user_uuid,
#         task,
#         'medium',
#         'work',
#         task_date,
#         is_completed,
#         created_at,
#         changed_on
#     FROM tasks_copy;     
# ''')

conn.commit()
conn.close()