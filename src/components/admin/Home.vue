<template>
  <div id="home">
    <el-row :gutter="10">
      <el-col :span="9">
        <el-card class="personInfo">
          <div style="height: 55px">
            <el-avatar
              style="float: left"
              :size="70"
              :src="avatar"
            ></el-avatar>
            <div style="float: left; margin-left: 30px">
              <div
                style="
                  font-size: 18px;
                  font-weight: bold;
                  margin-top: 10px;
                  margin-bottom: 5px;
                "
              >
                Admin
              </div>
              <div>超级管理员</div>
            </div>
          </div>
          <el-divider></el-divider>
          <el-row :gutter="10" style="margin-bottom: 10px">
            <el-col :span="8">上次登录时间</el-col>
            <el-col :span="16">2022/7/28</el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">上次登录地点</el-col>
            <el-col :span="16">江西南昌</el-col>
          </el-row>
        </el-card>
        <el-card>
          <el-table :data="tableData" style="width: 100%" :fit="true">
            <el-table-column prop="date" label="日期" width="100">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="80">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-row :gutter="10">
          <el-col :span="8" :key="index" v-for="(val, index) in analyzeData">
            <el-card class="analyzeArea">
              <div class="iconArea" :style="'background-color:' + val.bgColor">
                <i :class="'el-icon-' + val.icon"></i>
              </div>
              <div class="dataArea">
                <div>{{ val.value }}</div>
                <div>{{ val.name }}</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card class="analyseCard">
          <div id="analyse" ref="aaa"></div>
        </el-card>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-card class="analyseCard2">
              <div id="analyse2" ref="bbb"></div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="analyseCard3">
              <div id="analyse3" ref="ccc"></div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "Home",
  data() {
    return {
      avatar: require('@/assets/head.jpg'),
      tableData: [],
      analyzeData: [],
    };
  },
  methods: {
    setLineGraph(xAxis, legend, series) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.aaa);
      //  var myChart = echarts.init(document.getElementById("analyse")); //这样获取dom元素也可
      // 设置配置项
      var option = {
        title: {
          // text: "各品牌订单销量额",
        },
        tooltip: {},
        legend: {
          data: xAxis,
        },
        xAxis: {
          // type: 'category',
          data: legend,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };
      // 绘制图表
      myChart.setOption(option);
    },
    setBarGraph(legend2, series2) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.bbb);
      //  var myChart = echarts.init(document.getElementById("analyse")); //这样获取dom元素也可
      // 设置配置项
      var option = {
        title: {
          // text: "各品牌订单销量额",
        },
        tooltip: {},
        legend: {
          data: legend2,
        },
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: series2,
      };
      // 绘制图表
      myChart.setOption(option);
    },
    setPineGraph(series3) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.ccc);
      //  var myChart = echarts.init(document.getElementById("analyse")); //这样获取dom元素也可
      // 设置配置项
      var option = {
        tooltip: {},
        series: {
          type: "pie",
          data: series3,
        },
      };
      // 绘制图表
      myChart.setOption(option);
    },
  },
  mounted() {
    //获取后台接口返回的数据
    this.$axios.get("/getHomeData").then((response) => {
      // 这里 使用匿名函数
      // 处理成功情况
      this.tableData = response.data.data.tableInfo;
      this.analyzeData = response.data.data.statisInfo;

      //对返回的订单信息进行处理
      var date = response.data.data.date;
      var legend = date.map((item) => item["date"]); //获取时间信息
      var orderInfo = response.data.data.orderInfo;
      var xAxis = [];
      var series = [];
      //获取订单类别 apple/oppo/vivo
      xAxis = Object.keys(orderInfo[0]); //Object.keys()方法用来获取对象的所有key ['apple','oppo','vivo']
      xAxis.forEach((key) => {
        //遍历数组['apple','oppo','vivo']
        series.push({
          data: orderInfo.map((item) => item[key]), // map表示循环遍历数组，且原数组不会发生变化，会返回一个新的数组
          name: key,
          type: "line",
        });
      });
      console.log(date.map((item) => item["date"]));
      console.log(xAxis);
      console.log(series);
      // 渲染折线图
      this.setLineGraph(xAxis, legend, series);

      //对返回的用户信息进行处理
      var userInfo = response.data.data.userInfo;
      var legend2 = Object.keys(userInfo[0]);
      var series2 = [];
      legend2.forEach((key) => {
        series2.push({
          type: "bar",
          data: userInfo.map((user) => user[key]),
          name: key,
        });
      });
      // 渲染柱状图
      this.setBarGraph(legend2, series2);

      // 对返回的途径信息进行处理
      var waysInfo = response.data.data.waysInfo;
      var ways = waysInfo.map((item) => item.wayName);
      var values = waysInfo.map((item) => item.value);
      console.log(ways);
      console.log(values);
      var series3 = [];
      ways.forEach((way, index) => {
        series3.push({
          value: values[index],
          name: way,
        });
      });
      console.log(series3);
      // 渲染饼状图
      this.setPineGraph(series3);
    });

    // this.$axios.get('/hello', params)  //也可添加请求需要携带的参数
  },
};
</script>
<style>
#home{
  margin-top:10px;
  margin-right:10px
}
.personInfo {
  height: 190px;
  margin-bottom: 5px;
  color: #555;
}
.analyzeArea {
  margin-bottom: 5px;
  border: none;
}
.analyzeArea > .el-card__body {
  padding: 0;
}
.iconArea {
  float: left;
  width: 50px;
  height: 60px;
  /* background-color: red; */
}
.iconArea i {
  color: #fff;
  font-size: 22px;
  text-align: center;
  line-height: 60px;
  width: 50px;
}
.dataArea {
  float: left;
  color: #555;
  margin-left: 15px;
}
.dataArea > div:nth-child(1) {
  margin-top: 8px;
  font-size: 18px;
  font-weight: bold;
}
.dataArea > div:nth-child(2) {
  font-size: 12px;
  margin-top: 4px;
}

.analyseCard {
  margin-bottom: 5px;
  height: 190px;
}
#analyse {
  width: 100%;
  height: 210px;
}
.analyseCard2 {
  height: 240px;
}
#analyse2 {
  width: 100%;
  height: 240px;
}
.analyseCard3 {
  height: 240px;
}
#analyse3 {
  width: 100%;
  height: 240px;
}
</style>