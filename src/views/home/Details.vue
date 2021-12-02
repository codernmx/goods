<template>
  <div id="details">
    <el-breadcrumb class="mt" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="editbutton">
      <el-button
        type="primary"
        @click="editGoods"
        icon="el-icon-edit"
        size="mini"
      ></el-button>
      <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="取消"
        icon="el-icon-info"
        icon-color="red"
        @cancel="$message.info('取消')"
        @confirm="deleteGoods"
        title="确定删除吗？"
      >
        <el-button
          type="danger"
          icon="el-icon-delete"
          slot="reference"
          size="mini"
        ></el-button>
      </el-popconfirm>
    </div>
    <h3 class="cen mt">{{ goodsInfo.TITLE }}</h3>
    <p class="cen mt author">
      {{ goodsInfo.title }}
    </p>
    <el-image
      class="img"
      @load="img_load"
      :src="goodsInfo.picture"
      lazy
    ></el-image>

    <div class="loading_box">
      <span class="el-icon-loading loading" v-if="show_loading"></span>
    </div>
    <div>
      {{ goodsInfo.des }}
    </div>
    <p class="cen mb copyright">Copyright © 2020 By Erha</p>
    <div style="margin-bottom: 49px"></div>
  </div>
</template>

<script>
import * as api from "../../api/api";

export default {
  name: "Details",
  components: {},
  data() {
    return {
      show: null,
      goodsInfo: {}, //存储日记详细信息
      show_loading: true, //图片没出来的时候加载动画
    };
  },
  created() {
    this.init();
  },
  methods: {
    editGoods() {
      this.$router.push({
        path: "/addGoods",
        name: "AddGoods",
        query:{
          id:this.$route.query.id
        }
      });
    },
    deleteGoods() {
      api
        .post("/api/goods/del", {
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("删除成功");
            setTimeout(() => {
              this.$router.push({
                path: "/home",
                name: "Home",
              });
            }, 1500);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //初始化
    init() {
      api
        .get_details(this.$route.query.id) //获取日记列表
        .then((res) => {
          console.log(res);
          this.goodsInfo = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //图片加载完成的回调
    img_load() {
      this.show_loading = false;
    },
  },
};
</script>

<style scoped>
#details {
  padding-left: 15px;
  padding-right: 15px;
}
.img {
  width: 100%;
  border-radius: 5px;
  margin-top: 15px;
}
.author {
  font-size: 20px;
  margin-top: 30px;
}
.browse {
  margin-left: 10px;
}
.content {
  text-indent: 2em;
  text-align: justify;
}
.loading_box {
  width: 100%;
  text-align: center;
}
.loading {
  font-size: 50px;
  color: #409eff;
}
.copyright {
  margin-top: 10px;
  font-size: 15px;
}

.cative {
  color: #ff5777;
}
.editbutton {
  display: flex;
  justify-content: right;
}
</style>
