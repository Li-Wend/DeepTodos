import { apiClient } from '../api'
import {
  completeTaskDeeptodosCompleteTaskTaskIdPost,
  createTaskDeeptodosCreateTaskPost,
  deleteTaskDeeptodosDeleteTaskTaskIdDelete,
  readCategoriesDeeptodosReadCategoriesGet,
  readTaskDeeptodosReadTaskTaskIdGet,
  readTasksDeeptodosReadTasksGet,
  readTasksSummaryDeeptodosReadTasksSummaryGet,
  updateTaskDeeptodosUpdateTaskTaskIdPatch,
} from '../../client'
import type { TaskCreate, TaskUpdate } from '../../client'

export const deeptodosService = {
  createTask(body: TaskCreate) {
    return createTaskDeeptodosCreateTaskPost({
      body,
      client: apiClient,
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  readTasks() {
    return readTasksDeeptodosReadTasksGet({
      client: apiClient,
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  readTasksSummary() {
    return readTasksSummaryDeeptodosReadTasksSummaryGet({
      client: apiClient,
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  readCategories() {
    return readCategoriesDeeptodosReadCategoriesGet({
      client: apiClient,
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  readTask(taskId: string) {
    return readTaskDeeptodosReadTaskTaskIdGet({
      client: apiClient,
      path: { task_id: taskId },
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  updateTask(taskId: string, body: TaskUpdate) {
    return updateTaskDeeptodosUpdateTaskTaskIdPatch({
      client: apiClient,
      path: { task_id: taskId },
      body,
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  deleteTask(taskId: string) {
    return deleteTaskDeeptodosDeleteTaskTaskIdDelete({
      client: apiClient,
      path: { task_id: taskId },
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
  completeTask(taskId: string) {
    return completeTaskDeeptodosCompleteTaskTaskIdPost({
      client: apiClient,
      path: { task_id: taskId },
      onRequest: undefined,
      onSseError: undefined,
      onSseEvent: undefined,
      sseDefaultRetryDelay: undefined,
      sseMaxRetryAttempts: undefined,
      sseMaxRetryDelay: undefined,
    })
  },
}
