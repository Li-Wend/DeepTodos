<template>
  <div id="button_on_default" class="Pixso-symbol-button_on_default">
    <ButtonMenuAbove :Switch="'On'" @switch="$emit('switch')" />
    <ButtonMenuMedium :Function="'AllTasks'" @all-tasks="$emit('allTasks')" />
    <ButtonMenuMedium :Function="'InprogressTasks'" @inprogress-tasks="$emit('inprogressTasks')" />
    <ButtonMenuMedium :Function="'CompletedTasks'" @completed-tasks="$emit('completedTasks')" />
    <ButtonMenuMedium :Function="'MarkAllCompleted'" @mark-all-completed="$emit('markAllCompleted')" />
    <ButtonMenuMedium :Function="'ClearCompleted'" @clear-completed="$emit('clearCompleted')" />
    <ButtonMenuBelow :Switch="'ClearAll'" @clear-all="$emit('clearAll')" />
  </div>
</template>

<script lang="ts" setup>
// 定义组件触发的事件
defineEmits(['switch', 'allTasks', 'inprogressTasks', 'completedTasks', 'markAllCompleted', 'clearCompleted', 'clearAll'])
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_on_default {
  width: 172px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include global-box-shadow-border-right(true);

  &:hover {
    @include global-box-shadow-border-right(false);
  }
}
</style>
