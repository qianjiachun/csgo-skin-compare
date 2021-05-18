<template>
    <div v-if="quizInfo.qs == '1' ? true : false" class='quiz-item'>
        <div class="quiz-item__header">
            <span class="quiz-item__title">{{ quizInfo.qt }}</span>
            <label style="margin-right:10px">余额：<input v-model="quizQuota" class="quiz-item__maxball" type="text" /></label>
            <label style="margin-right:10px">赔率：<input v-model="minOdds" class="quiz-item__minodds" type="text" />~<input v-model="maxOdds" class="quiz-item__maxodds" type="text" /></label>
        </div>
        <div class="quiz-item__middle">
            <label style="flex:1"><input v-model="firstChecked" type="checkbox" value="on" ref="firstSwitch" @click="startFirstQuiz()" />开始秒盘</label>
            <label><input v-model="secondChecked" type="checkbox" value="on" ref="secondSwitch" />开始秒盘</label>
        </div>
        <div class="quiz-item__bottom">
            <div class="quiz-item__first" @click="betFirstByHand()">
                <div>{{ quizInfo.fon }}（{{ quizInfo.fbmc }}）</div>
                <div>系数{{ Number(quizInfo.folpc/100).toFixed(1) }}</div>
                <div>实际下注 {{ firstRealAmount }}</div>
                <div>赢则得 {{ firstWillWinAmount }}</div>
            </div>
            <div class="quiz-item__second" @click="betSecondByHand()">
                <div>{{ quizInfo.son }}（{{ quizInfo.sbmc }}）</div>
                <div>系数{{ Number(quizInfo.solpc/100).toFixed(1) }}</div>
                <div>实际下注 {{ secondRealAmount }}</div>
                <div>赢则得 {{ secondWillWinAmount }}</div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import utils from "@/src/utils"
import global from "@/src/global"
import { setUserBet } from "../apis"
export default {
    props: {
        quizInfo: Object,
    },
    setup(props, ctx) {
        const quizQuota = ref(10000);
        const minOdds = ref(0);
        const maxOdds = ref(10);

        const firstWinNum = ref(0);
        const firstCostNum = ref(0);
        const firstSwitch = ref(null);

        const secondWinNum = ref(0);
        const secondCostNum = ref(0);
        const secondSwitch = ref(null);

        const firstChecked = ref([]);
        const secondChecked = ref([]);

        const firstRealAmount = ref(0);
        const firstWillWinAmount = ref(0);

        const secondRealAmount = ref(0);
        const secondWillWinAmount = ref(0);

        let isBetting = false;
        let ccn = utils.getCCN();
        // 监测到竞猜信息变化
        // 判断是否满足条件，如果满足条件就下注
        // 1. 是否开启了秒盘功能
        // 2. 盘有效(qs == 1)
        // 3. 剩余额度大于0
        // 4. 赔率区间满足条件
        // 5. 开始下注
        watch(props, (n, o) => {

            if (firstChecked.value.length > 0) {
                firstQuiz(n.quizInfo)
            } 
            if (secondChecked.value.length > 0) {
                secondQuiz(n.quizInfo)
            } 
        })


        const firstQuiz = (info) => {
            let costNum = 0;
            if (isBetting == true) {return;}
            if (info.qs != "1") {firstSwitch.value = [];return;}
            if (quizQuota.value <= 0) {return;}
            if (info.fbmc <= 0) {return;}
            let olpc = Number(info.folpc) / 100;
            if (olpc < minOdds.value || olpc > maxOdds.value) {return;}
            if (info.fbmc > quizQuota.value) {
                // 总鱼丸 > 剩余额度  此时应该下剩余额度
                costNum = quizQuota.value;
            } else {
                // 剩余额度 > 总鱼丸 此时应该下总鱼丸
                costNum = Number(info.fbmc);
            }
            isBetting = true;
            setUserBet(ccn, global.rid, info.qid, costNum, info.fbid).then((betResult) => {
                if (betResult.error == "0") {
                    quizQuota.value -= betResult.data.real_bet_amount;
                    firstRealAmount.value += betResult.data.real_bet_amount;
                    firstWillWinAmount.value += parseInt(0.9 * Number(betResult.data.real_bet_amount) * Number(betResult.data.loss_per_cent) / 100);
                    ctx.emit("costFishBall", betResult.data.real_bet_amount);
                } else {
                    console.log(betResult);
                }
                isBetting = false;
            })
        }
        const secondQuiz = (info) => {
            let costNum = 0;
            if (isBetting == true) {return;}
            if (info.qs != "1") {secondSwitch.value = [];return;}
            if (quizQuota.value <= 0) {return;}
            if (info.sbmc <= 0) {return;}
            let olpc = Number(info.solpc) / 100;
            if (olpc < minOdds.value || olpc > maxOdds.value) {return;}
            if (info.sbmc > quizQuota.value) {
                // 总鱼丸 > 剩余额度  此时应该下剩余额度
                costNum = quizQuota.value;
            } else {
                // 剩余额度 > 总鱼丸 此时应该下总鱼丸
                costNum = Number(info.sbmc);
            }
            isBetting = true;
            setUserBet(ccn, global.rid, info.qid, costNum, info.sbid).then((betResult) => {
                if (betResult.error == "0") {
                    quizQuota.value -= betResult.data.real_bet_amount;
                    secondRealAmount.value += betResult.data.real_bet_amount;
                    secondWillWinAmount.value += parseInt(0.9 * Number(betResult.data.real_bet_amount) * Number(betResult.data.loss_per_cent) / 100);
                    ctx.emit("costFishBall", betResult.data.real_bet_amount);
                } else {
                    console.log(betResult);
                }
                isBetting = false;
            })
        }

        const startFirstQuiz = () => {
            if (firstSwitch.value.length > 0) {
                firstQuiz(props.quizInfo);
            }
        }

        const startSecondQuiz = () => {
            if (secondSwitch.value.length > 0) {
                secondQuiz(props.quizInfo);
            }
        }


        const betFirstByHand = () => {
            let info = props.quizInfo;
            let costNum = 0;
            if (info.fbmc > quizQuota.value) {
                costNum = quizQuota.value;
            } else {
                costNum = Number(info.fbmc);
            }
            setUserBet(ccn, global.rid, info.qid, costNum, info.fbid).then((betResult) => {
                if (betResult.error == "0") {
                    firstRealAmount.value += betResult.data.real_bet_amount;
                    firstWillWinAmount.value += parseInt(0.9 * Number(betResult.data.real_bet_amount) * Number(betResult.data.loss_per_cent) / 100);
                    ctx.emit("costFishBall", betResult.data.real_bet_amount);
                } else {
                    console.log(betResult);
                }
            })
        }

        const betSecondByHand = () => {
            let info = props.quizInfo;
            let costNum = 0;
            if (info.sbmc > quizQuota.value) {
                costNum = quizQuota.value;
            } else {
                costNum = Number(info.sbmc);
            }
            setUserBet(ccn, global.rid, info.qid, costNum, info.sbid).then((betResult) => {
                if (betResult.error == "0") {
                    secondRealAmount.value += betResult.data.real_bet_amount;
                    secondWillWinAmount.value += parseInt(0.9 * Number(betResult.data.real_bet_amount) * Number(betResult.data.loss_per_cent) / 100);
                    ctx.emit("costFishBall", betResult.data.real_bet_amount);
                } else {
                    console.log(betResult);
                }
            })
        }

        return {
            quizQuota,
            minOdds,
            maxOdds,
            startFirstQuiz,
            startSecondQuiz,
            firstSwitch,firstChecked,firstRealAmount,firstWillWinAmount,
            secondSwitch,secondChecked,secondRealAmount,secondWillWinAmount,
            betFirstByHand,betSecondByHand

        }
    }
}
</script>

<style scoped>
.quiz-item {
    width: 370px;
    height: 138px;
    border: 1px solid black;
    border-radius: 10px;
    margin-bottom: 20px;
    text-align: left;
}

.quiz-item__header {
    margin: 3px 0;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
}

.quiz-item__title {
    color: #333;
    font-weight: 700;
    font-size: 14px;
    margin-left: 5px;
    margin-right: 10px;
    flex: 1;
}

.quiz-item__first {
    float: left;
    margin-left: 10px;
    width: 136px;
    height: 80px;
    background: #ed5a65;
    border-radius: 10px;
    cursor: pointer;
}

.quiz-item__second {
    float: right;
    margin-right: 10px;
    width: 136px;
    height: 80px;
    background: #1781b5;
    border-radius: 10px;
    cursor: pointer;
}

.quiz-item__bottom {
    color: #fff;
    text-align: center;
}

.quiz-item__maxball {
    width: 40px;
    text-align: center;
}

.quiz-item__maxodds, .quiz-item__minodds {
    width: 20px;
    text-align: center;
}

.quiz-item__middle {
    display: flex;
    margin-bottom: 3px;
    padding: 0 10px;
}
</style>