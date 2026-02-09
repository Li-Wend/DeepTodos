<template>
    <div id="task_list" class="Pixso-symbol-task_list">
        <div id="task_list_header" class="Pixso-frame-task_list_header">
            <ButtonMarkDone id="btn_mark_all_completed"/>
            <ButtonQuotes id="button_quotes" :quotesText="'今日事今日毕，勿将今事待明日！'" />
        </div>
        <div id="task_list_body" class="stroke-wrapper-task_list_body">
            <div class="Pixso-frame-task_list_body">
                <TaskItem :Status="'Pending'" :taskDescription="'完成项目文档编写'"></TaskItem>
                <TaskItem :Status="'Completed'" :taskDescription="'完成用户界面设计'"></TaskItem>
            </div>
            <div class="stroke-task_list_body"></div>
        </div>
        <div id="task_list_footer" class="stroke-wrapper-task_list_footer">
            <div class="Pixso-frame-task_list_footer">
                <ResidualTerm id="residual_term" :balanceNumber="'100'" />
            </div>
            <div class="stroke-task_list_footer"></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.Pixso-symbol-task_list {
    width: 838px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @include global-box-shadow-border-right(true);

    &:hover {
        @include global-box-shadow-border-right(false);
    }

}

.Pixso-frame-task_list_header {
    width: 838px;
    height: 50px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-task_list_body {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 76px 24px 76px;
    min-height: 500px;
    background-color: $pure-white;
    border-color: $black;
}

.stroke-wrapper-task_list_body {
    position: relative;
    width: 838px;
    height: auto;
    display: flex;
    flex-shrink: 0;
}

.stroke-task_list_body {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 2px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}

.Pixso-frame-task_list_footer {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 24px 10px 24px;
    border-radius: 0px 0px 10px 10px;
    border-color: $black;
    background-color: $pure-white;
    
    &:hover {
        background-color: $pale-yellow;
    }
}

.stroke-wrapper-task_list_footer {
    position: relative;
    width: 838px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}

.stroke-task_list_footer {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 10px 10px;
    border-width: 1px 2px 2px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}

</style>
