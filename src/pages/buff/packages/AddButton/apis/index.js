export function getAssetIdInfo(assetid) {
    return fetch('https://buff.163.com/market/csgo_inspect/3d?assetid=' + assetid,{
		method: 'GET',
		mode: 'no-cors',
		// cache: 'default',
		// credentials: 'include',
	})
}