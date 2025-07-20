// 显示通知
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.querySelector('.notification-message').textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// 导出数据功能
function exportData() {
    showNotification("数据导出请求已提交，处理完成后将发送至您的邮箱");
}

// 删除确认
function confirmDelete() {
    if (confirm("根据《网络安全法》要求，账号删除后我们将删除您的个人信息。\n\n注意：\n1. 所有数据将被永久删除\n2. 操作日志将保留6个月\n3. 需要邮箱验证\n\n您确定要继续吗？")) {
        showNotification("账号删除请求已提交，请检查邮箱完成验证");
    }
}