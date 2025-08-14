// 状态管理
let currentView = 'day';
let currentDate = new Date().toISOString().split('T')[0];
let currentWeekStart;
let currentLang = 'zh'; // 默认语言

// 初始化日视图
document.getElementById('datePicker').value = currentDate;

// 页面加载时执行
function bodyOnload() {
    getDayofWeek();
    renderCharts();
}

// ---------- 获取当前日期是星期几 ----------
async function getDayofWeek() {
    let today = new Date();

    // 使用getDay()方法获取星期几
    let dayIndex = today.getDay();

    // 定义一个数组来存储星期的名称
    let weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

    // 获取当前星期的名称
    let currentDay = "TODAY " + weekdays[dayIndex];
    document.getElementById("displayDayofWeek").innerHTML = currentDay;

    // 从 session 中获取用户登录信息
    const response = await fetch(`/api/get_session?session_item=mobile_number`);
    if (!response.ok) {
        alert("获取用户登录信息失败！");
        window.location.href = 'login';
    }
    const mobile_number = await response.json();
    document.getElementById("mobile_number").innerHTML = mobile_number;
}

// 初始化任务列表
document.addEventListener('DOMContentLoaded', loadCurrentDayTasks);

// 语言加载函数
async function loadLanguage(lang) {
    const response = await fetch(`static/i18n/i18n_${lang}.json`);
    const translations = await response.json();

    // 处理普通文本元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[key];
    });

    // 处理特殊属性
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = translations[el.dataset.i18nPlaceholder];
    });

    // 设置页面语言属性
    document.documentElement.lang = lang;
}

// 初始化加载语言
loadLanguage(currentLang);

// 切换语言示例
function switchLanguage(lang) {
    currentLang = lang;
    loadLanguage(lang);
}

// 修改密码
async function changePassword() {
    // 跳转到 changePassword 页面
    window.location.href = 'changePassword';
}

// 退出登陆 (删除 session) 并重定向到 login 页面
async function logout() {
    const logoutResponse = await fetch(`/api/logout`);
    if (logoutResponse.ok) {
        // 跳转到 login 页面
        window.location.href = 'login';
    }
}

// 切换视图 
function switchView(view) {
    currentView = view;
    document.getElementById('dayView').style.display = view === 'day' ? 'block' : 'none';
    document.getElementById('myTasksView').style.display = view === 'myTasks' ? 'block' : 'none';
    if (view === 'day') loadCurrentDayTasks();
    if (view === 'myTasks') initMyTasksView();
}

// 构建任务清单
function renderTaskList(tasks, elementId) {
    const taskList = document.getElementById(elementId);
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? `task-item priority-${task.task_priority} fade-in completed` : `task-item priority-${task.task_priority} fade-in`;

        // 获取类别图标
        const categoryIcons = {
            work: 'briefcase',
            deepverve: 'briefcase',
            deeptodos: 'briefcase',
            personal: 'user',
            shopping: 'shopping-cart',
            health: 'heartbeat',
            education: 'graduation-cap'
        };

        const categoryNames = {
            work: '工作',
            deepverve: 'DeepVerve',
            deeptodos: 'DppeTodos',
            personal: '个人',
            shopping: '购物',
            health: '健康',
            education: '学习'
        };

        li.innerHTML = `
                        <input class="task-checkbox" type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask('${task.task_uuid}', this)"></div>
                        <div class="task-content">
                            <div class="task-title">${task.task}</div>
                            <div class="task-meta">
                                <span class="task-category"><i class="fas fa-${categoryIcons[task.task_category]}"></i> ${categoryNames[task.task_category]}</span>
                                <span><i class="far fa-clock"></i> 00:00</span>
                            </div>                        
                        </div>
                        <div class="task-actions">
                            <button class="edit-btn" onclick="editTask('${task.task_uuid}')"><i class="fas fa-edit"></i></button>
                            <button class="delete-btn" onclick="deleteTask('${task.task_uuid}')"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    `;
        taskList.appendChild(li);
    });
    renderCharts();
}

// ---------------------- 日视图逻辑 ----------------------
// 加载当前日期任务列表
function loadCurrentDayTasks() {
    currentDate = document.getElementById('datePicker').value;
    fetch(`/api/tasks?date=${currentDate}`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'currentDayTaskList'));
}

// 变更日期
function changeDate(offset) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    currentDate = date.toISOString().split('T')[0];
    document.getElementById('datePicker').value = currentDate;
    loadCurrentDayTasks();
}

// 返回当前日期任务清单
function returnCurrentDateTasks() {
    currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('datePicker').value = currentDate;
    fetch(`/api/tasks?date=${currentDate}`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'currentDayTaskList'));
}

// 初始化我的任务视图
function initMyTasksView() {
    loadAllUnfinishedTasks();
    loadAllFinishedTasks();
}

// 获取全部未完成任务
function loadAllUnfinishedTasks() {
    fetch(`/api/allUnfinishedTasks`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'allUnfinishedTasksList'));
}

// 获取全部已完成任务
function loadAllFinishedTasks() {
    fetch(`/api/allFinishedTasks`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'allFinishedTasksList'));
}

// 添加任务
function addTask() {
    const input_task = document.getElementById('taskInput');
    const taskText = input_task.value.trim();
    const input_task_priority = document.getElementById('taskPriority');
    const input_task_category = document.getElementById('taskCategory');

    if (!taskText) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: taskText,
            task_priority: input_task_priority.value,
            task_category: input_task_category.value,
            date: currentDate
        })
    }).then(() => {
        input_task.value = '';
        if (currentView === 'day') loadCurrentDayTasks();
        renderCharts();
    });
}

// 添加全局任务
function addGlobalTask() {
    const input = document.getElementById('globalTaskInput');
    const taskText = input.value.trim();
    const input_task_priority = document.getElementById('taskPriority');
    const input_task_category = document.getElementById('taskCategory');
    const currentDateGlobal = new Date().toISOString().split('T')[0];

    if (!taskText) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: taskText,
            task_priority: input_task_priority.value,
            task_category: input_task_category.value,
            date: currentDateGlobal
        })
    }).then(() => {
        input.value = '';
        if (currentView === 'myTasks') initMyTasksView();
        renderCharts();
    });
}

// 任务切换
function toggleTask(task_uuid, checkbox) {
    const taskItem = checkbox.closest('.task-item');
    const taskText = taskItem.querySelector('.task-title');

    if (checkbox.checked) {
        taskItem.classList.add('completed');
        taskText.style.textDecoration = 'line-through';
        taskText.style.color = 'rgba(255, 255, 255, 0.7)';
    } else {
        taskItem.classList.remove('completed');
        taskText.style.textDecoration = 'none';
        taskText.style.color = '#fff';
    }

    fetch(`/api/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_uuid: task_uuid,
            completed: checkbox.checked
        })
    }).then(() => {
        if (currentView === 'day') loadCurrentDayTasks();
        if (currentView === 'myTasks') initMyTasksView();
        renderCharts();
    });
}

// 删除任务
function deleteTask(task_uuid) {
    fetch(`/api/tasks`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_uuid: task_uuid
        })
    }).then(() => {
        if (currentView === 'day') loadCurrentDayTasks();
        if (currentView === 'myTasks') initMyTasksView();
    });
}
