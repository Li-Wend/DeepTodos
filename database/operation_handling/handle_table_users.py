import re
import bcrypt
from flask import Blueprint, jsonify, request, session
import sqlite3

handle_users_api = Blueprint('handle_users_api', __name__)

# 密码强度要求 - 密码需含大写字母、特殊字符且长度≥8
passwordRegex = re.compile(r'^(?!.*\s)(?=.*[A-Z])(?=.*[\W_]).{8,}$')


# 添加用户
@handle_users_api.route('/api/user', methods=['POST'])
def add_user():
    data = request.get_json()
    user = data.get('user')
    password = data.get('password')
    # 1. 密码验证规则
    if not password or not passwordRegex.match(password):
        return jsonify(error="密码需含大写字母、特殊字符且长度≥8"), 400
    # 2. 使用 bcrypt 哈希（自动加盐）
    # 生成盐值
    salt = bcrypt.gensalt(rounds=12) # 调整计算成本
    # 哈希密码
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    # 3. 添加用户到数据库
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO users (user, password_hash) VALUES (?, ?)",
             (data['user'], password_hash))
    conn.commit()
    conn.close()
    session["username"] = user
    session["logged_in"] = True
    session.permanent = True
    return jsonify(success=True)

# 获取用户是否存在
@handle_users_api.route('/api/userExist', methods=['GET'])
def userExist():
    user = request.args.get('user')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT *
        FROM users
        WHERE user = ?
    ''', (user,))
    result = c.fetchone()
    conn.close()
    if result is None:
        return jsonify(error="用户不存在！"), 400
    return jsonify(success=True)

# 验证密码
@handle_users_api.route('/api/verify_password', methods=['GET'])
def verifyPassword():
    user = request.args.get('user')
    input_password = request.args.get('password')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT password_hash
        FROM users
        WHERE user = ?
    ''', (user,))
    result = c.fetchone()
    conn.close()
    if result is None:
        return jsonify(error="用户不存在！"), 400
    else:
        stored_password_hash_value = result[0]
    # 验证密码
    is_vaild = bcrypt.checkpw(input_password.encode('utf-8'), stored_password_hash_value)
    if not is_vaild:
        return jsonify(error="密码不正确！"), 401
    session['username'] = user
    session['logged_in'] = True
    session.permanent = True
    return jsonify(is_vaild)
