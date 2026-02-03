<template>
    <div class="component-86_665">
        <div id="86_665" class="Pixso-symbol-86_665">
            <div
                id="86_664"
                class="Pixso-symbol-86_664 effect-outer-shadow---right-side-of-the-border-23_83"
                v-if="Select === 'Default'"
            >
                <Component_83_23
                    id="86_641"
                    class="Pixso-instance-86_641"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_644"
                    class="Pixso-instance-86_644"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_647"
                    class="Pixso-instance-86_647"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_650"
                    class="Pixso-instance-86_650"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_653"
                    class="Pixso-instance-86_653"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_657"
                    class="Pixso-instance-86_657"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_660"
                    class="Pixso-instance-86_660"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_666"
                class="Pixso-symbol-86_666"
                v-if="Select === 'AllTasks'"
            >
                <Component_83_23
                    id="86_667"
                    class="Pixso-instance-86_667"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_669"
                    class="Pixso-instance-86_669"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_671"
                    class="Pixso-instance-86_671"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_673"
                    class="Pixso-instance-86_673"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_675"
                    class="Pixso-instance-86_675"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_677"
                    class="Pixso-instance-86_677"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_679"
                    class="Pixso-instance-86_679"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_681"
                class="Pixso-symbol-86_681"
                v-if="Select === 'Pending'"
            >
                <Component_83_23
                    id="86_682"
                    class="Pixso-instance-86_682"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_684"
                    class="Pixso-instance-86_684"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_686"
                    class="Pixso-instance-86_686"
                    :Function="'Pending'"
                    :status="'Hover'"
                ></Component_86_223>
                <Component_86_223
                    id="86_688"
                    class="Pixso-instance-86_688"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_690"
                    class="Pixso-instance-86_690"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_692"
                    class="Pixso-instance-86_692"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_694"
                    class="Pixso-instance-86_694"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_697"
                class="Pixso-symbol-86_697"
                v-if="Select === 'Finished'"
            >
                <Component_83_23
                    id="86_698"
                    class="Pixso-instance-86_698"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_700"
                    class="Pixso-instance-86_700"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_702"
                    class="Pixso-instance-86_702"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_704"
                    class="Pixso-instance-86_704"
                    :Function="'Finished'"
                    :status="'Hover'"
                ></Component_86_223>
                <Component_86_223
                    id="86_706"
                    class="Pixso-instance-86_706"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_708"
                    class="Pixso-instance-86_708"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_710"
                    class="Pixso-instance-86_710"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_713"
                class="Pixso-symbol-86_713"
                v-if="Select === 'MarkFinish'"
            >
                <Component_83_23
                    id="86_714"
                    class="Pixso-instance-86_714"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_716"
                    class="Pixso-instance-86_716"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_718"
                    class="Pixso-instance-86_718"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_720"
                    class="Pixso-instance-86_720"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_722"
                    class="Pixso-instance-86_722"
                    :Function="'MarkFinish'"
                    :status="'Hover'"
                ></Component_86_223>
                <Component_86_223
                    id="86_724"
                    class="Pixso-instance-86_724"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_726"
                    class="Pixso-instance-86_726"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_729"
                class="Pixso-symbol-86_729"
                v-if="Select === 'ClearFinished'"
            >
                <Component_83_23
                    id="86_730"
                    class="Pixso-instance-86_730"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_732"
                    class="Pixso-instance-86_732"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_734"
                    class="Pixso-instance-86_734"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_736"
                    class="Pixso-instance-86_736"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_738"
                    class="Pixso-instance-86_738"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_740"
                    class="Pixso-instance-86_740"
                    :Function="'ClearFinished'"
                    :status="'Hover'"
                ></Component_86_223>
                <Component_83_27
                    id="86_742"
                    class="Pixso-instance-86_742"
                    :Switch="'ClearAll'"
                ></Component_83_27>
            </div>
            <div
                id="86_760"
                class="Pixso-symbol-86_760"
                v-if="Select === 'ClearAll'"
            >
                <Component_83_23
                    id="86_761"
                    class="Pixso-instance-86_761"
                    :Switch="'On'"
                ></Component_83_23>
                <Component_86_223
                    id="86_763"
                    class="Pixso-instance-86_763"
                    :Function="'AllTasks'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_765"
                    class="Pixso-instance-86_765"
                    :Function="'Pending'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_767"
                    class="Pixso-instance-86_767"
                    :Function="'Finished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_769"
                    class="Pixso-instance-86_769"
                    :Function="'MarkFinish'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_86_223
                    id="86_771"
                    class="Pixso-instance-86_771"
                    :Function="'ClearFinished'"
                    :status="'Default'"
                ></Component_86_223>
                <Component_83_27
                    id="86_773"
                    class="Pixso-instance-86_773"
                    :Switch="'ClearAllHover'"
                ></Component_83_27>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Component_83_23 from "@/components/Component8323.vue";
import Component_86_223 from "@/components/Component86223.vue";
import Component_83_27 from "@/components/Component8327.vue";
const props = defineProps({
    Select: { type: String }
});
</script>
<style>
.Pixso-symbol-86_665 {
    width: 0px;
    height: 0px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-symbol-86_664 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 20px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_641 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_644 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_647 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_650 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_653 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_657 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_660 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_666 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 213px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_667 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_669 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_671 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_673 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_675 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_677 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_679 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_681 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 406px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_682 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_684 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_686 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_688 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_690 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_692 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_694 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_697 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 599px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_698 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_700 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_702 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_704 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_706 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_708 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_710 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_713 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 792px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_714 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_716 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_718 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_720 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_722 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_724 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_726 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_729 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 985px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_730 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_732 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_734 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_736 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_738 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_740 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_742 {
    width: 172px;
    height: 50px;
}
.Pixso-symbol-86_760 {
    width: 172px;
    height: 350px;
    position: absolute;
    left: 1178px;
    top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.Pixso-instance-86_761 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_763 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_765 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_767 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_769 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_771 {
    width: 172px;
    height: 50px;
}
.Pixso-instance-86_773 {
    width: 172px;
    height: 50px;
}

.Pixso-instance-86_644 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_669 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_684 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_700 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_716 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_732 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_763 .stroke-wrapper-86_224 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 50px;
}
.Pixso-instance-86_644 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_669 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_684 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_700 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_716 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_732 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_763 .Pixso-paragraph-86_225 {
    width: 41px;
    height: 30px;
}
.Pixso-instance-86_647 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_671 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_702 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_718 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_734 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_765 .stroke-wrapper-86_226 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_647 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_671 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_702 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_718 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_734 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_765 .Pixso-paragraph-86_227 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_686 .stroke-wrapper-86_228 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 100px;
}
.Pixso-instance-86_686 .Pixso-paragraph-86_229 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_650 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_673 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_688 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_720 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_736 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_767 .stroke-wrapper-86_230 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_650 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_673 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_688 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_720 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_736 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_767 .Pixso-paragraph-86_231 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_704 .stroke-wrapper-86_232 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 150px;
}
.Pixso-instance-86_704 .Pixso-paragraph-86_233 {
    width: 61px;
    height: 30px;
}
.Pixso-instance-86_653 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_675 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_690 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_706 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_738 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_769 .stroke-wrapper-86_234 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_653 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_675 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_690 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_706 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_738 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_769 .Pixso-paragraph-86_235 {
    width: 141px;
    height: 30px;
}
.Pixso-instance-86_722 .stroke-wrapper-86_236 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 200px;
}
.Pixso-instance-86_722 .Pixso-paragraph-86_237 {
    width: 121px;
    height: 30px;
}
.Pixso-instance-86_657 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_677 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_692 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_708 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_724 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_771 .stroke-wrapper-86_238 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_657 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_677 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_692 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_708 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_724 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_771 .Pixso-paragraph-86_239 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_740 .stroke-wrapper-86_240 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 250px;
}
.Pixso-instance-86_740 .Pixso-paragraph-86_241 {
    width: 101px;
    height: 30px;
}
.Pixso-instance-86_660 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_679 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_694 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_710 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_726 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_742 .stroke-wrapper-83_28 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_660 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_679 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_694 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_710 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_726 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_742 .Pixso-paragraph-79_307 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_773 .stroke-wrapper-85_1 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 300px;
}
.Pixso-instance-86_773 .Pixso-paragraph-85_3 {
    width: 81px;
    height: 30px;
}
.Pixso-instance-86_641 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_667 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_682 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_698 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_714 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_730 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_761 .stroke-wrapper-83_24 {
    width: 172px;
    height: 50px;
    left: 0px;
    top: 0px;
}
.Pixso-instance-86_641 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_667 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_682 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_698 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_714 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_730 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
.Pixso-instance-86_761 .Pixso-paragraph-83_25 {
    width: 20px;
    height: 30px;
}
</style>
