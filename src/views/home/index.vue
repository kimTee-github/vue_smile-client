<template>
  <div class>
    <div class="wrap">
      <van-nav-bar title="购物街" />
      <!-- 轮播图 -->
      <Banner :banner="banner"></Banner>
      <!-- 宫格导航 -->
      <HomeNavs :recommend="recommend"></HomeNavs>
      <div class="navs">
        <img :src="navs" width="100%" />
      </div>

      <div class="category">
        <van-sticky :offset-top="40">
          <div class="type">
            <div
              v-for="(item,index) in type"
              :key="index"
              :class="{'active':defaultIndex === index}"
              @click="onChange(index)"
            >
              <!--  -->
              <p>{{item.title}}</p>
            </div>
          </div>
        </van-sticky>

        <!-- 商品 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="shop">
            <div v-for="(item,index) in list" :key="index" class="shop_container">
              <div @click="to(item.iid)">
                <img :src="item.show.img" width="100%" />
                <p class="title">{{item.title}}</p>
                <div class="describe">
                  <span>{{item.price}}</span>
                  <span>
                    <van-icon name="star-o" />
                    {{item.cfav}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </van-list>

        <el-backtop target=".wrap">
          <div class="toTop">
            <van-icon name="back-top" size="32" />
          </div>
        </el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "../../components/Banner";
import Home_Navs from "../../components/Home_Navs";
import { getCategory, getDetails } from "@/api/data.js";
export default {
  name: "Home",
  data() {
    return {
      navs: require("../../assets/img/home/recommend_bg.jpg"),
      category: [],
      type: [],
      defaultIndex: 0,
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1,
    };
  },
  components: {
    Banner,
    HomeNavs: Home_Navs,
  },
  computed: {
    banner: function () {
      return this.$store.state.banner;
    },
    recommend: function () {
      return this.$store.state.recommend;
    },
  },
  mounted() {
    this.$store.dispatch("getBanner");
    this.$store.dispatch("getRecommend");
    axios
      .get("http://123.207.32.32:8000/api/x6/home/data", {
        params: {
          type: "pop",
          page: 1,
        },
      })
      .then((res) => {
        // console.log(res.data.data.filter.list);
        this.type = res.data.data.filter.list;
        this.list = res.data.data.list;
      });
  },
  methods: {
    onChange(index) {
      this.defaultIndex = index;
      this.list = [];
      var temp = this.type[this.defaultIndex].sort;
      axios
        .get("http://123.207.32.32:8000/api/x6/home/data", {
          params: {
            type: this.type[this.defaultIndex].sort,
            page: 1,
          },
        })
        .then((res) => {
          this.type = res.data.data.filter.list;
          this.list = res.data.data.list;
        });
    },
    // async
     getCategory() {
      // let res = await getCategory({
      //   page: this.page,
      //   type: "pop",
      // });
      console.log(324324);
      getCategory({
        params: {
          page: this.page,
          type: "pop",
        },
      }).then((res) => {
        console.log(res);
      });

      // console.log(res.data.list);

      // if (res.data.list === 0) {
      //   // 判断获取数据条数若等于0
      //   this.list = []; // 清空数组
      //   this.finished = true; // 停止加载
      // }
      // // 若数据条数不等于0
      // this.total = res.data.total; // 给数据条数赋值
      // this.list.push(...res.data.list); // 将数据放入list中
      // this.loading = false; // 加载状态结束
      // // 如果list长度大于等于总数据条数,数据全部加载完成
      // console.log(this.list);
      // if (this.list.length >= res.data.total) {
      //   this.finished = true; // 结束加载状态
      // }
    },
    onLoad() {
      // 若加载条到了底部
      let timer = setTimeout(() => {
        // 定时器仅针对本地数据渲染动画效果,项目中axios请求不需要定时器
        this.getCategory(); // 调用上面方法,请求数据
        console.log(this.getCategory());
        this.page++; // 分页数加一
        this.finished && clearTimeout(timer); //清除计时器
      }, 100);
    },
    onRefresh() {
      this.finished = false; // 清空列表数据
      this.loading = true; // 将 loading 设置为 true，表示处于加载状态
      this.page = 1; // 分页数赋值为1
      this.list = []; // 清空数组
      this.onLoad(); // 重新加载数据
    },
    to(iid) {
      this.$router.push({
        path: "/details",
        query: {
          iid,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  margin-bottom: 64px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  .van-nav-bar {
    background: #ff8198;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .navs {
    width: 100%;
    padding: 0px 0px 10px 0px;
    margin: 0px 0px 10px;
  }
  .category {
    background: #fff;
    .type {
      width: 100%;
      height: 100px;
      font-size: 36px;
      font-weight: 600;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      .active {
        color: #ff8198;
      }
    }
    .shop {
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .shop_container {
        width: 46%;
        img {
          height: 500px;
        }
        .title {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .describe {
          width: 70%;
          margin: auto;
          display: flex;
          justify-content: space-around;
          padding: 0px 0px 10px 0px;
        }
      }
    }
  }
  .toTop {
    width: 90px;
    height: 90px;
    text-align: center;
    box-shadow: 0px 0px 20px #868686;
    position: fixed;
    bottom: 150px;
    right: 50px;
    background: #fff;
  }
}
</style>
