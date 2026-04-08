import { ref } from 'vue';
const isActive = ref(false);
function toggleSwitch() {
    isActive.value = !isActive.value;
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.isActive) {
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.ButtonSwitchOff} */
    ButtonSwitchOff;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ 'onSwitch': {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSwitch': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_5;
    const __VLS_6 = ({ switch: {} },
        { onSwitch: (__VLS_ctx.toggleSwitch) });
    var __VLS_7 = {};
    var __VLS_3;
    var __VLS_4;
}
else {
    let __VLS_8;
    /** @ts-ignore @type {typeof __VLS_components.ButtonSwitchOn} */
    ButtonSwitchOn;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ 'onSwitch': {} },
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onSwitch': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = ({ switch: {} },
        { onSwitch: (__VLS_ctx.toggleSwitch) });
    var __VLS_15 = {};
    var __VLS_11;
    var __VLS_12;
}
// @ts-ignore
[isActive, toggleSwitch, toggleSwitch,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
