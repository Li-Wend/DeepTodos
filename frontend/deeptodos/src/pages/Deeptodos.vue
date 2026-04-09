<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="todo_header" class="Pixso-frame-todo_header">
    <div id="icon_container" class="Pixso-frame-icon_container">
      <div id="icon_rhombus_left" class="Pixso-frame-icon_rhombus_left">
        <div id="rhombus_1_container" class="Pixso-frame-rhombus_1_container">
          <IconRhombus />
        </div>
        <div id="rhombus_2_container" class="Pixso-frame-rhombus_2_container">
          <IconRhombus />
        </div>
      </div>
      <div id="deeptodos_container" class="Pixso-frame-deeptodos_container">
        <IconDeeptodos />
      </div>
      <div id="rhombus_3_container" class="Pixso-frame-rhombus_3_container">
        <IconRhombus />
      </div>
    </div>
  </div>
  <div id="input_container" class="Pixso-frame-input_container">
    <InputTask @create="createTask" />
  </div>
  <div id="todo_body" class="Pixso-frame-todo_body">
    <div id="task_list_container" class="Pixso-frame-task_list_container">
      <TaskList :tasks="filteredTasks" @read="readTask" @complete="completeTask" @uncomplete="uncompleteTask"
        @delete="deleteTask" @mark-all-completed="markAllCompleted" />
    </div>
    <div id="button_menu_container" class="Pixso-frame-button_menu_container">
      <ButtonSwitch @all-tasks="showAllTasks" @inprogress-tasks="showInprogressTasks"
        @completed-tasks="showCompletedTasks" @mark-all-completed="markAllCompleted" @clear-completed="clearCompleted"
        @clear-all="clearAll" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { deeptodosService } from '@/services'
import type { Task } from '@/client'

const tasks = ref<Task[]>([])
const taskFilter = ref<'all' | 'inprogress' | 'completed'>('all')

// 计算属性：根据过滤状态返回相应的任务列表
const filteredTasks = computed(() => {
  if (taskFilter.value === 'inprogress') {
    return tasks.value.filter(task => !task.is_completed)
  } else if (taskFilter.value === 'completed') {
    return tasks.value.filter(task => task.is_completed)
  }
  return tasks.value
})

const loadTasks = async () => {
  try {
    const response = (await deeptodosService.readTasks()) as { data: Task[] }
    // 排序：未完成任务在前面，已完成任务在后面
    tasks.value = (response.data || []).sort((a, b) => Number(a.is_completed) - Number(b.is_completed))
  } catch (error) {
    console.error('Failed to load tasks:', error)
  }
}

const createTask = async (title: string) => {
  try {
    const body = {
      title,
      description: '',
      priority: 2,
      category: '默认',
    }
    await deeptodosService.createTask(body)
    await loadTasks() // 重新加载任务列表
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

// const updateTask = async (taskId: string, updates: Partial<Task>) => {
//   try {
//     await deeptodosService.updateTask(taskId, updates)
//     await loadTasks()
//   } catch (error) {
//     console.error('Failed to update task:', error)
//   }
// }

const completeTask = async (taskId: string) => {
  try {
    await deeptodosService.updateTask(taskId, { is_completed: true })
    await loadTasks()
  } catch (error) {
    console.error('Failed to complete task:', error)
  }
}

const deleteTask = async (taskId: string) => {
  try {
    await deeptodosService.deleteTask(taskId)
    await loadTasks()
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

const uncompleteTask = async (taskId: string) => {
  try {
    await deeptodosService.updateTask(taskId, { is_completed: false })
    await loadTasks()
  } catch (error) {
    console.error('Failed to uncomplete task:', error)
  }
}

const markAllCompleted = async () => {
  try {
    // 获取所有未完成的任务
    const incompleteTasks = tasks.value.filter(task => !task.is_completed)
    // 逐个完成任务
    for (const task of incompleteTasks) {
      await deeptodosService.updateTask(task.id, { is_completed: true })
    }
    await loadTasks()
  } catch (error) {
    console.error('Failed to mark all tasks as completed:', error)
  }
}

const clearCompleted = async () => {
  try {
    // 获取所有已完成的任务
    const completedTasks = tasks.value.filter(task => task.is_completed)
    // 逐个删除任务
    for (const task of completedTasks) {
      await deeptodosService.deleteTask(task.id)
    }
    await loadTasks()
  } catch (error) {
    console.error('Failed to clear completed tasks:', error)
  }
}

const showAllTasks = () => {
  taskFilter.value = 'all'
}

const showInprogressTasks = () => {
  taskFilter.value = 'inprogress'
}

const showCompletedTasks = () => {
  taskFilter.value = 'completed'
}

const clearAll = async () => {
  try {
    // 删除所有任务
    for (const task of tasks.value) {
      await deeptodosService.deleteTask(task.id)
    }
    await loadTasks()
  } catch (error) {
    console.error('Failed to clear all tasks:', error)
  }
}

const readTask = async (taskId: string) => {
  try {
    const response = await deeptodosService.readTask(taskId)
    console.log('Task details:', response)
    // 可以显示详情或导航到详情页
  } catch (error) {
    console.error('Failed to read task:', error)
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<style lang="scss" scoped>
.Pixso-frame-todo_header {
  width: 1440px;
  height: 123px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 21px 412.8578796386719px 21px 412.8578796386719px;
}

.Pixso-frame-icon_container {
  width: 614.2842407226562px;
  height: 81px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: 92px;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-icon_rhombus_left {
  width: 52.284263610839844px;
  height: 14.142131805419922px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: 24px;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-rhombus_1_container {
  width: 9.999998092651367px;
  height: 9.999998092651367px;
  position: relative;
  flex-shrink: 0;
  transform: rotate(-45deg);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-rhombus_2_container {
  width: 9.999998092651367px;
  height: 9.999998092651367px;
  position: relative;
  flex-shrink: 0;
  transform: rotate(-45deg);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-deeptodos_container {
  width: 363.85784912109375px;
  height: 81px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-rhombus_3_container {
  width: 9.999998092651367px;
  height: 9.999998092651367px;
  position: relative;
  flex-shrink: 0;
  transform: rotate(-45deg);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.Pixso-frame-input_container {
  width: 1440px;
  height: 114px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 21px 0px 21px 0px;
}

.Pixso-frame-todo_body {
  width: 1440px;
  height: auto;
  /* 改为 auto，让内容扩展 */
  // position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.Pixso-frame-task_list_container {
  width: 1139px;
  height: auto;
  /* 改为 auto，让任务列表扩展 */
  // position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 21px 0px 21px 0px;
}

.Pixso-frame-button_menu_container {
  width: 301px;
  height: 642px;
  // position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 21px 42px 21px 42px;
}
</style>
