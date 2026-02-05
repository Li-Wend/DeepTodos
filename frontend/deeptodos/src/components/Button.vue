<template>
    <HoverToggle v-if="Style === 'SelectDefault'">
        <template v-slot:trigger>
            <div id="button_select_default" class="Pixso-symbol-button_select_default">
                <div id="select_default" class="Pixso-vector-select_default"></div>
            </div>
        </template>
        <template v-slot:content>
            <div id="button_select_hover" class="Pixso-symbol-button_select_hover">
                <div id="select_hover" class="Pixso-vector-select_hover"></div>
            </div>
        </template>
    </HoverToggle>
    <div id="button_select_click" class="Pixso-symbol-button_select_click" v-if="Style === 'SelectClick'">
        <div id="select_click" class="Pixso-vector-select_click">
            <Vector id="vector_select" class="Pixso-instance-vector_select" :Shape="'Select'"></Vector>
        </div>
    </div>

    <HoverToggle v-if="Style === 'DeleteDefault'">
        <template v-slot:trigger>
            <div id="button_delete_default" class="Pixso-symbol-button_delete_default">
                <div id="select_default" class="Pixso-vector-select_default">
                    <Vector id="vector_delete" class="Pixso-instance-vector_delete" :Shape="'Delete'"></Vector>
                </div>
            </div>
        </template>
        <template v-slot:content>
            <div id="button_delete_hover" class="Pixso-symbol-button_delete_hover">
                <div id="delete_hover" class="Pixso-vector-delete_hover">
                    <Vector id="vector_delete" class="Pixso-instance-vector_delete" :Shape="'Delete'"></Vector>
                </div>
            </div>
        </template>
    </HoverToggle>
    <div id="button_delete_click" class="Pixso-symbol-button_delete_click" v-if="Style === 'DeleteClick'">
        <div id="delete_click" class="Pixso-vector-delete_click">
            <Vector id="vector_delete" class="Pixso-instance-vector_delete" :Shape="'Delete'"></Vector>
        </div>
    </div>

    <HoverToggle v-if="Style === 'BackDefault'">
        <template v-slot:trigger>
            <div id="button_back_default" class="Pixso-symbol-button_back_default">
                <div id="select_default" class="Pixso-vector-select_default">
                    <Vector id="vector_back" class="Pixso-instance-vector_back" :Shape="'Back'"></Vector>
                </div>
            </div>
        </template>
        <template v-slot:content>
            <div id="button_back_hover" class="Pixso-symbol-button_back_hover">
                <div id="back_hover" class="Pixso-vector-back_hover">
                    <Vector id="vector_back" class="Pixso-instance-vector_back" :Shape="'Back'"></Vector>
                </div>
            </div>
        </template>
    </HoverToggle>
    <div id="button_back_click" class="Pixso-symbol-button_back_click" v-if="Style === 'BackClick'">
        <div id="back_click" class="Pixso-vector-back_click">
            <Vector id="vector_back" class="Pixso-instance-vector_back" :Shape="'Back'"></Vector>
        </div>
    </div>

    <HoverToggle v-if="Style === 'ConfirmDefault'">
        <template v-slot:trigger>
            <div id="button_confirm_default" class="Pixso-symbol-button_confirm_default">
                <div id="select_default" class="Pixso-vector-select_default">
                    <Vector id="vector_confirm" class="Pixso-instance-vector_confirm" :Shape="'Confirm'"></Vector>
                </div>
            </div>
        </template>
        <template v-slot:content>
            <div id="button_confirm_hover" class="Pixso-symbol-button_confirm_hover">
                <div id="confirm_hover" class="Pixso-vector-confirm_hover">
                    <Vector id="vector_confirm" class="Pixso-instance-vector_confirm" :Shape="'Confirm'"></Vector>
                </div>
            </div>
        </template>
    </HoverToggle>
    <div id="button_confirm_click" class="Pixso-symbol-button_confirm_click" v-if="Style === 'ConfirmClick'">
        <div id="confirm_click" class="Pixso-vector-confirm_click">
            <Vector id="vector_confirm" class="Pixso-instance-vector_confirm" :Shape="'Confirm'"></Vector>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Vector from "@/components/Vector.vue";
const props = defineProps({
    Style: { type: String }
});
</script>

<style lang="scss" scoped>
.Pixso-symbol-button_select_default {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-select_default {
    width: 40px;
    height: 40px;
    background-image: url(@/assets/images/Ellipse_select_default.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_select_hover {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-select_hover {
    width: 44px;
    height: 44px;
    background-image: url(@/assets/images/Ellipse_select_hover.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_select_click {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-select_click {
    width: 40px;
    height: 40px;
    background-image: url(@/assets/images/Ellipse_select_click.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_delete_default {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-symbol-button_delete_click {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-delete_click {
    width: 40px;
    height: 40px;
    background-image: url(@/assets/images/Ellipse_delete_click.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_delete_hover {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-delete_hover {
    width: 44px;
    height: 44px;
    background-image: url(@/assets/images/Ellipse_delete_hover.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_back_default {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-symbol-button_back_click {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-back_click {
    width: 40px;
    height: 40px;
    background-image: url(@/assets/images/Ellipse_back_click.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_back_hover {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-back_hover {
    width: 44px;
    height: 44px;
    background-image: url(@/assets/images/Ellipse_back_hover.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_confirm_default {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-symbol-button_confirm_click {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-confirm_click {
    width: 40px;
    height: 40px;
    background-image: url(@/assets/images/Ellipse_confirm_click.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

.Pixso-symbol-button_confirm_hover {
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.Pixso-vector-confirm_hover {
    width: 44px;
    height: 44px;
    background-image: url(@/assets/images/Ellipse_confirm_hover.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    flex-shrink: 0;
}

</style>
