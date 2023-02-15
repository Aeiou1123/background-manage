// 环境配置文件
// 在企业级项目中有三个环境：开发环境，测试环境和线上环境

// 取当前环境(需要在下载vite，本项目没有下载vite所以下面这个语法先不用，直接让环境为开发环境)
// const env = import.meta.env.MODE || 'prod'
const env = 'development'

const EnvConfig = {
  development:{
    baseApi:'/api',
    mockApi:'https://www.fastmock.site/mock/1d7cdc67c9eaf5c47e4021a11ea445e0/api',
  },
  test:{
    baseApi:'//test.future.com/api',
    mockApi:'https://www.fastmock.site/mock/1d7cdc67c9eaf5c47e4021a11ea445e0/api',
  },
  prod:{
    baseApi:'//prod.future.com/api',
    mockApi:'https://www.fastmock.site/mock/1d7cdc67c9eaf5c47e4021a11ea445e0/api',
  },
}

export default{
  env,
  mock:true, //mock的总开关，true就是使用mockApi
  ...EnvConfig[env]  //解构
}