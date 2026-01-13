import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 使用 RouteRecordRaw 类型注解，使路由对象获得类型检查
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Todo',
    component: () => import(/* webpackChunkName: "todo" */ '../views/Todo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;