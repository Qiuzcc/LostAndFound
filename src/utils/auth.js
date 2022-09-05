const TokenKey = 'user_token'
const seconds = 5 * 60 * 60;        //设置cookie 5个小时后过期 ， token是6个小时过期

function setToken(token) {
    // // console.log('setToken',token)    //检查，调用、传参均正确
    // const expires = new Date(new Date() * 1 + seconds * 1000);
    // // console.log('expires',expires)  //检查，时间没有问题
    // cookie.set(TokenKey, token, { expires: expires })
    // console.log('检查cookie',cookie.get(TokenKey))

    //从cookie转为localStore存储
    const expires = new Date(new Date() * 1 + seconds * 1000);

    const info = { 'token': token, 'expires': expires }
    localStorage.setItem(TokenKey, JSON.stringify(info))
}

function getToken() {
    // return cookie.get(TokenKey)

    // console.log(localStorage.getItem(TokenKey))
    if (localStorage.getItem(TokenKey)) {
        let { token, expires } = JSON.parse(localStorage.getItem(TokenKey))
        expires = new Date(expires)     // 需要重新使用new Date构造一次，否则解析出来的无法与now比较
        const now = new Date()
        if (now >= expires) {
            removeToken()
            return null     //如果token过期了，删掉，返回null
        }
        return token
    }
    return null
}

function removeToken() {
    // cookie.remove(TokenKey)
    localStorage.removeItem(TokenKey)
}

export { setToken, getToken, removeToken }