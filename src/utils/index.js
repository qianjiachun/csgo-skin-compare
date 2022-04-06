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
	let evt = document.createEvent('MouseEvents');
	evt = new MouseEvent(eventName, {
		clientX: ofsx,
		clientY: ofsy,
		bubbles: true
	})
	evt.isMessage = true;
	return evt
};

export function setMouseMove(dom, x, y) {
	dom.dispatchEvent(createMouseEvent("mousedown"));
	dom.dispatchEvent(createMouseEvent("mousemove", x, y));
	dom.dispatchEvent(createMouseEvent("mouseup"));
}

// 获取URL参数
export function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

export function dateFormat(fmt, date) {
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}