import AddButton from "./AddButton"
import CompareList from "./CompareList"
import Compare3D from "./Compare3D"
import Inspect3D from "./Inspect3D"
import ShowTime from "./ShowTime"

function initPkg() {
    if (location.href.indexOf("goods") !== -1) {
        let timer = setInterval(() => {
            if (document.getElementsByClassName("j_shoptip_handler").length > 0) {
                if (unsafeWindow.hookList.length > 0) {
                    clearInterval(timer);
                    initMarket();
                } else {
                    // 调用网页自身的请求实现拦截
                    let marketShow = new unsafeWindow.marketShow();
                    marketShow.init();
                }
            }
        }, 300);
    } else if (location.href.indexOf("compare3d") !== -1) {
        initCompare3D();
    } else if (location.href.indexOf("3d_inspect/cs2") !== -1) {
        initInspect3D();
    }
}

function initMarket() {
    AddButton.init();
    CompareList.init();
    ShowTime.init();
}

function initCompare3D() {
    Compare3D.init();
}

function initInspect3D() {
    Inspect3D.init();
}

export {
    initPkg
}