<template>
  <div class="content">
    <div class="l-content">
      <el-button
        @click="isColl"
        class="menu"
        plain
        size="mini"
        icon="el-icon-menu"
      >
      </el-button>
      <!-- 面包屑 -->
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <!-- 默认显示’主页‘ -->
          <el-breadcrumb-item :to="{ path:'/home'}">主页</el-breadcrumb-item>
          <el-breadcrumb-item :to="current.path" v-if="current" class='showBreadcrumb'>{{
            current.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" @command="handleCommand">
        <img class="el-dropdown-link head" :src="imgUrl" alt="" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人主页</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
// import head from "src\assets\head.jpg";

export default {
  name: "Header",
  data: function () {
    return {
      coll: false, //两个组件要传值 将Header.vue中的coll参数传递给 Aside.vue中的isCollapse参数
      imgUrl: require('@/assets/head.jpg')
    };
  },
  computed: {
    //根据当前菜单 面包屑显示对应菜单
    current() {
      return this.$store.state.currentMenu;
    },
  },
  methods: {
    // 点击折叠菜单按钮触发事件
    isColl: function () {
      this.coll = !this.coll;
      //触发事件changeCol 将coll的值传递出去
      this.$bus.$emit("changeCol", this.coll);
    },
    //点击了头像的下拉菜单
    handleCommand(command) {
      // this.$message("click on item " + command);
      //点击了退出
      if (command == "exit") {
        // 清空token
        this.$store.commit("clearToken");
        // 跳转到登录页面
        this.$router.push({ name: "login" });
      }
    },
  },
};
</script>
<style>
.content {
  height: 100%;
  line-height: 60px;
  display: flex;
  color: #fff;
}
.l-content {
  display: flex;
  flex-grow: 1;
  align-items: center;
}
.menu {
  margin-right: 20px;
}
.r-content {
  display: flex;
}
.head {
  border-radius: 50%;
  width: 45px;
  height: 45px;
  margin-top: 7px;
}
.showBreadcrumb>span{
  color: #fff !important;
}
</style>