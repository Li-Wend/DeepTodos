import sqlite3

conn = sqlite3.connect('deeptodo.db')
c = conn.cursor()

# # 删除数据库表及表数据
# c.execute('''
#     DROP TABLE users_copy
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
#     CREATE TABLE IF NOT EXISTS users (
#         user_uuid TEXT(36) PRIMARY KEY NOT NULL,
#         mobile_number TEXT NOT NULL UNIQUE,
#         email_account TEXT UNIQUE,
#         password_hash TEXT,
#         real_name TEXT,
#         id_card TEXT,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         changed_on TIMESTAMP
#     )
# ''')

# # 创建新表 sms_codes
# c.execute('''
#     CREATE TABLE IF NOT EXISTS sms_codes (
#         sms_code_uuid TEXT(36) PRIMARY KEY NOT NULL,
#         mobile_number TEXT NOT NULL UNIQUE,
#         sms_code TEXT NOT NULL,
#         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
#         expire_at TIMESTAMP,
#         used INTEGER DEFAULT 0
#     )
# ''')

# # 复制表 table1 内容到新表 table2
# c.execute('''
#     INSERT INTO tasks_copy SELECT * FROM tasks;
# ''')

# # 删除已存在的同名触发器（如果存在）
# c.execute('''
#     DROP TRIGGER IF EXISTS update_users_changed_on;
# ''')
# # 新建触发器
# c.execute('''
#     CREATE TRIGGER update_users_changed_on
#     AFTER UPDATE ON users
#     BEGIN
#         UPDATE users
#             SET changed_on = CURRENT_TIMESTAMP
#             WHERE user_uuid = OLD.user_uuid;
#         END;
# ''')

# # 删除表 tasks 所有数据
# c.execute('''
#     DELETE FROM users where mobile_number = '13504809661';
# ''')

# # 复制表 table1 内容到另外一个表 table2 中 (仅复制指定字段)
# c.execute('''
#     INSERT INTO users (user_uuid, mobile_number, email_account, password_hash, real_name, id_card, created_at, changed_on)
#     SELECT 
#         user_uuid,
#         '18616611112',
#         NULL,
#         password_hash,
#         NULL,
#         NULL,
#         created_at,
#         changed_on
#     FROM users_copy
#         WHERE user = 'jarod_father';   
# ''')

conn.commit()
conn.close()