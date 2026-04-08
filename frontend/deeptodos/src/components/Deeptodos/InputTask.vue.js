import { ref } from 'vue';
// 使用ref声明响应式数据，并指定类型为string
const todoText = ref(''); // 初始值可以是空字符串，也可以是其他字符串
// TBD: 处理提交逻辑的函数...
function handleClick() {
    // 在这里处理提交逻辑，例如将todoText的值发送到服务器或添加到待办事项列表中
    console.log('提交的待办事项:', todoText.value);
    // 提交后可以清空输入框
    todoText.value = '';
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "input_submit",
    ...{ class: "Pixso-symbol-input_submit" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-symbol-input_submit']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "input",
    ...{ class: "Pixso-frame-input" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-frame-input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "p_input",
    ...{ class: "Pixso-paragraph-p_input" },
    type: "text",
    value: (__VLS_ctx.todoText),
    placeholder: "新增待办事项...",
});
/** @type {__VLS_StyleScopedClasses['Pixso-paragraph-p_input']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    id: "button_submit",
    ...{ class: "stroke-wrapper-button_submit" },
});
/** @type {__VLS_StyleScopedClasses['stroke-wrapper-button_submit']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "Pixso-frame-button_submit" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-frame-button_submit']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    id: "p_submit",
    ...{ class: "Pixso-paragraph-p_submit" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-paragraph-p_submit']} */ ;
('提交');
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stroke-button_submit" },
});
/** @type {__VLS_StyleScopedClasses['stroke-button_submit']} */ ;
// @ts-ignore
[todoText, handleClick,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
