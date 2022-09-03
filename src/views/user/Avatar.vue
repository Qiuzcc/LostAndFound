<template>
  <div class="avator-scope">
    <el-tooltip content="点击更换头像" placement="top">
      <el-upload
        class="avatar-uploader"
        action="#"
        :auto-upload="false"
        :show-file-list="false"
        accept="image/jpeg,image/png"
        :on-change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-tooltip>
  </div>
</template>

<script>
const getOssClient = require("@/utils/oss_client");
const { BUCKET_DIR } = require("@/setting");
const rename_file = require("@/utils/rename_file");
export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  props:['link'],
  created(){
    this.imageUrl = this.link
  },
  methods: {
    handleChange(file) {
      //因为这里没有选择自动上传，没有使用组件自带的上传方法，所以添加、上传、上传失败这三种状态中，只存在添加这一种状态
      //   console.log(file);
      //   console.log(URL.createObjectURL(file.raw));

      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error("只能上传图片");
      } else if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 10MB!");
      } else {
        this.$confirm("是否确认头像？", "提示", {
          confirmButtonText: "确认更换",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.imageUrl = URL.createObjectURL(file.raw); //用本地图片作为src源，因为是相同的图片
            //然后上传，成功之后修改用户的头像链接
            const name = rename_file(BUCKET_DIR, file.name);
            getOssClient().then((ossUploader) => {
              ossUploader.put(name, file.raw).then((res) => {
                // console.log(res.url);   //输出上传成功后的图片链接
                this.$emit("change-avatarLink", res.url); //通过changeAvatarLink方法，将上传成功回调的图片链接传递给父组件
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消",
            });
          });
      }
    },
  },
};
</script>

<style>
.avator-scope{
    --avatar-size:125px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: var(--avatar-size);
  height: var(--avatar-size);
  line-height: var(--avatar-size);
  text-align: center;
}
.avatar {
  width: var(--avatar-size);
  height: var(--avatar-size);
  display: block;
}
</style>

<style scoped>
/* 修复加号不居中的bug */
.el-icon-plus {
  line-height: var(--avatar-size);
}
</style>