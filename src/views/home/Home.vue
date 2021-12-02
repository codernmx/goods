<template>
  <div class="home">
    <div class="nav">
      <div class="el-icon-arrow-left fz-xl"></div>
      <div class="diary">商品列表</div>
      <div
        class="el-icon-circle-plus-outline add_diary"
        @click="add_goods"
      ></div>
    </div>

    <div
      class="content_box"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <div class="button">
        <el-input
          v-model="search"
          placeholder="请输入商品名称"
        ></el-input>
        <el-button @click="search_goods" icon="el-icon-search"></el-button>
      </div>

      <div class="big_box">
        <div
          v-for="item in diary_list"
          :key="item.id"
          class="diary_box"
          @click="to_details(item)"
        >
          <img :src="item.picture" alt="" width="100%" class="diary_img" />
          <p class="title">{{ item.title }}</p>
          <p class="title" style="color: red">￥{{ item.price }}</p>
          <!-- <el-divider></el-divider> -->
        </div>
      </div>

      <div class="some_logo">
        <img src="../../assets/img/home/web.png" alt="" />
        <img src="../../assets/img/home/qq.png" alt="" />
        <img src="../../assets/img/home/csdn.png" alt="" />
        <img src="../../assets/img/home/github.png" alt="" />
        <img src="../../assets/img/home/wechat.png" alt="" />
      </div>
      <p class="cen copyright">Copyright © 2020 By Erha</p>
      <div style="margin-bottom: 64px"></div>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
import { get_diary_async } from "../../api/api";
export default {
  name: "Home",
  components: {},
  filters: {
    createTime: function (value) {
      var date = new Date(value);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    },
  },
  data() {
    return {
      loading: true,
      search: "", //搜索输入框的值
      diary_list: [],
      pagesize: 10, //默认分页每页数据量
      currentPage: 1, //默认展示第一页数据
    };
  },
  created() {
    const user = localStorage.getItem("user");
    this.get_diary_async({
      user: user,
    });
    this.init();
  },
  methods: {
    //获取查询数据
    async get_diary_async(param) {
      try {
        const res = await get_diary_async(param);
        console.log(res);
        this.diary_list = res.data.data;
        this.loading = false;
        // this.tableData = res.data.body.dataList
      } catch (error) {
        console.log(error);
      }
    },
    search_goods() {
      api
        .goods_search({
          title: this.search,
        })
        .then((res) => {
          console.log(res);
          this.diary_list = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //初始化数据，请求默认数据
    init() {},
    //跳转到发表日记
    add_goods() {
      this.$router.push({ path: "/addGoods", name: "AddGoods" });
    },
    //跳转到详情页
    to_details(info) {
      this.$router.push({
        path: "/details",
        name: "Details",
        query: {
          id: info.id,
        },
      });
    },
  },
};
</script>

<style scoped>
.home {
  height: 100%;
}
.content_box {
  padding-left: 15px;
  padding-right: 15px;
}
.empty {
  height: 65vh;
  text-align: center;
  font-size: 13px;
}
.empty img {
  width: 100%;
}
.nav {
  display: flex;
  justify-content: space-between;
  height: 44px;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
}
.diary {
  font-size: 22px;
  font-weight: 550;
}
.add_diary {
  font-size: 24px;
  color: #409eff;
}
.fz-xl {
  font-size: 24px;
}

.big_box {
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
}
.diary_box {
  overflow: hidden;
  margin-top: 15px;
  border-radius: 10px;
  background: rgb(235, 229, 229);
  width: 48%;
  /* height: 100%; */
  /* border-bottom: 1px dashed #280bc1; */
}
.button{
  display: flex;
}
.title {
  color: black;
  font-size: 17px;
  line-height: 24px;
  text-align: center;
}
.time {
  font-size: 12px;
  text-indent: 2.5em;
  line-height: 20px;
}
.content {
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
}
.author {
  font-size: 12px;
  margin-bottom: 5px;
}
.browse {
  margin-left: 10px;
}

.copyright {
  margin-top: 10px;
  font-size: 15px;
}
/* 部分logo */
.some_logo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.some_logo img {
  width: 25px;
  height: 25px;
  margin-left: 20px;
}
</style>
