/*
    默认加载入口文件
*/

// 状态管理
let currentView = 'day';
let currentDate = new Date().toISOString().split('T')[0];
let currentWeekStart;
let currentLang = 'zh'; // 默认语言


// 初始化日视图
document.getElementById('datePicker').value = currentDate;

// ---------- 通用函数 ----------
function renderTaskList(tasks, elementId) {
    const taskList = document.getElementById(elementId);
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
                    <div class="task-content">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}
                               onchange="toggleTask('${task.task_uuid}', this.checked)">
                        <span>${task.task}</span>
                    </div>
                    <button class="comment-btn" onclick="addTaskNotes('${task.task_uuid}')">备注</button>
                    <button class="delete-btn" onclick="deleteTask('${task.task_uuid}')">删除</button>
                `;
        taskList.appendChild(li);
    });
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
    const response = await fetch(`/api/get_session?session_item=username`);
    if(!response.ok) {
        alert("获取用户登录信息失败！");
        window.location.href='login';
    }
    const username = await response.json();
    document.getElementById("username").innerHTML = username;
}

// ---------- 日视图逻辑 ----------
function loadTasks() {
    currentDate = document.getElementById('datePicker').value;
    fetch(`/api/tasks?date=${currentDate}`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'taskList'));
}

function changeDate(offset) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + offset);
    currentDate = date.toISOString().split('T')[0];
    document.getElementById('datePicker').value = currentDate;
    loadTasks();
}

function returnCurrentDateTasks() {
    currentDate = new Date().toISOString().split('T')[0];
    document.getElementById('datePicker').value = currentDate;
    fetch(`/api/tasks?date=${currentDate}`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'taskList'));
}

// ---------- 全部未完成任务视图逻辑 ------------
function initAllUnfinishedTasksView() {
    loadAllUnfinishedTasks();
}

function loadAllUnfinishedTasks() {
    fetch(`/api/allUnfinishedTasks`)
        .then(response => response.json())
        .then(tasks => renderTaskList(tasks, 'allUnfinishedTaskList'));
}


// ---------- 通用操作 ----------
function switchView(view) {
    currentView = view;
    document.getElementById('dayView').style.display = view === 'day' ? 'block' : 'none';
    document.getElementById('allUnfinishedTasksView').style.display = view === 'allUnfinishedTasks' ? 'block' : 'none';
    if (view === 'day') loadTasks();
    if (view === 'allUnfinishedTasks') initAllUnfinishedTasksView();
}

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (!taskText) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: taskText,
            date: currentDate
        })
    }).then(() => {
        input.value = '';
        if (currentView === 'day') loadTasks();
    });
}

function toggleTask(task_uuid, completed) {
    fetch(`/api/tasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_uuid: task_uuid,
            completed: completed
        })
    }).then(() => {
        if (currentView === 'day') loadTasks();
        if (currentView === 'allUnfinishedTasks') loadAllUnfinishedTasks();
    });
}

function deleteTask(task_uuid) {
    fetch(`/api/tasks`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task_uuid: task_uuid
        })
    }).then(() => {
        if (currentView === 'day') loadTasks();
        if (currentView === 'allUnfinishedTasks') loadAllUnfinishedTasks();
    });
}

// 初始化任务列表
document.addEventListener('DOMContentLoaded', loadTasks);

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
    window.location.href='changePassword';
}

// 注销登陆 (删除 session) 并重定向到 login 页面
async function logout(){
    const response = await fetch(`/api/logout`);
    if(response.ok) {
        // 跳转到 login 页面
        window.location.href='login';
    }
}