from datetime import datetime, timedelta
import random
import sqlite3
import string
import uuid
from flask import Blueprint, jsonify, request

handle_sms_codes_api = Blueprint('handle_sms_codes_api', __name__)

# 发送手机验证码
def generate_verification_code(length=6):
    return ''.join(random.choices(string.digits, k=length))
@handle_sms_codes_api.route('/api/send_sms_code', methods=['POST'])
def send_sms_code():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
    # 1. 验证手机号码是否输入 (由于前端已经校验手机号码正确性，这里只需验证手机号码是否存在)
    if not mobile_number:
        return jsonify(error="请输入正确的手机号码！"), 400
    # 2. 生成 6 位验证码
    sms_code = generate_verification_code()
    # 3. 存储手机号码、验证码到 SQLite 数据库 sms_codes, 并设置有效期 5 分钟
    #    生成标准格式UUID（带连字符的36字符版本）
    sms_code_uuid = str(uuid.uuid4())
    #    计算过期时间
    expire_at = datetime.now() + timedelta(minutes=5)
    # 4. 添加 sms_code 信息到数据库
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("INSERT INTO sms_codes (sms_code_uuid, mobile_number, sms_code, expire_at) VALUES (?, ?, ?, ?)",
             (sms_code_uuid, mobile_number, sms_code, expire_at))
    conn.commit()
    conn.close()
    # 5. 调用短信服务发送验证码 - 暂时模拟 !!!!
    print(f"Generated code for {mobile_number}: {sms_code}") # 调试用
    return jsonify({"success": True})
    
    
# 验证手机验证码
@handle_sms_codes_api.route('/api/verify_sms_code', methods=['GET'])
def verify_sms_code():
    mobile_number = request.args.get('mobile_number')
    sms_code = request.args.get('sms_code')
    currentDatetime = datetime.now()
    # 从数据库 sms_codes 获取存储的 sms_code
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute('''
        SELECT sms_code
        FROM sms_codes
        WHERE mobile_number = ?
              expire_at > ?
              used = 0
    ''', (mobile_number, currentDatetime,))
    result = c.fetchone()
    if result is None:
        return jsonify(error="验证码失效，请重新发送！"), 400
    conn.commit()
    conn.close()
    stored_sms_code = result[0]
    if stored_sms_code == sms_code:
        return jsonify(success=True)
    return jsonify(error="请输入正确的验证码！"), 401

# 删除手机验证码 通过手机号码
@handle_sms_codes_api.route('/api/delete_sms_code', methods=['DELETE'])
def delete_sms_code():
    data = request.get_json()
    mobile_number = data.get('mobile_number')
    conn = sqlite3.connect('deeptodo.db')
    c = conn.cursor()
    c.execute("DELETE FROM sms_codes WHERE mobile_number = ?", (mobile_number,))
    conn.commit()
    conn.close()
    return jsonify({"success": True})