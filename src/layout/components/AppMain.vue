<template>
    <div class="app-main">
        <router-view :key="key"></router-view>
    </div>
</template>

<script>
export default {
    name:'app-main',
    computed:{
        key(){
            return this.$route.path
        }
    }
}
</script>