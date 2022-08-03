<template>
  <el-menu
    background-color="#545c65"
    text-color="#fff"
    active-text-color="#409eff"
    :default-active="getCurrentMenu"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    :router="true"
  >
    <h4 style="text-align: center" v-if="!isCollapse">通用后台管理系统</h4>
    <h4 style="text-align: center" v-else>后台</h4>

    <el-menu-item
      :index="item.path"
      :key="item.path"
      v-for="item in noChildren"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      index="index"
      :key="index"
      v-for="(item, index) in hasChildren"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group :key="i.path" v-for="i in item.children">
        <el-menu-item :index="i.path" :key="i.path" @click="clickMenu(i)">
          {{ i.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<script>
export default {
  name: "Aside",
  data() {
    return {
      isCollapse: false, //默认展开菜单
      menuInfo: [
        {
          path: "/home",
          name: "home",
          label: "主页",
          icon: "s-home",
        },
        {
          path: "/product",
          name: "product",
          label: "商品管理",
          icon: "video-play",
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理",
          icon: "user",
        },
        {
          label: "更多",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting",
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //点击左侧的导航菜单，就将点击的选项信息保存（修改currentMenu的值和添加当前菜单信息到tabsList(打开的标签页信息)中)
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
    },
  },
  // 页面一挂载就绑定bus中方法changeCol()
  mounted() {
    this.$bus.$on("changeCol", (val) => {
      // console.log("接收到的参数为：",val);
      this.isCollapse = val; //修改isCollapse的值为传递过来的参数
    });
  },

  // 计算属性
  computed: {
    // 有子菜单的菜单项
    hasChildren() {
      return this.menuInfo.filter((item) => item.children);
    },
    // 无子菜单的菜单项
    noChildren() {
      return this.menuInfo.filter((item) => !item.children);
    },

    //获取当前路由路径
    getCurrentMenu() {
      return this.$route.path; //获取当前路由
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
  /* overflow-x: hidden; // 隐藏水平滚动条 */
  /* overflow-y: hidden; //隐藏水平滚动条 */
}
.el-menu h4 {
  color: #fff;
}
</style>