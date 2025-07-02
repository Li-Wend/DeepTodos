document.getElementById('changePasswordForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const repassword = document.getElementById('repassword').value;

    if (!username) return;

    // 验证逻辑
    if (newPassword !== repassword) {
        showMessage("两次输入的新密码不一致！", true);
        return;
    }

    // 验证用户是否存在以及密码是否正确
    const verify_password_response = await fetch(`/api/verify_password?user=${username}&password=${oldPassword}`);
    if(verify_password_response.status === 400) {
        showMessage("用户" + username + "不存在！", true);
        return;
    } 
    if(verify_password_response.status === 401) {
        showMessage("用户" + username + "旧密码不正确！", true);
        return;
    }

    // 验证密码规则并更改密码保存到数据库
    const change_password_response = await fetch(`/api/change_password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: username,
            password: newPassword
        })
    });
    if (!change_password_response.ok) {
        showMessage("密码需含大写字母、特殊字符且长度≥8", true);
        return;
    } else {
        showMessage("用户修改密码成功！");
        // 跳转到 tasks 页面
        window.location.href = 'tasks';
    }


});

// 获取用户名从 session 
async function getUsername() {
    // 从 session 中获取用户登录信息
    const response = await fetch(`/api/get_session?session_item=username`);
    if (!response.ok) {
        alert("获取用户登录信息失败！");
        window.location.href = 'login';
    }
    const username = await response.json();
    document.getElementById("username").value = username;
}

function showMessage(message, isError = false) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    
    // 重置所有颜色类
    messageElement.classList.remove('text-success', 'text-error');
    
    // 根据消息类型添加对应颜色类
    if (isError) {
        messageElement.classList.add('text-error');
    } else {
        messageElement.classList.add('text-success');
    }    
}