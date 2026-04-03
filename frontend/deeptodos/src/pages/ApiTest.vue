<template>
    <div class="register-container">
        <h2>用户注册</h2>

        <!-- 注册表单 -->
        <div class="register-form">
            <div class="form-group">
                <label for="username">用户名:</label>
                <input id="username" v-model="formData.username" type="text" placeholder="请输入用户名" :disabled="loading" />
            </div>

            <div class="form-group">
                <label for="email">邮箱:</label>
                <input id="email" v-model="formData.email" type="email" placeholder="请输入邮箱" :disabled="loading" />
            </div>

            <div class="form-group">
                <label for="password">密码:</label>
                <input id="password" v-model="formData.password" type="password" placeholder="请输入密码"
                    :disabled="loading" />
            </div>

            <button @click="registerUser" :disabled="loading || !isFormValid">
                {{ loading ? '注册中...' : '注册用户' }}
            </button>
        </div>

        <!-- 成功消息 -->
        <div v-if="successMessage" class="success-message">
            <h3>注册成功!</h3>
            <p>{{ successMessage }}</p>
        </div>

        <!-- 错误显示区域 -->
        <div v-if="error" class="error-message">
            <h3>注册失败:</h3>
            <p>{{ error }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
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
const error = ref<string | null>(null);
const successMessage = ref<string | null>(null);

// 计算属性：表单是否有效
const isFormValid = computed(() => {
    return formData.username.trim() &&
        formData.email.trim() &&
        formData.password.trim();
});

// 注册用户
const registerUser = async () => {
    if (!isFormValid.value) return;

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

    } catch (err: any) {
        console.error('注册失败:', err);
        error.value = err.message || '注册失败，请重试';
    } finally {
        loading.value = false;
    }
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.register-form {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
}

input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover:not(:disabled) {
    background-color: #0056b3;
}

button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}

.success-message {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #28a745;
    border-radius: 4px;
    background-color: #d4edda;
    color: #155724;
}

.success-message h3 {
    margin-top: 0;
}

.error-message {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #dc3545;
    border-radius: 4px;
    background-color: #f8d7da;
    color: #721c24;
}

.error-message h3 {
    margin-top: 0;
}
</style>