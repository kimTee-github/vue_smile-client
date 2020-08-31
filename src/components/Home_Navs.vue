<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend_container">
      <img :src="item.image" alt />
      <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommend: {
      type: Array,
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0px;
  font-size: 14px;
  text-align: center;
  padding-bottom: 16px;
  background: #fff;
  .recommend_container {
      width: 25%;
      img{
          width: 100%;

      }
  }
}
</style>