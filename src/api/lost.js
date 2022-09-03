import request from "@/utils/request";

function getLost(){
    return request({
        url:'/lost',
        method:'get'
    })
}

function addLost(data){
    return request({
        url:'/lost',
        method:'post',
        data
    })
}

/**
 * 
 * @param {Object} params {id:lost的_id}
 * @returns 
 */
 function getLostDetail(params){
    return request({
        url:'/lost/detail',
        method:'get',
        params
    })
}

/**
 * 
 * @param {Object} params {id:lostd的_id}
 * @param {Object} data   {password:用户密码}
 * @returns 
 */
function getLostOwner(params,data){
    return request({
        url:'/lost/detail/user',
        method:'post',
        params,
        data
    })
}

/**
 * 
 * @param {Object} params {date:Date类型实例,campus:String,type:String} 有1-3个参数
 * @returns 
 */
function getFilterLost(params){
    return request({
        url:'/lost/filter',
        method:'get',
        params
    })
}

// export default {
//     getLost
// }
// 以上这种写法是错的
// export default与export的区别
// export default {getLost} default作为导出模块的名（在import的时候可以直接重命名），import {getList} from 该模块，导入的getList是一个对象而不是函数getList
// export {getList} ,import {getList} from 该模块，导入的getList就是对应的函数getList

export {
    getLost,
    addLost,
    getLostDetail,
    getLostOwner,
    getFilterLost
}