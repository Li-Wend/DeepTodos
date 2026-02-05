<template>
    <div id="task_list" class="Pixso-symbol-task_list">
        <div id="task_list_header" class="Pixso-frame-task_list_header">
            <div id="btn_mark_all_completed" class="stroke-wrapper-btn_mark_all_completed">
                <div class="Pixso-frame-btn_mark_all_completed">
                    <p id="mark_all_completed" class="Pixso-paragraph-mark_all_completed">
                        {{ "全部标为完成" }}
                    </p>
                </div>
                <div class="stroke-btn_mark_all_completed"></div>
            </div>
            <div id="button_quotes" class="stroke-wrapper-button_quotes">
                <div class="Pixso-frame-button_quotes">
                    <p id="quotes" class="Pixso-paragraph-quotes">
                        {{ "今日事今日毕，勿将今事待明日！" }}
                    </p>
                </div>
                <div class="stroke-button_quotes"></div>
            </div>
        </div>
        <div id="task_list_body" class="stroke-wrapper-task_list_body">
            <div class="Pixso-frame-task_list_body">
                <TaskItem id="task_item" class="Pixso-instance-task_item" :Status="'Pending'"></TaskItem>
                <TaskItem id="task_item" class="Pixso-instance-task_item" :Status="'Completed'"></TaskItem>
            </div>
            <div class="stroke-task_list_body"></div>
        </div>
        <div id="task_list_footer" class="stroke-wrapper-task_list_footer">
            <div class="Pixso-frame-task_list_footer">
                <div id="residual_term" class="Pixso-frame-residual_term">
                    <p id="text_1" class="Pixso-paragraph-text_1">
                        {{ "剩余" }}
                    </p>
                    <p id="text_2" class="Pixso-paragraph-text_2">
                        {{ "100" }}
                    </p>
                    <p id="text_3" class="Pixso-paragraph-text_3">
                        {{ "项未完成" }}
                    </p>
                </div>
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

.Pixso-frame-btn_mark_all_completed {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 21px 10px 21px;
    border-radius: 10px 0px 0px 0px;
    background-color: rgba(160, 193, 152, 1);
}

.stroke-wrapper-btn_mark_all_completed {
    position: relative;
    width: 285px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}

.stroke-btn_mark_all_completed {
    position: absolute;
    inset: 0px;
    border-radius: 10px 0px 0px 0px;
    border-width: 2px 1px 1px 2px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: rgba(0, 0, 0, 1);
}

.Pixso-paragraph-mark_all_completed {
    text-align: center;
    width: 243px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-main_body();
}

.Pixso-frame-button_quotes {
    width: 100%;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px 0px 10px 0px;
    border-radius: 0px 10px 0px 0px;
    background-color: $pure-white;
    border-color: $black;
}

.stroke-wrapper-button_quotes {
    position: relative;
    width: 553px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
}

.stroke-button_quotes {
    position: absolute;
    inset: 0px;
    border-radius: 0px 10px 0px 0px;
    border-width: 2px 2px 1px 1px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: $black;
}

.Pixso-paragraph-quotes {
    text-align: center;
    width: 553px;
    height: auto;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
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
    background-color: $pure-white;
    border-color: $black;
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

.Pixso-frame-residual_term {
    width: 790px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 9px;
    justify-content: flex-start;
    align-items: center;
}

.Pixso-paragraph-text_1 {
    width: 41px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.Pixso-paragraph-text_2 {
    width: auto;
    height: auto;
    position: relative;
    flex-shrink: 0;
    white-space: pre;
    flex-grow: 0;
    color: $black;
    @include global-font-mainBodyBold();
}

.Pixso-paragraph-text_3 {
    width: 81px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    color: $black;
    @include global-font-mainBodyBold();
}
</style>
