<template>
    <div id="button" class="stroke-wrapper-button">
        <div :class="`Pixso-symbol-button fill-${color}`">
            <p id="paragraph" class="Pixso-paragraph">
                {{ text }}
            </p>
        </div>
        <div class="stroke-button"></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    text: { type: String },
    // Only support: pure-white | jade-green | luminous-yellow | orange |
    color: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-symbol-button {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
    border: $border-base;
}

.stroke-wrapper-button {
    width: 172px;
    height: 50px;
    display: flex;
}

.stroke-button {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    pointer-events: none;
    border: $border-base;
}

.Pixso-paragraph {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    @include global-font-main_body();
}

</style>
