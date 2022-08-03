<template>
  <el-container class="main">
    <el-aside width="auto">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <Tag></Tag>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Aside from "./common/Aside.vue";
import Header from "./common/Header.vue";
import Tag from "./common/Tag.vue";

export default {
  name: "Main",
  components: {
    Aside,
    Header,
    Tag,
  },
};
</script>
<style>
body {
  padding: 0;
  margin: 0;
  
}
.main{
  height:100%
}
.el-header {
  background-color: rgba(45, 43, 43, 0.87);
}
.el-main {
  background-color: #f4f4f4;
  padding-top: 5px;
  padding-left: 20px;
  padding-right: 5px;
}
</style>