import { createApp } from "vue"
import views from "./views"

function initPkg_TestA() {
    createApp(views.TestA).mount("#js-player-title");
}

export {
    initPkg_TestA
}