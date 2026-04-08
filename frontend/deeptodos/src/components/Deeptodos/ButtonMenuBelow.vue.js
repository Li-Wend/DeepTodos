const props = defineProps({
    Switch: { type: String },
});
function handleClick() {
    // 触发清除全部事件，父组件监听后执行相应逻辑
    console.log('clearAll');
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.Switch === 'Off') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "button_off",
        ...{ class: "stroke-wrapper-button_off" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-wrapper-button_off']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "Pixso-symbol-button_off" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-button_off']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "text",
        ...{ class: "Pixso-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "text_0",
        ...{ class: "Pixso-paragraph-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: "text_0_1",
        ...{ class: "Pixso-span-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-span-text']} */ ;
    ('快');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "text_1",
        ...{ class: "Pixso-paragraph-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: "text_1_1",
        ...{ class: "Pixso-span-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-span-text']} */ ;
    ('捷');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "text_2",
        ...{ class: "Pixso-paragraph-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: "text_2_1",
        ...{ class: "Pixso-span-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-span-text']} */ ;
    ('操');
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "text_3",
        ...{ class: "Pixso-paragraph-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: "text_3_1",
        ...{ class: "Pixso-span-text" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-span-text']} */ ;
    ('作');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stroke-button_off" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-button_off']} */ ;
}
if (__VLS_ctx.Switch === 'ClearAll') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleClick) },
        id: "button_clear_all",
        ...{ class: "stroke-wrapper-button_clear_all" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-wrapper-button_clear_all']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "Pixso-symbol-button_clear_all" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-button_clear_all']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    ('清除全部');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stroke-button_clear_all" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-button_clear_all']} */ ;
}
// @ts-ignore
[Switch, Switch, handleClick,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        Switch: { type: String },
    },
});
export default {};
