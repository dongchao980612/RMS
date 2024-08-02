# RMS

基于Node.js的API服务器脚手架，使用express+mysql+sequelize  

## 创建Express项目

### 安装脚手架

```sh
npm  install -g  express-generator@4
express --no-view app
cd app
npm install
```

删除`public/index.html`,修改`/routes/index.js`,如下：

```js
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```
