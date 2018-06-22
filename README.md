# isomorphic-react-mobx

## 基于koa2 的react同构+mobx的应用搭建

### 启动项目

终端输入
``` javascript
 $ npm install 
 $ npm start // 启动 
```

或者在全局安装了webpack 和 nodemon的情况下启动

``` javascript
 $ npm install webpack -g
 $ npm install nodemon -g
 $ webpack // 打包
 $ nodemon server/index.js

```
View on http://localhost:8080/

热加载功能
``` javascript
 $ npm install 
 $ npm run build-dev
 $ npm run dev // 全局安装nodemon的情况下nodemon server/index.js 也可
```
这种方式启动后，app.js的任何改动浏览器刷新都会更新了

