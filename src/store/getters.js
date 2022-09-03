const getters = {
    campus:state=>state.common.campus,
    types:state=>state.common.types,
    username:state=>state.user.username,
    password:state=>state.user.password,
    name:state=>state.user.name,
    avatar:state=>state.user.avatar,
    email:state=>state.user.email,
}

export default getters