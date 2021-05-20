import {CompareList} from "./views"
import {createApp} from "vue"

function init() {
    createApp(CompareList).mount("#j_mybackpack");
}

export default {
    init
}