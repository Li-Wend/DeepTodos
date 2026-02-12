<template>
    <div id="button_on_default" class="Pixso-symbol-button_on_default">
        <ButtonMenuAbove :Switch="'On'" @switch="$emit('switch')" />
        <ButtonMenuMedium :Function="'AllTasks'" />
        <ButtonMenuMedium :Function="'InprogressTasks'" />
        <ButtonMenuMedium :Function="'CompletedTasks'" />
        <ButtonMenuMedium :Function="'MarkAllCompleted'" />
        <ButtonMenuMedium :Function="'ClearCompleted'" />
        <ButtonMenuBelow :Switch="'ClearAll'" />
    </div>
</template>

<script lang="ts" setup>
// 定义组件触发的事件
defineEmits(['switch']);
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_on_default {
    width: 172px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include global-box-shadow-border-right(true);

    &:hover {
        @include global-box-shadow-border-right(false);
    }
}

</style>
