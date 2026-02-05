<template>
    <div id="input_submit" class="Pixso-symbol-input_submit">
        <div id="input" class="Pixso-frame-input">
            <p id="p_input"
                class="Pixso-paragraph-p_input">
                {{ "新增待办事项。。。" }}
            </p>
        </div>
        <div id="button_submit" class="stroke-wrapper-button_submit">
            <div class="Pixso-frame-button_submit">
                <p id="p_submit"
                    class="Pixso-paragraph-p_submit">
                    {{ "提交" }}
                </p>
            </div>
            <div class="stroke-button_submit"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.Pixso-symbol-input_submit {
    width: 838px;
    height: 72px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border-radius: 10px 10px 10px 10px;
    background-color: $pure-white;
    @include global-box-shadow-border-right(true);

    &:hover {
        @include global-box-shadow-border-right(false);
    }
}

.Pixso-frame-input {
    width: 680px;
    height: 72px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 18px 26px 18px 26px;
    border-radius: 10px 0px 0px 10px;
    background-color: $pure-white;
    border: $border-base;
}

.Pixso-paragraph-p_input {
    width: 628px;
    height: auto;
    position: relative;
    flex-shrink: 0;
    @include global-font-descriptionLight();
}

.Pixso-frame-button_submit {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 18px 54px 18px 54px;
    border-radius: 0px 10px 10px 0px;
    border: $border-base;
    background-color: $bright-pink;
}

.stroke-wrapper-button_submit {
    position: relative;
    width: 158px;
    height: 72px;
    display: flex;
    flex-shrink: 0;
}

.stroke-button_submit {
    position: absolute;
    inset: 0px;
    border-radius: 0px 10px 10px 0px;
    border-width: 2px 2px 2px 2px;
    pointer-events: none;
    border: $border-base;
}

.Pixso-paragraph-p_submit {
    text-align: center;
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    @include global-font-descriptionDark();
}
</style>
