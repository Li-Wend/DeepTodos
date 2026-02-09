<template>
    <div id="button_switch_off" class="stroke-wrapper-button_switch_off" v-if="Switch === 'Off'">
        <div class="Pixso-symbol-button_switch_off">
            <p id="paragraph" class="Pixso-paragraph">
                {{ "关" }}
            </p>
        </div>
        <div class="stroke-button_switch_off"></div>
    </div>
    <div id="button_switch_on" class="stroke-wrapper-button_switch_on" v-if="Switch === 'On'" @click="$emit('switch')">
        <div class="Pixso-symbol-button_switch_on">
            <p id="paragraph" class="Pixso-paragraph">
                {{ "开 🔆" }}
            </p>
        </div>
        <div class="stroke-button_switch_on"></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Switch: { type: String }
});

// 定义组件触发的事件
defineEmits(['switch']);
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_switch_off {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0px 0px;
    background-color: $orange;
}

.stroke-wrapper-button_switch_off {
    width: 61px;
    height: 50px;
    display: flex;
    border-radius: 10px 10px 0px 0px;
    border: $border-base;
}

.stroke-button_switch_off {
    position: absolute;
    inset: 0px;
    border-radius: 10px 10px 0px 0px;
    pointer-events: none;
}

.Pixso-paragraph {
    text-align: center;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.Pixso-symbol-button_switch_on {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 15px 10px 15px;
    border-radius: 10px 10px 0px 0px;
    border-color: $black;
    background-color: $jade-green;
}

.stroke-wrapper-button_switch_on {
    width: 172px;
    height: 50px;
    display: flex;
    border-radius: 10px 10px 0px 0px;
    border: $border-base;
}

.stroke-button_switch_on {
    position: absolute;
    inset: 0px;
    border-radius: 10px 10px 0px 0px;
    border-width: 2px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}
</style>
