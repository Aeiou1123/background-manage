import Mock from 'mockjs'
import userApi from './mockData/user'
import permissionApi from './mockData/permission'

// 使用本地mock来模拟user数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)  //拦截getUserList
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)
Mock.mock(/user\/delete/,'get',userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post',permissionApi.getMenu)
