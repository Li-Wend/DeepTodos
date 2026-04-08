export default {};
;
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "hover-wrapper" },
});
/** @type {__VLS_StyleScopedClasses['hover-wrapper']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onMouseenter: (__VLS_ctx.handleMouseEnter) },
    ...{ onMouseleave: (__VLS_ctx.handleMouseLeave) },
});
if (!__VLS_ctx.isVisible) {
    var __VLS_0 = {};
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "content-wrapper" },
});
__VLS_asFunctionalDirective(__VLS_directives.vShow, {})(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.isVisible) }, null, null);
/** @type {__VLS_StyleScopedClasses['content-wrapper']} */ ;
var __VLS_2 = {};
// @ts-ignore
var __VLS_1 = __VLS_0, __VLS_3 = __VLS_2;
// @ts-ignore
[handleMouseEnter, handleMouseLeave, isVisible, isVisible,];
const __VLS_export = (await import('vue')).defineComponent({
    data() {
        return {
            isVisible: false,
        };
    },
    methods: {
        handleMouseEnter() {
            this.isVisible = true;
        },
        handleMouseLeave() {
            this.isVisible = false;
        },
    },
});
