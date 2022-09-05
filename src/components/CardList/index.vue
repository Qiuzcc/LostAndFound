<template>
  <div v-if="this.card_list.length > 0">
    <el-row v-for="card_cols in card_rows" :key="card_cols[0]._id" style="margin-top:10px">
      <el-col v-for="(obj,index) in card_cols" :key="index" :span="5" :offset="index>0?1:0">
        <card-item :model="obj" :routeName="routeName" :id=obj._id></card-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CardItem from "./CardItem.vue";
export default {
  name: "card-list",
  components: { CardItem },
  props: ["card_list", "baseUrl","routeName"],
  computed: {
    //把卡片列表拆分成5个一组，再包装进一个大的数组里面
    card_rows() {
      var arr = [],
        temp = [];
      for (var index in this.card_list) {
        if (index % 4 === 0 && temp.length) {
          arr.push(temp);
          temp = [];
        }
        temp.push(this.card_list[index]);
      }
      arr.push(temp)
      return arr;
    },
  },
  created(){
    // console.log(this.card_list)
    // 这时候card_list还是空的
  }
};
</script>