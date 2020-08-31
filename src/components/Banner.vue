<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src="item.image" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: "Banner",
  props: {
    // defaultActive: {
    //   type: Number,
    //   default: 0,
    // },
    banner: {
      type: Array,
      //   default: () => {
      //     return [];
      //   },
    },
  },
};
</script>
<style lang="scss" scoped>
.my-swipe {
  margin-top: 100px;
  .van-swipe-item {
    width: 100%;
    img {
      width: 100%;
    }
  }
}
</style>