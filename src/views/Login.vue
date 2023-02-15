<template>
  <div class="container">
    <el-form :model="loginForm" class="login-container">
      <h3>系统登陆</h3>
      <el-form-item>
        <el-input type="input" :prefix-icon="User" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" :prefix-icon="Lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>      
      <el-form-item>
        <el-button type="primary" @click="login" style="width:100%">登陆</el-button>
      </el-form-item>
      <el-form-item >
        <el-checkbox v-model="checked" label="记住密码" size="small" />
        <el-button link size="small">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurrentInstance, reactive,ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { Lock,User} from '@element-plus/icons-vue'
export default {
  setup(){
    const checked = ref(true)
    const store = useStore();
    const router = useRouter();
    const {proxy} = getCurrentInstance()
    const loginForm= reactive({
      username:'admin',
      password:'admin',
    })

    const login = async () => {
      const res = await proxy.$api.getMenu(loginForm);
      store.commit("setMenu",res.menu);
      store.commit("addMenu",router);
      store.commit("setToken",res.token);
      router.push({
        name:"home",
      })
    }

    return{
      loginForm,
      login,
      Lock,
      User,
      checked
    }
  }  
}

</script>

<style lang="less" scoped>
.container{
  position : absolute;
	width : 100%;
	height : 100%;
   /* 背景图垂直水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  background-image: url(../assets/images/login.jpg);
  .login-container{
    width: 300px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    border-radius: 15px;
    padding: 35px 35px 15px 35px;
    // box-shadow: 0 0 25px #cacaca;
    margin: 180px auto;
    // background: rgba(216, 214, 214, 0.3);
    
    h3{
      text-align: center;
      margin-bottom: 20px;
      color: #505450;
    }
    /deep/.el-form-item__content{
      display: flex;
      justify-content: space-between;
    }
  }
}

</style>