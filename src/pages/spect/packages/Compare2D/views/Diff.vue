<template>
    <div>
        <div style="position: absolute;">加载中...</div>
        <div class="panel">
        </div>
        <div style="filter: brightness(20);" ref="canvas1"></div>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from "vue";
import { getBase64 } from "@/src/utils/index"
export default defineComponent({
    components: {
    },
    setup(props, ctx) {
        let {proxy} = getCurrentInstance();
        let img1Url = proxy.img1;
        let img2Url = proxy.img2;
        let img1 = ref(null);
        let img2 = ref(null);
        
        let canvas1 = ref(null);
        
        let params = ref({
            baseImageUrl: "",
            targetImageUrl: "",
            resolution: 1, // 0.01..1, optional, defaults to 1
            threshold: 0, // 0..255, optional, defaults to 0
            isNormalized: false // Boolean, optional, defaults to false
        })

        const renderDiffImg = () => {
            let img = new Image();
            img.src = img1.value;
            img.onload = () => {
                let ratio = img.height / img.width;
                let width = document.getElementById("app").clientWidth;
                let height = width * ratio;
                document.getElementsByClassName("menu")[0].style.height = height;
                nextTick(() => {
                    const promiseCompare = canvasCompare(params.value);

                    promiseCompare.then(function (result) {
                        // Do things with result
                        let imgDom = result.producePreview();
                        imgDom.width = document.getElementById("app").clientWidth;
                        imgDom.height = height;
                        canvas1.value.appendChild(imgDom);
                    });
                })
            }
        }

        onMounted(() => {
            let img1Finished = false;
            let img2Finished = false;

            getBase64(img1Url, (base64) => {
                img1.value = base64;
                params.value.baseImageUrl = img1.value;
                img1Finished = true;
                if (img2Finished) {
                    renderDiffImg();
                }
            })
            getBase64(img2Url, (base64) => {
                img2.value = base64;
                params.value.targetImageUrl = img2.value;
                img2Finished = true;
                if (img1Finished) {
                    renderDiffImg();
                }
            })
        })
        return {
            canvas1,
        };
    },
});
</script>

<style scoped>
.panel {
    width: 250px;
    height: 200px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 10px 10px 0px 0px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
}

</style>