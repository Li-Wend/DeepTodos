<template>
    <div id="todo_header" class="Pixso-frame-todo_header">
        <div id="icon_container" class="Pixso-frame-icon_container">
            <div id="icon_rhombus_left" class="Pixso-frame-icon_rhombus_left">
                <div id="rhombus_1_container" class="Pixso-frame-rhombus_1_container">
                    <IconRhombus />
                </div>
                <div id="rhombus_2_container" class="Pixso-frame-rhombus_2_container">
                    <IconRhombus />
                </div>
            </div>
            <div id="deeptodos_container" class="Pixso-frame-deeptodos_container">
                <IconDeeptodos />
            </div>
            <div id="rhombus_3_container" class="Pixso-frame-rhombus_3_container">
                <IconRhombus />
            </div>
        </div>
    </div>
    <div id="input_container" class="Pixso-frame-input_container">
        <InputTask />
    </div>
    <div id="todo_body" class="Pixso-frame-todo_body">
        <div id="task_list_container" class="Pixso-frame-task_list_container">
            <TaskList />
        </div>
        <div id="button_menu_container" class="Pixso-frame-button_menu_container">
            <ButtonSwitch />
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.Pixso-frame-todo_header {
    width: 1440px;
    height: 123px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 21px 412.8578796386719px 21px 412.8578796386719px;
}

.Pixso-frame-icon_container {
    width: 614.2842407226562px;
    height: 81px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 92px;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-icon_rhombus_left {
    width: 52.284263610839844px;
    height: 14.142131805419922px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-rhombus_1_container {
    width: 9.999998092651367px;
    height: 9.999998092651367px;
    position: relative;
    flex-shrink: 0;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-rhombus_2_container {
    width: 9.999998092651367px;
    height: 9.999998092651367px;
    position: relative;
    flex-shrink: 0;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-deeptodos_container {
    width: 363.85784912109375px;
    height: 81px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-rhombus_3_container {
    width: 9.999998092651367px;
    height: 9.999998092651367px;
    position: relative;
    flex-shrink: 0;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-frame-input_container {
    width: 1440px;
    height: 114px;
    position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 21px 0px 21px 0px;
}

.Pixso-frame-todo_body {
    width: 1440px;
    height: 642px;
    // position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
}

.Pixso-frame-task_list_container {
    width: 1139px;
    height: 642px;
    // position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 21px 0px 21px 0px;
}

.Pixso-frame-button_menu_container {
    width: 301px;
    height: 642px;
    // position: relative;
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 21px 42px 21px 42px;
}
</style>
