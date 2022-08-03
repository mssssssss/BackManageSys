<template>
  <el-card class="loginForm">
    <el-form
      ref="loginForm"
      :rules="rules"
      :model="loginForm"
      label-width="80px"
    >
      <h3 style="text-align: center">登录页面</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import mock from 'mockjs'
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            message: "密码至少为6个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) return;
        else {
          //表单验证通过的情况
          if (
            this.loginForm.username == "admin" &&
            this.loginForm.password == "123456"
          ) {
            //登录成功
            // 将登录的token保存;
            this.$store.commit('setToken',mock.Random.guid())
            this.$message("登录成功");
            // 跳转到/home
            this.$router.push("/home");
          } else {
            this.$message("登录失败");
          }
        }
      });
    },
  },
};
</script>
<style>
.loginForm {
  width: 30%;
  margin: 0 auto;
  margin-top: 100px;
}
</style>