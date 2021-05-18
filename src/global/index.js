let url = document.getElementsByTagName('html')[0].innerHTML;
let urlLen = ("$ROOM.room_id =").length;
let ridPos = url.indexOf('$ROOM.room_id =');
let rid = url.substring(ridPos + urlLen, url.indexOf(';', ridPos + urlLen));
rid = rid.trim();
url = null;
urlLen = null;
ridPos = null;
let dyToken = getToken();
function getToken() {
	let ret = getCookieValue("acf_uid") + "_" + getCookieValue("acf_biz") + "_" + getCookieValue("acf_stk") + "_" + getCookieValue("acf_ct") + "_" + getCookieValue("acf_ltkid");
	return ret;
}
function getCookieValue(name){
   let arr,reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
}

export default {
	dyToken,
	rid
}