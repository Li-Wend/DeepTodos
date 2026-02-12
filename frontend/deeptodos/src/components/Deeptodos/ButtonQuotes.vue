<template>
    <div id="button_quotes" class="stroke-wrapper-button_quotes">
        <div class="Pixso-frame-button_quotes">
            <p id="quotes" class="Pixso-paragraph-quotes">
                {{ quotesText }}
            </p>
        </div>
        <div class="stroke-button_quotes"></div>
    </div>

</template>

<script lang="ts" setup>
const props = defineProps({
    quotesText: { type: String }
});
</script>

<style lang="scss" scoped>
.stroke-wrapper-button_quotes {
    position: relative;
    width: 553px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}

.Pixso-frame-button_quotes {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;
    border-radius: 0px 10px 0px 0px;
    border-color: $black;
    background-color: $pure-white;

    &:hover {
        background-color: $pale-yellow;
    }
}

.Pixso-paragraph-quotes {
    text-align: center;
    width: 553px;
    height: auto;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.stroke-button_quotes {
    position: absolute;
    inset: 0px;
    border-radius: 0px 10px 0px 0px;
    border-width: 2px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}
</style>