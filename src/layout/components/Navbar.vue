<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <router-link to="/lost" tag="div">失物招领</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/found" tag="div">寻物启事</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/help" tag="div">帮助 & 联系我们</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/user" tag="div">个人中心</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>