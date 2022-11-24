/**
 * 创建一个axios实例，并设置请求和响应两个拦截器，自定义处理规则，最后导出axios实例，供外部调用
 */
import axios from 'axios'
import { getToken, removeToken } from './auth'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
    // url = base url + request url
    baseURL: process.env.VUE_APP_BASE_API,
    // baseURL: 'http://120.25.75.176:3000/api/laf',
    // baseURL: 'http://localhost:3000/api/laf',
    timeout: 5000
})

// 后面在此加入拦截器，给每个请求加上token参数
// 目前还没有做到用户管理阶段，所以还不存在token
service.interceptors.request.use(
    config => {
        const token = getToken()

        if (token) {
            // console.log('request拦截器',token)
            config.headers['x-access-token'] = token    //传递到后端之后X-Access-Token这个key会转换为全部小写
        }
        return config
    },
    error => {
        console.error(error)
        console.error('http请求拦截器出错了！')
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        if (response.status === '401') {
            Message.confirm('身份验证过期，请重新登陆', {
                confirmButtonText: '重新登陆',
                type: 'warning'
            }).then(() => {
                removeToken()
                router.push({ path: '/login' })
            })
        }
        return response
    },
    error => {
        console.error(error)
        console.error('http响应拦截器出错了！')
        Promise.reject(error)
    }
)

export default service