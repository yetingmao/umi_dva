### 文件结构
```
── dist // build生成文件 
├── mock // mock数据 
├── node_modules // 包 
├── src // 源码目录 
│ ├── assets // 静态资源 
│ ├── layout //  全局布局
│ ├── models //  全局store 
│ │ │ ├── index.ts // 
│ │── page  // 页面目录，里面的文件即路由 
│ │ │ ├──__tests__     // 测试文件 
│ │ │ ├──.umi         // dev 临时目录，需添加到 .gitignore 
│ │ │ ├──index.js  // 首页
│ │ │ ├──index.less 
│ │── server  // 请求文件，按页面分文件
│ │ ├── index.js     // api导出
│ │ ├── request.js     // fetch请求方法
│ │── util  // 工具
│ │ ├── index.js     // 方法导出
│ ├── app.js //  运行时配置文件
│ ├── global.less //  全局样式
├── .umirc.js                      // umi 配置
├── .env                           // 环境变量
└── package.json   //项目说明
└── readme.md  // 此文件
└── esconfig.json  // ts配置
└── webpack.config.js //webpack配置
└── yarn.lock  // lock

```
####  umi + dva 框架

1、 安装依赖包。
```
  yarn

```
2、运行脚手架。
```js
 1.npm run start || yarn start // 运行dll命令，生产动态链接库文件
 2.npm run build || yarn build //打包静态文件,输出到dist文件夹