<template>
    <div class="component-86_629">
        <div id="86_629" class="Pixso-symbol-86_629">
            <div
                id="86_628"
                class="Pixso-symbol-86_628"
                v-if="Status === 'Default'"
            >
                <Component_83_23
                    id="86_623"
                    class="Pixso-instance-86_623"
                    :Switch="'Off'"
                    :text_86_623_83_19="text_86_623_83_19"
                ></Component_83_23>
                <Component_83_27
                    id="86_625"
                    class="Pixso-instance-86_625"
                    :Switch="'Off'"
                ></Component_83_27>
            </div>
            <div
                id="86_630"
                class="Pixso-symbol-86_630 effect-outer-shadow---right-side-of-the-border-23_83"
                v-if="Status === 'Hover'"
            >
                <Component_83_23
                    id="86_631"
                    class="Pixso-instance-86_631"
                    :Switch="'Off'"
                ></Component_83_23>
                <Component_83_27
                    id="86_633"
                    class="Pixso-instance-86_633"
                    :Switch="'Off'"
                ></Component_83_27>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Component_83_23 from "@/components/Component8323.vue";
import Component_83_27 from "@/components/Component8327.vue";
const props = defineProps({
    Status: { type: String },
    text_86_623_83_19: { type: String }
});
</script>
<style>
.Pixso-symbol-86_629 {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-symbol-86_628 {
    width: 51px;
    height: 186px;
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_623 {
    width: 51px;
    height: 50px;
}
.Pixso-instance-86_625 {
    width: 51px;
    height: 136px;
}
.Pixso-symbol-86_630 {
    width: 51px;
    height: 186px;
    position: absolute;
    left: 81px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_631 {
    width: 51px;
    height: 50px;
}
.Pixso-instance-86_633 {
    width: 51px;
    height: 136px;
}

.Pixso-instance-86_625 .stroke-wrapper-83_26 {
    width: 51px;
    height: 136px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_633 .stroke-wrapper-83_26 {
    width: 51px;
    height: 136px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_623 .stroke-wrapper-83_22 {
    width: 51px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_631 .stroke-wrapper-83_22 {
    width: 51px;
    height: 50px;
    left: 0px;
    top: 0px;
}
</style>
