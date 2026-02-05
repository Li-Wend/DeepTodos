<template>
    <div id="button" class="stroke-wrapper-button" v-if="buttonConfig">
        <div :class="buttonConfig.className">
            <p id="paragraph" class="Pixso-paragraph">
                {{ buttonConfig.text }}
            </p>
        </div>
        <div class="stroke-button"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
    Function: { type: String }
});

// 配置化管理按钮属性，便于维护和扩展[6](@ref)
const buttonConfigMap = {
    AllTasks: { text: '全部', className: 'Pixso-symbol-button-all-tasks' },
    InprogressTasks: { text: '进行中', className: 'Pixso-symbol-button-jade-green' },
    CompletedTasks: { text: '已完成', className: 'Pixso-symbol-button-jade-green' },
    MarkAllCompleted: { text: '全部标为完成', className: 'Pixso-symbol-button-luminous-yellow' },
    ClearCompleted: { text: '清除已完成', className: 'Pixso-symbol-button-luminous-yellow' }
} as const;

// 使用计算属性优化性能，依赖变化时自动更新[1,2](@ref)
const buttonConfig = computed(() => {
    return props.Function ? buttonConfigMap[props.Function as keyof typeof buttonConfigMap] : null;
});
</script>

<style lang="scss" scoped>
// 提取公共样式，避免重复定义[6](@ref)
%button-base-style {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
    border: $border-base;
}

.Pixso-symbol-button-all-tasks {
    @extend %button-base-style;
    background-color: $bright-pink;
}

.Pixso-symbol-button-jade-green {
    @extend %button-base-style;
    background-color: $pure-white;

    &:hover {
        background-color: $jade-green;
    }
}

.Pixso-symbol-button-luminous-yellow {
    @extend %button-base-style;
    background-color: $pure-white;

    &:hover {
        background-color: $luminous-yellow;
    }
}

.stroke-wrapper-button {
    width: 172px;
    height: 50px;
    display: flex;
}

.stroke-button {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    pointer-events: none;
    border: $border-base;
}

.Pixso-paragraph {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    @include global-font-main_body();
}
</style>