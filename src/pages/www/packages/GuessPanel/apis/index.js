function setUserBet(ctn, room_id, quiz_id, amount, banker_id) {
    return new Promise(resolve => {
        fetch('https://www.douyu.com/member/quiz/user_bet',{
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `ctn=${ ctn }&room_id=${ room_id }&quiz_id=${ quiz_id }&bet_amount=${ amount }&money_type=1&banker_id=${ banker_id }`
        }).then(res => {
            return res.json();
        }).then(ret => {
            resolve(ret);
        }).catch(err => {
            console.log("请求失败!", err);
        })
    })
}

export {
    setUserBet
}