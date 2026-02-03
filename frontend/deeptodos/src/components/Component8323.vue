<template>
    <div class="component-83_23">
        <div id="83_23" class="Pixso-symbol-83_23">
            <div
                id="83_22"
                class="stroke-wrapper-83_22"
                v-if="Switch === 'Off'"
            >
                <div
                    class="Pixso-symbol-83_22 fill-orange-23_73 stroke-black-23_79"
                >
                    <p
                        id="83_19"
                        class="Pixso-paragraph-83_19 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                    >
                        {{ text_86_623_83_19 ?? "关" }}
                    </p>
                </div>
                <div class="stroke-83_22 stroke-black-23_79"></div>
            </div>
            <div id="83_24" class="stroke-wrapper-83_24" v-if="Switch === 'On'">
                <div
                    class="Pixso-symbol-83_24 fill-jade-green-23_77 stroke-black-23_79"
                >
                    <p
                        id="83_25"
                        class="Pixso-paragraph-83_25 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                    >
                        {{ text_83_25 ?? "开" }}
                    </p>
                </div>
                <div class="stroke-83_24 stroke-black-23_79"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    Switch: { type: String },
    text_86_623_83_19: { type: String },
    text_83_25: { type: String }
});
</script>
<style>
.Pixso-symbol-83_23 {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-symbol-83_22 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 15px 10px 15px;
    border-radius: 10px 10px 0px 0px;
}
.stroke-wrapper-83_22 {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 51px;
    height: 50px;
    display: flex;
}
.stroke-83_22 {
    position: absolute;
    inset: 0px;
    border-radius: 10px 10px 0px 0px;
    border-width: 2px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-83_19 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-83_24 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 15px 10px 15px;
    border-radius: 10px 10px 0px 0px;
}
.stroke-wrapper-83_24 {
    position: absolute;
    left: 81px;
    top: 20px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-83_24 {
    position: absolute;
    inset: 0px;
    border-radius: 10px 10px 0px 0px;
    border-width: 2px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-83_25 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
</style>
