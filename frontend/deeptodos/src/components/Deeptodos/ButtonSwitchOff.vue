<template>
    <div id="button_off_default" class="Pixso-symbol-button_off_default" @click="$emit('switch')">
        <ButtonMenuAbove id="button_switch_off_above" class="Pixso-instance-button_switch_off_above" :Switch="'Off'" />
        <ButtonMenuBelow id="button_switch_off_below" class="Pixso-instance-button_switch_off_below" :Switch="'Off'" />
    </div>
</template>

<script lang="ts" setup>
// 定义组件触发的事件
defineEmits(['switch']);
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_off_default {
    width: 61px;
    height: 186px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include global-box-shadow-border-right(true);
    border: none;
    /* 移除输入框的主要边框 */
    outline: none;
    /* 移除输入框在获得焦点时显示的轮廓 */

    &:hover {
        @include global-box-shadow-border-right(false);
    }
}

.Pixso-instance-button_switch_off_above {
    width: 61px;
    height: 50px;
}

.Pixso-instance-button_switch_off_below {
    width: 61px;
    height: 136px;
}
</style>
