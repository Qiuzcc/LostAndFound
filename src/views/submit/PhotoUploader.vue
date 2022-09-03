<template>
  <div>
    <el-upload
      ref="upload"
      action="#"
      :auto-upload="false"
      list-type="picture-card"
      multiple
      :limit="3"
      accept="image/png,image/gif,image/jpeg"
      :on-exceed="hanbleExceed"
      :on-preview="handlePictureCardPreview"
      :before-remove="beforeRemove"
      :on-remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
const getOssClient = require("@/utils/oss_client");
const { BUCKET_DIR } = require("@/setting");
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      urlList: [],
    };
  },
  methods: {
    //限制图片格式和大小，但是在这里应该没什么用，因为没有使用组件自带的上传方法，也就调用不到它
    beforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLess10M = file.size / 1024 / 1024 < 10;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLess10M) {
        this.$message.error("单个文件大小不能超过 10MB!");
      }
      return isIMAGE && isLess10M;
    },

    //图片数量超出范围的反馈
    hanbleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },

    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleRemove(file, fileList) {
      console.log(file);
    },

    //点击+ 查看大图
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    // 优化async和await的写法，把异步执行转换成了同步执行
    async submitUpload() {
      const fileList = this.$refs.upload.$data.uploadFiles;
      const BucketDir = BUCKET_DIR; //bucket下的文件夹路径

      // 把所有照片文件头部加上文件夹路径、末尾加上时间戳重新命名，并且提取出File文件，打包成{name,File}的组合
      const uploadList = fileList.map((item) => {
        var index = item.name.indexOf(".");
        if (index === -1) {
          index = item.name.length;
        }
        var timeStr = Date.now();
        var name =
          BucketDir + item.name.slice(0, index).toLowerCase() + timeStr;
        return {
          name,
          file: item.raw,
        };
      });

      let ossUploader = await getOssClient(); //这个写法没问题，在main中已经测试过了
      let PromiseList = await Promise.all([
        uploadList.map(({ name, file }) => {
          //这里使用了map而不是forEach，目的是为了返回数组给Promise.all吗？？
          return ossUploader.put(name, file);
        }),
      ]);

      // console.log(PromiseList); //测试时，上传了3张图片，返回[Array(3)]，包含3个Promise的数组，PromiseResult里的值为Object，具体字段如下：
      // name,res:{status,statusCode,headers,size...},url
      // 这里的url，就是我们需要传递给表单的数据（即图片的链接）

      for (var item of PromiseList[0]) {
        // console.log(item)       //输出的是Promise对象
        const res = await item;
        // console.log(res)        //输出的PromiseResult的值，是一个Object（同上面的一样），但是要稍等一会才输出
        this.urlList.push(res.url);
      }
      // console.log(urlList)      //输出的是Object数组
    },
  },
};
</script>