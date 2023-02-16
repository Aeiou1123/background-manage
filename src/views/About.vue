<template>
  <div>
    <el-card class="box-card mb-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目简介</span>
        </div>
      </template>
      <span style="font-size: 16px; line-height: 30px">
        &emsp;&emsp;本项目是一个基于Vue3、Vite2、javaScript、Element-Plus
        的后台管理系统。你可以通过登陆不同的用户来展示不同的内容，在项目中实现了基本的CRUD功能，
        并且对数据进行了持久存储。对mock进行了线上和线下单独操作、分开管理。对axios进行了二次封装，提高开发效率。
        本项目可以帮助您快速搭建企业级后台管理系统，如果需要进行二次开发或用于商用可联系作者获得许可。
        功能：登陆/退出、用户管理、商品管理、消息处理、权限管理、联系作者、登陆校验·····
      </span>
    </el-card>
    <el-card class="box-card m-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">项目信息</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <helpFilled />
              </el-icon>
              项目名称
            </div>
          </template>
          后台管理系统
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <iphone />
              </el-icon>
              当前版本
            </div>
          </template>
          1.0.0
        </el-descriptions-item>
        <el-descriptions-item width="300px">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <uploadFilled />
              </el-icon>
              最后更新时间
            </div>
          </template>
          2023.2.9
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <location />
              </el-icon>
              项目地址
            </div>
          </template>
          <el-link href="https://gitee.com/Aeiou-YuShang/background-manage" :underline="false">
            <el-tag size="small">https://gitee.com/Aeiou-YuShang/background-manage </el-tag>
          </el-link>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon>
                <office-building />
              </el-icon>
              技术栈
            </div>
          </template>
          Vue3、Vite2、Element-Plus、Echarts、Mock、Axios
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
    <el-card class="box-card m-4" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">开发依赖</span>
        </div>
      </template>
      <el-descriptions class="margin-top" :column="4" border>
        <el-descriptions-item v-for="item in columns">
          <template #label>
            <div class="cell-item">
              {{ item.name }}
            </div>
          </template>
          <el-tag>{{ item.col }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
export default {
  setup() {
    const { proxy } = getCurrentInstance();
    let columns = ref([]);
    const getColumnsData = async () => {
      let res = await proxy.$api.getColumnsData();
      columns.value = res;
    };
    onMounted(() => {
      getColumnsData();
    });
    return { columns };
  },
};
</script>

<style lang="less" scoped>
.el-card {
  max-width: 95%;
  margin-bottom: 18px;
}
</style>