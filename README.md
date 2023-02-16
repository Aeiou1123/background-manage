# background-manage

## 项目介绍

#技术栈：vue3全家桶＋elementplus Plus组件库＋axios+mockjs＋echarts表格。
本项目可以通过登陆不同的用户来展示不同的内容，在首页使用了elementplus和echarts表格，极大地减少了代码量，
提高了开发效率。并且在用户管理页面，实现了CRUD操作。在消息提示铃中使用了mitt.js进行组件传值，相比起vuex更加方便简洁。使用了 localStorage实现持久存储，保证在刷新页面之后数据不会丢失。并且在request.js中对axios进行了二次封装，通过config文件控制总的mock开关，通过api.js文件控制单个mock的开关，从而实现线上mock和本地mock的切换。在项目最后通过路由守卫实现了基础的登陆校验功能。



## 功能

- 登陆/退出
- 用户管理
- 商品管理
- 消息处理
- 权限管理
- 联系作者
- 登陆校验
- ·······



## 安装步骤

```
1、下载项目
git clone https://gitee.com/Aeiou-YuShang/background-manage.git  or  git clone https://github.com/Aeiou-YuShang/background-manage.git
2、安装依赖
npm install
3、项目运行
npm run serve
4、打包
npm run build
```



## 项目截图

### 首页

(https://foruda.gitee.com/images/1676514218038193784/5e05a49e_12307664.png "image-20230216101113330.png")



### 用户管理页

(https://foruda.gitee.com/images/1676514278066022808/c2e6c3a3_12307664.png "image-20230216101201807.png")



### 消息中心

(https://foruda.gitee.com/images/1676514295552960958/8419cd5d_12307664.png "image-20230216101236825.png")

