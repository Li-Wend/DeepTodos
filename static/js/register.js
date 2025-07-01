document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;

    if (!username) return;

    // 验证逻辑
    if (password !== repassword) {
        showMessage("两次输入的密码不一致！", true);
        return;
    }

    // 验证用户是否已存在
    const userExists = await fetch(`/api/userExist?user=${username}`);
    if(userExists.ok) {
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
    if(!response.ok) {
        showMessage("密码需含大写字母、特殊字符且长度≥8", true);
        return;
    } else {
        showMessage("用户注册成功！");
        // 跳转到 tasks 页面
        window.location.href='tasks';
    }

});


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