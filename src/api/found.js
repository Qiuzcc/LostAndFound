import request from "@/utils/request";

function getFound(){
    return request({
        url:'/found',
        method:'get'
    })
}

function addFound(data){
    return request({
        url:'/found',
        method:'post',
        data
    })
}

/**
 * 
 * @param {Object} params {id:found的_id}
 * @returns 
 */
function getFoundDetail(params){
    return request({
        url:'/found/detail',
        method:'get',
        params
    })
}

/**
 * 
 * @param {Object} params {id:found的_id}
 * @param {Object} data   {password:用户密码}
 * @returns 
 */
function getFoundOwner(params,data){
    return request({
        url:'/found/detail/user',
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
function getFilterFound(params){
    return request({
        url:'/found/filter',
        method:'get',
        params
    })
}

export {
    getFound,
    addFound,
    getFoundDetail,
    getFoundOwner,
    getFilterFound
}