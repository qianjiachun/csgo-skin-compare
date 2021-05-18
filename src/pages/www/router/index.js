import { initPkg } from "../packages"

function init() {
    // initPkg();
    let intID = setInterval(() => {
        if (typeof(document.getElementsByClassName("PlayerToolbar-wealthNum")[0]) != "undefined") {
            setTimeout(() => {
                initPkg();
            }, 1500)
            clearInterval(intID);
        }
    }, 1000);
}

export default {
    init
}