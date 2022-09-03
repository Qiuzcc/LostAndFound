import cookie from 'js-cookie'

const TokenKey = 'user_token'
const seconds = 5 * 60 * 60;        //设置cookie 5个小时后过期 ， token是6个小时过期
const expires = new Date(new Date() * 1 + seconds * 1000);

function setToken(token) {
    cookie.set(TokenKey, token, { expires: expires })
}

function getToken() {
    return cookie.get(TokenKey)
}

function removeToken() {
    cookie.remove(TokenKey)
}

export { setToken, getToken, removeToken }