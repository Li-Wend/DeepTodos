<template>
    <div id="task_item_pending" class="Pixso-symbol-task_item_pending" v-if="Status === 'Pending'">
        <div id="task_item_container" class="Pixso-frame-task_item_container">
            <Button id="button_select_default" class="Pixso-instance-button_select_default"
                :Style="'SelectDefault'"></Button>
            <p id="paragraph" class="Pixso-paragraph">
                {{ "任务描述" }}
            </p>
            <Button id="button_delete_default" class="Pixso-instance-button_delete_default" :Style="'DeleteDefault'"></Button>
        </div>
    </div>
    <div id="task_item_completed" class="Pixso-symbol-task_item_completed" v-if="Status === 'Completed'">
        <div id="task_item_container" class="Pixso-frame-task_item_container">
            <Button id="button_select_click" class="Pixso-instance-button_select_click" :Style="'SelectClick'"></Button>
            <p id="paragraph" class="Pixso-paragraph">
                {{ "任务描述" }}
            </p>
            <Button id="button_delete_default" class="Pixso-instance-button_delete_default" :Style="'DeleteDefault'"></Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Status: { type: String }
});
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
    padding: 21px 21px 21px 21px;
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