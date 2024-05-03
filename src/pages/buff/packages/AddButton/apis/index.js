export function getAssetIdInfo(assetid) {
    return fetch('https://buff.163.com/api/market/csgo_inspect_3d?assetid=' + assetid,{
		method: 'GET',
		mode: 'no-cors',
		// cache: 'default',
		// credentials: 'include',
	})
}