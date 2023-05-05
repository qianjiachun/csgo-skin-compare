// ==UserScript==
// @name         CSGO饰品2D/3D对比
// @namespace    https://github.com/qianjiachun
// @version      2023.05.05.01
// @description  使用图像处理技术对CSGO饰品网站上的皮肤进行对比，可以快速分辨出饰品细微的差异，不用再手动来回切换对比了
// @author       小淳
// @match        *://buff.163.com/goods*
// @match        *://buff.163.com/market/csgo_inspect/3d?compare=true*
// @match        *://spect.fp.ps.netease.com/*
// @match        *://buff.163.com/compare3d*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_setClipboard
// @grant        unsafeWindow
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/notice.js@0.4.0/dist/notice.js
// @require      https://lib.baomitu.com/vue/3.0.11/vue.global.prod.js
// @require      https://cdn.jsdelivr.net/npm/comparison-slider@1.1.0/dist/comparison-slider.min.js
// @require      https://cdn.jsdelivr.net/npm/canvas-compare@3.0.0/src/canvas-compare.min.js
// @require      https://cdn.jsdelivr.net/npm/@vueform/slider@2.0.4/dist/slider.global.js
// ==/UserScript==

unsafeWindow.hookList = [];
unsafeWindow.hookCallback = function (xhr) {
    // console.log(xhr);
}
function addXMLRequestCallback(callback){
    var oldSend, i;
    if( XMLHttpRequest.callbacks ) {
        XMLHttpRequest.callbacks.push( callback );
    } else {
        XMLHttpRequest.callbacks = [callback];
        oldSend = XMLHttpRequest.prototype.send;
        XMLHttpRequest.prototype.send = function(){
            for( i = 0; i < XMLHttpRequest.callbacks.length; i++ ) {
                XMLHttpRequest.callbacks[i]( this );
            }
            oldSend.apply(this, arguments);
        }
    }
}
if (location.href.indexOf("goods") !== -1) {
    addXMLRequestCallback( function( xhr ) {
        xhr.addEventListener("load", function(){
            if ( xhr.readyState == 4 && xhr.status == 200 ) {
                unsafeWindow.hookList.push(xhr);
                unsafeWindow.hookCallback(xhr);
            }
        });
    });
}