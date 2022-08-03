<template>
  <div id="tag">
    <el-tag
      :key="index"
      size="small"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      <!-- 主页的标签无法关闭 -->
      <!-- 当前路由所对应的标签页高亮显示 -->
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
export default {
  name: "Tag",
  data() {
    return {};
  },
  computed: {
    // 获取store中的打开的标签页信息
    tags() {
      return this.$store.state.tabsList;
    },
  },
  methods: {
    //点击标签上的x来关闭标签
    handleClose(tag, index) {
      let length = this.tags.length - 1; //除主页外打开的标签页的个数
      //  将当前标签的信息从tabsList中删除
      this.$store.state.tabsList.splice(index, 1);
      // 如果关闭的标签不是当前路由的话，就不跳转
      if (tag.name !== this.$route.name) {
        return;
      }
      // 关闭的标签是最右边的话，往左边跳转一个
      if (index === length) {
        // 修改currentMenu的值
        this.$store.commit('selectMenu',this.tags[index - 1])
        this.$router.push({ name: this.tags[index - 1].name });

      } else {
        // 否则往右边跳转
        // 修改currentMenu的值
        this.$store.commit('selectMenu',this.tags[index])
        this.$router.push({ name: this.tags[index].name });
      }
    },

    //点击标签，跳转到对应的路由
    changeMenu(tag) {
      if (this.$route.name != tag.name) {
        //改变当前的路由信息
        this.$router.push({ name: tag.name });
        //修改store中的currentMenu、tabsList信息
        this.$store.commit("selectMenu", tag);
      }
    },
  },
};
</script>
<style>
#tag {
  width: 100%;
  height: 40px;
  background-color: #f4f4f4;
}
.el-tag {
  margin-top: 12px;
  margin-left: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>