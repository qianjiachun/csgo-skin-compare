import AddButton from "./AddButton"
import CompareList from "./CompareList"
import Compare3D from "./Compare3D"
function initPkg() {
    if (location.href.indexOf("market/goods") !== -1) {
        let timer = setInterval(() => {
            if (document.getElementsByClassName("t_Left")) {
                initMarket();
                clearInterval(timer);
            }
        }, 300);
    } else if (location.href.indexOf("compare3d") !== -1) {
        initCompare3D();
    }
}

function initMarket() {
    AddButton.init();
    CompareList.init();
}

function initCompare3D() {
    Compare3D.init();
}

export {
    initPkg
}