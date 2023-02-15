import { createStore } from 'vuex'
import Cookie from 'js-cookie'

export default createStore({
  state: {
    isCollapse:true,
    currentMenu:null,

    tabsList:[
      {
        path:'/',
        name:'home',
        label:'首页',
        icon:'home',
      }
    ],
    menu:[],
    token:'',
  },
  mutations:{
    updateIsCollapse(state,payload){
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state,val){
      if(val.name == 'home'){
        state.currentMenu = null
      }else{
        state.currentMenu = val;
        //下面对tag栏进行判断，当点击左侧菜单栏时，如果没有该菜单名就新增，有的话就让当前的tag背景为蓝色。
        let result =  state.tabsList.findIndex(item => item.name === val.name)
        // 如果result是-1 就是没有，没有就push val值
        result == -1 ? state.tabsList.push(val) : '';
      }
    },
    closeTab(state,val){
      let res = state.tabsList.findIndex(item => item.name === val.name)
      // 删除点击的那一个tag
      state.tabsList.splice(res,1)
    },
    setMenu(state,val){
      state.menu = val
      // 持久存储
      localStorage.setItem('menu',JSON.stringify(val))
    },
    addMenu(state,router){
      if(!localStorage.getItem('menu')){
        return
      }
      const menu = JSON.parse(localStorage.getItem('menu'))
      state.menu = menu

      // const menuArray = []
      // // 实现动态路由
      // menu.forEach(item => {
      //   if(item.children){
      //     item.children = item.children.map(item => {
      //       let url = `../views/${item.url}.vue`
      //       item.component = () => import(url)
      //       return item
      //     })
      //     menuArray.push(...item.children)
      //   }else{
      //     let url = `../views/${item.url}.vue`
      //     item.component = () => import(url)
      //     menuArray.push(item)
      //   }
      // })

      // menuArray.forEach(item => {
      //   router.addRoute('home1',item)
      // })
    },
    // 清除菜单
    cleanMenu(state){
      state.menu = []
      localStorage.removeItem('menu')
    },
    // 设置token实现路由守卫
    setToken(state,val){
      state.token = val
      Cookie.set('token',val)
    },
    clearToken(state){
      state.token = ''
      Cookie.remove('token')
    },
    getToken(state){
      state.token = state.token || Cookie.get('token')
    }
  }
})
