// 对整个项目数据的管理
import request from "./request";

export default{
  // home组件左侧表格数据获取
  getTableData(params){
    return request({
      url:'/home/getTableData',
      method:'get',
      data:params,
      mock:true,
    })
  },
  getCountData(){
    return request({
      url:'/home/getCountData',
      method:'get',
      mock:true,
    })
  },
  getChartData(){
    return request({
      url:'/home/getChartData',
      method:'get',
      mock:true,
    })
  },
  getUserData(params){
    return request({
      url:'/user/getUser',
      method:'get',
      mock:false,   //这个mock开关置为false，表示使用本地mock
      data:params,
    })
  },
  // 新增用户
  addUser(params){
    return request({
      url:'/user/add',
      method:'post',
      mock:false,
      data:params,
    })
  },
  // 编辑用户
  editUser(params){
    return request({
      url:'/user/edit',
      method:'post',
      mock:false,
      data:params,
    })
  },
  // 删除用户
  deleteUser(params){
    return request({
      url:'/user/delete',
      method:'get',
      mock:false,
      data:params,
    })
  },
  // 根据用户名不同返回不同的菜单列表
  getMenu(params){
    return request({
      url:'/permission/getMenu',
      method:'post',
      mock:false,
      data:params,
    })
  },
  // 关于页面项目依赖数据
  getColumnsData(){
    return request({
      url:'/about/getColumnsData',
      method:'get',
      mock:true,
    })
  },
  // 消息中心数据
  getMessageData(){
    return request({
      url:'/getMessageData',
      method:'get',
      mock:true,
    })
  },
  // 商品管理数据
  getMallData(){
    return request({
      url:'/getMallData',
      method:'get',
      mock:true,
    })
  },
}