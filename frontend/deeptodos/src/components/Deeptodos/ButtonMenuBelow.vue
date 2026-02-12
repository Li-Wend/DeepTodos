<template>
    <div id="button_off" class="stroke-wrapper-button_off" v-if="Switch === 'Off'">
        <div class="Pixso-symbol-button_off">
            <div id="text" class="Pixso-text">
                <p id="text_0" class="Pixso-paragraph-text">
                    <span id="text_0_1" class="Pixso-span-text">{{ "快" }}</span>
                </p>
                <p id="text_1" class="Pixso-paragraph-text">
                    <span id="text_1_1" class="Pixso-span-text">{{ "捷" }}</span>
                </p>
                <p id="text_2" class="Pixso-paragraph-text">
                    <span id="text_2_1" class="Pixso-span-text">{{ "操" }}</span>
                </p>
                <p id="text_3" class="Pixso-paragraph-text">
                    <span id="text_3_1" class="Pixso-span-text">{{ "作" }}</span>
                </p>
            </div>
        </div>
        <div class="stroke-button_off"></div>
    </div>
    <button id="button_clear_all" class="stroke-wrapper-button_clear_all" v-if="Switch === 'ClearAll'" @click="handleClick">
        <div class="Pixso-symbol-button_clear_all">
            <p id="paragraph" class="Pixso-paragraph">
                {{ "清除全部" }}
            </p>
        </div>
        <div class="stroke-button_clear_all"></div>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    Switch: { type: String }
});

function handleClick() {
    // 触发清除全部事件，父组件监听后执行相应逻辑
    console.log('clearAll');
}
</script>

<style lang="scss" scoped>
// 重置button默认样式
button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    cursor: pointer;
    outline: none;
    position: relative;
    display: flex;
}

// 快捷操作按钮样式
.stroke-wrapper-button_off {
    width: 61px;
    height: 136px;
    position: relative;
    display: flex;
    border-radius: 0px 0px 10px 10px;
    background-color: $pure-white;
}

.Pixso-symbol-button_off {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    background-color: $pure-white;
    z-index: 1;
    border: $border-base;
}

.stroke-button_off {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0px 0px 10px 10px;
    border: $border-base;
    pointer-events: none;
    box-sizing: border-box;
    z-index: 0;
}

// 清除全部按钮样式
.stroke-wrapper-button_clear_all {
    width: 172px;
    height: 50px;
    position: relative;
    display: flex;
    background-color: $pure-white;
    border-radius: 0px 0px 10px 10px;
}

.Pixso-symbol-button_clear_all {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 10px 10px;
    background-color: $pure-white;
    z-index: 1;
    border: $border-base;

    &:hover {
        background-color: $orange;
    }
}

.stroke-button_clear_all {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 0px 0px 10px 10px;
    border: $border-base;
    pointer-events: none;
    box-sizing: border-box;
    z-index: 0;
}

// 文字样式
.Pixso-text {
    @include global-font-main_body();
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: $black;
}

.Pixso-paragraph-text {
    line-height: 1.2;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
}

.Pixso-span-text {
    color: $black;
    display: block;
}

.Pixso-paragraph {
    @include global-font-main_body();
    text-align: center;
    margin: 0;
    color: $black;
    width: 100%;
}
</style>