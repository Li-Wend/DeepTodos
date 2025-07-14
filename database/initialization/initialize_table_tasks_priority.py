import sqlite3

def initialize_table_tasks_priority():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    
    # 创建表 tasks_priority
    # task_priority:
    #   low    = '低'
    #   medium = '中'
    #   high   = '高'
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks_priority (
            task_uuid TEXT(36) PRIMARY KEY NOT NULL,
            task_priority TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by TEXT,
            changed_on TIMESTAMP,
            changed_by TEXT
        )
    ''')

    # # 删除已存在的同名触发器（如果存在）
    # c.execute('''
    #     DROP TRIGGER IF EXISTS update_tasks_priority_changed_on;
    # ''')
    # # 新建触发器
    # c.execute('''
    #     CREATE TRIGGER update_tasks_priority_changed_on
    #         AFTER UPDATE ON tasks
    #         BEGIN
    #             UPDATE tasks
    #             SET changed_on = CURRENT_TIMESTAMP
    #             WHERE task_uuid = OLD.task_uuid;
    #         END;
    # ''')

    conn.commit()
    conn.close()