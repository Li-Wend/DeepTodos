<template>
    <div id="residual_term" class="Pixso-frame-residual_term">
        <p id="text_1" class="Pixso-paragraph-text_1">
            {{ "剩余" }}
        </p>
        <p id="text_2" class="Pixso-paragraph-text_2">
            {{ balanceNumber }}
        </p>
        <p id="text_3" class="Pixso-paragraph-text_3">
            {{ "项未完成" }}
        </p>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    balanceNumber: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-frame-residual_term {
    width: 790px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 9px;
    justify-content: flex-start;
    align-items: center;
}

.Pixso-paragraph-text_1 {
    width: 41px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.Pixso-paragraph-text_2 {
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.Pixso-paragraph-text_3 {
    width: 81px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}
</style>