import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param20bj(url){
  const search = url.split('?')[1]
  if(!search){
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g,'\\"')
      .replace(/&/g,'","')
      .replace(/=/g,'":"')+
    '"}'
  )  
}

let List = []
const count = 200  //创建200条数据
// 随机生成200条数据
for(let i = 0; i<count;i++){
  List.push(
    Mock.mock({
      id:Mock.Random.guid(),
      name:Mock.Random.cname(),
      addr:Mock.mock('@county(true)'),
      'age|18-60':1,
      birth:Mock.Random.date(),
      sex:Mock.Random.integer(0,1)
    })
  )
}
// console.log(List)
export default{
  // 获取数据
  getUserList:config => {    
    const { name, page = 1, limit = 20} = param20bj(config.url)  //一页展示20条数据,默认展示第一页
    const mockList = List.filter(user => {
      // if(name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1)
      return true
    })
    const pageList = mockList.filter((item,index) => index < limit * page && index >= limit * (page - 1)) 
    // console.log(pageList)
    return{
      code:200,
      data:{
        list:pageList,
        count:mockList.length,
      }
    }   
  },
  
  // 增加用户
  createUser:config => {
    const {name,addr,age,birth,sex} = JSON.parse(config.body)
    List.unshift({
      id:Mock.Random.guid(),
      name:name,
      addr:addr,
      age:age,
      birth:birth,
      sex:sex
    })
    return{
      code:200,
      data:{
        message:'添加成功'
      }
    }
  },

  // 删除用户
  deleteUser:config => {
    const {id} = param20bj(config.url)
    if(!id){
      return{
        code:-999,
        message:'参数不正确'
      }
    }else{
      List = List.filter(u => u.id !==id)
      return{
        code:200,
        message:'删除成功'
      }
    }
  },

  // 批量删除
  batchremove:config => {
    let {ids} = param20bj(config.url)
    ids = ids.split(',')
    List = List.filter(u => !ids.includes(u.id))
    return {
      code:200,
      data:{
        message:'批量删除成功'
      }
    }
  },

  // 修改用户
  updateUser:config => {
    const {id,name,addr,age,birth,sex} = JSON.parse(config.body)
    const sex_num = parseInt(sex)
    List.some(u => {
      if(u.id === id){
        u.name = name
        u.addr = addr
        u.age = age
        u.birth = birth
        u.sex = sex_num
        return true
      }
    })
    return{
      code:200,
      data:{
        message:'编辑成功'
      }
    }
  },
}