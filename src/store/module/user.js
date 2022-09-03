import { getUserInfo, logout, updateInfo } from '@/api/user'
import { removeToken } from '@/utils/auth'

const getDefaultState = () => {
    return {
        username: '',
        password: '',
        name: '',
        avatar: '',
        email: ''
    }
}

// 以函数的形式获得对象数据，避免切换用户之后共享数据
const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, getDefaultState())
    },
    SET_USERNAME: (state, username) => {
        state.username = username
    },
    SET_PASSWORD: (state, password) => {
        state.password = password
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_EMAIL: (state, email) => {
        state.email = email
    }
}

const actions = {
    getInfo({ commit }) {
        getUserInfo().then(res => {
            const { data } = res
            commit('SET_USERNAME', data.username)
            commit('SET_PASSWORD', data.password)
            commit('SET_NAME', data.name)
            commit('SET_AVATAR', data.avatar)
            commit('SET_EMAIL', data.email)
        }).catch(err => {
            console.error(err)
            console.error('获取用户信息失败！')
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken()
                commit('RESET_STATE')
                resolve()
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateInfo({commit},payload){   //payload的格式如：{name:'Q'}，每次只会传入一个key-value对,key的范围在数据库已有key中
        return new Promise((resolve, reject)=>{
            updateInfo(payload).then(()=>{
                const key = Object.keys(payload)[0]
                switch(key){
                    case 'name':commit('SET_NAME',payload[key]);break;
                    case 'password':commit('SET_PASSWORD',payload[key]);break;
                    case 'avatar':commit('SET_AVATAR',payload[key]);break;
                    case 'email':commit('SET_EMAIL',payload[key]);break;
                }
                resolve()
            }).catch(err=>{
                reject(err)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}