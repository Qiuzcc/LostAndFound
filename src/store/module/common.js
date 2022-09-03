import { getCampus, getTypes } from '@/api/common'

const state = {
    campus: [],
    types: [],
}

const mutations = {
    SET_CAMPUS:(state,campus)=>{
        state.campus = campus
    },
    SET_TYPES:(state,types)=>{
        state.types = types
    }
}

const actions = {
    getCampus({ commit }) {
        getCampus().then((res)=>{
            const campus = res.data
            if(campus.length===0){
                console.error('campus为空！')
            }
            const arr = campus.map(item=>item.name)
            commit('SET_CAMPUS',arr)
        })
    },
    getTypes({ commit }) {
        getTypes().then((res)=>{
            const types = res.data
            if(types.length===0){
                console.error('types为空！')
            }
            const arr = types.map(item=>item.type)
            commit('SET_TYPES',arr)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}