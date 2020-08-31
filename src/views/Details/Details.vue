<template>
  <div>
    <div class="top">
      <p>
        <van-icon name="arrow-left" size="28px" @click="back()" />
      </p>
      <ul>
        <li @click="onContainer">商品</li>
        <li @click="onParameter">参数</li>
        <li @click="onComments">评论</li>
        <li @click="onRecommendlist">推荐</li>
      </ul>
    </div>
    <div ref="content"></div>

    <div class="container" ref="container">
      <div class="itemInfo_container">
        <img :src="Img" width="100%" height="480px" />
        <div class="itemInfo_describe">
          <div class="itemInfo_describe_box">
            <p class="title">{{itemInfo.title}}</p>
            <p class="desc">
              <span class="price">{{itemInfo.price}}</span>
              <span class="oldPrice">{{itemInfo.oldPrice}}</span>
              <span class="discountDesc">{{itemInfo.discountDesc}}</span>
            </p>
            <p class="sale">
              <span v-for="(item,index) in columns" :key="index">
                <span>{{item}}</span>
              </span>
            </p>
          </div>
        </div>
        <div class="services">
          <div v-for="(item,index) in services" :key="index" class="services_container">
            <span>
              <img :src="item.icon" width="12px" />
            </span>
            <span>{{item.name}}</span>
          </div>
        </div>
        <div class="shopInfo">
          <div class="logo">
            <img :src="shopInfo.shopLogo" alt />
            <span>{{shopInfo.name}}</span>
          </div>
          <div class="shopInfo_container">
            <div class="shopInfo_sale">
              <div>
                <p class="cSells">{{shopInfo.cSells}}</p>
                <p>总销量</p>
              </div>
              <div>
                <p class="cSells">{{shopInfo.cGoods}}</p>
                <p>全部宝贝</p>
              </div>
            </div>
            <div class="shopInfo_desc">
              <div v-for="(item,index) in score" :key="index">
                <p>
                  <span>{{item.name}}</span>
                  <span>{{item.score}}</span>
                  <!-- <span>{{defauleScore}}</span> -->
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="detailInfo">
          <div class="detailInfo_desc">
            <p>{{detailInfo.desc}}</p>
            <p>{{detailImage.key}}</p>
          </div>
          <div v-for="(item,index) in detailImage.list" :key="index">
            <img :src="item" width="100%" />
          </div>
        </div>
      </div>
    </div>

    <!-- 参数 -->
    <div class="parameter" ref="parameter">
      <div class="tables">
        <div v-for="(item,index) in tables" :key="index">
          <table cellspacing="0">
            <tr>
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
              <td>{{item[2]}}</td>
              <td>{{item[3]}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="set">
        <div>
          <table v-for="(item,index) in set" :key="index">
            <tr>
              <td class="set">{{item.key}}</td>
              <td class="value">{{item.value}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- 评论 -->
    <div class="comments" ref="comments">
      <div class="comments_top">
        <p>用户评价</p>
        <p>更多</p>
      </div>
      <div class="comments_container">
        <div class="comments_user">
          <img :src="rate.user.avatar" alt />
          <span>{{rate.user.uname}}</span>
        </div>
        <div class="content">{{rate.content}}</div>
        <div class="comments_desc">
          <span class="created">{{created}}</span>
          <span>{{rate.style}}</span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- 推荐 -->
    <div class="recommendlist" ref="recommendlist">
      <div class="shop">
        <div v-for="(item,index) in recommendlist" :key="index" class="shop_container">
          <div @click="to(item.iid)">
            <img :src="item.image" width="100%" />
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
    </div>

    <div class="cart">
      <div class="collect">
        <div>
          <span class="service"></span>
          <span>客服</span>
        </div>
        <div>
          <span class="store"></span>
          <span>店铺</span>
        </div>
        <div>
          <span class="Collect"></span>
          <span>收藏</span>
        </div>
      </div>
      <p class="addcart">加入购物车</p>
      <p class="buy">购买</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getDetails, getRecommend } from "@/api/data.js";
export default {
  data() {
    return {
      result: [],
      itemInfo: [],
      Img: "",
      columns: [],
      shopInfo: [],
      services: [],
      score: [],
      detailInfo: [],
      detailImage: [],
      tables: [],
      set: [],
      rate: {
        user: {},
      },
      created: "",
      recommendlist: [],
    };
  },
  mounted() {
    let iid = this.$route.query.iid;
    console.log(iid);

    axios
      .get("http://123.207.32.32:8000/api/x6/detail", {
        params: {
          iid: iid,
        },
      })
      .then((res) => {
        // console.log(res.data.result);
        this.result = res.data.result;

        this.itemInfo = res.data.result.itemInfo;
        this.Img = res.data.result.itemInfo.topImages[0];
        this.columns = res.data.result.columns;
        this.shopInfo = res.data.result.shopInfo;
        this.services = res.data.result.shopInfo.services;
        this.score = res.data.result.shopInfo.score;
        this.detailInfo = res.data.result.detailInfo;
        this.detailImage = res.data.result.detailInfo.detailImage[0]; //商品
        // 参数
        this.tables = res.data.result.itemParams.rule.tables[0];
        this.set = res.data.result.itemParams.info.set; //参数
        // 评论
        this.rate = res.data.result.rate.list[0];
        this.created = this.rate.created;
        var date = new Date(parseInt(this.created) * 1000);
        this.created = `${date.getFullYear()}-${date.getMonth() + 1}-${
          date.getDate() + 1
        }`;
        // 推荐
      });
    
    getRecommend().then((res) => {
      console.log(res.data.list);
      this.recommendlist = res.data.list;
    });
  },
  methods: {
    back() {
      window.history.back();
    },
    onContainer() {
      this.$refs.container.scrollIntoView({ behavior: "smooth" });
    },
    onParameter() {
      this.$refs.parameter.scrollIntoView({ behavior: "smooth" });
    },
    onComments() {
      this.$refs.comments.scrollIntoView({ behavior: "smooth" });
    },
    onRecommendlist() {
      this.$refs.recommendlist.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>
<style lang="scss" scoped>
// 头部导航
.top {
  width: 100%;
  height: 128px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 999;
  background: #fff;
  p {
    width: 15%;
    text-align: center;
  }
  ul {
    width: 70%;
    height: 100%;
    font-size: 32px;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
// 商品
.container {
  width: 100%;
  height: 100%;
  margin-top: 128px;
  background: #fff;
  .itemInfo_container {
    width: 100%;
    img {
      position: relative;
    }
    .itemInfo_describe {
      width: 100%;
      height: 399px;
      background: #fff;
      position: absolute;
      bottom: 70px;
      .itemInfo_describe_box {
        width: 96%;
        margin: auto;
        .title {
          width: 100%;
          margin: 20px auto;
          font-size: 38px;
        }
        .desc {
          width: 100%;
          height: 100px;
          margin-bottom: 0px;
          .price {
            color: #ff8198;
            font-size: 55px;
            font-weight: 500;
            vertical-align: middle;
          }
          .oldPrice {
            color: #838383;
            text-decoration: line-through;
            font-size: 30px;
            font-weight: 500;
            margin-left: 40px;
            vertical-align: bottom;
          }
          .discountDesc {
            margin-left: 40px;
            font-size: 30px;
            display: inline-block;
            width: 70px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #ff6699;
            color: #fff;
            border-radius: 10px;
          }
        }
        .sale {
          width: 100%;
          height: 50px;
          font-size: 33px;
          color: #797979;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0px;
          padding-bottom: 20px;
          border-bottom: 1px solid #efefef;
        }
      }
    }
    .services {
      width: 96%;
      height: 130px;
      margin: auto;
      font-size: 29px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .services_container {
        width: 33%;
        vertical-align: middle;
        img {
          padding-top: 0px;
        }
      }
    }
    .shopInfo {
      width: 96%;
      height: 400px;
      margin: auto;
      border-top: 10px solid #f2f5f8;
      border-bottom: 10px solid #f2f5f8;
      .logo {
        width: 96%;
        height: 104px;
        margin: 30px auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 15%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid #d6d8db;
        }
        span {
          width: 80%;
          font-size: 36px;
          margin-left: 30px;
          font-weight: 500;
        }
      }
      .shopInfo_container {
        width: 93%;
        height: 200px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .shopInfo_sale {
          flex: 3;
          height: 100%;
          display: flex;
          text-align: center;
          .cSells {
            font-size: 32px;
            font-weight: 600;
          }
        }
        .shopInfo_desc {
          flex: 2;
          height: 100%;
          padding-left: 40px;
          border-left: 1px solid #d9dbde;
          border-left-width: 1px;
        }
      }
    }
    .detailInfo {
      width: 100%;
      height: 100%;
      font-size: 30px;
      .detailInfo_desc {
        margin: 50px 10px;
      }
    }
  }
}
// 参数
.parameter {
  width: 100%;
  height: 1800px;
  margin-bottom: 10px;
  background: #fff;
  .tables {
    width: 100%;
    table {
      width: 90%;
      margin: auto;
      td {
        width: 25%;
        height: 85px;
        font-size: 31px;
        color: #666666;
        text-align: left;
        border-bottom: 1px solid #dfe1e4;
      }
    }
  }
  .set {
    width: 100%;
    table {
      width: 90%;
      margin: auto;
      font-size: 31px;
      color: #666666;
      text-align: left;
      td {
        height: 85px;
        border-bottom: 1px solid #dfe1e4;
      }
      .set {
        width: 25%;
      }
      .value {
        width: 75%;
        color: #eb4868;
      }
    }
  }
}
// 评论
.comments {
  width: 100%;
  height: 100%;
  background: #fff;
  margin-bottom: 20px;
  .comments_top {
    width: 94%;
    height: 100px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    font-size: 31px;
    color: #333333;
    border-bottom: 1px solid #e6e6e6;
  }
  .comments_container {
    width: 94%;
    height: 300px;
    margin: auto;
    .comments_user {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 32px;
      margin: 30px 0px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 50px;
      }
    }
    .content {
      font-size: 32px;
      color: #777777;
    }
    .comments_desc {
      width: 100%;
      height: 100px;
      font-size: 30px;
      color: #777777;
      .created {
        display: inline-block;
        margin: 30px 40px 20px 0px;
      }
    }
  }
}
// 推荐
.recommendlist {
  width: 100%;
  background: #fff;
  padding-top: 30px;
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

//底部加购
.cart {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 128px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .collect {
    flex: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .service {
      display: block;
      width: 50px;
      height: 50px;
      background-size: 50px;
      background: url("../../assets/img/detail/detail_bottom.png") 0 0/100%;
      background-position: 0 -119px;
    }
    .store {
      display: block;
      width: 50px;
      height: 50px;
      background-size: 50px;
      background: url("../../assets/img/detail/detail_bottom.png") 0 0/100%;
      background-position: 0 -225px;
    }
    .Collect {
      display: block;
      width: 50px;
      height: 50px;
      background-size: 50px;
      background: url("../../assets/img/detail/detail_bottom.png") 0 0/100%;
    }
  }
  .addcart {
    flex: 1;
    height: 100%;
    line-height: 128px;
    text-align: center;
    font-size: 34px;
    background: #ffe817;
  }
  .buy {
    flex: 1;
    height: 100%;
    line-height: 128px;
    text-align: center;
    color: #fff;
    font-size: 34px;
    background: #ff6699;
  }
}
</style>
