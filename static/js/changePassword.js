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

// 页面加载时执行
document.addEventListener('DOMContentLoaded', function () {
    getUsername();

    const changePasswordForm = document.getElementById('changePasswordForm');
    const oldPasswordInput = document.getElementById('oldPassword');
    const newPasswordInput = document.getElementById('newPassword');
    const repasswordInput = document.getElementById('repassword');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const messageDiv = document.getElementById('message');

    // 密码强度检测
    newPasswordInput.addEventListener('input', function () {
        const password = newPasswordInput.value;
        let strength = 0;

        // 长度检查
        if (password.length >= 8) strength += 25;

        // 包含小写字母
        if (/[a-z]/.test(password)) strength += 25;

        // 包含大写字母
        if (/[A-Z]/.test(password)) strength += 25;

        // 包含数字或特殊字符
        if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;

        // 更新强度条
        strengthMeter.style.width = strength + '%';

        // 更新文本和颜色
        if (strength < 50) {
            strengthMeter.style.background = '#ff6b6b';
            strengthText.textContent = '密码强度: 弱';
            strengthText.style.color = '#ff6b6b';
        } else if (strength < 75) {
            strengthMeter.style.background = '#f1c40f';
            strengthText.textContent = '密码强度: 中等';
            strengthText.style.color = '#f1c40f';
        } else {
            strengthMeter.style.background = '#2ecc71';
            strengthText.textContent = '密码强度: 强';
            strengthText.style.color = '#2ecc71';
        }
    });

    // 表单提交处理
    changePasswordForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const oldPassword = oldPasswordInput.value;
        const newPassword = newPasswordInput.value;
        const repassword = repasswordInput.value;

        // 表单验证
        if (!oldPassword) {
            showMessage('请输入当前密码！', 'error');
            oldPasswordInput.focus();
            return;
        }

        if (newPassword !== repassword) {
            showMessage('两次输入的新密码不一致！', 'error');
            repasswordInput.focus();
            return;
        }

        if (newPassword.length < 8) {
            showMessage('新密码长度至少需要8个字符！', 'error');
            newPasswordInput.focus();
            return;
        }

        // 验证用户是否存在以及密码是否正确
        const verify_password_response = await fetch(`/api/verify_password?user=${username}&password=${oldPassword}`);
        if (verify_password_response.status === 400) {
            showMessage('用户' + username + '不存在！', 'error');
            return;
        }
        if (verify_password_response.status === 401) {
            showMessage('用户' + username + '旧密码不正确！', 'error');
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
            showMessage('密码需含大写字母、特殊字符且长度≥8', 'error');
            return;
        } else {
            showMessage('密码更新成功！', 'success');

            // 重置表单
            setTimeout(() => {
                oldPasswordInput.value = '';
                newPasswordInput.value = '';
                repasswordInput.value = '';
                strengthMeter.style.width = '0';
                strengthText.textContent = '密码强度: 弱';
                strengthText.style.color = '#7f8c8d';
            }, 2000);
        }
    });

    // 显示消息函数
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = type;
        messageDiv.style.display = 'block';

        // 3秒后隐藏消息
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    // 密码显示/隐藏切换
    function setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        toggleIcon.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // 切换图标
            const icon = this.querySelector('i');
            if (type === 'text') {
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // 设置密码切换功能
    setupPasswordToggle('oldPassword', 'toggleOldPassword');
    setupPasswordToggle('newPassword', 'toggleNewPassword');
    setupPasswordToggle('repassword', 'toggleRepassword');
});
