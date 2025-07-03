import sqlite3

def initialize_table_tasks():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    
    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            task_uuid TEXT(36) PRIMARY KEY NOT NULL,
            task TEXT NOT NULL,
            task_date DATE NOT NULL,
            is_completed BOOLEAN DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')

    # # 设置触发器 update_tasks_changed_on - 该语句创建表时执行一次再不需要执行
    # # 当表内容变更时自动填充当前日期作为字段 changed_on 值      
    # c.execute('''
    #     CREATE TRIGGER update_tasks_changed_on
    #     BEFORE UPDATE ON tasks
    #     FOR EACH ROW
    #     BEGIN
    #         -- 直接修改即将更新的 NEW 值
    #         SELECT CASE 
    #             -- 检查是否有实际字段更新（排除 changed_on 自身变化）
    #             WHEN (
    #                 OLD.task IS NOT NEW.task OR
    #                 OLD.is_completed IS NOT NEW.is_completed OR
    #                 -- 添加其他需要监听的字段...
    #             ) 
    #             THEN NEW.changed_on = CURRENT_TIMESTAMP 
    #         END;
    #     END;
    # ''')


#    # -------- 新增字段 changed_on --------
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


# -------- 新增字段 user_uuid --------


    conn.commit()
    conn.close()