
import sqlite3

conn = sqlite3.connect('deeptodo.db')
c = conn.cursor()
c.execute('''
    DROP TABLE users
''')
conn.commit()
conn.close()