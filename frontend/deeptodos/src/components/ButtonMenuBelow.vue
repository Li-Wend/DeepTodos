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
    <div id="button_clear_all" class="stroke-wrapper-button_clear_all" v-if="Switch === 'ClearAll'">
        <div class="Pixso-symbol-button_clear_all">
            <p id="paragraph" class="Pixso-paragraph">
                {{ "清除全部" }}
            </p>
        </div>
        <div class="stroke-button_clear_all"></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Switch: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_off {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 24px 15px 24px 15px;
    border-radius: 0px 0px 10px 10px;
    border: $border-base;
    background-color: $pure-white;
}

.stroke-wrapper-button_off {
    width: 51px;
    height: 136px;
    display: flex;
}

.stroke-button_off {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    border: $border-base;
}

.Pixso-text {
    @include global-font-main_body();
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: nowrap;
    flex-grow: 0;
    color: $black;
}

.Pixso-paragraph-text {
    line-height: 9px;
    position: relative;
    flex-shrink: 0;
}

.Pixso-span-text {
    color: $black;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_clear_all {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 24px 15px 24px 15px;
    border-radius: 0px 0px 10px 10px;
    border: $border-base;
    background-color: $pure-white;

    &:hover {
        background-color: $orange;
    }
}

.stroke-wrapper-button_clear_all {
    width: 172px;
    height: 50px;
    display: flex;
}

.stroke-button_clear_all {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    border: $border-base;
}

.Pixso-paragraph {
    text-align: center;
    width: auto;
    height: auto;
    left: 26.74%;
    right: 26.16%;
    top: 20%;
    white-space: pre;
    flex-grow: 0;
    bottom: 20%;
    color: $black;
    @include global-font-main_body();
}
</style>
