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
            task_date DATE NOT NULL,
            is_completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()