<template>
  <div class="api-test-page">
    <h1>Deeptodos API 测试</h1>
    <section>
      <button @click="loadTasks">读取任务列表</button>
      <button @click="loadSummary">读取任务汇总</button>
      <button @click="loadCategories">读取分类</button>
      <button @click="createNewTask">创建测试任务</button>
      <button @click="readCreatedTask" :disabled="!createdTaskId">读取创建任务</button>
      <button @click="updateCreatedTask" :disabled="!createdTaskId">更新创建任务</button>
      <button @click="completeCreatedTask" :disabled="!createdTaskId">完成创建任务</button>
      <button @click="deleteCreatedTask" :disabled="!createdTaskId">删除创建任务</button>
    </section>

    <section class="result">
      <h2>结果</h2>
      <pre>{{ formattedResult }}</pre>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { deeptodosService } from '@/services'
  import type { Task } from '@/client'

  const result = ref('尚未调用接口')
  const createdTaskId = ref<string | null>(null)

  const setResult = (value: unknown) => {
    if (typeof value === 'string') {
      result.value = value
    } else {
      result.value = JSON.stringify(value, null, 2)
    }
  }

  const loadTasks = async () => {
    setResult('读取中...')
    const response = (await deeptodosService.readTasks()) as { data: Task[] }
    setResult(response)
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      createdTaskId.value = response.data[0].id
    }
  }

  const loadSummary = async () => {
    setResult('读取中...')
    const response = await deeptodosService.readTasksSummary()
    setResult(response)
  }

  const loadCategories = async () => {
    setResult('读取中...')
    const response = await deeptodosService.readCategories()
    setResult(response)
  }

  const createNewTask = async () => {
    setResult('创建中...')
    const body = {
      title: `测试任务 ${Date.now()}`,
      description: '这是来自前端测试组件的任务',
      priority: 2,
      category: '测试',
    }
    const response = (await deeptodosService.createTask(body)) as { data: Task }
    setResult(response)
    if (response.data) {
      createdTaskId.value = response.data.id
    }
  }

  const readCreatedTask = async () => {
    if (!createdTaskId.value) {
      setResult('请先创建任务或读取并设置任务 ID')
      return
    }
    setResult('读取中...')
    const response = await deeptodosService.readTask(createdTaskId.value)
    setResult(response)
  }

  const updateCreatedTask = async () => {
    if (!createdTaskId.value) {
      setResult('请先创建任务或读取并设置任务 ID')
      return
    }
    setResult('更新中...')
    const body = {
      title: '已更新测试任务',
      description: '前端测试页面更新描述',
      priority: 3,
    }
    const response = await deeptodosService.updateTask(createdTaskId.value, body)
    setResult(response)
  }

  const completeCreatedTask = async () => {
    if (!createdTaskId.value) {
      setResult('请先创建任务或读取并设置任务 ID')
      return
    }
    setResult('完成中...')
    const response = await deeptodosService.completeTask(createdTaskId.value)
    setResult(response)
  }

  const deleteCreatedTask = async () => {
    if (!createdTaskId.value) {
      setResult('请先创建任务或读取并设置任务 ID')
      return
    }
    setResult('删除中...')
    const response = await deeptodosService.deleteTask(createdTaskId.value)
    setResult(response)
    createdTaskId.value = null
  }

  const formattedResult = computed(() => result.value)
</script>

<style scoped>
  .api-test-page {
    max-width: 920px;
    margin: 24px auto;
    padding: 18px;
    border: 1px solid #ddd;
    border-radius: 14px;
    background: #fff;
  }

  button {
    margin: 6px 8px 6px 0;
    padding: 10px 16px;
    border-radius: 8px;
    border: 1px solid #999;
    background: #f8f8f8;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .result pre {
    white-space: pre-wrap;
    word-break: break-word;
    background: #f5f7fb;
    padding: 14px;
    border-radius: 12px;
    min-height: 260px;
    margin-top: 12px;
  }
</style>
