import { createApp } from "vue";
import "./styles/index.css"
import { Compare, Diff } from "./views"


let compareList = JSON.parse(GM_getValue("CompareList_2D")) || [];
let app;

function init() {
    initDom();
    initDom_Menu();
    initFunc();
}

function initDom() {
    let a = document.createElement("div");
	a.className = "wrap";
    a.innerHTML = `
    <div class="menu">
        <div class="menu__title">饰品2D对比</div>
        <div class="menu__sub">
            <div class="sub__view">
                <div class="view__title pdl-10">检视图</div>
                <div class="view__content">
                    <div class="view__item pdl-20" id="view__compare">【检视图】对比</div>
                    <div class="view__item pdl-20" id="view__diff">【检视图】差异</div>
                </div>
            </div>

            <div class="sub__texture">
                <div class="texture__title pdl-10">纹理图</div>
                <div class="texture__content">

                </div>
            </div>
        </div>
    </div>

    <div class="view" id="app">

    </div>
    `
	let b = document.body;
    b.appendChild(a);
}

function initDom_Menu() {
    let html_texture = ""; // 纹理图html
    let dom = document.getElementsByClassName("texture__content")[0];

    for (let i = 0; i < compareList[0].textures.length; i++) {
        // 纹理图
        html_texture += `
        <div class="texture__item pdl-20 texture__compare" id="texture__compare${i}">【纹理图${i+1}】对比</div>
        <div class="texture__item pdl-20 texture__diff" id="texture__diff${i}">【纹理图${i+1}】差异</div>
        `
    }
    dom.innerHTML = html_texture;
}

function initFunc() {
    let views = document.getElementsByClassName("view__item");
    let textures = document.getElementsByClassName("texture__item");
    // active事件
    for (let i = 0; i < views.length; i++) {
        views[i].addEventListener("click", () => {
            for (let j = 0; j < views.length; j++) {
                views[j].className = views[j].className.replace(" is-active", "");
            }
            for (let j = 0; j < textures.length; j++) {
                textures[j].className = textures[j].className.replace(" is-active", "");
            }
            views[i].className += " is-active";
        })
    }

    for (let i = 0; i < textures.length; i++) {
        textures[i].addEventListener("click", () => {
            for (let j = 0; j < views.length; j++) {
                views[j].className = views[j].className.replace(" is-active", "");
            }
            for (let j = 0; j < textures.length; j++) {
                textures[j].className = textures[j].className.replace(" is-active", "");
            }
            textures[i].className += " is-active";
        })
    }

    // 业务事件
    document.getElementById("view__compare").addEventListener("click", () => {
        // 检视图对比
        if (app) app.unmount();
        let img1 = compareList[0].inspectUrl;
        let img2 = compareList[1].inspectUrl;
        app = createApp(Compare);
        app.config.globalProperties.img1 = img1;
        app.config.globalProperties.img2 = img2;
        app.mount("#app");
    })
    document.getElementById("view__diff").addEventListener("click", () => {
        // 检视图差异
        if (app) app.unmount();
        let img1 = compareList[0].inspectUrl;
        let img2 = compareList[1].inspectUrl;
        app = createApp(Diff);
        app.config.globalProperties.img1 = img1;
        app.config.globalProperties.img2 = img2;
        app.mount("#app");
    })

    let texture_compare = document.getElementsByClassName("texture__compare");
    let texture_diff = document.getElementsByClassName("texture__diff");

    for (let i = 0; i < texture_compare.length; i++) {
        let item = texture_compare[i];
        item.addEventListener("click", () => {
            // 纹理图对比
            if (app) app.unmount();
            let img1 = compareList[0].textures[i].url;
            let img2 = compareList[1].textures[i].url;
            app = createApp(Compare);
            app.config.globalProperties.img1 = img1;
            app.config.globalProperties.img2 = img2;
            app.mount("#app");
        })
    }

    for (let i = 0; i < texture_diff.length; i++) {
        let item = texture_diff[i];
        item.addEventListener("click", () => {
            // 纹理图差异
            if (app) app.unmount();
            let img1 = compareList[0].textures[i].url;
            let img2 = compareList[1].textures[i].url;
            app = createApp(Diff);
            app.config.globalProperties.img1 = img1;
            app.config.globalProperties.img2 = img2;
            app.mount("#app");
        })
    }

}


export default {
    init
}