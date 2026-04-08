import { ref, reactive, computed } from 'vue';
import { api } from '../services/api';
// 表单数据
const formData = reactive({
    username: '',
    email: '',
    password: '',
});
// 状态
const loading = ref(false);
const error = ref(null);
const successMessage = ref(null);
// 计算属性：表单是否有效
const isFormValid = computed(() => {
    return formData.username.trim() &&
        formData.email.trim() &&
        formData.password.trim();
});
// 注册用户
const registerUser = async () => {
    if (!isFormValid.value)
        return;
    loading.value = true;
    error.value = null;
    successMessage.value = null;
    try {
        const result = await api.auth.register({
            username: formData.username.trim(),
            email: formData.email.trim(),
            password: formData.password,
        });
        successMessage.value = `用户 ${formData.username} 注册成功！`;
        // 清空表单
        formData.username = '';
        formData.email = '';
        formData.password = '';
    }
    catch (err) {
        console.error('注册失败:', err);
        error.value = err.message || '注册失败，请重试';
    }
    finally {
        loading.value = false;
    }
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['success-message']} */ ;
/** @type {__VLS_StyleScopedClasses['error-message']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-container" },
});
/** @type {__VLS_StyleScopedClasses['register-container']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "register-form" },
});
/** @type {__VLS_StyleScopedClasses['register-form']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "username",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "username",
    value: (__VLS_ctx.formData.username),
    type: "text",
    placeholder: "请输入用户名",
    disabled: (__VLS_ctx.loading),
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "email",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "email",
    type: "email",
    placeholder: "请输入邮箱",
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.formData.email);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "form-group" },
});
/** @type {__VLS_StyleScopedClasses['form-group']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: "password",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "password",
    type: "password",
    placeholder: "请输入密码",
    disabled: (__VLS_ctx.loading),
});
(__VLS_ctx.formData.password);
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.registerUser) },
    disabled: (__VLS_ctx.loading || !__VLS_ctx.isFormValid),
});
(__VLS_ctx.loading ? '注册中...' : '注册用户');
if (__VLS_ctx.successMessage) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "success-message" },
    });
    /** @type {__VLS_StyleScopedClasses['success-message']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.successMessage);
}
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "error-message" },
    });
    /** @type {__VLS_StyleScopedClasses['error-message']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.error);
}
// @ts-ignore
[formData, formData, formData, loading, loading, loading, loading, loading, registerUser, isFormValid, successMessage, successMessage, error, error,];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
