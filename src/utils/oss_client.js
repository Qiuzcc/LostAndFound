const OSS = require('ali-oss');
const axios = require('axios');
const {STS_API,BUCKET_REGION,BUCKET_NAME} = require('@/setting')

// config的参数都需要用户根据实际情况自定义,在/src/seting.js中设定
const config = {
    api:STS_API,            //请求sts临时密钥的地址
    region: BUCKET_REGION,  //填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou
    bucket: BUCKET_NAME     //填写Bucket名称，例如examplebucket
}

// 改善后的写法，只用async和await，把异步执行转换成同步执行，等待执行结果并返回
/**
 * 从后端请求STS服务，获取临时密钥，用它注册一个OSS Client并返回
 * @returns OSS Client对象
 */
async function getOssClient() {
    let  {data}  = await axios.get(config.api)
    let uploader = new OSS({
        region: config.region,
        accessKeyId: data.AccessKeyId,
        accessKeySecret: data.AccessKeySecret,
        stsToken: data.SecurityToken,
        bucket: config.bucket,
        refreshSTSToken: async () => {
            const { data } = await axios.get(config.api);
            return {
                accessKeyId: data.AccessKeyId,
                accessKeySecret: data.AccessKeySecret,
                stsToken: data.SecurityToken,
            }
        },
    })
    // console.log(uploader)   //这里输出是一个client对象
    return uploader         //从外部调用返回值再输出时，是一个Promise对象，client对象被包裹在PromiseResult中。原因：该函数使用了async声明，根据规则，它返回一个Promise对象
}

module.exports = getOssClient 