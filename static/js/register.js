document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // 阻止表单默认提交

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;

    if (!username) return;

    // 密码验证规则
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //至少8字符包含字母和数字

    // 验证逻辑
    if (password !== repassword) {
        showMessage("两次输入的密码不一致！");
        return;
    }

    if (!passwordRegex.test(password)) {
        showMessage("密码需至少8位，包含字母和数字");
        return;
    }

    // 检查用户名是否存在
    getUserInfo(username).then(userJson => {
        if (userJson !== undefined) {
            if (userJson.user == username) {
                showMessage("用户名已存在！");
                return;
            }
        }

        // 保存到数据库-
        addUserToDatabase(username, password);
    });





});


function showMessage(message) {
    document.getElementById('message').textContent = message;
}

async function getUserInfo(username) {
    try {
        let response = await fetch(`/api/user?user=${username}`);
        if (!response.ok) {
            return;
        }

        let userJson = await response.json();

        return userJson;
    } catch (error) {
        console.error("处理请求时出错：", error);
        return null;
    }
}

function addUserToDatabase(username, password) {
    if (fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user: username,
            password_hash: password
        })
    }).then(response => response.ok)) {
        showMessage("注册成功");
    } else {
        showMessage("注册失败");
    }
}