document.addEventListener('DOMContentLoaded', function () {
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

    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

    // 表单提交处理
    registerForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. 验证手机号是否正确
        const mobile_number = document.getElementById('mobile_number').value;
        if (!mobile_number || !reg_tel.test(mobile_number)) {
            showMessage("请输入正确的手机号码！", 'error');
            return;
        }

        const password = passwordInput.value;
        const repassword = repasswordInput.value;

        // 2. 验证两次输入的密码是否一致    
        if (password !== repassword) {
            showMessage('两次输入的密码不一致！', 'error');
            repasswordInput.focus();
            return;
        }

        // 3. 验证密码强度
        const safePasswordValue = encodeURIComponent(password);
        const verify_password_strength_response = await fetch(`/api/verify_password_strength?password=${safePasswordValue}`);
        if (verify_password_strength_response.status == 400) {
            showMessage('密码需含大小写字母、特殊字符且长度≥8', 'error');
            passwordInput.focus();
            return;
        }

        // 4. 验证用户是否已存在
        const userExists = await fetch(`/api/userExist?mobile_number=${mobile_number}`);
        if (userExists.ok) {
            showMessage("该用户已存在！", 'error');
            return;
        }

        // 5. 验证短信验证码是否正确
        const smsCode = document.getElementById('verCode').value;
        const verifySmsCodeResponse = await fetch(`/api/verify_sms_code?mobile_number=${mobile_number}&sms_code=${smsCode}`);
        if (verifySmsCodeResponse.status == 400) {
            showMessage("验证码已失效，请重新发送！", 'error');
            // 6. 从数据库中删除已验证通过的短信验证码
            await fetch(`/api/delete_sms_code`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mobile_number: mobile_number
                })
            });
            return;
        }
        if (verifySmsCodeResponse.status == 401) {
            showMessage("请输入正确的验证码！", 'error');
            return;
        }
        if (!verifySmsCodeResponse.ok) {
            showMessage("请输入正确的验证码！", 'error');
            return;
        }

        // 6. 从数据库中删除已验证通过的短信验证码
        await fetch(`/api/delete_sms_code`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mobile_number: mobile_number
            })
        });

        // 验证密码规则并保存到数据库
        const addUserResponse = await fetch(`/api/user`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mobile_number: mobile_number,
                password: password
            })
        });
        if (!addUserResponse.ok) {
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


    // -------------- 验证码弹窗 --------------
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
        // 1. 验证手机号是否正确
        const mobile_number = document.getElementById('mobile_number').value;
        if (!mobile_number || !reg_tel.test(mobile_number)) {
            showMessage("请输入正确的手机号码！", 'error');
            return;
        }

        const password = passwordInput.value;
        const repassword = repasswordInput.value;

        // 2. 验证两次输入的密码是否一致    
        if (password !== repassword) {
            showMessage('两次输入的密码不一致！', 'error');
            repasswordInput.focus();
            return;
        }

        // 3. 验证密码强度
        const safePasswordValue = encodeURIComponent(password);
        const verify_password_strength_response = await fetch(`/api/verify_password_strength?password=${safePasswordValue}`);
        if (verify_password_strength_response.status == 400) {
            showMessage('密码需含大小写字母、特殊字符且长度≥8', 'error');
            passwordInput.focus();
            return;
        }

        // 4. 验证用户是否已存在
        const userExists = await fetch(`/api/userExist?mobile_number=${mobile_number}`);
        if (userExists.ok) {
            showMessage("该用户已存在！", 'error');
            return;
        }

        // 5. 弹出安全验证对话框界面
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
    async function submitCaptcha() {
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

        // 服务端发送验证码
        const mobile_number = document.getElementById('mobile_number').value;
        const sendVerCodeResponse = await fetch(`/api/send_sms_code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mobile_number: mobile_number
            })
        });
        if (sendVerCodeResponse.status == 400) {
            showMessage("请输入正确的手机号码！", 'error');
            return;
        }
        if (sendVerCodeResponse.status == 401) {
            showMessage("验证码已发送，请60s后重试", 'error');
            return;
        }
        if (sendVerCodeResponse.ok) {
            showMessage("手机验证码发送成功！", 'success');
        } else {
            showMessage("手机验证码发送失败，请联系系统管理员！", 'error');
            return;
        }

        // 获取验证码按钮倒计时60s
        setTime(verCodeBtn);
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

