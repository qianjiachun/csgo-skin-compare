import {initPkg} from "./packages"

function beforeInit() {

}

function init() {
    beforeInit();
    let timer = setInterval(() => {
        if (document.getElementsByClassName("t_Left")) {
            initPkg();
            clearInterval(timer);
        }
    }, 300);
}

export default {
    init
}