<template>
    <div class="empty-container">
        <router-view></router-view>
    </div>
</template>

<style scoped>
/* 实际上，好像并不需要这个样式，原来的目的是让子路由组件填满这个容器 */
/* .empty-container{
    margin: 0;
    padding: 0;
} */
</style>