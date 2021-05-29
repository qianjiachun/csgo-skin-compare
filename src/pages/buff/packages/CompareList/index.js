import {CompareList} from "./views"
import {createApp} from "vue"
import "./styles/index.css"

function init() {
    initDom();
    initFunc();
    // createApp(CompareList).mount("#j_mybackpack");
}

function initDom() {
    let a = document.createElement("li");
	a.className = "j_drop-handler";
    a.id = "comparelist"
    a.innerHTML = `<a href="javascript: void(0);"><strong>对比列表</strong></a> <i class="icon icon_new" style="display: none;"></i>`
	let b = document.querySelector(".nav > ul");
    b.appendChild(a);
	// b.insertBefore(a, b.childNodes[0]);
}

function initFunc() {
    let body = document.body;
    document.getElementById("comparelist").addEventListener("click", () => {
        onClickCloseCompareList();
        let a = document.createElement("div");
        a.className = "compare__wrap";
        a.style.width = `${body.offsetWidth}px`;
        a.style.height = `${body.offsetHeight}px`;
        a.innerHTML = `
        <div class="compare__dialog" id="compare__app">
        
        </div>
        <div class="compare__mask"></div>
        `
        body.insertBefore(a, body.childNodes[0]);

        document.getElementsByClassName("compare__mask")[0].addEventListener("click", () => {
            onClickCloseCompareList();
        });
        
        createApp(CompareList).mount("#compare__app");
        // createApp(CompareList).mount("#compare__app");
        // createApp(CompareList).mount("#compare__app");
        // console.log(JSON.parse(GM_getValue("CompareList") || "[]"))
    });
}

function onClickCloseCompareList() {
    let lastDom = document.getElementsByClassName("compare__wrap")[0];
    if (lastDom) {
        lastDom.remove();
    }
}

export default {
    init
}