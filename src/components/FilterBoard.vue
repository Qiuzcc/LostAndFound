<template>
  <div class="filter-board">
    <el-col :span="24">
      <el-card>
        <div slot="header">按条件筛选</div>
        校区：
        <el-select clearable placeholder="请选择校区" v-model="model.campus">
          <el-option
            v-for="campu in campus"
            :key="campu"
            :label="campu"
            :value="campu"
          ></el-option>
        </el-select>
        <span style="margin-left: 10px">时间：</span>
        <el-select clearable placeholder="请选择时间" v-model="model.date">
          <el-option
            v-for="frame in timeframes"
            :key="frame"
            :label="frame"
            :value="frame"
          ></el-option>
        </el-select>
        <span style="margin-left: 10px">类型：</span>
        <el-select clearable placeholder="请选择类型" v-model="model.type">
          <el-option
            v-for="type in types"
            :key="type"
            :label="type"
            :value="type"
          ></el-option>
        </el-select>
        <el-button style="margin-left:20px" type="primary" @click="handleFilter">筛选</el-button>
        <el-button style="margin-left:20px"  @click="handleReset">重置</el-button>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "filter-board",
  data() {
    return {
      model: {
        campus: "",
        date: "",
        type: "",
      },
      timeframes:['三天内','最近一周','最近一个月','半年内']
    };
  },
  computed: {
    ...mapGetters(['campus','types'])
  },
  created(){
    if(this.campus.length===0) this.$store.dispatch('common/getCampus')
    if(this.types.length===0) this.$store.dispatch('common/getTypes')
    // if(this.timeframes.length===0) this.$store.dispatch('common/getTimeframe')
  },
  methods:{
    handleFilter(){
      //过滤空值，根据当前时间和时间范围，计算时间起点
      const result = {}
      if(this.model.date!==''){
        const now = new Date()
        switch(this.model.date){
          case '三天内':now.setDate(now.getDate()-3);break;
          case '最近一周':now.setDate(now.getDate()-7);break;
          case '最近一个月':now.setMonth(now.getMonth()-1);break;
          case '半年内':now.setMonth(now.getMonth()-6);break;
        }
        result.date = now
      }
      if(this.model.campus!==''){result.campus=this.model.campus}
      if(this.model.type!==''){result.type=this.model.type}
      this.$emit('handle-filter',result)
    },
    handleReset(){
      this.$emit('handle-reset')
      this.model.campus = ""
      this.model.type = ""
      this.model.date = ""
    }
  }
};
</script>

<style scoped>
.filter-board {
  overflow: hidden;
}
</style>