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

        const mobile_number = document.getElementById('mobile_number').value;
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
        const userExists = await fetch(`/api/userExist?mobile_number=${mobile_number}`);
        if (userExists.ok) {
            showMessage("该用户已存在！", 'error');
            return;
        }


        // 验证密码规则并保存到数据库
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mobile_number: mobile_number,
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

    // 安全校验 -----------------------------------------------------------
    const modal = document.getElementById('captchaModal');
    const showBtn = document.getElementById('verCodeBtn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const refreshBtn = document.getElementById('refreshCaptcha');
    const submitBtn = document.getElementById('submitBtn');
    const captchaCode = document.getElementById('captchaCode');
    const captchaInput = document.getElementById('captchaInput');
    const errorMessage = document.getElementById('errorMessage');

    // 生成随机验证码
    function generateCaptcha() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // 显示验证码弹窗
    async function showModal() {
        // 校验手机号是否正确
        const mobile_number = document.getElementById('mobile_number').value;
        if (!mobile_number || !/^1[3-9]\d{9}$/.test(mobile_number)) {
            showMessage("请输入正确的手机号码！", 'error');
            return;
        }

        // 验证用户是否已存在
        const userExists = await fetch(`/api/userExist?mobile_number=${mobile_number}`);
        if (userExists.ok) {
            showMessage("该用户已存在！", 'error');
            return;
        }


        modal.classList.add('active');
        captchaCode.textContent = generateCaptcha();
        captchaInput.value = '';
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
        document.body.style.overflow = 'hidden';
    }

    // 关闭验证码弹窗
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // 刷新验证码
    function refreshCaptcha() {
        captchaCode.textContent = generateCaptcha();
        captchaInput.value = '';
        errorMessage.textContent = '';
        errorMessage.classList.remove('show');
    }

    // 提交验证
    function submitCaptcha() {
        const userInput = captchaInput.value.trim().toUpperCase();
        const actualCaptcha = captchaCode.textContent;

        if (!userInput) {
            errorMessage.textContent = '请输入验证码';
            errorMessage.classList.add('show');
            return;
        }

        if (userInput !== actualCaptcha) {
            errorMessage.textContent = '验证码错误，请重新输入';
            errorMessage.classList.add('show');
            // 刷新验证码
            refreshCaptcha();
            return;
        }

        // 验证成功
        closeModal();

        setTime(verCodeBtn);
    }

    // 验证码按钮倒计时
    function setTime(btn) {
        let time = 60;
        btn.disabled = true;
        btn.classList.add('disabled');
        btn.textContent = `60秒后重发`;

        const timer = setInterval(() => {
            time--;
            btn.textContent = `${time}秒后重发`;

            if (time <= 0) {
                clearInterval(timer);
                btn.disabled = false;
                btn.classList.remove('disabled');
                btn.textContent = '获取验证码';
            }
        }, 1000);
    }

    // 事件监听
    showBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    refreshBtn.addEventListener('click', refreshCaptcha);
    submitBtn.addEventListener('click', submitCaptcha);

    // 点击遮罩层关闭弹窗
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 按回车键提交
    captchaInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            submitCaptcha();
        }
    });

    // 初始化验证码
    refreshCaptcha();

});

