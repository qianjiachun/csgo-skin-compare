import pages from "./pages"

function initRouter() {
    // 根据需求判断location对象的值，来选择使用哪个page
    if (location.href.indexOf("buff") !== -1) {
        pages.buff.init();
    }

    if (location.href.indexOf("spect") !== -1) {
        pages.spect.init();
    }
}

export {
    initRouter
}