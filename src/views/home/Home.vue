<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧内容 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/user.jpg" alt="" />
          <div class="user-info">
            <p class="name">羽殇</p>
            <p class="role">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2022-2-5</span></p>
          <p>上次登陆地点：<span>广州</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card 
          :body-style="{ display:'flex', padding:0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component 
            class="icons" 
            :is="item.icon"
            :style="{background:item.color}"
          ></component>
          <div class="details">
            <p class="mon">¥{{ item.value }}</p>
            <p class="text">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 折线图 -->
      <el-card style="height:270px" class="Line">
        <div ref="echart" style="height:280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height:260px">
          <!-- 柱状图 -->
          <div ref="userechart" style="height:240px"></div>
        </el-card>
        <el-card style="height:260px">
          <!-- 饼状图 -->
          <div ref="videoechart" style="height:240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getCurrentInstance, onMounted,reactive,ref } from "vue";
import axios from "axios";
import * as echarts from 'echarts';

export default {
  setup() {
    const {proxy} = getCurrentInstance();  //这个proxy相当于this
    let tableData = ref([]);
    let countData = ref([]);

    const tableLabel = {
      name: "品牌",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    // 得到首页table数据
    const getTableList = async () => {
      // await axios
      //   .get(
      //     "https://www.fastmock.site/mock/1d7cdc67c9eaf5c47e4021a11ea445e0/api/home/getTableData"
      //   ).then((res) => {
      //     if(res.data.code == 200){
      //       tableData.value = res.data.data
      //     }
      //   });
      let res = await proxy.$api.getTableData();
      tableData.value = res;
    };
    // 得到首页count数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    };
    onMounted(() => {
      getTableList();
      getCountData();
      getChartData();
    })
    // charts表格的渲染部分，可查看echarts官网。
    // x轴表格配置
    let xOptions = reactive({
      textStyle:{
        color:"#333"
      },
      grid:{
        left:"20%",
      },
      tooltip:{
        trigger:"axis"
      },
      xAxis:{ //X轴配置
        type:"category", //横坐标是类目型
        data:[],
        axisLine:{
          lineStyle:{
            color:"#17b3a3"
          },
        },
        axisLabel:{
          interval:0,
          color:"#333"
        },
      },
      yAxis:[ //Y轴配置
        {
          type:"value", //纵坐标是数值型
          axisLine:{
            lineStyle:{
              color:"#17b3a3"
            }
          },
        },
      ],
      color:["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
      series:[],
    });
    // 饼状图配置
    let pieOptions = reactive({
      tooltip:{
        trigger:"item",
      },
      color:["#0f78f4","#dd536b","#9462e5","#a6a6a6","#e1bb22","#39c362","#3ed1cf"],
      series:[],
    });
    let orderData = reactive({
      xData:[],
      series:[],
    });
    let userData = reactive({
      xData:[],
      series:[],
    });
    let videoData = reactive({
      series:[],
    })

    // 获取表格数据
    const getChartData = async () => {   
      const result = await proxy.$api.getChartData();

      let res = result.otherData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      
      // 给orderData的xData赋值
      orderData.xData = res.date;
      // 给orderData的series配置赋值
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name:key,
          data:res.data.map((item) => item[key]),
          type:"line", //折线
        });
      });
      orderData.series = series; //把上面push完数据的series配置重新赋值给orderData里的serise
      // 把orderData的配置传回给xOprtions
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      
      // 对折线图进行渲染
      let hEcharts = echarts.init(proxy.$refs["echart"]);
      hEcharts.setOption(xOptions);

      // 对柱状图的渲染过程：
      userData.xData = userRes.map((item) => item.date );
      userData.series = [
        {
          name:"新增用户",
          data:userRes.map((item) => item.new),
          type:"bar", //柱状图
        },
        {
          name:"活跃用户",
          data:userRes.map((item) => item.active),
          type:"bar", //柱状图
        },
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      let uEcharts = echarts.init(proxy.$refs["userechart"]);
      uEcharts.setOption(xOptions);

      // 对饼状图的渲染过程
      videoData.series = [
        {
          data:videoRes,
          type:"pie",  //饼状图
        },
      ];
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videoechart"]);
      vEcharts.setOption(pieOptions);
    };


    return {
      tableData,
      tableLabel,
      countData,
    };
  },
};
  // {
    //   name:"本月支付订单",
    //   value:1234,
    //   icon:"SuccessFilled",
    //   color:"#2ec7c9",
    // },
    // {
    //   name:"本月收藏订单",
    //   value:124,
    //   icon:"StarFilled",
    //   color:"#ffb980",
    // },
    // {
    //   name:"本月未支付订单",
    //   value:134,
    //   icon:"GoodsFilled",
    //   color:"rgb(158, 198, 243)",
    // },
</script>

<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .details{
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .mon{
        font-size: 30px;
        margin-bottom: 8px;
      }
      .text{
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      /deep/.el-card__body{
        padding-top: 5px;
      }
    }
  }
  .Line{
    /deep/.el-card__body{
      padding-top: 0;
    }
  }
}

</style>