# vue2-h5-template

### **简介**

基于 vue-cli3.0+webpack 4+vant ui + sass+ rem 适配方案+axios 封装，构建手机端模板脚手架

1.  vuecli3.0
2.  多环境开发
3.  axios 封装
4.  rem 适配方案
5.  生产环境 cdn 优化首屏加速
6.  babel 低版本浏览器兼容
7.  环境发布脚本

### **快速开始**

```
 npm i pnpm -g

 pnpm i

 pnpm serve //启动本地服务

 pnpm build:dev  pnpm build:test   pnpm:production //打包不同环境

 pnpm build index  //主包

 pnpm build pack1  pnpm build pack2   //分包

 pnpm all //一个包，分包多入口
```

### **目录结构**

```md
|-- item
|-- .browserslistrc //浏览器兼容  
 |-- .editorconfig //ide 风格控制  
 |-- .env.development //开发环境配置  
 |-- .env.production //生产环境配置  
 |-- .env.test //测试环境配置
|-- .eslintignore //eslint 忽略
|-- .eslintrc.js  
 |-- .gitignore
|-- .postcssrc.js //postcss + rem 适配方案
|-- babel.config.js  
 |-- jsconfig.json //js 配置
|-- package.json  
 |-- pnpm-lock.yaml
|-- prettier.config.js
|-- README.md
|-- vue.config.js //vue 打包配置
|-- .vscode
| |-- settings.json
|-- dist
|-- packages //分包
| |-- pack1
| | |-- App.vue
| | |-- main.js
| |-- pack2
| |-- App.vue
| |-- main.js
|-- public //公共资源目录，外部可访问
| |-- favicon.ico
| |-- index.html
|-- src
|-- App.vue
|-- main.js
|-- api
| |-- home.js
| |-- index.js
| |-- user.js
|-- assets
| |-- logo.png
| |-- css
| |-- index.scss
| |-- mixin.scss
| |-- variables.scss
|-- components
| |-- TabBar.vue
|-- config //环境配置
| |-- env.development.js
| |-- env.production.js
| |-- env.staging.js
| |-- index.js
|-- filters //过滤器
| |-- filter.js
| |-- index.js
|-- plugins //组件引入
| |-- vant.js
|-- router
| |-- index.js
| |-- router.config.js
|-- store
| |-- getters.js
| |-- index.js
| |-- modules
| |-- app.js
|-- utils
| |-- index.js
| |-- request.js
| |-- validate.js
|-- views
|-- home
| |-- about.vue
| |-- index.vue
|-- layouts
|-- index.vue
```
