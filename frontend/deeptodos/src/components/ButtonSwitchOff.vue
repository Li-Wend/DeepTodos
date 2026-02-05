<template>
    <div id="button_off_default" class="Pixso-symbol-button_off_default">
        <ButtonMenuAbove id="button_switch_off_above" class="Pixso-instance-button_switch_off_above" :Switch="'Off'" />
        <ButtonMenuBelow id="button_switch_off_below" class="Pixso-instance-button_switch_off_below" :Switch="'Off'" />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Status: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_off_default {
    width: 51px;
    height: 186px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @include global-box-shadow-border-right(true);

    &:hover {
        @include global-box-shadow-border-right(false);
    }
}

.Pixso-instance-button_switch_off_above {
    width: 51px;
    height: 50px;
}

.Pixso-instance-button_switch_off_below {
    width: 51px;
    height: 136px;
}

.Pixso-symbol-button_off_hover {
    width: 51px;
    height: 186px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
