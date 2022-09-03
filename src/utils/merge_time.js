/**
 * 针对项目的发布表单制作的一个合并日期和时间的工具函数，传入日期、时间，返回合并后的Date对象
 * @param {Date} date 
 * @param {Date} time 
 * @returns Date
 */
function mergeTime(date,time){
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()
    const res = new Date(year,month,day,hour,minute,second)
    return res
}

export default mergeTime
