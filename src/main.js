import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/less/index.less'
import './utils/mock.js'
import api from './utils/api'
import mitt from 'mitt'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.config.globalProperties.$mitt = new mitt();  //把mitt挂载到全局


app.config.globalProperties.$api = api  //把utils里的api挂载到全局
// store.commit("addMenu",router);

// 路由守卫，如果没有登陆就回到登录页面，否则就跳转页面
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else{
    next()
  }
})
app.use(store).use(router).use(ElementPlus).mount('#app')


