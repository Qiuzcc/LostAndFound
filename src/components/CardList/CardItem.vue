<template>
  <router-link :to="{ name: routeName, params: { id } }">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="model.photos[0]" class="image" />
      <div style="padding: 14px" class="card_text">
        <div>
          <span class="left">{{ model.title }}</span>
          <span class="right status">{{ model.status }}</span>
        </div>
        <div>
          <span class="left description">{{ model.description }}</span>
          <span class="right campus">{{ model.campus }}</span>
        </div>
        <div>
          <span class="left time">{{ model.time }}</span>
          <span class="right location">{{ model.type }}</span>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped>
.image {
  width: 100%;
  display: block;
}
.left {
  float: left;
}
.right {
  float: right;
}
.card_text div {
  overflow: hidden;
  line-height: 1.3rem;
}
.description {
  font-size: 0.7rem;
}
.campus,
.location,
.time,
.status {
  font-size: 0.8rem;
}
</style>

<script>
export default {
  name: "card-item",
  props: ["model", "routeName", "id"],
};
</script>