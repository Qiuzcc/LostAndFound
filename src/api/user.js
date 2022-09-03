import request from '@/utils/request'

function getUserInfo() {
    return request({
        url: '/userinfo',     
        method: 'get',
    })
}

/**
 * 
 * @param {Object} data {username,password}
 * @returns Promise
 */
function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

function logout(){
    return request({
        url:'/logout',
        method:'post',
    })
}

/**
 * 
 * @param {Object} data 有且仅有一个key-value对，key值在数据库的key值范围内
 * @returns             对接后端的userController.updateInfo，返回一个Promise对象，
 *                      成功返回{code:200, message:'修改成功'}；失败返回错误信息                    
 */
function updateInfo(data){
    return request({
        url:'/userinfo/update',
        method:'post',
        data
    })
}

export { getUserInfo, login, logout, updateInfo }