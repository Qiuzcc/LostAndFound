import request from "@/utils/request";

function getCampus(){
    return request({
        url:'/common/info/campus',
        method:'get'
    })
}

function getTypes(){
    return request({
        url:'/common/info/types',
        method:'get'
    })
}

// function getTimeframe(){
//     return request({
//         url:'/common/info/timeframe',
//         method:'get'
//     })
// }

export {
    getCampus,
    getTypes
}