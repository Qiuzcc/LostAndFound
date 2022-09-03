<template>
  <el-form
    ref="form"
    :model="loginForm"
    label-width="80px"
    class="login-container"
  >
    <div class="title-container">
      <h3>登 陆</h3>
    </div>
    <el-form-item label="学号">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input
        v-model="loginForm.password"
        :type="passwordType"
        ref="password"
      >
        <i
          slot="suffix"
          class="el-icon-view"
          @click="showPwd"
          style="margin-right: 10px"
        ></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        @click.native.prevent="handleLogin"
        style="width: 100%"
        >登陆</el-button
      >
      <el-form-item>
        <el-button
          type="warning"
          @click.native.prevent="handleCancel"
          style="width: 100%"
        >
          返回首页
        </el-button>
      </el-form-item>
    </el-form-item>
  </el-form>
</template>

<script>
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "20162382158",
        password: "123456",
      },
      loading: false,
      passwordType: "password",
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.loading = true;
      login(this.loginForm)
        .then((res) => {
          // console.log(res)//res是一个包含了data、status、headers等属性的对象
          const { token } = res.data;
          setToken(token);
          this.$store.dispatch("user/getInfo"); //异步获取用户信息，不必等待，加载成功后响应式显示在页面，错误处理放置到了actions里
          this.$router.push({ path: "/user" }); //这里暂时先跳转到个人中心，后续优化可以跳转到触发登录要前到的页面
        })
        .catch((err) => {
          // console.log(err)
          // console.log(err.response)
          this.$message({
            type: "error",
            message: err.response.data,
          });

          // 以下这种写法，需要先import {Message} from ElementUI。上m面的写法则不用（因为已经导入了ElementUI）
          // Message({
          //   type:'error',
          //   message:err.response.data
          // })
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleCancel() {
      // 取消操作，由于无法提前判断上一个路由的信息，所以固定跳转到首页
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
.login-container {
  width: 520px;
  margin: 160px auto;
  overflow: hidden;
}
.title-container {
  text-align: center;
  font-weight: bold;
  font-size: 26px;
}
</style>