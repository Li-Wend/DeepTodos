<template>
    <div id="task_item_pending" class="Pixso-symbol-task_item_pending" v-if="Status === 'Pending'">
        <div id="task_item_container" class="Pixso-frame-task_item_container">
            <Button id="button_select_default" class="Pixso-instance-button_select_default" :Style="'SelectDefault'"></Button>
            <p id="paragraph" class="Pixso-paragraph">
                {{ text_76_354_73_201 ?? text_73_201 ?? "任务描述" }}
            </p>
            <Button id="button_delete_click" class="Pixso-instance-button_delete_click" :Style="'DeleteClick'"></Button>
        </div>
    </div>
    <div id="task_item_completed" class="Pixso-symbol-task_item_completed fill-jade-green-23_77 stroke-black-23_79" v-if="Status === 'Completed'">
        <div id="task_item_container" class="Pixso-frame-task_item_container">
            <Button id="button_select_click" class="Pixso-instance-button_select_click" :Style="'SelectClick'"></Button>
            <p id="paragraph" class="Pixso-paragraph">
                {{ text_74_7 ?? "任务描述" }}
            </p>
            <Button id="button_delete_click" class="Pixso-instance-button_delete_click" :Style="'DeleteClick'"></Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    Status: { type: String },
    text_76_354_73_201: { type: String },
    text_73_201: { type: String },
    text_74_7: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-symbol-task_item_pending {
    width: 685px;
    height: auto;
    // position: absolute;
    // left: 20px;
    // top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 6px 8px 0px 0px $black;
    background-color: $pale-yellow;
    border-color: $black;
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
    font-size: 20px;
    font-family: "Source Han Sans CN-Regular";
    font-weight: Regular;
    letter-spacing: 0.03999999910593033px;
    // @include global-font-main_body(); // 报错 TBD 
}

.Pixso-instance-button_delete_click {
    width: 40px;
    height: 40px;
}

.Pixso-symbol-task_item_completed {
    width: 685px;
    height: auto;
    // position: absolute;
    // left: 20px;
    // top: 112px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 10px 10px;
    box-shadow: 6px 8px 0px 0px $black;
}

</style>
