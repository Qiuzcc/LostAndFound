/**
 * 
 * @param {String} bucketDir,bucket中存放头像的文件夹 
 * @param {String} oldName ，原文件名
 * @returns 拼接 文件夹路径 + 文件名（去除文件类型后缀）+ 时间戳 并返回 
 */
function renameFile(bucketDir,oldName){
    var index = oldName.indexOf('.')
    if(index===-1){
        index = oldName.length
    }
    var timeDir = Date.now()
    var name = bucketDir + oldName.slice(0,index) + timeDir
    return name
}

module.exports = renameFile