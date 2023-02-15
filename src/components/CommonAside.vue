<template>
  <el-aside :width="$store.state.isCollapse ? '180px' : '65px'">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="!$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台管理</h3>
      <h3 v-show="!$store.state.isCollapse">后台</h3>
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
            
<script>
import { useRouter } from "vue-router";
import { useStore } from 'vuex';

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    const list = [
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "UserManage/UserManage",
      },
      {
        label: "其他",
        icon: "location",
        path: "/other",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "Other/PageOne",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "Other/PageTwo",
          },
        ],
      },
    ];
    // 判断是否有二级菜单
    const noChildren = () => {
      return asyncList.filter((item) => !item.children);
    };
    const hasChildren = () => {
      return asyncList.filter((item) => item.children);
    };

    const asyncList = store.state.menu;

    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });

      // 通过vuex来管理面包屑,当点击菜单会提交到store的selectMenu函数来管理
      store.commit("selectMenu",item);
    };

    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style lang="less" scoped>
.icons {
  width: 18px;
  height: 18px;
  padding-right: 8px;
}
.el-menu {
  border-right: none;
  height: 100vh;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
}
</style>