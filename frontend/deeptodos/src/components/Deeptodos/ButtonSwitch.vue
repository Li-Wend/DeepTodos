<template>
  <ButtonSwitchOff v-if="isActive" @switch="toggleSwitch" @all-tasks="$emit('allTasks')"
    @inprogress-tasks="$emit('inprogressTasks')" @completed-tasks="$emit('completedTasks')"
    @mark-all-completed="$emit('markAllCompleted')" @clear-completed="$emit('clearCompleted')" />
  <ButtonSwitchOn v-else @switch="toggleSwitch" @all-tasks="$emit('allTasks')"
    @inprogress-tasks="$emit('inprogressTasks')" @completed-tasks="$emit('completedTasks')"
    @mark-all-completed="$emit('markAllCompleted')" @clear-completed="$emit('clearCompleted')"
    @clear-all="$emit('clearAll')" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const isActive = ref(false)

defineEmits<{
  allTasks: []
  inprogressTasks: []
  completedTasks: []
  markAllCompleted: []
  clearCompleted: []
  clearAll: []
}>()

function toggleSwitch() {
  isActive.value = !isActive.value
}
</script>

<style lang="scss" scoped></style>
