import {getAssetIdInfo} from "./apis"
import {getStrMiddle} from "@/src/utils"

function init() {
    initDom();
    initFunc();
}

function initDom() {
    let domList = document.getElementsByClassName("ctag btn_3d");
    for (let i = 0; i < domList.length; i++) {
        let parentDom = domList[i].parentNode;
        let assetid = domList[i].getAttribute("data-assetid");
        if (assetid) {
            let dom = document.createElement("a");
            dom.className = "ctag compare-btn";
            dom.setAttribute("assetid", assetid);
            dom.innerHTML = `<b><i class="icon"><svg t="1621435629962" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10682" width="16" height="16"><path d="M896 452.48l-211.2-122.88a32 32 0 0 0-16-4.48 32.64 32.64 0 0 0-16 4.48l-53.76 30.72v-60.16a32 32 0 0 0-16-27.52l-211.2-122.88a31.36 31.36 0 0 0-16-4.48 32 32 0 0 0-16 4.48L128 272a32 32 0 0 0-16 27.52V544a32 32 0 0 0 16 27.52l211.2 122.88a32 32 0 0 0 16 4.48 32.64 32.64 0 0 0 16-4.48l21.76-12.16V608l-37.76 21.76-179.84-104.32V320l180.48-105.6L535.68 320V526.08l-46.08 26.88v-55.04l14.08-8.32V416l-64 35.84a32 32 0 0 0-16 27.52V723.84a32 32 0 0 0 16 27.52l211.84 122.88a32 32 0 0 0 32 0l212.48-121.6a32 32 0 0 0 16-27.52V480a32 32 0 0 0-16-27.52z m-48.64 256l-179.84 103.68L488.32 704V626.56l94.08-54.4a32 32 0 0 0 16-27.52V434.56l69.76-40.32 179.84 104.32z" fill="#040c32" p-id="10683"></path></svg></i></b>加入对比`;
            parentDom.appendChild(dom);
        }
    }
}

function initFunc() {
    let domList = document.getElementsByClassName("compare-btn");
    for (let i = 0; i < domList.length; i++) {
        domList[i].addEventListener("click", () => {
            let assetid = domList[i].getAttribute("assetid");
            onClickAddButton(assetid);
        })
    }
}

function onClickAddButton(assetid) {
    getAssetIdInfo(assetid).then(res => {
        return res.text();
    }).then(ret => {
        if (ret.indexOf("not found") !== -1 || ret.indexOf("不支持3D") !== -1) {
            alert("不支持");
            return;
        }
        let doc = (new DOMParser()).parseFromString(ret, 'text/html');
        let scripts = doc.scripts;
        let data = JSON.parse(getStrMiddle(scripts[scripts.length - 1].innerHTML, "var data = ", ";"));
        console.log(data);
    }).catch(err => {
        console.log(err);
    })
}

export default {
    init
}