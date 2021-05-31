import {initPkg} from "./packages"

function beforeInit() {
    // 清除页面默认数据
    document.title = "CSGO饰品对比 - 2D";
    document.body.innerHTML = "";
}

function init(mode) {
    beforeInit();
    initPkg(mode);
}

export default {
    init
}