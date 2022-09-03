<template>
  <div class="detail-container">
    <el-descriptions title="寻物启事" :column="3">
      <el-descriptions-item label="物品名称">{{
        model.title
      }}</el-descriptions-item>
      <el-descriptions-item label="类型" :span="2">{{
        model.type
      }}</el-descriptions-item>
      <el-descriptions-item label="校区">{{
        model.campus
      }}</el-descriptions-item>
      <el-descriptions-item label="具体位置" :span="2">{{
        model.location
      }}</el-descriptions-item>
      <el-descriptions-item label="时间">{{ model.time }}</el-descriptions-item>
      <el-descriptions-item label="当前状态" :span="2">{{
        model.status
      }}</el-descriptions-item>
      <el-descriptions-item label="描述" :span="3">{{
        model.description
      }}</el-descriptions-item>
    </el-descriptions>
    <img
      v-for="photo in model.photos"
      :key="photo"
      :src="photo"
      alt="photo"
      class="detail-img"
    />
    <el-button v-if="!hasOwnerInfo" type="primary" @click="handleGetOwner"
      >查看联系方式</el-button
    >
    <el-descriptions v-else>
      <el-descriptions-item label="联系人邮箱">{{
        model.user.email
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { getLostDetail, getLostOwner } from "@/api/lost";
export default {
  data() {
    return {
      model: {},
      hasOwnerInfo: false,
    };
  },
  methods: {
    fetchData() {
      const { id } = this.$route.params;
      // console.log(id)
      getLostDetail({ id })
        .then((res) => {
          this.model = res.data;
          // console.log(res)
        })
        .catch((err) => {
          console.error(`获取id为${id}的lost的信息失败`, err);
        });
    },
    handleGetOwner() {
      this.$prompt("请输入您的密码", "验证身份", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "password",
      })
        .then(({ value }) => {
          const { id } = this.$route.params;
          getLostOwner({ id }, { password: value }).then((res) => {
            // console.log(res.data);
            this.model.user = res.data.user;
            this.hasOwnerInfo = true;
          });
        })
        .catch(() => {});
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style scoped>
.detail-img {
  display: block;
  width: 600px;
  height: 300px;
  margin: 10px;
}
</style>