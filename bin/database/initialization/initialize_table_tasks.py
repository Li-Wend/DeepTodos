import sqlite3

def initialize_table_tasks():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    
    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            task_uuid TEXT(36) PRIMARY KEY NOT NULL,
            user_uuid TEXT(36) NOT NULL,
            task TEXT NOT NULL,
            task_priority TEXT NOT NULL,
            task_category TEXT NOT NULL,
            task_date DATE NOT NULL,
            is_completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')

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

    conn.commit()
    conn.close()