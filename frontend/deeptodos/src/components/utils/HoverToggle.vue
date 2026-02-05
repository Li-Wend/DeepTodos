<!-- 使用方法：在父组件中使用 <HoverToggle /> 标签包裹触发元素和内容元素 -->
<!-- <template>
  <HoverToggle>
    <template v-slot:trigger>
      <button>悬停查看详情</button>
    </template>
    <template v-slot:content>
      <YourComponent /> 
    </template>
  </HoverToggle>
</template> -->

<template>
    <div class="hover-wrapper">
        <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
            <!-- 插槽用于放置触发元素 -->
            <slot v-if="!isVisible" name="trigger"></slot>
            <div v-show="isVisible" class="content-wrapper">
                <!-- 插槽用于放置悬停时显示的内容 -->
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        handleMouseEnter() {
            this.isVisible = true;
        },
        handleMouseLeave() {
            this.isVisible = false;
        }
    }
}
</script>

<style lang="scss" scoped>
.hover-wrapper {
    position: relative;
    display: inline-block;
}
</style>