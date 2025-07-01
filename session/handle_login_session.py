from flask import Blueprint, jsonify, session


handle_login_session_api = Blueprint('handle_login_session_api', __name__)



# 注销登陆 (清空 session)
@handle_login_session_api.route('/api/logout')
def logout():
    session.clear()
    return jsonify(success=True)