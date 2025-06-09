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
function renderTaskList(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
                    <div class="task-content">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}
                               onchange="toggleTask(${task.id}, this.checked)">
                        <span>${task.task}</span>
                    </div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">删除</button>
                `;
        taskList.appendChild(li);
    });
}


// ---------- 日视图逻辑 ----------
function loadTasks() {
    currentDate = document.getElementById('datePicker').value;
    fetch(`/api/tasks?date=${currentDate}`)
        .then(response => response.json())
        .then(renderTaskList);
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
        .then(renderTaskList);
}


// ---------- 周视图逻辑 ----------
function initWeekView() {
    const today = new Date(currentDate);
    currentWeekStart = getMonday(today);
    renderWeekView();
}

function getMonday(date) {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function renderWeekView() {
    const weekStart = new Date(currentWeekStart);
    const weekDays = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(weekStart);
        d.setDate(d.getDate() + i);
        return d.toISOString().split('T')[0];
    });

    fetch(`/api/tasks/week?start=${weekDays[0]}&end=${weekDays[6]}`)
        .then(res => res.json())
        .then(stats => {
            const weekGrid = document.querySelector('.week-grid');
            weekGrid.innerHTML = '';

            weekDays.forEach(date => {
                const dayStats = stats[date] || { total: 0, completed: 0 };
                const day = new Date(date);

                const card = document.createElement('div');
                card.className = 'day-card';
                card.innerHTML = `
                            <div class="day-header">
                                ${day.toLocaleDateString('zh-CN', { weekday: 'short' })}
                                <br>
                                ${date.split('-')[2]}
                            </div>
                            <div class="task-progress">
                                ✅ ${dayStats.completed} / 📝 ${dayStats.total}
                            </div>
                            <ul class="day-tasks"></ul>
                        `;

                fetch(`/api/tasks?date=${date}`)
                    .then(res => res.json())
                    .then(tasks => {
                        const list = card.querySelector('.day-tasks');
                        tasks.forEach(task => {
                            const li = document.createElement('li');
                            li.innerHTML = `<span class="${task.completed ? 'completed' : ''}">${task.task}</span>`;
                            list.appendChild(li);
                        });
                    });

                weekGrid.appendChild(card);
            });

            document.getElementById('weekRange').textContent =
                `${weekDays[0]} 至 ${weekDays[6]}`;
        });
}

function changeWeek(offset) {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + (offset * 7));
    currentWeekStart = date;
    renderWeekView();
}


// ---------- 全部未完成任务视图逻辑 ------------
function renderAllUnfinishedTaskList(allUnfinishedTasks) {
    const allUnfinishedTaskList = document.getElementById('allUnfinishedTaskList');
    allUnfinishedTaskList.innerHTML = '';
    allUnfinishedTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
                    <div class="task-content">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}
                               onchange="toggleTask(${task.id}, this.checked)">
                        <span>${task.task}</span>
                    </div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">删除</button> 
                `;
        allUnfinishedTaskList.appendChild(li);
    });
}

function loadAllUnfinishedTasks() {
    fetch(`/api/allUnfinishedTasks`)
        .then(response => response.json())
        .then(renderAllUnfinishedTaskList);
}


// ---------- 通用操作 ----------
function switchView(view) {
    currentView = view;
    document.getElementById('weekView').style.display = view === 'week' ? 'block' : 'none';
    document.getElementById('dayView').style.display = view === 'day' ? 'block' : 'none';
    document.getElementById('allUnfinishedTasksView').style.display = view === 'allUnfinishedTasks' ? 'block' : 'none';
    if (view === 'week') initWeekView();
}

// 加载统计结果
function loadStats() {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;

    if (!start || !end) {
        alert('请选择日期范围');
        return;
    }

    fetch(`/api/stats/range?start=${start}&end=${end}`)
        .then(response => response.json())
        .then(data => {
            const resultHTML = `
                <div class="stats-card">
                    <div class="stat-item">
                        <label>总任务数</label>
                        <span class="total">${data.total}</span>
                    </div>
                    <div class="stat-item">
                        <label>已完成</label>
                        <span class="completed">${data.completed}</span>
                    </div>
                    <div class="stat-item">
                        <label>完成率</label>
                        <span class="rate" style="color: ${getRateColor(data.completion_rate)};">
                            ${data.completion_rate}%
                        </span>
                    </div>
                    <div class="chart-placeholder"></div>
                </div>
            `;
            document.getElementById('statsResult').innerHTML = resultHTML;

            // 销毁旧图表
            if (window.statsChart) window.statsChart.destroy();

            // 创建新图表
            const ctx = document.querySelector('.chart-placeholder').getContext('2d');
            window.statsChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['已完成', '未完成'],
                    datasets: [{
                        data: [data.completed, data.total - data.completed],
                        backgroundColor: ['#4CAF50', '#ddd']
                    }]
                }
            });
        });
}

// 根据完成率返回颜色
function getRateColor(rate) {
    if (rate >= 80) return '#4CAF50';
    if (rate >= 50) return '#FFC107';
    return '#F44336';
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
        if (currentView === 'week') renderWeekView();
    });
}

function toggleTask(taskId, completed) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completed })
    }).then(() => {
        if (currentView === 'day') loadTasks();
        if (currentView === 'week') renderWeekView();
    });
}

function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, { method: 'DELETE' })
        .then(() => {
            if (currentView === 'day') loadTasks();
            if (currentView === 'week') renderWeekView();
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