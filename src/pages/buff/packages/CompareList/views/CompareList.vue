<template>
    <div>
        <table class="compare__table">
            <thead>
                <tr>
                    <th width="7%"></th>
                    <th>饰品</th>
                    <th>价格</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in compareList" :key="index">
                    <td width="7%"><input type="checkbox" :id="item.assetid" :value="item.assetid" v-model="checkedList"></td>
                    <td><skin-info :assetid="item.assetid" :imgUrl="item.img_url" :viewUrl="item.inspectUrl" :skinName="item.name" :skinSeed="item.asset_info.paintseed" :skinWear="item.asset_info.paintwear"></skin-info></td>
                </tr>
            </tbody>
        </table>
        <div @click="l">哈哈</div>
    </div>
</template>

<script>
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import SkinInfo from '../components/SkinInfo.vue';
export default defineComponent({
    components: {
        SkinInfo
    },
    setup(props, ctx) {
        let compareList = ref([]);
        let checkedList = ref([]);
        const l = () => {
            console.log(checkedList.value)
        }
        onMounted(() => {
            compareList.value = JSON.parse(GM_getValue("CompareList")) || [];
            console.log(compareList.value);
        })
        return {
            compareList,
            checkedList,
            l
        }
    },
})
</script>

<style scoped>
.compare__table {
    width: 100%;
    margin-bottom: 1rem;
    color: #212529;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: center;
}

.compare__table th, .compare__table td{
    border: 1px solid #dee2e6;
    padding: .75rem;
}

.compare__table thead th{
    color: #fff;
    background-color: #343a40;
    border-color: #454d55;
}

.compare__table tbody {
    display: block;
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.compare__table thead,
.compare__table tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
}
.compare__table thead {
    width: calc( 100% - 4px)
}

.compare__table tbody tr:hover {
    background: rgb(245,245,245);
}
</style>