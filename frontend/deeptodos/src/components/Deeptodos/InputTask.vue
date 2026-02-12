<template>
    <div id="input_submit" class="Pixso-symbol-input_submit">
        <div id="input" class="Pixso-frame-input">
            <input id="p_input" class="Pixso-paragraph-p_input" type="text" v-model="todoText"
                placeholder="新增待办事项..." />
        </div>
        <button id="button_submit" class="stroke-wrapper-button_submit" @click="handleClick">
            <div class="Pixso-frame-button_submit">
                <p id="p_submit" class="Pixso-paragraph-p_submit">
                    {{ "提交" }}
                </p>
            </div>
            <div class="stroke-button_submit"></div>
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 使用ref声明响应式数据，并指定类型为string
const todoText = ref<string>('') // 初始值可以是空字符串，也可以是其他字符串

// TBD: 处理提交逻辑的函数...
function handleClick() {
    // 在这里处理提交逻辑，例如将todoText的值发送到服务器或添加到待办事项列表中
    console.log('提交的待办事项:', todoText.value);
    // 提交后可以清空输入框
    todoText.value = '';
}
</script>

<style lang="scss" scoped>
.Pixso-symbol-input_submit {
    width: 838px;
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-radius: 10px 10px 10px 10px;
    background-color: $pure-white;
    @include global-box-shadow-border-right(true);

    &:hover {
        @include global-box-shadow-border-right(false);
    }
}

.Pixso-frame-input {
    width: 680px;
    height: 72px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px 26px 18px 26px;
    border-radius: 10px 0px 0px 10px;
    background-color: $pure-white;
    border: $border-base;
}

.Pixso-paragraph-p_input {
    width: 628px;
    height: auto;
    position: relative;
    flex-shrink: 0;
    border: none;
    /* 移除输入框的主要边框 */
    outline: none;
    /* 移除输入框在获得焦点时显示的轮廓 */
    @include global-font-descriptionDark();

    &::placeholder {
        @include global-font-descriptionLight();
    }
}

.Pixso-frame-button_submit {
    width: 100%;
    height: 100%;
    // position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.stroke-wrapper-button_submit {
    position: relative;
    width: 158px;
    height: 72px;
    display: flex;
    flex-shrink: 0;
    border-radius: 0px 10px 10px 0px;
    background-color: $bright-pink;
    padding: 18px 54px 18px 54px;
}

.stroke-button_submit {
    position: absolute;
    inset: 0px;
    border-radius: 0px 10px 10px 0px;
    pointer-events: none;
}

.Pixso-paragraph-p_submit {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    @include global-font-descriptionDark();
}
</style>
