<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <!-- <el-menu-item v-for="route in routes" :key="route.path" index="route.path">
      <router-link :to="route.path" tag="div">{{route.meta.title}}</router-link>
    </el-menu-item> -->

    <el-menu-item index="/lost">
      <router-link to="/lost" tag="div">失物招领</router-link>
    </el-menu-item>
    <el-menu-item index="/found">
      <router-link to="/found" tag="div">寻物启事</router-link>
    </el-menu-item>
    <el-menu-item index="/help">
      <router-link to="/help" tag="div">帮助 & 联系我们</router-link>
    </el-menu-item>
    <el-menu-item index="/user">
      <router-link to="/user" tag="div">个人中心</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      activeIndex: "/lost",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
  watch:{
    $route(){
      let path = this.$route.path
      // console.log(path)
      const index = path.indexOf('/',1)
      if(index!==-1){
        path = path.slice(0,index)
      }
      // console.log(path)
      this.activeIndex = path
    }
  }
};
</script>