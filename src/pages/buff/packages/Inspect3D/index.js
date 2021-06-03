// 每个iframe的子页面
import {getQueryString, setMouseMove} from "@/src/utils/index"

let index;

let isMouseDown = false;
let mouseDownInfo = {};
let mouseMoveInfo = {};

function init() {
    index = getQueryString("index");
    initMessage(handleMessage);
    initFunc();
}

function initMessage(callback) {
    window.addEventListener("message", e => {
        callback(e.data);
    })
}

function handleMessage(msg) {
    let dom = document.querySelector("canvas");
    switch (msg.cmd) {
        case "rotate":
            setMouseMove(dom, msg.value.x, msg.value.y);
            break;
        case "reset":
            buffManager.resetScene();
            break;
        default:
            break;
    }
}

function initFunc() {
    let dom = document.querySelector("canvas");

    // 锚点切换
    window.addEventListener("keydown", e => {
        postMessage({
            cmd: "keydown",
            value: e.key
        })
    })

    // 鼠标拖拽
    dom.addEventListener("mousedown", (e) => {
        if (e.isMessage) {
            return;
        }
        isMouseDown = true;
        mouseDownInfo = {
            x: e.pageX,
            y: e.pageY
        }
    })

    dom.addEventListener("mousemove", (e) => {
        if (e.isMessage) {
            return;
        }
        if (isMouseDown) {
            mouseMoveInfo = {
                x: e.pageX - mouseDownInfo.x,
                y: e.pageY - mouseDownInfo.y
            }
        }
    })

    document.body.addEventListener("mouseup", (e) => {
        if (e.isMessage) {
            return;
        }
        isMouseDown = false;
        postMessage({
            cmd: "rotate",
            index: index,
            value: mouseMoveInfo
        });
    })

    document.getElementById("pc").onclick = (e) => {
        // 阻止操作面板影响
        e.stopPropagation();
    }
}

function postMessage(msg) {
    window.parent.postMessage(msg);
}

export default {
    init
}