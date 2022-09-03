<template>
  <div>
    <filter-board @handle-filter="handleFilter" @handle-reset="fetchData"/>
    <card-list :card_list="founds" routeName="found-detail"></card-list>
  </div>
</template>

<script>
import FilterBoard from "@/components/FilterBoard";
import CardList from "@/components/CardList";
import { getFound, getFilterFound } from "@/api/found";
export default {
  name: "found",
  components: { CardList, FilterBoard },
  data() {
    return {
      founds: [],
      loading: true,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      getFound().then((res) => {
        this.founds = res.data;
        this.loading = false;
      });
    },
    handleFilter(filter) {
      // console.log(filter);
      this.loading = true;
      getFilterFound(filter)
        .then((res) => {
          this.founds = res.data;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error("查询失败");
        });
    },
  },
  created() {
    this.fetchData(); //每次创建实例时都抓取一次数据，这样可以保证数据的时效性
  },
};
</script>