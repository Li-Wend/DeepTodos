import sqlite3

def initialize_table_users():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()

    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_uuid TEXT(36) PRIMARY KEY NOT NULL,
            mobile_number TEXT NOT NULL UNIQUE,
            email_account TEXT UNIQUE,
            password_hash TEXT,
            real_name TEXT,
            id_card TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            changed_on TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()