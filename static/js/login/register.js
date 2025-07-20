document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const repasswordInput = document.getElementById('repassword');
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    const messageDiv = document.getElementById('message');

    // 密码强度检测
    passwordInput.addEventListener('input', function () {
        const password = passwordInput.value;
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
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = passwordInput.value;
        const repassword = repasswordInput.value;

        // 表单验证
        if (password !== repassword) {
            showMessage('两次输入的密码不一致！', 'error');
            repasswordInput.focus();
            return;
        }

        if (password.length < 8) {
            showMessage('密码长度至少需要8个字符！', 'error');
            passwordInput.focus();
            return;
        }

        // 验证用户是否已存在
        const userExists = await fetch(`/api/userExist?user=${username}`);
        if (userExists.ok) {
            showMessage("用户名已存在！", true);
            return;
        }


        // 验证密码规则并保存到数据库
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: username,
                password: password
            })
        });
        if (!response.ok) {
            showMessage("密码需含大写字母、特殊字符且长度≥8", 'error');
            return;
        } else {
            showMessage('账户创建成功！正在跳转到登录页面...', 'success');
            // 跳转到 tasks 页面
            setTimeout(() => {
                window.location.href = 'login';
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

    // 添加输入框动画效果
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.querySelector('i').style.color = '#2575fc';
        });

        input.addEventListener('blur', () => {
            input.parentElement.querySelector('i').style.color = '#6a11cb';
        });
    });
});