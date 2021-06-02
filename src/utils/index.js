// 公共
import "./Notice/Notice.css"

export function getStrMiddle(str, before, after) {
    // 取中间文本
	let m = str.match(new RegExp(before + '(.*?)' + after));
	return m ? m[1] : false;
}

export function showMessage(msg, type) {
	// type: success[green] error[red] warning[orange] info[blue]
	new NoticeJs({
		text: msg,
		type: type,
		position: 'bottomRight',
	}).show();
}

export function getBase64(imgUrl, callback) {
	window.URL = window.URL || window.webkitURL;
	var xhr = new XMLHttpRequest();
	xhr.open("get", imgUrl, true);
	xhr.responseType = "blob";
	xhr.onload = function () {
		if (this.status == 200) {
			var blob = this.response;
			let oFileReader = new FileReader();
			oFileReader.onloadend = function (e) {
				let base64 = e.target.result;
				callback(base64);
			};
			oFileReader.readAsDataURL(blob);
		}
	}
	xhr.send();
}

// 模拟鼠标按住拖动
function createMouseEvent(eventName, ofsx, ofsy) {
	return document.createEvent('MouseEvents').initMouseEvent(eventName, true, true, document.defaultView, 0, 0, 0, ofsx, ofsy, false, false, false, false, 0, null);;
};

export function setMouseMove(dom, x, y) {
	dom.dispatchEvent(createMouseEvent("mousedown"));
	dom.dispatchEvent(createMouseEvent("mousemove", x, y));
	dom.dispatchEvent(createMouseEvent("mouseup"));
}