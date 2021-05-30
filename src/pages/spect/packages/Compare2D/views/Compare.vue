<template>
    <div class="ComparisonSlider" :style="styleWrap">
        <div class="ComparisonSlider__Before" :style="styleBefore"></div>
		<div class="ComparisonSlider__After" :style="styleAfter"></div>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from "vue";
export default defineComponent({
    setup(props, ctx) {
        let {proxy} = getCurrentInstance();
        let img1 = proxy.img1;
        let img2 = proxy.img2;
        let styleBefore = ref("");
        let styleAfter = ref("");
        let styleWrap = ref("");

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
            styleBefore,
            styleAfter,
            styleWrap
        };
    },
});
</script>

<style scoped>
</style>