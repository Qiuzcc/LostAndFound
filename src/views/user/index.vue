<template>
  <div>
    <div class="flex-container">
      <avatar :link="avatar" @change-avatarLink="updateAvatar" />
      <el-descriptions :column="3" style="margin-left: 50px">
        <el-descriptions-item label="学号">{{ username }}</el-descriptions-item>
        <el-descriptions-item label="昵称" :span="2"
          >{{ name }}
          <i class="el-icon-edit user-icon" @click="updateName"></i>
        </el-descriptions-item>
        <el-descriptions-item label="密码">
          {{ password }}
          <i class="el-icon-edit user-icon" @click="updatePassword"></i>
          </el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="2">
          {{ email}}
          <i class="el-icon-edit user-icon" @click="updateEmail"></i>
          </el-descriptions-item>
      </el-descriptions>
    </div>
    <el-button type="warning" @click="handleLogout">退出登陆</el-button>
    <el-button type="primary"><router-link to="/submit">发布信息</router-link></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Avatar from "./Avatar.vue";
export default {
  components: {
    Avatar,
  },
  computed: {
    ...mapGetters(["username", "password", "name", "avatar", "email"]),
  },
  methods: {
    updateAvatar(url) {
      // Avatar组件选中照片时，提取出来的url，用来提交后端更新avatar数据
      // console.log(url);
      this.$store.dispatch("user/updateInfo",{avatar:url})
    },
    handleLogout() {
      this.$confirm("是否退出登陆？", "提示", {
        confirmButtonText: "退出登陆",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store
            .dispatch("user/logout")
            .then(() => {
              this.$router.push({ path: "/" });
            })
            .catch((err) => {
              console.error(err);
              console.error("登出失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    updateName() {
      this.$prompt("请输入新的昵称",'提示', {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({value})=>{
        this.$store.dispatch("user/updateInfo",{name:value}).then(()=>{
          this.$message({type:'success',message:'修改昵称成功'})
        }).catch(()=>{
          this.$message({type:'warning',message:'修改昵称失败'})
        })
      }).catch(()=>{
        this.$message('已取消')
      })
    },
    updatePassword(){
      this.$prompt('请输入新的密码','提示',{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({value})=>{
        this.$store.dispatch("user/updateInfo",{password:value}).then(()=>{
          this.$message({type:'success',message:'修改密码成功'})
        }).catch(()=>{
          this.$message({type:'warning',message:'修改密码失败'})
        })
      }).catch(()=>{
        this.$message('已取消')
      })
    },
    updateEmail(){
      this.$prompt('请输入新的邮箱','提示',{
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      }).then(({value})=>{
        this.$store.dispatch("user/updateInfo",{email:value}).then(()=>{
          this.$message({type:'success',message:'修改邮箱成功'})
        }).catch(()=>{
          this.$message({type:'warning',message:'修改邮箱失败'})
        })
      }).catch(()=>{
        this.$message('已取消')
      })
    }
  },
};
</script>

<style>
.flex-container {
  display: flex;
  align-items: center;
}
.user-icon-edit {
  margin-left: 10px;
}
</style>

<style scoped>
.user-icon {
  margin-left: 10px;
  cursor: pointer;
}
</style>
