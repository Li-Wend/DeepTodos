import { computed } from 'vue';
const props = defineProps();
const emit = defineEmits();
// 配置化管理按钮属性，便于维护和扩展[6](@ref)
const buttonConfigMap = {
    AllTasks: { text: '全部', className: 'Pixso-symbol-button-all-tasks' },
    InprogressTasks: {
        text: '进行中',
        className: 'Pixso-symbol-button-jade-green',
    },
    CompletedTasks: {
        text: '已完成',
        className: 'Pixso-symbol-button-jade-green',
    },
    MarkAllCompleted: {
        text: '全部标为完成',
        className: 'Pixso-symbol-button-luminous-yellow',
    },
    ClearCompleted: {
        text: '清除已完成',
        className: 'Pixso-symbol-button-luminous-yellow',
    },
};
// 使用计算属性优化性能，依赖变化时自动更新[1,2](@ref)
const buttonConfig = computed(() => {
    return props.Function
        ? buttonConfigMap[props.Function]
        : null;
});
// 处理点击事件，根据不同的Function执行不同的方法[1,2](@ref)
const handleClick = () => {
    if (!props.Function)
        return;
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
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.buttonConfig) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        ...{ class: (['stroke-wrapper-button', __VLS_ctx.buttonConfig.className]) },
        type: "button",
    });
    /** @type {__VLS_StyleScopedClasses['stroke-wrapper-button']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "button-content" },
    });
    /** @type {__VLS_StyleScopedClasses['button-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    (__VLS_ctx.buttonConfig.text);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stroke-button" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-button']} */ ;
}
// @ts-ignore
[buttonConfig, buttonConfig, buttonConfig, handleClick,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
