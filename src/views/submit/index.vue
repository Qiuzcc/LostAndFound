<template>
  <div>
    <el-radio v-model="submitType" label="lost">失物招领</el-radio>
    <el-radio v-model="submitType" label="found">寻物启事</el-radio>
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="物品名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="物品类型">
        <el-select v-model="form.type" placeholder="请选择物品类型">
          <el-option
            v-for="type in types"
            :key="type"
            :label="type"
            :value="type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="校区">
        <el-select v-model="form.campus" placeholder="请选择校区">
          <el-option
            v-for="campu in campus"
            :key="campu"
            :label="campu"
            :value="campu"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="具体位置">
        <el-input v-model="form.location"></el-input>
      </el-form-item>
      <el-form-item :label="submitType === 'lost' ? '捡拾时间' : '丢失时间'">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.time"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="简要描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="上传图片">
        <photo-uploader ref="photoUploader" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.form {
  text-align: left;
  margin-top: 50px;
}
</style>

<script>
import PhotoUploader from "./PhotoUploader.vue"
import { mapGetters } from "vuex"
import {addLost} from '@/api/lost'
import {addFound} from '@/api/found'
export default {
  components: { PhotoUploader },
  computed:{
    ...mapGetters(['campus','types'])
  },
  created(){
    if(this.campus.length === 0){
      this.$store.dispatch('common/getCampus')
    }
    if(this.types.length === 0){
      this.$store.dispatch('common/getTypes')
    }
  },
  data() {
    return {
      submitType: "lost",
      form: {
        title: "",
        campus: "",
        location: "",
        time: "",
        type: "",
        description: "",
        status:'',
        photos: [],
      }
    }
  },
  methods: {
    //将表单提交事件变成同步事件
    onSubmit() {
      this.$confirm("是否确认发布？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$refs.photoUploader.submitUpload(); //等待图片完成上传
        this.form.photos = this.$refs.photoUploader.urlList; //获取图片上传成功后回调传回来的URL
        // console.log(this.form);
        if(this.submitType==='lost'){
          this.form.status = "等待认领"
          addLost(this.form).then(()=>{
            this.$message({type:'success',message:'发布成功'})
            this.$router.push({path:'/'}) 
          }).catch(()=>{
            this.$message.error("噢哦，出错了！")
          })
        }else{
          this.form.status = "寻找中"
          addFound(this.form).then(()=>{
            this.$message({type:'success',message:'发布成功'})
            this.$router.push({path:'/found'}) 
          }).catch(()=>{
            this.$message.error("噢哦，出错了！")
          })
        }
      }).catch(()=>{
        this.$message({
          type:'info',
          message:'已取消'
        })
      })
    },
    handleCancel(){
      // var date = this.form.time
      // date.setDate(date.getDate()-3)
      // console.log(date)
      this.$router.back()
    }
  },
};
</script>