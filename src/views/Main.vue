<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <common-aside />
      <el-container>
        <el-header> <common-header /> </el-header>
        <common-tab />
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent, DefineComponent } from "vue";
import CommonHeader from "../components/CommonHeader.vue";
import CommonAside from "../components/CommonAside.vue";
import CommonTab from "../components/CommonTab.vue";

export default defineComponent({
  components: {
    CommonHeader,
    CommonAside,
    CommonTab,
  },
});
</script>

<style lang="less" scoped>
.el-container{
  // flex-wrap:wrap;
  // align-items: flex-start;
  // height: 100%;
  overflow: hidden;
  .el-header{
    background: #333;
  }
}
.common-layout{
  .lay-container{
    // flex-wrap: nowrap;
    .right-main{
      // height: calc(100%-124px) !important;
     
    }
  }
  background: rgb(250, 247, 247);
  height: 100%;
  & > .el-container{
    height: 100%;
    & > .el-aside{
      
      background: #545c64;
    }
  }
}
</style>