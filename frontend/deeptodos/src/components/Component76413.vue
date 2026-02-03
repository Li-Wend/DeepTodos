<template>
    <div class="component-76_413">
        <div
            id="76_413"
            class="Pixso-symbol-76_413 effect-outer-shadow---right-side-of-the-border-23_83"
        >
            <div id="76_251" class="Pixso-frame-76_251">
                <div id="76_352" class="stroke-wrapper-76_352">
                    <div class="Pixso-frame-76_352">
                        <p
                            id="76_255"
                            class="Pixso-paragraph-76_255 fill-black-23_79-paragraph text-font---main-text-23_89"
                        >
                            {{ "全部标为完成" }}
                        </p>
                    </div>
                    <div class="stroke-76_352"></div>
                </div>
                <div id="76_353" class="stroke-wrapper-76_353">
                    <div
                        class="Pixso-frame-76_353 fill-pure-white-23_103 stroke-black-23_79"
                    >
                        <p
                            id="76_259"
                            class="Pixso-paragraph-76_259 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                        >
                            {{ "今日事今日毕，勿将今事待明日！" }}
                        </p>
                    </div>
                    <div class="stroke-76_353 stroke-black-23_79"></div>
                </div>
            </div>
            <div id="76_260" class="stroke-wrapper-76_260">
                <div
                    class="Pixso-frame-76_260 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <Component_74_2
                        id="76_354"
                        class="Pixso-instance-76_354"
                        :Status="'Pending'"
                        :text_76_354_73_201="text_76_354_73_201"
                    ></Component_74_2>
                    <Component_74_2
                        id="76_391"
                        class="Pixso-instance-76_391"
                        :Status="'Completed'"
                    ></Component_74_2>
                </div>
                <div class="stroke-76_260 stroke-black-23_79"></div>
            </div>
            <div id="76_412" class="stroke-wrapper-76_412">
                <div
                    class="Pixso-frame-76_412 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <div id="76_291" class="Pixso-frame-76_291">
                        <p
                            id="76_292"
                            class="Pixso-paragraph-76_292 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                        >
                            {{ "剩余" }}
                        </p>
                        <p
                            id="76_293"
                            class="Pixso-paragraph-76_293 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                        >
                            {{ "100" }}
                        </p>
                        <p
                            id="76_294"
                            class="Pixso-paragraph-76_294 fill-black-23_79-paragraph text-font---main-text-in-bold-40_15"
                        >
                            {{ "项未完成" }}
                        </p>
                    </div>
                </div>
                <div class="stroke-76_412 stroke-black-23_79"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Component_74_2 from "@/components/Component742.vue";
const props = defineProps({
    text_76_354_73_201: { type: String }
});
</script>
<style>
.Pixso-symbol-76_413 {
    width: 838px;
    height: 600px;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-frame-76_251 {
    width: 838px;
    height: 50px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.Pixso-frame-76_352 {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 21px 10px 21px;
    border-radius: 10px 0px 0px 0px;
    background-color: rgba(160, 193, 152, 1);
}
.stroke-wrapper-76_352 {
    position: relative;
    width: 285px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}
.stroke-76_352 {
    position: absolute;
    inset: 0px;
    border-radius: 10px 0px 0px 0px;
    border-width: 2px 1px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: rgba(0, 0, 0, 1);
}
.Pixso-paragraph-76_255 {
    text-align: center;
    width: 243px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-frame-76_353 {
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
}
.stroke-wrapper-76_353 {
    position: relative;
    width: 553px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}
.stroke-76_353 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 10px 0px 0px;
    border-width: 2px 2px 1px 1px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-76_259 {
    text-align: center;
    width: 553px;
    height: auto;
    position: relative;
    flex-shrink: 0;
}
.Pixso-frame-76_260 {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 76px 24px 76px;
    min-height: 500px;
}
.stroke-wrapper-76_260 {
    position: relative;
    width: 838px;
    height: 500px;
    display: flex;
    flex-shrink: 0;
}
.stroke-76_260 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-instance-76_354 {
    width: 685px;
    height: 82px;
}
.Pixso-instance-76_391 {
    width: 685px;
    height: 82px;
}
.Pixso-frame-76_412 {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 24px 10px 24px;
    border-radius: 0px 0px 10px 10px;
}
.stroke-wrapper-76_412 {
    position: relative;
    width: 838px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}
.stroke-76_412 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-frame-76_291 {
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
.Pixso-paragraph-76_292 {
    width: 41px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-76_293 {
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-76_294 {
    width: 81px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
}

.Pixso-instance-76_354 .Pixso-symbol-74_1 {
    width: 685px;
    height: 82px;
    left: 76.5px;
    top: 24px;
}
.Pixso-instance-76_354 .Pixso-paragraph-73_201 {
    width: 521px;
    height: 30px;
}
.Pixso-instance-76_391 .Pixso-symbol-74_3 {
    width: 685px;
    height: 82px;
    left: 76.5px;
    top: 130px;
}
.Pixso-instance-76_391 .Pixso-paragraph-74_7 {
    width: 521px;
    height: 30px;
}
</style>
