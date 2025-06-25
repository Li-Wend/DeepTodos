import sqlite3

def initialize_table_tasks():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    
    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            task TEXT NOT NULL,
            task_date DATE NOT NULL,
            is_completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')
    

#    # 检查旧表结构升级
#    c.execute("PRAGMA table_info(tasks)")
#    columns = [col[1] for col in c.fetchall()]
#    
#    if 'changed_on' not in columns:
#        # 新增字段 changed_on
#        c.execute('ALTER TABLE tasks ADD COLUMN changed_on TIMESTAMP')
#
#        # 初始化新增字段值
#        c.execute('''
#                UPDATE tasks
#                SET changed_on = created_at
#                WHERE changed_on IS NULL
#            ''')
#
#        # 设置触发器         
#        c.execute('''
#                CREATE TRIGGER update_tasks_changed_on
#                AFTER UPDATE ON tasks
#                BEGIN
#                    UPDATE tasks
#                    SET changed_on = CURRENT_TIMESTAMP
#                    WHERE id = OLD.id;
#                END;
#            ''')
        
    conn.commit()
    conn.close()