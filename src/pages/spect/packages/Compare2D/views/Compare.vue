<template>
    <div class="ComparisonSlider" :style="styleWrap">
        <div class="panel">
            <div class="panel__option">
                <span>明亮度：</span>
                <Slider class="panel__slider" v-model="brightnessValue" :tooltips="false" :max="20" :step="-1" @update="onUpdateSliderBrightness" />
            </div>
        </div>
        <div class="ComparisonSlider__Before" :style="styleBefore" ref="before"></div>
		<div class="ComparisonSlider__After" :style="styleAfter" ref="after"></div>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from "vue";
import Slider from '@vueform/slider'
// const Slider = require('@vueform/slider')
export default defineComponent({
    components: {
        Slider
    },
    setup(props, ctx) {
        let brightnessValue = ref(1);
        let {proxy} = getCurrentInstance();
        let img1 = proxy.img1;
        let img2 = proxy.img2;
        let styleBefore = ref("");
        let styleAfter = ref("");
        let styleWrap = ref("");

        let before = ref(null);
        let after = ref(null);

        const onUpdateSliderBrightness = (v) => {
            before.value.style.filter = `brightness(${v})`;
            after.value.style.filter = `brightness(${v})`;
        }

        onMounted(() => {
            let img = new Image();
            img.src = img1
            img.onload = () => {
                let ratio = img.height / img.width;
                let width = document.getElementById("app").clientWidth;
                let height = width * ratio;
                document.getElementsByClassName("menu")[0].style.height = height;
                styleWrap.value = `width:${width};height:${height};`
                styleBefore.value = `background-image: url(${img1})`;
                styleAfter.value = `background-image: url(${img2})`;
                nextTick(() => {
                    const comparisonSlider = new ComparisonSlider();
                })
            }
        })
        return {
            before,after,
            onUpdateSliderBrightness,
            styleBefore,
            styleAfter,
            styleWrap,
            brightnessValue
        };
    },
});
</script>

<style scoped>
.panel {
    width: 250px;
    height: 45px;
    background-color: rgba(255, 255, 255, 0.2);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    padding: 10px;
    box-sizing: border-box;
    color: rgba(255,255,255,0.7);
}
.panel__slider {
    display: inline-block;
    width: 160px;
}
.panel__option {
    margin-bottom: 10px;
}
.panel__option:last-child {
    margin-bottom: 0px;
}
</style>