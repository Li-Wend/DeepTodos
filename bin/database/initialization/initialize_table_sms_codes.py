import sqlite3

def initialize_table_sms_codes():
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()

    # 创建表
    c.execute('''
        CREATE TABLE IF NOT EXISTS sms_codes (
            sms_code_uuid TEXT(36) PRIMARY KEY NOT NULL,
            mobile_number TEXT NOT NULL UNIQUE,
            sms_code TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expire_at TIMESTAMP,
            used INTEGER DEFAULT 0
        )
    ''')

    conn.commit()
    conn.close()