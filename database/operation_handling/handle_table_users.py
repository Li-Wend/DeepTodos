import re
import bcrypt
from flask import Blueprint, jsonify, request
import sqlite3

handle_users_api = Blueprint('handle_users_api', __name__)

# 密码强度要求 - 密码需含大写字母、特殊字符且长度≥8
passwordRegex = re.compile(r'^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})')

# 添加用户
@handle_users_api.route('/api/user1', methods=['POST'])
def add_user1():
    data = request.get_json()
    password = data.get('password')

    # 1. 密码验证规则
    if not password or not passwordRegex.match(password):
        return jsonify(error="密码需含大写字母特殊字符且长度≥8"), 400
    
    # 2. 使用 bcrypt 哈希（自动加盐）
    # 生成盐值
    salt = bcrypt.gensalt(rounds=12) # 调整计算成本
    # 哈希密码
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)

    print(password_hash)


    # 3. 添加用户到数据库
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO users (user, password_hash) VALUES (?, ?)",
             (data['user'], password_hash))
    conn.commit()
    conn.close()
    
    return jsonify(success=True)


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
    if result is None:
        user_value = 0
        password_hash_value = 0
        created_at_value = 0
        changed_on_value = 0
    else:
        user_value = result[0]
        password_hash_value = result[1]
        created_at_value = result[2]
        changed_on_value = result[3]
    users = { 
        "user": user_value, 
        "password_hash": password_hash_value,
        "created_at": created_at_value, 
        "changed_on": changed_on_value
    }
    conn.close()
    return jsonify(users)
  
    
    
    
