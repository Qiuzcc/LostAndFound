<template>
  <div>
    <filter-board @handle-filter="handleFilter" @handle-reset="fetchData"/>
    <card-list :card_list="lost" routeName="lost-detail"></card-list>
  </div>
</template>

<script>
import FilterBoard from "@/components/FilterBoard";
import CardList from "@/components/CardList";
import { getLost, getFilterLost } from "@/api/lost";
export default {
  name: "lost",
  components: {
    CardList,
    FilterBoard,
  },
  data() {
    return {
      lost: [],
      loading: true,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      getLost().then((res) => {
        // res返回的是一个Object对象，包括config、data、headers、request、status、statusText等参数
        this.lost = res.data;
        this.loading = false;
      });
    },
    handleFilter(filter) {
      // console.log(filter);
      this.loading = true;
      getFilterLost(filter)
        .then((res) => {
          this.lost = res.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error('查询失败')
        });
    },
  },
  created() {
    this.fetchData(); //每次创建实例时都抓取一次数据，这样可以保证数据的时效性
  },
};
</script>