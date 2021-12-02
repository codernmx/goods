<template>
  <div id="write_diary">
    <nav class="nav">
      <div @click="close_diary">取消</div>
      <div>发布商品</div>
      <div>
        <el-button type="primary" round size="mini" @click="submit">{{
          this.$route.query.id ? "保存" : "发布"
        }}</el-button>
      </div>
    </nav>
    <div class="box">
      <el-input
        v-model="params.title"
        class="title"
        placeholder="请输入商品标题"
      ></el-input>
      <el-input
        type="textarea"
        class="content"
        :rows="5"
        placeholder="请输入商品详细介绍"
        v-model="params.des"
        :autosize="{ minRows: 6, maxRows: 10 }"
      >
      </el-input>
      <el-input
        v-model="params.picture"
        class="title"
        placeholder="请输入商品图片，可以为空"
      ></el-input>
      <el-input
        v-model="params.price"
        class="title"
        placeholder="请输入商品价格"
      ></el-input>
    </div>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "AddGoods",
  components: {},
  data() {
    return {
      params: {},
      all_info: false, //是否填写所有信息
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 上传文件
    close_diary() {
      this.$router.push({ path: "/home", name: "Home" });
    },
    handlePreview(file) {
      console.log(file);
    },
    submit() {
      let url = "";
      if (this.$route.query.id) {
        url = "/api/goods/update";
      } else {
        url = "/api/goods/insert";
      }
      api
        .post(url, {
          ...this.params,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success("成功");
            setTimeout(() => {
              this.$router.push({
                path: "/home",
                name: "Home",
              });
            }, 1500);
          }else{
            this.$message.error("失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 上传文件
    //初始化数据，请求默认数据
    init() {
      api
        .get_details(this.$route.query.id) //获取日记列表
        .then((res) => {
          this.params = res.data;
          console.log(this.params,'par')
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.nav {
  height: 44px;
  line-height: 44px;
  padding-left: 15px;
  padding-right: 15px;
  border-bottom: 1px dashed #ccc;
  display: flex;
  justify-content: space-between;
}
.box {
  width: 100%;
  height: 250px;
  padding-left: 15px;
  padding-right: 15px;
  /* border: 1px solid black; */
}
.title {
  margin-top: 15px;
  margin-bottom: 10px;
}
.content {
  margin-bottom: 10px;
}
.upload-demo {
  width: 100%;
}
.choose_file_button {
  width: 100%;
}
</style>
<style>
.el-upload {
  width: 100%;
}
</style>
