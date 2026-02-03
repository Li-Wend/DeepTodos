<template>
    <div class="component-83_27">
        <div id="83_27" class="Pixso-symbol-83_27">
            <div
                id="83_26"
                class="stroke-wrapper-83_26"
                v-if="Switch === 'Off'"
            >
                <div
                    class="Pixso-symbol-83_26 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <div
                        id="83_21"
                        class="Pixso-text-83_21 fill-black-23_79-text"
                    >
                        <p id="83_21_0" class="Pixso-paragraph-83_21_0">
                            <span id="83_21_0_1" class="Pixso-span-83_21_0_1">{{
                                "快"
                            }}</span>
                        </p>
                        <p id="83_21_1" class="Pixso-paragraph-83_21_1">
                            <span id="83_21_1_1" class="Pixso-span-83_21_1_1">{{
                                "捷"
                            }}</span>
                        </p>
                        <p id="83_21_2" class="Pixso-paragraph-83_21_2">
                            <span id="83_21_2_1" class="Pixso-span-83_21_2_1">{{
                                "操"
                            }}</span>
                        </p>
                        <p id="83_21_3" class="Pixso-paragraph-83_21_3">
                            <span id="83_21_3_1" class="Pixso-span-83_21_3_1">{{
                                "作"
                            }}</span>
                        </p>
                    </div>
                </div>
                <div class="stroke-83_26 stroke-black-23_79"></div>
            </div>
            <div
                id="83_28"
                class="stroke-wrapper-83_28"
                v-if="Switch === 'ClearAll'"
            >
                <div
                    class="Pixso-symbol-83_28 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <p
                        id="79_307"
                        class="Pixso-paragraph-79_307 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_79_307 ?? "清除全部" }}
                    </p>
                </div>
                <div class="stroke-83_28 stroke-black-23_79"></div>
            </div>
            <div
                id="85_1"
                class="stroke-wrapper-85_1"
                v-if="Switch === 'ClearAllHover'"
            >
                <div
                    class="Pixso-symbol-85_1 fill-orange-23_73 stroke-black-23_79"
                >
                    <p
                        id="85_3"
                        class="Pixso-paragraph-85_3 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_85_3 ?? "清除全部" }}
                    </p>
                </div>
                <div class="stroke-85_1 stroke-black-23_79"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    Switch: { type: String },
    text_79_307: { type: String },
    text_85_3: { type: String }
});
</script>
<style>
.Pixso-symbol-83_27 {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-symbol-83_26 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 24px 15px 24px 15px;
    border-radius: 0px 0px 10px 10px;
}
.stroke-wrapper-83_26 {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 51px;
    height: 136px;
    display: flex;
}
.stroke-83_26 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-text-83_21 {
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: Regular;
    text-align: center;
    letter-spacing: 0.03999999910593033px;
    line-height: 22px;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-83_21_0 {
    line-height: 22px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-83_21_0_1 {
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-83_21_1 {
    line-height: 22px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-83_21_1_1 {
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-83_21_2 {
    line-height: 22px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-83_21_2_1 {
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-83_21_3 {
    line-height: 22px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-83_21_3_1 {
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-symbol-83_28 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 24px 15px 24px 15px;
    border-radius: 0px 0px 10px 10px;
}
.stroke-wrapper-83_28 {
    position: absolute;
    left: 81px;
    top: 63px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-83_28 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-79_307 {
    text-align: center;
    width: auto;
    height: auto;
    position: absolute;
    left: 46px;
    top: 10px;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-85_1 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 24px 15px 24px 15px;
    border-radius: 0px 0px 10px 10px;
}
.stroke-wrapper-85_1 {
    position: absolute;
    left: 263px;
    top: 63px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-85_1 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-85_3 {
    text-align: center;
    width: auto;
    height: auto;
    position: absolute;
    left: 26.74%;
    right: 26.16%;
    top: 20%;
    bottom: 20%;
    white-space: pre;
    flex-grow: 0;
}
</style>
