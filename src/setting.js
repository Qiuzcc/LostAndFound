/**
 * 在此放置一些全局和项目的设置
 */
module.exports = {
    STS_API:'http://localhost:3000/api/laf/sts',    //请求sts临时身份凭证的api接口地址
    BUCKET_REGION:'oss-cn-guangzhou',               //Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou
    BUCKET_NAME:'scnu-lostandfound',                //Bucket名称，例如examplebucket
    BUCKET_DIR:"/photos/",                          //Bucket下放置上传图片的文件夹路径
}