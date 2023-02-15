<template>
  <div style="width: auto; height: 600px" id="main"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  methods: {
    createEcharts() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "小米", "苹果", "三星", "华为","vivo","OPPO"],
            ["未出售", 4110, 3004, 6520, 5323,3240,3451],
            ["已出售", 2110, 2004, 2520, 2244,1360,4652],
            ["已取消", 1110, 5004, 4520, 5000,4500,2345],
          ],
        },
        xAxis: [
          { type: "category", gridIndex: 0 },
          { type: "category", gridIndex: 1 },
        ],
        yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],
        grid: [{ bottom: "55%" }, { top: "55%" }],
        series: [
          // These series are in the first grid.
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          { type: "bar", seriesLayoutBy: "row" },
          // These series are in the second grid.
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
          { type: "bar", xAxisIndex: 1, yAxisIndex: 1 },
        ],
      };

      option && myChart.setOption(option);
    },
  },

  mounted() {
    this.createEcharts();
  },
};
</script>
