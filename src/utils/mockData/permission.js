import Mock from 'mockjs'

export default{
  getMenu:config => {
    const {username,password} = JSON.parse(config.body)
    // 根据用户名不同返回不同的菜单列表
    if(username === 'admin' && password === 'admin'){
      return{
        code:200,
        data:{
          menu:[
            {
              path:'/home',
              name:'home',
              label:'首页',
              icon:'HomeFilled',
              url:'home/Home',
            },
            {
              path:'/mall',
              name:'mall',
              label:'商品分析',
              icon:'video-play',
              url:'mall/index',
            },  
            {
              path:'/mallmanage',
              name:'mallmanage',
              label:'商品管理',
              icon:'goods',
              url:'Mallmanage',
            },         
            {
              path:'/user',
              name:'user',
              label:'用户管理',
              icon:'user',
              url:'User/User',
            },
            {
              path:'/message',
              name:'message',
              label:'消息中心',
              icon:'document',
              url:'Message',
            },
            {
              label:'其他',
              icon:'location',
              children:[
                {
                  path: "/about",
                  name: "about",
                  label: "关于",
                  icon: "share",
                  url: "About",
                },
                {
                  path: "/permissions",
                  name: "permissions",
                  label: "权限管理",
                  icon: "setting",
                  url: "Permissions",
                },
                {
                  path:'/author',
                  name:'author',
                  label:'联系作者',
                  icon:'phone',
                  url:'Author',
                },
              ]
            },                    
          ],
          token:Mock.Random.guid(),
          message:'获取成功'
        }
      }
    }else if(username === 'xiaoxiao' && password === 'xiaoxiao'){
      return{
        code:200,
        data:{
          menu:[
            {
              path:'/home',
              name:'home',
              label:'首页',
              icon:'HomeFilled',
              url:'home/index',
            },
            {
              path:'/mall',
              name:'mall',
              label:'商品分析',
              icon:'video-play',
              url:'mall/index',
            },  
            {
              label:'其他',
              icon:'location',
              children:[
                {
                  path: "/about",
                  name: "about",
                  label: "关于",
                  icon: "setting",
                  url: "About",
                },
                {
                  path:'/author',
                  name:'author',
                  label:'联系作者',
                  icon:'user',
                  url:'Author',
                },
              ]
            },
          ],
        }
      }
    }else{
      return{
        code:-999,
        data:{
          message:'密码错误'
        }
      }
    }
  }
}