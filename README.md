# RMS

基于Node.js的API服务器脚手架，使用express+mysql+sequelize  

## 03 创建Express项目

### 1. 安装脚手架

```sh
npm  install -g  express-generator@4
express --no-view app
cd app
npm install
```

### 2. 修改代码结构

删除`public/index.html`,修改`/routes/index.js`,如下：

```js
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```

### 3. 启动项目

```sh
# npm  install -g  nodemon
nodemon start
```

## 09 使用sequelize ORM

### 1. 安装sequelize

```sh
npm install --g sequelize-cli
npm install sequelize mysql2
sequelize init
```