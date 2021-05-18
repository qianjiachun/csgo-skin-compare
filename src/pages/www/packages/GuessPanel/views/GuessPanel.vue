<template>
    <div class='guess-panel__wrap'>
        <div class="guess-panel__fishball">
            <span @click="syncTime()">点我同步时间</span>
            鱼丸数：{{ fishBallNum }}
        </div>
        <div class="guess-panel__quiz">
            <quiz-panel v-for="(val, key, index) in quizList" :key="val.qid" :quizInfo="val" @costFishBall="costFishBall"></quiz-panel>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import components from "../components"
import { STT, Ex_WebSocket_UnLogin } from "@/src/requires"
import global from "@/src/global"
import utils from "@/src/utils"

export default {
    components: {
        "quiz-panel": components.QuizPanel
    },
    setup() {
        const quizList = ref({});
        const fishBallNum = ref(0);

        const syncTime = () => {
            let liveVideoNode = document.querySelector(".layout-Player-videoEntity video");
            liveVideoNode.currentTime = liveVideoNode.buffered.end(0);
        }

        const getType = (str) => {
            return utils.getStrMiddle(str, "type@=", "/");
        }

        const handleWs = (text) => {
            handleWs_newQuiz(text);
            handleWs_quiz(text);
        }

        const handleWs_quiz = (text) => {
            // 处理竞猜信息更新
            if (getType(text) == "rquizisn") {
                let ret = STT.deserialize(text);
                if (ret.qril == undefined) {
                    return;
                }
                for (let i = 0; i < ret.qril.length; i++) {
                    let item = ret.qril[i];
                    quizList.value[String(item.qid)] = item;
                }
            }
        }

        const handleWs_newQuiz = (text) => {
            // 处理竞猜新开盘
            if (getType(text) == "rquiziln_new") {
                let ret = STT.deserialize(text);
                if (ret.qril == undefined) {
                    return;
                }
                quizList.value = {};
                for (let i = 0; i < ret.qril.length; i++) {
                    let item = ret.qril[i];
                    quizList.value[String(item.qid)] = item;
                }
            }
        }

        onMounted(() => {
            fishBallNum.value = Number(document.getElementsByClassName("PlayerToolbar-wealthNum")[0].innerText);
            let ws = new Ex_WebSocket_UnLogin(global.rid, handleWs);
        });

        const costFishBall = (num) => {
            fishBallNum.value -= num;
        }
        return {
            fishBallNum,
            quizList,
            syncTime,
            costFishBall
        }
    }
}
</script>

<style scoped>
.guess-panel__wrap {
    padding: 15px 15px;
}

.guess-panel__fishball {
    color: #333;
}
</style>>