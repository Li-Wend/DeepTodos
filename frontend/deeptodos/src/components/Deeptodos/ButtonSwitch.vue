<template>
    <ButtonSwitchOff v-if="isActive" @switch="toggleSwitch" />
    <ButtonSwitchOn v-else @switch="toggleSwitch" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isActive = ref(false);

function toggleSwitch() {
    isActive.value = !isActive.value;
}

</script>

<style lang="scss" scoped></style>