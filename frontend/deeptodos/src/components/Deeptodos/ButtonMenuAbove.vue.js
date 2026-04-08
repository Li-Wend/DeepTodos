const props = defineProps({
    Switch: { type: String },
});
// 定义组件触发的事件
const __VLS_emit = defineEmits(['switch']);
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
        id: "button_switch_off",
        ...{ class: "stroke-wrapper-button_switch_off" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-wrapper-button_switch_off']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "Pixso-symbol-button_switch_off" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-button_switch_off']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    ('关');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stroke-button_switch_off" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-button_switch_off']} */ ;
}
if (__VLS_ctx.Switch === 'On') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.Switch === 'On'))
                    return;
                __VLS_ctx.$emit('switch');
                // @ts-ignore
                [Switch, Switch, $emit,];
            } },
        id: "button_switch_on",
        ...{ class: "stroke-wrapper-button_switch_on" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-wrapper-button_switch_on']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "Pixso-symbol-button_switch_on" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-button_switch_on']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    ('开 🔆');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "stroke-button_switch_on" },
    });
    /** @type {__VLS_StyleScopedClasses['stroke-button_switch_on']} */ ;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    emits: {},
    props: {
        Switch: { type: String },
    },
});
export default {};
