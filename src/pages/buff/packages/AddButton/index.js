import {getAssetIdInfo} from "./apis"
import {getStrMiddle, showMessage} from "@/src/utils"
import {DomHook} from "@/src/utils/DomHook"


let skinImg // 皮肤图片地址
let skinName // 皮肤名字
const LIST_MAX = 50 // 对比列表最多存放数

function init() {
    initDom();
    initFunc();
    let hook = new DomHook(".detail-tab-cont", false, (m => {
        for (let i = 0; i < m[0].addedNodes.length; i++) {
            let item = m[0].addedNodes[i];
            if (item.id == "market-selling-list") {
                initDom();
                initFunc();
                break;
            }
        }
    }))
}

function initDom() {
    initDom_addBtn();
    initDom_CopyBtn();
}

function initDom_addBtn() {
    skinImg = getSkinImg();
    skinName = getSkinName();
    let domList = document.getElementsByClassName("ctag btn_3d");
    for (let i = 0; i < domList.length; i++) {
        let parentDom = domList[i].parentNode;
        let trDom = domList[i].parentNode.parentNode.parentNode.parentNode;
        let assetid = domList[i].getAttribute("data-assetid");
        let inspectUrl = trDom.getElementsByClassName("csgo_inspect_img_btn")[0].getAttribute("data-inspecturl");
        console.log(assetid, inspectUrl)
        if (!trDom.getElementsByClassName("btn-buy-order")[0]) {
            // 有自己上架的饰品
            continue;
        }
        let price = trDom.getElementsByClassName("btn-buy-order")[0].getAttribute("data-price");
        let shopDom = trDom.getElementsByClassName("j_shoptip_handler")[0];
        let shopHref = shopDom.href;
        let shopImg = shopDom.getElementsByClassName("user-thum")[0].src;
        let shopName = shopDom.innerText;
        
        if (assetid) {
            let dom = document.createElement("a");
            dom.className = "ctag compare-btn";
            dom.setAttribute("assetid", assetid);
            dom.setAttribute("inspecturl", inspectUrl);
            dom.setAttribute("price", price);
            dom.setAttribute("shop_href", shopHref);
            dom.setAttribute("shop_img", shopImg);
            dom.setAttribute("shop_name", shopName);
            dom.innerHTML = `<b><i class="icon"><svg t="1621435629962" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10682" width="16" height="16"><path d="M896 452.48l-211.2-122.88a32 32 0 0 0-16-4.48 32.64 32.64 0 0 0-16 4.48l-53.76 30.72v-60.16a32 32 0 0 0-16-27.52l-211.2-122.88a31.36 31.36 0 0 0-16-4.48 32 32 0 0 0-16 4.48L128 272a32 32 0 0 0-16 27.52V544a32 32 0 0 0 16 27.52l211.2 122.88a32 32 0 0 0 16 4.48 32.64 32.64 0 0 0 16-4.48l21.76-12.16V608l-37.76 21.76-179.84-104.32V320l180.48-105.6L535.68 320V526.08l-46.08 26.88v-55.04l14.08-8.32V416l-64 35.84a32 32 0 0 0-16 27.52V723.84a32 32 0 0 0 16 27.52l211.84 122.88a32 32 0 0 0 32 0l212.48-121.6a32 32 0 0 0 16-27.52V480a32 32 0 0 0-16-27.52z m-48.64 256l-179.84 103.68L488.32 704V626.56l94.08-54.4a32 32 0 0 0 16-27.52V434.56l69.76-40.32 179.84 104.32z" fill="#040c32" p-id="10683"></path></svg></i></b>加入对比`;
            parentDom.appendChild(dom);
        }
    }
}

function initDom_CopyBtn() {
    let domList = document.getElementsByClassName("pic-cont item-detail-img");
    for (let i = 0; i < domList.length; i++) {
        let trDom = domList[i].parentNode.parentNode;
        let parentDom = trDom.getElementsByClassName("csgo_value")[0];
        let sell_order_id = domList[i].getAttribute("data-orderid");
        let assetid = domList[i].getAttribute("data-assetid");
        let appid = domList[i].getAttribute("data-appid");
        let classid = domList[i].getAttribute("data-classid");
        let instanceid = domList[i].getAttribute("data-instanceid");

        let dom = document.createElement("a");
        dom.style.marginLeft = "5px";
        dom.className = "ctag copylink-btn";
        dom.setAttribute("assetid", assetid);
        dom.setAttribute("instanceid", instanceid);
        dom.setAttribute("appid", appid);
        dom.setAttribute("classid", classid);
        dom.setAttribute("sell_order_id", sell_order_id);
        dom.innerHTML = `<b><i class="icon">
        <svg t="1639763479087" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3348" width="16" height="16"><path d="M184.61 839.39a273 273 0 0 1 0-386.08l78.49-78.49a8 8 0 0 1 11.31 0l39.6 39.6a8 8 0 0 1 0 11.31L236.75 503c-78.13 78.14-79.4 207.24-1.3 285.42 78.36 78.44 205.93 78.46 284.33 0.07L598.27 710a8 8 0 0 1 11.31 0l39.6 39.6a8 8 0 0 1 0 11.31l-78.49 78.49a273 273 0 0 1-386.08 0zM749.59 649.18L710 609.58a8 8 0 0 1 0-11.31L787.25 521c78.13-78.14 79.4-207.24 1.3-285.42-78.36-78.44-205.93-78.46-284.33-0.07L425.73 314a8 8 0 0 1-11.31 0l-39.6-39.6a8 8 0 0 1 0-11.31l78.49-78.49a273 273 0 1 1 386.08 386.09l-78.49 78.49a8 8 0 0 1-11.31 0z" fill="#264097" p-id="3349"></path><path d="M328.149823 644.936246m5.656854-5.656854l305.470129-305.470129q5.656854-5.656854 11.313709 0l39.59798 39.597979q5.656854 5.656854 0 11.313709l-305.47013 305.470129q-5.656854 5.656854-11.313708 0l-39.59798-39.597979q-5.656854-5.656854 0-11.313709Z" fill="#264097" p-id="3350"></path></svg>
        </i></b>检视链接`;
        parentDom.appendChild(dom);
    }
}

function initFunc() {
    let domList = document.getElementsByClassName("compare-btn");
    for (let i = 0; i < domList.length; i++) {
        domList[i].addEventListener("click", () => {
            let assetid = domList[i].getAttribute("assetid");
            let inspectUrl = domList[i].getAttribute("inspecturl");
            let price = domList[i].getAttribute("price");
            let shopHref = domList[i].getAttribute("shop_href");
            let shopImg = domList[i].getAttribute("shop_img");
            let shopName = domList[i].getAttribute("shop_name");
            onClickAddButton({
                assetid: assetid,
                inspectUrl: inspectUrl,
                price: price,
                shopHref: shopHref,
                shopImg: shopImg,
                shopName: shopName
            });
        })
    }

    let domListCopy = document.getElementsByClassName("copylink-btn");
    for (let i = 0; i < domListCopy.length; i++) {
        domListCopy[i].addEventListener("click", () => {
            let assetid = domListCopy[i].getAttribute("assetid");
            let instanceid = domListCopy[i].getAttribute("instanceid");
            let appid = domListCopy[i].getAttribute("appid");
            let classid = domListCopy[i].getAttribute("classid");
            let sell_order_id = domListCopy[i].getAttribute("sell_order_id");
            let text = `https://buff.163.com/market/m/item_detail?appid=${appid}&game=csgo&assetid=${assetid}&classid=${classid}&instanceid=${instanceid}&sell_order_id=${sell_order_id}`
            GM_setClipboard(text);
            showMessage("复制成功，可粘贴至社区服检视", "success");
        })
    }
}

function onClickAddButton(info) {
    // GM_deleteValue("CompareList");
    // return
    getAssetIdInfo(info.assetid).then(res => {
        return res.text();
    }).then(ret => {
        if (ret.indexOf("not found") !== -1 || ret.indexOf("不支持3D") !== -1) {
            showMessage("解析该饰品失败", "error");
            return;
        }
        let doc = (new DOMParser()).parseFromString(ret, 'text/html');
        let scripts = doc.scripts;
        let data = JSON.parse(getStrMiddle(scripts[scripts.length - 1].innerHTML, "var data = ", ";"));
        if (!data) {
            showMessage("解析失败 原因：未登录", "error");
            return;
        }
        let obj = getSkinData(data);
        obj.assetid = info.assetid;
        obj.price = info.price;
        obj.inspectUrl = info.inspectUrl;
        obj.shopHref = info.shopHref;
        obj.shopImg = info.shopImg;
        obj.shopName = info.shopName;
        if (obj) {
            if (saveData2CompareList(obj)) {
                showMessage("加入对比列表成功", "success");
            } else {
                showMessage("该饰品已存在于对比列表", "error");
            }
        } else {
            showMessage("加入对比列表失败", "error");
        }
        
    }).catch(err => {
        console.log(err);
    })
}

function getSkinData(data) {
    // 构造对比列表里的饰品对象信息
    let ret = data;
    if (data) {
        let i = 1;
        let textureList = [];
        while (`texture_${i}` in data.texture_url) {
            if (i > 1000) {
                // 熔断
                break;
            }
            textureList.push({id: `texture_${i}`, url: data.texture_url[`texture_${i}`]});
            i++;
        }
        ret.textures = textureList;
        ret.name = skinName;
        ret.img_url = skinImg;
        ret.update_time = new Date().getTime();
    }
    return ret;
}

function getSkinImg() {
    let ret = "";
    let parent = document.getElementsByClassName("t_Center");
    if (parent) {
        let imgDom = parent[0].getElementsByTagName("img");
        if (imgDom) {
            ret = imgDom[0].src;
        }
    }
    return ret;
}

function getSkinName() {
    let ret = "";
    let parent = document.getElementsByClassName("cru-goods");
    for (let i = 0; i < parent.length; i++) {
        let item = parent[i];
        ret += item.innerText;
    }
    return ret;
}

function saveData2CompareList(data) {
    let value = GM_getValue("CompareList") || "[]";
    let compareList = JSON.parse(value);

    let isExist = false;
    for (let i = 0; i < compareList.length; i++) {
        if (data.assetid == compareList[i].assetid) {
            isExist = true;
            break;
        }
    }
    if (isExist) {
        return false;
    }
    if (compareList.length > LIST_MAX) {
        compareList.pop(); // 删除最后一个
    }
    compareList.unshift(data); // 插入到第一个
    
    let text = JSON.stringify(compareList);
    GM_setValue("CompareList", text);
    return true;
}

export default {
    init
}