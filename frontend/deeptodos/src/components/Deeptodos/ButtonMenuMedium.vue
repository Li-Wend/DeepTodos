<template>
    <button 
        v-if="buttonConfig"
        :class="['stroke-wrapper-button', buttonConfig.className]"
        @click="handleClick"
        type="button"
    >
        <div class="button-content">
            <p id="paragraph" class="Pixso-paragraph">
                {{ buttonConfig.text }}
            </p>
        </div>
        <div class="stroke-button"></div>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// 定义props类型
interface ButtonProps {
    Function: string;
}

const props = defineProps<ButtonProps>();

// 定义emit事件类型
const emit = defineEmits<{
    allTasks: [];
    inprogressTasks: [];
    completedTasks: [];
    markAllCompleted: [];
    clearCompleted: [];
}>();

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

// 处理点击事件，根据不同的Function执行不同的方法[1,2](@ref)
const handleClick = () => {
    if (!props.Function) return;

    switch (props.Function) {
        case 'AllTasks':
            handleAllTasks();
            break;
        case 'InprogressTasks':
            handleInprogressTasks();
            break;
        case 'CompletedTasks':
            handleCompletedTasks();
            break;
        case 'MarkAllCompleted':
            handleMarkAllCompleted();
            break;
        case 'ClearCompleted':
            handleClearCompleted();
            break;
        default:
            console.warn(`未知的Function类型: ${props.Function}`);
    }
};

// 具体的事件处理方法[1](@ref)
const handleAllTasks = () => {
    console.log('执行全部任务逻辑');
    emit('allTasks');
};

const handleInprogressTasks = () => {
    console.log('执行进行中任务逻辑');
    emit('inprogressTasks');
};

const handleCompletedTasks = () => {
    console.log('执行已完成任务逻辑');
    emit('completedTasks');
};

const handleMarkAllCompleted = () => {
    console.log('执行全部标为完成逻辑');
    emit('markAllCompleted');
};

const handleClearCompleted = () => {
    console.log('执行清除已完成逻辑');
    emit('clearCompleted');
};
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
    cursor: pointer;
    outline: none;
    
    // 重置button默认样式
    background: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
}

// 按钮容器样式
.stroke-wrapper-button {
    width: 172px;
    height: 50px;
    display: flex;
    position: relative;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    
    // 移除button默认样式
    appearance: none;
    -webkit-appearance: none;
}

.Pixso-symbol-button-all-tasks {
    @extend %button-base-style;
    background-color: $bright-pink;
    
    &:hover {
        background-color: $bright-pink-hover;
    }
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

.button-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin: 0;
    pointer-events: none;
}

</style>