<template>
  <div class="not-found-container">
    <h1>页面未找到 (404)</h1>
    <p>您访问的路径不存在。</p>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<script setup lang="ts">
  definePage({
    meta: {
      layout: false // 该页面不使用任何布局
    }
  })
</script>