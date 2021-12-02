<template>
  <div id="login">
    <!-- <el-alert
            title="当前可以注册账号了哦，注意新注册账号没有日记信息"
            type="warning"
            center
            show-icon>
        </el-alert> -->
    <vue-particles
      color="#FF5777"
      :particleOpacity="0.6"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#FF5777"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="130"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg"
    >
    </vue-particles>
    <div class="box">
      <el-input
        v-model="user"
        placeholder="请输入账号"
        prefix-icon="el-icon-user"
      ></el-input>
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-unlock"
        v-model="password"
        show-password
      ></el-input>
      <el-button
        type="primary"
        size="medium"
        class="submit"
        @click="submit"
        :loading="loginLoading"
      >立即登录</el-button>
    </div>
    <p
      class="cen"
      @click="toRegister"
    >
      没有账号，去注册
    </p>
    <p class="cen mt30">
      <a
        href="https://beian.miit.gov.cn/#/Integrated/index"
        target="_blank"
        rel="noopener noreferrer"
      >粤ICP备2021041292号</a>
    </p>
  </div>
</template>

<script>
import * as api from "../../api/api";
export default {
  name: "Login",
  components: {},
  data () {
    return {
      user: "",
      password: "",
      loginLoading: false
    };
  },
  created () {
    this.init();
    this.user = this.$route.params.user
    this.password = this.$route.params.password
  },
  methods: {
    //初始化数据，请求默认数据
    init () {
      //读取localStorage
    },
    toRegister () {
      this.$router.push({
        path: "/register",
        name: "Register",
      });
    },
    submit () {
      this.loginLoading = true
      //获取token
      if (this.password && this.password) {
        api.post('/api/login', {
          user: this.user,
          password: this.password,
        }).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.$message.success({
              message: '登陆成功',
              center: true
            });
            localStorage.user = res.user;//用户
            this.$router.push({
              path: "/profile",
              name: "Profile",
            }).catch(err => {
              console.log(err)
            });
          } else {
            this.loginLoading = false
            this.$message.error({
              message: res.msg,
              center: true
            });
          }
        })
      } else {
        this.$message.error('请填写账号或者密码')
        this.loginLoading = false
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  margin: auto;
  height: 130px;
  margin-top: 180px;
}
.submit {
  width: 100%;
}

.bg {
  width: 100%;
  height: 100%;
  background: #fcfcfc;
  position: absolute;
  z-index: -1;
  top: 0;
  overflow: hidden;
}
.cen {
  margin-top: 10px;
  font-size: 12px;
}
.mt30 {
  margin-top: 70px;
}
</style>
