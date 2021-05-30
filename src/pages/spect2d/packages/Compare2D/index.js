import "./styles/index.css"

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
                <div class="view__title">检视图</div>
                <div class="view__item">

                </div>
            </div>

            <div class="sub__texture">
                <div class="texture__title">纹理图</div>
                <div class="texture__item">
                
                </div>
            </div>
        </div>
    </div>

    <div class="view">

    </div>
    `
	let b = document.body;
    b.appendChild(a);
}

function initDom_Menu() {
    let html_inspect = ""; // 检视图html
    let html_texture = ""; // 纹理图html
    let dom = document.getElementsByClassName("menu__sub")[0];
    let compareList = JSON.parse(GM_getValue("CompareList_2D")) || [];
    for (let i = 0; i < compareList.length; i++) {
        let item = compareList[i];
        console.log(item)

        // 检视图
        let inspectUrl = item.inspectUrl;

        // 纹理图
    }
}

function initFunc() {
    
}


export default {
    init
}