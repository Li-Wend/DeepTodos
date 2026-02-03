<template>
    <div class="component-86_223">
        <div id="86_223" class="Pixso-symbol-86_223">
            <div
                id="86_224"
                class="stroke-wrapper-86_224"
                v-if="Function === 'AllTasks' && status === 'Default'"
            >
                <div
                    class="Pixso-symbol-86_224 fill-bright-pink-23_71 stroke-black-23_79"
                >
                    <p
                        id="86_225"
                        class="Pixso-paragraph-86_225 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_225 ?? "全部" }}
                    </p>
                </div>
                <div class="stroke-86_224 stroke-black-23_79"></div>
            </div>
            <div
                id="86_226"
                class="stroke-wrapper-86_226"
                v-if="Function === 'Pending' && status === 'Default'"
            >
                <div
                    class="Pixso-symbol-86_226 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <p
                        id="86_227"
                        class="Pixso-paragraph-86_227 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_227 ?? "进行中" }}
                    </p>
                </div>
                <div class="stroke-86_226 stroke-black-23_79"></div>
            </div>
            <div
                id="86_228"
                class="stroke-wrapper-86_228"
                v-if="Function === 'Pending' && status === 'Hover'"
            >
                <div
                    class="Pixso-symbol-86_228 fill-bright-green-23_75 stroke-black-23_79"
                >
                    <p
                        id="86_229"
                        class="Pixso-paragraph-86_229 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_229 ?? "进行中" }}
                    </p>
                </div>
                <div class="stroke-86_228 stroke-black-23_79"></div>
            </div>
            <div
                id="86_230"
                class="stroke-wrapper-86_230"
                v-if="Function === 'Finished' && status === 'Default'"
            >
                <div
                    class="Pixso-symbol-86_230 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <p
                        id="86_231"
                        class="Pixso-paragraph-86_231 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_231 ?? "已完成" }}
                    </p>
                </div>
                <div class="stroke-86_230 stroke-black-23_79"></div>
            </div>
            <div
                id="86_232"
                class="stroke-wrapper-86_232"
                v-if="Function === 'Finished' && status === 'Hover'"
            >
                <div
                    class="Pixso-symbol-86_232 fill-bright-green-23_75 stroke-black-23_79"
                >
                    <p
                        id="86_233"
                        class="Pixso-paragraph-86_233 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_233 ?? "已完成" }}
                    </p>
                </div>
                <div class="stroke-86_232 stroke-black-23_79"></div>
            </div>
            <div
                id="86_234"
                class="stroke-wrapper-86_234"
                v-if="Function === 'MarkFinish' && status === 'Default'"
            >
                <div
                    class="Pixso-symbol-86_234 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <p
                        id="86_235"
                        class="Pixso-paragraph-86_235 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_235 ?? "全部标为已完成" }}
                    </p>
                </div>
                <div class="stroke-86_234 stroke-black-23_79"></div>
            </div>
            <div
                id="86_236"
                class="stroke-wrapper-86_236"
                v-if="Function === 'MarkFinish' && status === 'Hover'"
            >
                <div
                    class="Pixso-symbol-86_236 fill-luminous-yellow-22_7 stroke-black-23_79"
                >
                    <p
                        id="86_237"
                        class="Pixso-paragraph-86_237 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_237 ?? "全部标为完成" }}
                    </p>
                </div>
                <div class="stroke-86_236 stroke-black-23_79"></div>
            </div>
            <div
                id="86_238"
                class="stroke-wrapper-86_238"
                v-if="Function === 'ClearFinished' && status === 'Default'"
            >
                <div
                    class="Pixso-symbol-86_238 fill-pure-white-23_103 stroke-black-23_79"
                >
                    <p
                        id="86_239"
                        class="Pixso-paragraph-86_239 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_239 ?? "清除已完成" }}
                    </p>
                </div>
                <div class="stroke-86_238 stroke-black-23_79"></div>
            </div>
            <div
                id="86_240"
                class="stroke-wrapper-86_240"
                v-if="Function === 'ClearFinished' && status === 'Hover'"
            >
                <div
                    class="Pixso-symbol-86_240 fill-luminous-yellow-22_7 stroke-black-23_79"
                >
                    <p
                        id="86_241"
                        class="Pixso-paragraph-86_241 fill-black-23_79-paragraph text-font---main-text-23_89"
                    >
                        {{ text_86_241 ?? "清除已完成" }}
                    </p>
                </div>
                <div class="stroke-86_240 stroke-black-23_79"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    Function: { type: String },
    status: { type: String },
    text_86_225: { type: String },
    text_86_227: { type: String },
    text_86_229: { type: String },
    text_86_231: { type: String },
    text_86_233: { type: String },
    text_86_235: { type: String },
    text_86_237: { type: String },
    text_86_239: { type: String },
    text_86_241: { type: String }
});
</script>
<style>
.Pixso-symbol-86_223 {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-symbol-86_224 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_224 {
    position: absolute;
    left: 202px;
    top: 20px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_224 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_225 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_226 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_226 {
    position: absolute;
    left: 20px;
    top: 79px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_226 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_227 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_228 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_228 {
    position: absolute;
    left: 202px;
    top: 79px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_228 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_229 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_230 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_230 {
    position: absolute;
    left: 20px;
    top: 138px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_230 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_231 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_232 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_232 {
    position: absolute;
    left: 202px;
    top: 138px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_232 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_233 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_234 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_234 {
    position: absolute;
    left: 20px;
    top: 197px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_234 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_235 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_236 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_236 {
    position: absolute;
    left: 202px;
    top: 197px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_236 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_237 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_238 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_238 {
    position: absolute;
    left: 20px;
    top: 256px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_238 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_239 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-symbol-86_240 {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 65px 10px 65px;
}
.stroke-wrapper-86_240 {
    position: absolute;
    left: 202px;
    top: 256px;
    width: 172px;
    height: 50px;
    display: flex;
}
.stroke-86_240 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
}
.Pixso-paragraph-86_241 {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
}
</style>
