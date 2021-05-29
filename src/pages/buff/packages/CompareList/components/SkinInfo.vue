<template>
    <div style="display: flex;">
        <div class="imgWrap">
            <img :src="imgUrl" />
            <a href="javascript:;" class="shalow-btn shalow-btn-green csgo-inspect-view view-btn" :data-assetid="assetid" :data-inspecturl="viewUrl" data-inspectversion="10" data-inspectsize="2560x3538" data-contextid="2">检视图</a>
        </div>
        <div class="infoWrap">
            <div style="font-weight:600">{{skinName}}</div>
            <div style="font-size: 12px;color: #959595;">模板：{{skinSeed}}</div>
            <div style="font-size: 12px;color: #959595;">磨损：{{skinWear}}</div>
            <div class="wear">
                <div class="wear-pointer"><div class="wear-pointer-icon" :style="`left: ${Number(skinWear*100)}%`"></div></div>
                <div class="progress" style="margin-bottom: 5px;"><div class="progress-bar progress-bar-fn" style="width: 7%;" title="崭新出厂"></div><div class="progress-bar progress-bar-success" style="width: 8%;" title="略有磨损"></div><div class="progress-bar progress-bar-warning" style="width: 23%;" title="久经沙场"></div><div class="progress-bar progress-bar-danger" style="width: 7%;" title="破损不堪"></div><div class="progress-bar progress-bar-bs" style="width: 55%;" title="战痕累累"></div></div>
            </div>
            <a class="ctag btn_3d" :data-assetid="assetid"><b><i class="icon icon_3d"></i></b>3D检视</a>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
    props: [
        "imgUrl",  // 图片地址
        "viewUrl", // 检视地址
        "skinName", // 皮肤名
        "skinWear", // 皮肤磨损
        "skinSeed", // 皮肤模板
        "assetid", // 皮肤id
        ], 
    setup(props, ctx) {
        return {
        };
    },
});
</script>

<style scoped>
.imgWrap {
    text-align: center;
    background: url(https://buff.163.com/static/images/item_bg.png);
    background-size: cover;
    width: 88px;
    height: 66px;
}

.imgWrap img {
    width: 66px;
    height: 66px;
    max-width: 88px;
}

.imgWrap .view-btn {
    display: block;
    width: 48px;
    position: relative;
    top: -22px;
    color: white !important;
}

.infoWrap {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    text-align: left;
    justify-content: flex-end;
}
</style>