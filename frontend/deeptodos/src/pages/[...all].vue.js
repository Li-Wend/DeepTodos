<template>
  <div class="not-found-container">
    <h1>页面未找到 (404)</h1>
    <p>您访问的路径不存在。</p>
    <RouterLink to="/">返回首页</RouterLink>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    layout: false, // 该页面不使用任何布局
  },
});
</script>
/// <reference types="C:/Users/mingyu.li@sap.com/Documents/SAP_Labs/Repositories/DeepTodos/frontend/deeptodos/node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="C:/Users/mingyu.li@sap.com/Documents/SAP_Labs/Repositories/DeepTodos/frontend/deeptodos/node_modules/@vue/language-core/types/props-fallback.d.ts" />

definePage({
    meta: {
        layout: false, // 该页面不使用任何布局
    },
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "not-found-container" },
});
/** @type {__VLS_StyleScopedClasses['not-found-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    to: "/",
}));
const __VLS_2 = __VLS_1({
    to: "/",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
var __VLS_3;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
