import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'
import store from '@/store'

// 免登陆白名单
const whiteList = [
    '/login',
    '/lost',
    '/found',
    '/help'
]

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    const token = getToken()

    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        }else{
            //必须在这里做一个判断，而不能依靠在登陆成功后的那个获取信息，因为有时候关闭网页再重新打开时，token并没有过期
            // 这时不会触发重新登陆，所以就不会触发登陆后的获取信息，因此这里需要多加一次判断
            if(!store.getters.username){
                store.dispatch('user/getInfo')  //触发获取信息即可，不用等待回调完成，错误处理已经在actions中完成
            }
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})