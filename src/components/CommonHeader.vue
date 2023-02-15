<template>
  <el-header>
    <!-- 左侧图标 -->
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }" >首页</el-breadcrumb-item>
        <!-- 下面的菜单跳转通过current的路径来实现 -->
        <el-breadcrumb-item :to="current.path" v-if="current">{{ current.label }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右侧头像 -->
    <div class="r-content">
      <div class="btn-bell" @click="$router.push('/message')">
        <el-tooltip
          effect="dark"
          :content="message ? `有${message}条未读消息` : `消息中心`"
          placement="bottom"
        >
          <el-icon color="#fff" size="25px"><Bell /></el-icon>
          <i class="el-icon-lx-notice"></i>
        </el-tooltip>
        <span class="btn-bell-badge" v-if="message"></span>
			</div>
      <el-dropdown>
        <span class="el-dropdown-link">
            <img class="user" src="../assets/images/user.jpg" alt="" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-link href="https://github.com/" :underline="false">项目仓库</el-link>
            </el-dropdown-item>
            <el-dropdown-item @click="handlemyhome">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed } from '@vue/runtime-core';
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';

import { getCurrentInstance, ref } from 'vue'

export default {
  setup(){
    let store = useStore()
    const router = useRouter();

    let handleCollapse = () => {
      // 调用vuex中的mutations
      store.commit('updateIsCollapse')
    };

    // 拿到store里的currentMenu
    const current = computed(() => {
      return store.state.currentMenu;
    });


    // 退出登陆
    const handleLoginOut = () => {
      store.commit("cleanMenu");
      router.push({
        name:"login",
      })
    } 

    const handlemyhome = () => {
      router.push({name:"myhome"})
    }

    // 消息提示
    const message = ref('8')
    let { proxy } = getCurrentInstance()
    // 接收message组件传的值
    proxy.$mitt.on('mittFn',(result)=>{
      message.value = result
    })

    return{
      handleCollapse,
      current,
      handleLoginOut,
      handlemyhome,
      message,
    }
  }
}
</script>

<style lang="less">
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 100%;
    // background: #333;
}
.el-header{
  width: 100%;
}
.l-content{
    display: flex;
    align-items: center;
    .el-button{
        margin-right: 20px;
    }
    h3{
        color: #fff;
    }
}
.r-content{
  display: flex;
  justify-content: space-between;
    .user{
        width: 40px;
        height: 40px;
        border-radius:50%;
        cursor: pointer;
    }
}
.el-breadcrumb__inner{
  color: #fff !important;
  cursor: pointer !important;
}
.btn-bell {
	position: relative;
	width: 30px;
	height: 30px;
	text-align: center;
	border-radius: 15px;
	cursor: pointer;
	display: flex;
  margin-right: 13px;
  margin-top: 7px;
	align-items: center;
  .el-icon-lx-notice {
    color: #fff;
  }
}
.btn-bell-badge {
	position: absolute;
	right: 4px;
	top: 0px;
	width: 8px;
	height: 8px;
	border-radius: 4px;
	background: #f56c6c;
	color: #fff;
}

</style>
