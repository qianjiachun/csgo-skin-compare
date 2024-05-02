import { dateFormat } from "@/src/utils";
import "./styles/index.css"

function init() {
    let hasValidRes = false;
    let timer = setInterval(() => {
        for (let i = unsafeWindow.hookList.length - 1; i >= 0; i--) {
            let item = unsafeWindow.hookList[i];
            if (item.responseURL.includes("goods/sell_order")) {
                clearInterval(timer);
                hasValidRes = true;
                break;
            }
        }
        if (!hasValidRes) {
            let marketShow = new unsafeWindow.marketShow();
            marketShow.init();
            return;
        }
        for (let i = unsafeWindow.hookList.length - 1; i >= 0; i--) {
            let item = unsafeWindow.hookList[i];
            if (item.responseURL.includes("goods/sell_order")) {
                let data = JSON.parse(item.responseText);
                insertDom(data.data.items)
                break;
            }
        }
        unsafeWindow.hookCallback = function (xhr) {
            if (xhr.responseURL.includes("goods/sell_order")) {
                let data = JSON.parse(xhr.responseText);
                insertDom(data.data.items)
            }
        }
    }, 500);
}

function insertDom(items) {
    let sellings = document.querySelectorAll(".list_tb_csgo .selling");
    
    for (let i = 0; i < sellings.length; i++) {
        let itemData = items[i];
        let id = sellings[i].id;
        let t_Lefts = sellings[i].querySelectorAll(".t_Left");
        let target = t_Lefts[t_Lefts.length - 1];
        if (!target) continue;
        if (!id.includes(itemData.id)) continue;
        let div = document.createElement("div");
        div.className = "ex-time";
        div.innerHTML = `${itemData.created_at ? "<span>上架: " + dateFormat("yyyy-MM-dd hh:mm:ss",new Date(itemData.created_at * 1000)) + "</span>" : ""}
        ${itemData.updated_at && itemData.created_at !== itemData.updated_at ? "<br/><span>更新: " + dateFormat("yyyy-MM-dd hh:mm:ss",new Date(itemData.updated_at * 1000)) + "</span>" : ""}`;
        target.insertBefore(div, target.childNodes[0]);
    }
}

export default {
    init
}