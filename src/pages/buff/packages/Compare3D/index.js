import "./styles/index.css"

// 1. 收集所有的模型iframe
// 2. 给每个iframe设置拖拽事件
// 3. 将事件传给父页面
// 4. 父页面将事件传递给其他的子页面

function init() {
    clearDefaultHtml();
    initDom();
    initMessage(handleMessage);
    initFunc();
}

function clearDefaultHtml() {
    document.title = "CSGO饰品对比 - 3D";
    document.body.innerHTML = "";
    document.body.style.background = "";
    document.querySelectorAll("link").forEach(item => item.remove())
}

function getModelLinks() {
    let ret = [];
    let data = JSON.parse(GM_getValue("CompareList_3D") || "[]") || [];
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        ret.push("https://buff.163.com/market/csgo_inspect/3d?compare=true&assetid=" + item.assetid);
    }
    return ret;
}

function initDom() {
    let links = getModelLinks();
    let html = `
    <div class="compare3d__tips">
        <span>使用说明：</span>
        <br/>
        <span>1. 尽量以直线轨迹拖动，请勿按住来回拖动否则会不同步</span>
        <br/>
        <span>2. 按键盘1~9键可以快速切换模型</span>
        <br/>
        <span>3. 按回车键可让所有模型归位</span>
        <br/>
        <span>4. 请勿在F12下操作，否则会不同步</span>
        <br/>
        <span>5. 模型加载需要时间，请全部加载完再操作</span>
    </div>
    <div class="compare3d__watermark">
        <span>--By 小淳</span>
    </div>
    `;
    for (let i = 0; i < links.length; i++) {
        // id用于锚点跳转
        html += `<iframe id="model${i+1}" class="compare3d__iframe" src="${links[i]}&index=${i+1}"></iframe>`
    }
    let a = document.createElement("div");
	a.className = "compare3d__wrap";
    a.innerHTML = html;
    document.body.appendChild(a);
}

function initFunc() {
    // 父页面锚点快捷键实现
    document.addEventListener("keydown", e => {
        location.href = "https://buff.163.com/compare3d#model" + e.key;
    })

    document.getElementsByClassName("compare3d__watermark")[0].addEventListener("click", (e) => {
        e.stopPropagation();
        window.open("https://github.com/qianjiachun/csgo-skin-compare");
    })

    document.getElementsByClassName("compare3d__tips")[0].onclick = (e) => {
        e.stopPropagation();
    }
}

function initMessage(callback) {
    window.addEventListener("message", (e) => {
        callback(e.data);
    })
}

function handleMessage(msg) {
    let models = document.getElementsByClassName("compare3d__iframe");
    switch (msg.cmd) {
        case "keydown":
            // iframe按下键盘，用于锚点跳转
            if (msg.value == "Enter") {
                // 重置
                for (let i = 0; i < models.length; i++) {
                    postMessage(models[i].contentWindow, {
                        cmd: "reset",
                        value: 0
                    });
                }
            } else if (!isNaN(msg.value)) {
                location.href = "https://buff.163.com/compare3d#model" + msg.value;
            }
            break;
        case "rotate":
            // 得到旋转信息，旋转其他的model
            for (let i = 0; i < models.length; i++) {
                if (Number(msg.index) !== i+1) {
                    // 排除自己
                    postMessage(models[i].contentWindow, {
                        cmd: "rotate",
                        value: msg.value
                    });
                }
            }
            break;
        default:
            break;
    }
}

function postMessage(dom, msg) {
    dom.postMessage(msg);
}

export default {
    init
}