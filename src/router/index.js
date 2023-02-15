import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    name:'home1',
    redirect:'/home',
    children:[
      {
        path:'/home',
        name:'home',
        component:() => import('../views/home/Home.vue')
      },
      {
        path:'/mall',
        name:'mall',
        component:() => import('../views/mall/index.vue')
      },
      {
        path:'/mallmanage',
        name:'mallmanage',
        component:() => import('../views/Mallmanage.vue')
      },
      {
        path:'/user',
        name:'user',
        component:() => import('../views/User/User.vue')
      },
      {
        path:'/message',
        name:'message',
        component:() => import('../views/Message.vue')
      },
     
      {
        path:'/about',
        name:'about',
        component:() => import('../views/About.vue')
      },
      {
        path:'/permissions',
        name:'permissions',
        component:() => import('../views/Permissions.vue')
      },
      {
        path:'/author',
        name:'author',
        component:() => import('../views/Author.vue')
      },
      {
        path:'/myhome',
        name:'myhome',
        component:() => import('../views/Myhome.vue')
      },
      
    ]
    // children:[]
  },
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Login.vue')
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
