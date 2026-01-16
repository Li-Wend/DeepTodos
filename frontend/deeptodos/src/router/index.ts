import { createRouter, createWebHistory } from 'vue-router';
// 从 unplugin-vue-router 导入自动生成的路由
import { routes, handleHotUpdate  } from 'vue-router/auto-routes';
// 从 vite-plugin-vue-layouts 导入布局设置函数
import { setupLayouts } from 'virtual:generated-layouts'


const router = createRouter({
  history: createWebHistory(),
  routes: setupLayouts([
    ...routes,
  ]) // 关键：用布局包装路由
});

if (import.meta.hot) {
  handleHotUpdate(router); // 开发时热更新路由
}

router.beforeEach((to, from, next) => {
  // 如果用户访问根路径 '/'，重定向
  if (to.path === '/') {
    next('/todo');
  } else {
    next();
  }
});  // 在这里可以添加全局路由守卫逻辑

export default router;