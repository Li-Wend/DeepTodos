from flask import Blueprint, jsonify, request
import sqlite3

handle_users_api = Blueprint('handle_users_api', __name__)

# 添加用户
@handle_users_api.route('/api/user', methods=['POST'])
def add_user():
    data = request.get_json()
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO users (user, password_hash) VALUES (?, ?)",
             (data['user'], data['password_hash']))
    conn.commit()
    id = c.lastrowid
    conn.close()
    return jsonify({"id": id, "user": data['user']}), 201

# 获取用户
@handle_users_api.route('/api/user', methods=['GET'])
def get_user():
    user = request.args.get('user')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT
            user,
            password_hash,
            created_at,
            changed_on
        FROM users
        WHERE user = ?
    ''', (user,))
    result = c.fetchone()
    users = { 
        "user": result[0], 
        "password_hash": result[1],
        "created_at": result[2], 
        "changed_on": result[3]
    }
    conn.close()
    return jsonify(users)
