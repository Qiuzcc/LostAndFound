<template>
  <el-container>
    <el-header>
      <navbar />
    </el-header>
    <el-main>
      <app-main />
    </el-main>
    <el-footer>
      <page-footer />
    </el-footer>
  </el-container>
</template>

<script>
import { Navbar, AppMain, PageFooter } from "./components";
export default {
  name: "Layout",
  components: { Navbar, AppMain, PageFooter },
};
</script>