const props = defineProps({
    Status: { type: String },
    taskDescription: { type: String },
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.Status === 'Pending') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "task_item_pending",
        ...{ class: "Pixso-symbol-task_item_pending" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-task_item_pending']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "task_item_container",
        ...{ class: "Pixso-frame-task_item_container" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-frame-task_item_container']} */ ;
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        id: "button_select_default",
        ...{ class: "Pixso-instance-button_select_default" },
        Style: ('SelectDefault'),
    }));
    const __VLS_2 = __VLS_1({
        id: "button_select_default",
        ...{ class: "Pixso-instance-button_select_default" },
        Style: ('SelectDefault'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    /** @type {__VLS_StyleScopedClasses['Pixso-instance-button_select_default']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    (__VLS_ctx.taskDescription);
    let __VLS_5;
    /** @ts-ignore @type {typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        id: "button_delete_default",
        ...{ class: "Pixso-instance-button_delete_default" },
        Style: ('DeleteDefault'),
    }));
    const __VLS_7 = __VLS_6({
        id: "button_delete_default",
        ...{ class: "Pixso-instance-button_delete_default" },
        Style: ('DeleteDefault'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['Pixso-instance-button_delete_default']} */ ;
}
if (__VLS_ctx.Status === 'Completed') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "task_item_completed",
        ...{ class: "Pixso-symbol-task_item_completed" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-symbol-task_item_completed']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "task_item_container",
        ...{ class: "Pixso-frame-task_item_container" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-frame-task_item_container']} */ ;
    let __VLS_10;
    /** @ts-ignore @type {typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({
        id: "button_select_click",
        ...{ class: "Pixso-instance-button_select_click" },
        Style: ('SelectClick'),
    }));
    const __VLS_12 = __VLS_11({
        id: "button_select_click",
        ...{ class: "Pixso-instance-button_select_click" },
        Style: ('SelectClick'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    /** @type {__VLS_StyleScopedClasses['Pixso-instance-button_select_click']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: "paragraph",
        ...{ class: "Pixso-paragraph" },
    });
    /** @type {__VLS_StyleScopedClasses['Pixso-paragraph']} */ ;
    (__VLS_ctx.taskDescription);
    let __VLS_15;
    /** @ts-ignore @type {typeof __VLS_components.Button | typeof __VLS_components.Button} */
    Button;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({
        id: "button_delete_default",
        ...{ class: "Pixso-instance-button_delete_default" },
        Style: ('DeleteDefault'),
    }));
    const __VLS_17 = __VLS_16({
        id: "button_delete_default",
        ...{ class: "Pixso-instance-button_delete_default" },
        Style: ('DeleteDefault'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_16));
    /** @type {__VLS_StyleScopedClasses['Pixso-instance-button_delete_default']} */ ;
}
// @ts-ignore
[Status, Status, taskDescription, taskDescription,];
const __VLS_export = (await import('vue')).defineComponent({
    props: {
        Status: { type: String },
        taskDescription: { type: String },
    },
});
export default {};
