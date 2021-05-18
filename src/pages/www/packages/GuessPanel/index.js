import "./styles/index.css"
import { createApp } from "vue"
import views from "./views"
function initPkg_GuessPanel() {
    initPkg_GuessPanel_Dom();
    initPkg_GuessPanel_Func();
    createApp(views.GuessPanel).mount("#guess-panel");
}

function initPkg_GuessPanel_Dom() {
    let a = document.createElement("div");
	a.id = "guess-panel";
	
	let b = document.getElementsByClassName("PlayerToolbar-Wealth")[0];
	b.insertBefore(a, b.childNodes[0]);
}

function initPkg_GuessPanel_Func() {

}

function GuessPanel_showGuessPanel() {
    let a = document.getElementById("guess-panel");
    if (a.style.display != "block") {
		a.style.display = "block";
	} else {
		a.style.display = "none";
	}
}

export {
    initPkg_GuessPanel,
    GuessPanel_showGuessPanel
}