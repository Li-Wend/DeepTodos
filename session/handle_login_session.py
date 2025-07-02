from flask import Blueprint, jsonify, request, session


handle_login_session_api = Blueprint('handle_login_session_api', __name__)

# 获取 session 信息
@handle_login_session_api.route('/api/get_session', methods=['GET'])
def getSession():
    session_item = request.args.get('session_item')
    session_value = session.get(session_item)
    if not session_value:
        return jsonify(error="获取 Session" + session_item + "失败！"), 400
    return jsonify(session_value)


# 注销登陆 (清空 session)
@handle_login_session_api.route('/api/logout')
def logout():
    session.clear()
    return jsonify(success=True)