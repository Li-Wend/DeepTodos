import random
import re
import string
from urllib.parse import unquote
import uuid
import bcrypt
from flask import Blueprint, jsonify, request, session
import sqlite3

import redis

handle_users_api = Blueprint('handle_users_api', __name__)

# 密码强度要求 - 密码需含大写字母、特殊字符且长度≥8
passwordRegex = re.compile(r'^(?!.*\s)(?=.*[A-Z])(?=.*[\W_]).{8,}$')


# 验证密码强度
@handle_users_api.route('/api/verify_password_strength', methods=['GET'])
def verify_password_strength():
    safePasswordValue = request.args.get('password')
    input_password = unquote(safePasswordValue)
    if not passwordRegex.match(input_password):
        return jsonify(error="密码需含大写字母、特殊字符且长度≥8"), 400
    return jsonify(success=True)

# 添加用户
@handle_users_api.route('/api/user', methods=['POST'])
def add_user():
    # 生成标准格式UUID（带连字符的36字符版本）
    user_uuid = str(uuid.uuid4())    
    data = request.get_json()
    mobile_number = data.get('mobile_number')
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
    c.execute("INSERT INTO users (user_uuid, mobile_number, password_hash) VALUES (?, ?, ?)",
             (user_uuid, data['mobile_number'], password_hash))
    conn.commit()
    conn.close()
    session["user_uuid"] = user_uuid
    session["mobile_number"] = mobile_number
    session["logged_in"] = True
    session.permanent = True
    return jsonify(success=True)

# 获取用户是否存在
@handle_users_api.route('/api/userExist', methods=['GET'])
def userExist():
    mobile_number = request.args.get('mobile_number')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT *
        FROM users
        WHERE mobile_number = ?
    ''', (mobile_number,))
    result = c.fetchone()
    conn.close()
    if result is None:
        return jsonify(error="用户不存在！"), 400
    return jsonify(success=True)

# 验证密码
@handle_users_api.route('/api/verify_password', methods=['GET'])
def verifyPassword():
    mobile_number = request.args.get('mobile_number')
    safePasswordValue = request.args.get('password')
    input_password = unquote(safePasswordValue)
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT user_uuid, password_hash
        FROM users
        WHERE mobile_number = ?
    ''', (mobile_number,))
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
    session['mobile_number'] = mobile_number
    session['logged_in'] = True
    session.permanent = True
    return jsonify(is_vaild)

# 修改密码
@handle_users_api.route('/api/change_password', methods=['PUT'])
def changePassword():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
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
    c.execute("UPDATE users SET password_hash = ? WHERE mobile_number = ?", (password_hash, mobile_number))
    conn.commit()
    conn.close()
    return jsonify({"success": True})


# 发送手机验证码
redis_client = redis.Redis(
    host='localhost',
    port=6379,
    db=0,
    decode_responses=True # 自动解码返回字符串
)
def generate_verification_code(length=6):
    return ''.join(random.choices(string.digits, k=length))
@handle_users_api.route('/api/send_sms_code', methods=['POST'])
def send_sms_code():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
    # 1. 验证手机号码是否输入 (由于前端已经校验手机号码正确性，这里只需验证手机号码是否存在)
    if not mobile_number:
        return jsonify(error="请输入正确的手机号码！"), 400
    # 2. 生成 6 位验证码
    verification_code = generate_verification_code()
    # 3. 存储手机号码、验证码到 Redis, 有效期 5 分钟
    try:
        redis_client.setex(f'verification_code:{mobile_number}', 300, verification_code)
        # 4. 调用短信服务发送验证码 - 暂时模拟 !!!!
        print(f"Generated code for {mobile_number}: {verification_code}") # 调试用
        return jsonify({"success": True})
    except redis.RedisError as e:
        return jsonify({'error': f'Redis error:{str(e)}'}), 500
    
# 验证手机验证码
@handle_users_api.route('/api/verify_sms_code', methods=['POST'])
def verify_sms_code():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
    verification_code = data.get('verification_code')
    # 从redis获取存储的 verification_code
    stored_verification_code = redis_client.get(f'verification_code:{mobile_number}')
    if not stored_verification_code:
        return jsonify({'vaild':False, 'message':'验证码已过期或未发送！'})
    if stored_verification_code == verification_code:
        redis_client.delete(f'verification_code:{mobile_number}')
        return jsonify({'vaild', True})
    return jsonify({'vaild':False, 'message':'验证码错误'})