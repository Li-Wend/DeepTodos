<template>
  <div id="task_item_pending" class="Pixso-symbol-task_item_pending" v-if="!task.is_completed">
    <div id="task_item_container" class="Pixso-frame-task_item_container">
      <ActionButton id="button_select_default" class="Pixso-instance-button_select_default" :Style="'SelectDefault'"
        @click="handleAction"></ActionButton>
      <p id="paragraph" class="Pixso-paragraph" @click="handleRead">
        {{ task.title }}
      </p>
      <ActionButton id="button_delete_default" class="Pixso-instance-button_delete_default" :Style="'DeleteDefault'"
        @click="handleAction"></ActionButton>
    </div>
  </div>
  <div id="task_item_completed" class="Pixso-symbol-task_item_completed" v-if="task.is_completed">
    <div id="task_item_container" class="Pixso-frame-task_item_container">
      <ActionButton id="button_select_click" class="Pixso-instance-button_select_click" :Style="'SelectClick'"
        @click="handleAction"></ActionButton>
      <p id="paragraph" class="Pixso-paragraph" @click="handleRead">
        {{ task.title }}
      </p>
      <ActionButton id="button_delete_default" class="Pixso-instance-button_delete_default" :Style="'DeleteDefault'"
        @click="handleAction"></ActionButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Task } from '@/client'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  read: [taskId: string]
  complete: [taskId: string]
  uncomplete: [taskId: string]
  delete: [taskId: string]
}>()

const handleRead = () => {
  emit('read', props.task.id)
}

const handleAction = (style: string) => {
  if (style === 'SelectDefault') {
    emit('complete', props.task.id)
  } else if (style === 'SelectClick') {
    emit('uncomplete', props.task.id)
  } else if (style === 'DeleteDefault' || style === 'DeleteClick') {
    emit('delete', props.task.id)
  }
}
</script>

<style lang="scss" scoped>
.Pixso-symbol-task_item_pending {
  width: 685px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: $pale-yellow;
  border: $border-base;
  @include global-box-shadow-border-right(true);

  &:hover {
    @include global-box-shadow-border-right(false);
  }
}

.Pixso-frame-task_item_container {
  width: 685px;
  height: auto;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: 21px;
  justify-content: center;
  align-items: center;
  padding: 0px 21px 0px 21px;
  border-radius: 10px 10px 10px 10px;
}

.Pixso-instance-button_select_default {
  width: 40px;
  height: 40px;
}

.Pixso-paragraph {
  width: 521px;
  height: auto;
  position: relative;
  flex-shrink: 0;
  color: $black;
  @include global-font-main_body();
}

.Pixso-instance-button_delete_default {
  width: 40px;
  height: 40px;
}

.Pixso-symbol-task_item_completed {
  width: 685px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: $jade-green;
  border: $border-base;
  @include global-box-shadow-border-right(true);

  &:hover {
    @include global-box-shadow-border-right(false);
  }
}
</style>
