// 背景气泡动画生成
function createBubbles() {
    const bubblesContainer = document.querySelector('.bubbles');
    const bubbleCount = 18;

    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');

        // 随机大小
        const size = Math.random() * 80 + 20;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;

        // 随机位置
        bubble.style.left = `${Math.random() * 100}%`;

        // 随机动画延迟
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        // 随机动画时长
        const duration = Math.random() * 10 + 12;
        bubble.style.animationDuration = `${duration}s`;

        // 随机透明度
        bubble.style.opacity = Math.random() * 0.4 + 0.3;

        bubblesContainer.appendChild(bubble);
    }
}

document.addEventListener('DOMContentLoaded', () => {
            createBubbles();
});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    if (!username) return;

    // 验证用户是否存在以及密码是否正确
    const safePasswordValue = encodeURIComponent(password);
    const response = await fetch(`/api/verify_password?user=${username}&password=${safePasswordValue}`);
    if (response.status === 400) {
        // 登录失败
        messageDiv.textContent = '用户' + username + '不存在！';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
    }
    if (response.status === 401) {
        // 登录失败
        messageDiv.textContent = '用户' + username + '密码不正确';
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
    }
    if (response.ok) {
        // 成功登录
        messageDiv.textContent = '登录成功！正在跳转...';
        messageDiv.className = 'success';
        messageDiv.style.display = 'block';

        // 模拟跳转延迟
        setTimeout(() => {
            messageDiv.textContent = '跳转中...';
            // 跳转到 tasks 页面
            window.location.href = 'tasks';
        }, 1000);
    }

    // 3秒后隐藏消息
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);

});


// 添加输入框动画效果
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('i').style.color = '#6e8efb';
    });

    input.addEventListener('blur', () => {
        input.parentElement.querySelector('i').style.color = '#a777e3';
    });
});