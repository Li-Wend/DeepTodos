import re
from urllib.parse import unquote
import uuid
import bcrypt
from flask import Blueprint, jsonify, request, session
import sqlite3

handle_users_api = Blueprint('handle_users_api', __name__)

# 密码强度要求 - 密码需含大写字母、特殊字符且长度≥8
passwordRegex = re.compile(r'^(?!.*\s)(?=.*[A-Z])(?=.*[\W_]).{8,}$')


# 添加用户
@handle_users_api.route('/api/user', methods=['POST'])
def add_user():
    # 生成标准格式UUID（带连字符的36字符版本）
    user_uuid = str(uuid.uuid4())    
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
    c.execute("INSERT INTO users (user_uuid, user, password_hash) VALUES (?, ?, ?)",
             (user_uuid, data['user'], password_hash))
    conn.commit()
    conn.close()
    session["user_uuid"] = user_uuid
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
    safePasswordValue = request.args.get('password')
    input_password = unquote(safePasswordValue)

    print('验证密码')
    print(input_password)

    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT user_uuid, password_hash
        FROM users
        WHERE user = ?
    ''', (user,))
    result = c.fetchone()
    conn.close()
    if result is None:
        return jsonify(error="用户不存在！"), 400
    else:
        stored_user_uuid_value = result[0]
        stored_password_hash_value = result[1]
    # 验证密码
    is_vaild = bcrypt.checkpw(input_password.encode('utf-8'), stored_password_hash_value)
    if not is_vaild:
        return jsonify(error="密码不正确！"), 401
    session['user_uuid'] = stored_user_uuid_value
    session['username'] = user
    session['logged_in'] = True
    session.permanent = True
    return jsonify(is_vaild)

# 修改密码
@handle_users_api.route('/api/change_password', methods=['PUT'])
def changePassword():
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
    # 3. 更改用户新密码到数据库
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("UPDATE users SET password_hash = ? WHERE user = ?", (password_hash, user))
    conn.commit()
    conn.close()
    return jsonify({"success": True})