import { createApp } from "vue"
import {TestA} from "./views"

function init() {
    createApp(TestA).mount("#asset_tag-filter");
}

export default {
    init
}