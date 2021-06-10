<template>
    <div>
        <table class="compare__table">
            <thead>
                <tr>
                    <th width="7%"></th>
                    <th>饰品</th>
                    <th width="25%">卖家</th>
                    <th width="15%">检视</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in compareList" :key="item.assetid">
                    <td width="7%"><input type="checkbox" :id="item.assetid" :value="item.assetid" v-model="checkedList"></td>
                    <td><skin-info :assetid="item.assetid" :imgUrl="item.img_url" :viewUrl="item.inspectUrl" :skinName="item.name" :skinSeed="item.asset_info.paintseed" :skinWear="item.asset_info.paintwear"></skin-info></td>
                    <td width="25%" style="text-align:left">
                        <a :href="item.shopHref" class="j_shoptip_handler" target="_blank">
                            <img :src="item.shopImg" width="30" height="30" class="user-thum">
                            {{item.shopName}}
                        </a>
                    </td>
                    <td width="15%">
                        <a class="ctag btn_3d" :data-assetid="item.assetid"><b><i class="icon icon_3d"></i></b>3D检视</a>
                        <a class="ctag btn_game_cms" :data-assetid="item.assetid" target="_blank"><b><i class="icon icon_game"></i></b>社区服检视</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="list-footer">
            <button @click="onClickClear" type="button" class="el-button el-button--danger" style="margin-right:10px;width:100px;">
                <span>全部删除</span>
            </button>
            <button @click="onClickDelete" type="button" class="el-button el-button--warning" style="margin-right:10px;width:100px;">
                <span>删除选中</span>
            </button>
            <button @click="onClickCompare2d" type="button" class="el-button el-button--primary compare2d-btn" style="margin-right:10px;width:100px;">
                <span>2D对比</span>
            </button>
            <button @click="onClickCompare3d" type="button" class="el-button el-button--success compare3d-btn" style="width:100px;">
                <span>3D对比</span>
            </button>
        </div>
        
    </div>
</template>

<script>
import "@/src/global/styles/index.css"
import { showMessage } from '@/src/utils';
import { defineComponent, ref, onMounted } from 'vue'
import SkinInfo from '../components/SkinInfo.vue';
export default defineComponent({
    components: {
        SkinInfo
    },
    setup(props, ctx) {
        let compareList = ref([]);
        let checkedList = ref([]);

        const updateCompareList = () => {
            compareList.value = JSON.parse(GM_getValue("CompareList") || "[]") || [];
        }

        const onClickDelete = () => {
            for (let i = 0; i < checkedList.value.length; i++) {
                let item = checkedList.value[i];
                let index = getIndexByAssetId(item);
                // 删除元素
                compareList.value.splice(index, 1);
            }
            checkedList.value.length = 0;
            // 处理完后保存数据
            GM_setValue("CompareList", JSON.stringify(compareList.value));
            // 刷新列表
            updateCompareList();
        }

        const onClickClear = () => {
            if (confirm("是否全部删除？")) {
                GM_setValue("CompareList", "[]");
                updateCompareList();
                showMessage("全部删除成功", "success");
            }
        }

        const getIndexByAssetId = (assetid) => {
            let ret = -1;
            for (let i = 0; i < compareList.value.length; i++) {
                let item = compareList.value[i];
                if (item.assetid == assetid) {
                    ret = i;
                    break;
                }
            }
            return ret;
        }

        const onClickCompare2d = () => {
            if (checkedList.value.length == 2) {
                // 判断是不是同类饰品
                let compare2dData = [];
                let textureNum = 0;
                let isSame = true;
                for (let i = 0; i < checkedList.value.length; i++) {
                    let item = checkedList.value[i];
                    let index = getIndexByAssetId(item);
                    if (i == 0) {
                        textureNum = compareList.value[index].textures.length;
                    } else if (compareList.value[index].textures.length !== textureNum) {
                        isSame = false;
                        break;
                    }
                    compare2dData.push(compareList.value[index]);
                }

                if (isSame) {
                    GM_setValue("CompareList_2D", JSON.stringify(compare2dData));
                    window.open("https://spect.fp.ps.netease.com/compare2d");
                } else {
                    showMessage("【2D对比】请选择同类型的饰品", "error");
                }
                
            } else {
                showMessage("【2D对比】请选择2项", "error");
            }
        }

        const onClickCompare3d = () => {
            if (checkedList.value.length > 9) {
                showMessage("【3D对比】最多选择9项", "error");
                return;
            }
            let compare3dData = [];
            for (let i = 0; i < checkedList.value.length; i++) {
                let item = checkedList.value[i];
                let index = getIndexByAssetId(item);
                compare3dData.push(compareList.value[index]);
            }
            GM_setValue("CompareList_3D", JSON.stringify(compare3dData));
            window.open("https://buff.163.com/compare3d");
        }

        onMounted(() => {
            updateCompareList();
        })
        return {
            compareList,
            checkedList,

            onClickDelete, onClickCompare2d, onClickCompare3d, onClickClear
        }
    },
})
</script>

<style scoped>
.compare__table {
    width: 100%;
    margin-bottom: 1rem;
    color: rgb(29,30,35);
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

.list-footer{
    text-align: right;
}
</style>