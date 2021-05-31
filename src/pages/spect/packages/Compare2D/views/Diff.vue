<template>
    <div>
        <div class="panel">
            <div class="panel__option">
                <span>明亮度：</span>
                <Slider class="panel__slider" v-model="brightnessValue" :tooltips="false" :max="20" :step="-1" @update="onUpdateSliderBrightness" />
            </div>
            <div class="panel__option">
                <span>分辨率：</span>
                <Slider class="panel__slider" v-model="resolutionValue" :tooltips="false" :max="1" :step="-1" @change="onUpdateSliderResolution" />
            </div>
            <div class="panel__option">
                <span style="margin-right: 16px;">阈值：</span>
                <Slider class="panel__slider" v-model="thresholdValue" :tooltips="false" :max="70" @change="onUpdateSliderThreshold" />
            </div>
        </div>
        <div style="filter: brightness(10);" ref="canvas1"></div>
    </div>
</template>

<script>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from "vue";
import { getBase64, showMessage } from "@/src/utils/index"
import Slider from '@vueform/slider'
export default defineComponent({
    components: {
        Slider
    },
    setup(props, ctx) {
        let brightnessValue = ref(10);
        let resolutionValue = ref(1);
        let thresholdValue = ref(0);
        

        let {proxy} = getCurrentInstance();
        let img1Url = proxy.img1;
        let img2Url = proxy.img2;
        let img1 = ref(null);
        let img2 = ref(null);
        let canvas1 = ref(null);
        let imgDom = null;
        let ratio = 0;
        
        let params = ref({
            baseImageUrl: "",
            targetImageUrl: "",
            resolution: 1, // 0.01..1, optional, defaults to 1
            threshold: 0, // 0..255, optional, defaults to 0
            isNormalized: false // Boolean, optional, defaults to false
        })

        const removeBlack = () => {
			for (let i = 0; i < data.length; i += 4) {
				if(data[i]+ data[i + 1] + data[i + 2] < 10){ 
					data[i + 3] = 0; // alpha
				}
			} 
			context.putImageData(imageData, 0, 0); 
		}; 

        const onUpdateSliderBrightness = (v) => {
            canvas1.value.style.filter = `brightness(${v})`;
        }

        const onUpdateSliderResolution = (v) => {
            let obj = params.value;
            obj.resolution = v;
            updateDiffImg(obj);
        }

        const onUpdateSliderThreshold = (v) => {
            let obj = params.value;
            obj.threshold = v;
            updateDiffImg(obj);
        }

        const updateDiffImg = (option) => {
            showMessage("图片加载中...", "info");
            params.value = option;
            const promiseCompare = canvasCompare(params.value);

            promiseCompare.then(function (result) {
                // Do things with result
                if (imgDom) {
                    canvas1.value.removeChild(imgDom);
                }
                imgDom = result.producePreview();
                imgDom.width = document.getElementById("app").clientWidth;
                imgDom.height = imgDom.width * ratio;
                canvas1.value.appendChild(imgDom);
            });
        }

        const renderDiffImg = () => {
            let img = new Image();
            img.src = img1.value;
            img.onload = () => {
                ratio = img.height / img.width;
                document.getElementsByClassName("menu")[0].style.height = document.getElementById("app").clientWidth * ratio;
                nextTick(() => {
                    updateDiffImg(params.value);
                })
            }
        }

        onMounted(() => {
            // return
            showMessage("图片加载中...", "info");
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
            brightnessValue,resolutionValue,thresholdValue,
            onUpdateSliderBrightness,onUpdateSliderResolution,onUpdateSliderThreshold
        };
    },
});
</script>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.panel {
    width: 250px;
    height: 110px;
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