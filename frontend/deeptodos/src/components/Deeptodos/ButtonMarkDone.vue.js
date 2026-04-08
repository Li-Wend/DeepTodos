function handleClick() {
    // 在这里处理全部标为完成的逻辑，例如将所有待办事项的状态更新为完成
    console.log('全部标为完成按钮被点击');
    // 你可以在这里调用一个方法来更新待办事项列表中的所有项的状态
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    id: "btn_mark_all_completed",
    ...{ class: "stroke-wrapper-btn_mark_all_completed" },
});
/** @type {__VLS_StyleScopedClasses['stroke-wrapper-btn_mark_all_completed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "Pixso-frame-btn_mark_all_completed" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-frame-btn_mark_all_completed']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    id: "mark_all_completed",
    ...{ class: "Pixso-paragraph-mark_all_completed" },
});
/** @type {__VLS_StyleScopedClasses['Pixso-paragraph-mark_all_completed']} */ ;
('全部标为完成');
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "stroke-btn_mark_all_completed" },
});
/** @type {__VLS_StyleScopedClasses['stroke-btn_mark_all_completed']} */ ;
// @ts-ignore
[handleClick,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
