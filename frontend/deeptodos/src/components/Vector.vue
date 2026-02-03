<template>
    <div id="vector_select" class="Pixso-symbol-vector_select" v-if="Shape === 'Select'">
        <div id="select" class="Pixso-vector-select"></div>
    </div>
    <div id="vector_back" class="Pixso-symbol-vector_back" v-if="Shape === 'Back'">
        <div id="back" class="Pixso-vector-back"></div>
    </div>
    <div id="vector_delete" class="Pixso-symbol-vector_delete" v-if="Shape === 'Delete'">
        <div id="delete" class="Pixso-vector-delete"></div>
    </div>
    <div id="vector_confirm" class="Pixso-symbol-vector_confirm" v-if="Shape === 'Confirm'">
        <div id="confirm" class="Pixso-vector-confirm"></div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Shape: { type: String }
});
</script>

<style>
.Pixso-symbol-vector_select {
    width: 46px;
    height: 28px;
    position: absolute;
    left: 6px;
    top: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.Pixso-vector-select {
    width: 49.010054647922516px;
    height: 31.9945068359375px;
    background-image: url(@/assets/images/Vector_select.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-vector_back {
    width: 15.130001068115234px;
    height: 15.5px;
    position: absolute;
    left: 11px;
    top: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.Pixso-vector-back {
    width: 18.98345184326172px;
    height: 18.5079345703125px;
    background-image: url(@/assets/images/Vector_back.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-vector_delete {
    width: 20px;
    height: 19.9019775390625px;
    position: absolute;
    left: 10px;
    top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.Pixso-vector-delete {
    width: 23.010772705078125px;
    height: 22.629379272460938px;
    background-image: url(@/assets/images/Vector_delete.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-vector_confirm {
    width: 10px;
    height: 20px;
    position: absolute;
    left: 14.5px;
    top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.Pixso-vector-confirm {
    width: 13.011978149414062px;
    height: 23.843780517578125px;
    background-image: url(@/assets/images/Vector_confirm.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}
</style>
