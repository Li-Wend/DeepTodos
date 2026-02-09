<template>
    <button id="btn_mark_all_completed" class="stroke-wrapper-btn_mark_all_completed" @click="handleClick">
        <div class="Pixso-frame-btn_mark_all_completed">
            <p id="mark_all_completed" class="Pixso-paragraph-mark_all_completed">
                {{ "全部标为完成" }}
            </p>
        </div>
        <div class="stroke-btn_mark_all_completed"></div>
    </button>
</template>

<script lang="ts" setup>
function handleClick() {
    // 在这里处理全部标为完成的逻辑，例如将所有待办事项的状态更新为完成
    console.log('全部标为完成按钮被点击');
    // 你可以在这里调用一个方法来更新待办事项列表中的所有项的状态
}
</script>

<style lang="scss" scoped>
.stroke-wrapper-btn_mark_all_completed {
    position: relative;
    width: 285px;
    height: 50px;
    display: flex;
    flex-shrink: 0;
    padding: 10px 21px 10px 21px;
    border-radius: 10px 0px 0px 0px;
    background-color: $bright-green;
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
}

.stroke-btn_mark_all_completed {
    position: absolute;
    inset: 0px;
    border-width: 2px 2px 2px 2px;
    pointer-events: none;
}

.Pixso-paragraph-mark_all_completed {
    width: 243px;
    height: 30px;
    position: relative;
    flex-shrink: 0;
    border: none;
    /* 移除输入框的主要边框 */
    outline: none;
    /* 移除输入框在获得焦点时显示的轮廓 */
    @include global-font-main_body();

    &:hover {
        @include global-font-mainBodyBold();
    }
}
</style>