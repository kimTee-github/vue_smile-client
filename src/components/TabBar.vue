<template>
  <div>
    <van-tabbar
      fixed
      route
      v-model="active"
      active-color="#FF8198"
      inactive-color="#000"
      @change="handleChange"
    >
      <van-tabbar-item
        v-for="(item, index) in data"
        :to="item.to"
        :icon="item.icon"
        :key="index"
      >{{ item.title }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: "TabBar",
  props: {
    defaultActive: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      active: this.defaultActive,
    };
  },
  methods: {
    handleChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-tabbar-item{
  font-weight: 900;
}
</style>
