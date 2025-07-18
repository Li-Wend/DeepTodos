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
    const response = await fetch(`/api/get_session?session_item=username`);
    if (!response.ok) {
        alert("获取用户登录信息失败！");
        window.location.href = 'login';
    }
    const username = await response.json();
    document.getElementById("username").innerHTML = username;
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

// 注销登陆 (删除 session) 并重定向到 login 页面
async function logout() {
    const response = await fetch(`/api/logout`);
    if (response.ok) {
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
        li.className = task.completed ? 'task-item fade-in completed' : 'task-item fade-in';
        // 优先级颜色
        let priorityColor = 'var(--primary)';
        let priorityText = '中';
        if (task.task_priority === 'low') {
            priorityColor = 'var(--success)';
            priorityText = '低';
        } else if (task.task_priority === 'high') {
            priorityColor = 'var(--danger)';
            priorityText = '高'
        }

        li.innerHTML = `
                        <input type="checkbox" ${task.completed ? 'checked' : ''}
                               onchange="toggleTask('${task.task_uuid}', this)">
                        <div class="task-text">${task.task}</div>
                        <span style="color: ${priorityColor}"><i class="fas fa-flag"> ${priorityText}</i></span>
                        <div class="task-actions">
                            <button class="edit-btn" onclick="editTask('${task.task_uuid}')"><i class="fas fa-pencil"></i></button>
                            <button class="delete-btn" onclick="deleteTask('${task.task_uuid}')"><i class="fas fa-trash"></i></button>
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
    if (!taskText) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: taskText,
            date: currentDate,
            task_priority: input_task_priority.value
        })
    }).then(() => {
        input_task.value = '';
        //input_task_priority.value = 'medium';
        if (currentView === 'day') loadCurrentDayTasks();
        renderCharts();

        // // 添加动画 taskItem missing
        // setTimeout(() => {
        //     taskItem.style.opacity = '1';
        //     taskItem.style.transform = 'translateY(0)';
        // }, 10);
    });
}

// 添加全局任务
function addGlobalTask() {
    const input = document.getElementById('globalTaskInput');
    const taskText = input.value.trim();
    const currentDateGlobal = new Date().toISOString().split('T')[0];
    if (!taskText) return;

    fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            task: taskText,
            date: currentDateGlobal
        })
    }).then(() => {
        input.value = '';
        if (currentView === 'myTasks') initMyTasksView();
        renderCharts();

        // // 添加动画 taskItem missing
        // setTimeout(() => {
        //     taskItem.style.opacity = '1';
        //     taskItem.style.transform = 'translateY(0)';
        // }, 10);
    });
}

// 任务切换
function toggleTask(task_uuid, checkbox) {
    const taskItem = checkbox.closest('.task-item');
    const taskText = taskItem.querySelector('.task-text');

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

// 渲染统计图表
function renderCharts() {
    // 日视图统计
    const dayTasks = document.querySelectorAll('#dayView .task-item');
    const completedDayTasks = document.querySelectorAll('#dayView .task-item.completed').length;

    // 总体统计
    const allTasks = document.querySelectorAll('.task-item');
    const completedTasks = document.querySelectorAll('.task-item.completed').length;

    // 日视图图表
    const dailyCtx = document.getElementById('dailyStatsChart').getContext('2d');
    if (window.dailyChart) window.dailyChart.destroy();
    window.dailyChart = new Chart(dailyCtx, {
        type: 'doughnut',
        data: {
            labels: ['已完成', '未完成'],
            datasets: [{
                data: [completedDayTasks, dayTasks.length - completedDayTasks],
                backgroundColor: ['#0be881', '#4bcffa'],
                borderColor: ['rgba(255, 255, 255, 0.1)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 50, 110, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#e0e0ff',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 12
                }
            }
        }
    });

    // 总体视图图表
    const overallCtx = document.getElementById('overallStatsChart').getContext('2d');
    if (window.overallChart) window.overallChart.destroy();
    window.overallChart = new Chart(overallCtx, {
        type: 'bar',
        data: {
            labels: ['任务统计'],
            datasets: [
                {
                    label: '已完成',
                    data: [completedTasks],
                    backgroundColor: '#0be881',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                },
                {
                    label: '未完成',
                    data: [allTasks.length - completedTasks],
                    backgroundColor: '#4bcffa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: '#fff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        color: '#fff',
                        stepSize: 1
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            size: 14
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(30, 50, 110, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#e0e0ff',
                    titleFont: {
                        size: 16
                    },
                    bodyFont: {
                        size: 14
                    },
                    padding: 12
                }
            }
        }
    });
}