document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username) return;

    // 验证用户是否存在以及密码是否正确
    const response = await fetch(`/api/verify_password?user=${username}&password=${password}`);
    if(response.status === 400) {
        showMessage("用户" + username + "不存在！", true);
        return;
    } 
    if(response.status === 401) {
        showMessage("用户" + username + "密码不正确！", true);
        return;
    }
    if(response.ok) {
        showMessage("用户" + username + "登陆成功！");
        // 跳转到 tasks 页面
        window.location.href='tasks';
    }

});
