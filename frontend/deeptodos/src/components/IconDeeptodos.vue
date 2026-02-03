<template>
    <div id="icon_deeptodos" class="Pixso-symbol-icon_deeptodos">
        <div id="rectangle" class="Pixso-rectangle">
            <p id="paragraph" class="Pixso-paragraph">
                {{ "DeepTodos" }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.Pixso-symbol-icon_deeptodos {
    width: 363.85784912109375px;
    height: 81px;
    // position: absolute;
    // left: 0px;
    // top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.Pixso-rectangle {
    width: 363.85784912109375px;
    height: 81px;
    position: relative;
    flex-shrink: 0;
    border-radius: 35px 35px 35px 35px;
    background-color: $luminous-yellow;
}

.Pixso-paragraph {
    font-size: 48px;
    font-family: "Source Han Sans CN-Bold";
    font-weight: 700;
    text-align: center;
    letter-spacing: 0.5px;
    line-height: 16px;
    width: 363.85784912109375px;
    height: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 7.5px));
    color: $black;
}
</style>
