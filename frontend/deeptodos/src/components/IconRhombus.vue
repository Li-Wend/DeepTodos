<template>
    <div id="icon_rhombus" class="Pixso-symbol-icon_rhombus">
        <div id="stroke-wrapper" class="stroke-wrapper">
            <div class="Pixso-rectangle"></div>
            <div class="stroke"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.Pixso-symbol-icon_rhombus {
    width: 9.999999046325684px;
    height: 9.999999046325684px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.Pixso-rectangle {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    background-color: $bright-pink;
    border-color: $black;
}

.stroke-wrapper {
    position: relative;
    width: 9.999998092651367px;
    height: 10px;
    flex-shrink: 0;
}

.stroke {
    position: absolute;
    inset: -0.5px -0.5px -0.5px -0.5px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 1px 1px 1px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}
</style>
