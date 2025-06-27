document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username) return;

    getUserInfo(username).then(userJson => {
        if(userJson.password_hash == password) {
            showMessage("登录成功！");
            window.location.href='tasks';
        } else {
            showMessage("用户名密码不正确！");
            return;
        }
    });


});
