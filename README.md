#技术栈：vue3全家桶＋elementplus Plus组件库＋axios+mockjs＋echarts表格。
本项目可以通过登陆不同的用户来展示不同的内容，在首页使用了elementplus和echarts表格，极大地减少了代码量，
提高了开发效率。并且在用户管理页面，实现了CRUD操作。在消息提示铃中使用了mitt.js进行组件传值，相比起vuex更加方便简洁。使用了 localStorage实现持久存储，保证在刷新页面之后数据不会丢失。并且在request.js中对axios进行了二次封装，通过config文件控制总的mock开关，通过api.js文件控制单个mock的开关，从而实现线上mock和本地mock的切换。在项目最后通过路由守卫实现了基础的登陆校验功能。
# background-manage

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
