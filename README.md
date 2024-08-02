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

### 2. 修改sequelize的配置

修改`config/config.json`中的"development"并建表：

```sh
sequelize model:generate --name Article --attributes title:string,content:text
```

修改"migrations"目录下的`xxxx-create-article.js`文件，"title"属性添加"allowNull: false"。

### 3.  运行迁移

```sh
sequelize db:migrate
```

### 4. 种子文件

创建种子文件：

```sh
sequelize seed:generate --name article
```

修改`up()`部分代码：

```js
async up (queryInterface, Sequelize) {
  const articles = [];
  const counts = 100;

  for (let i = 1; i <= counts; i++) {
    const article = {
      title: `文章的标题 ${i}`,
      content: `文章的内容 ${i}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    articles.push(article);
  }

  await queryInterface.bulkInsert('Articles', articles, {});
}
```

修改`down()`部分代码：

```js
async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Articles', null, {});
}
```

### 5. 运行种子文件

```sh
sequelize db:seed:all
```

### 6. 总结

大家注意了，日常开发项目，都是采用固定的步骤：

|步骤|命令|说明|
|---|---|---|
|第一步|npm install --g sequelize-cli|安装sequelize-cli|
|第二步|npm install sequelize mysql2|安装sequelize和mysql2|
|第三步|sequelize init|初始化sequelize项目|
|第四步|sequelize model:generate --name Article --attributes ...|建模型和迁移文件|
|第五步| 人工处理| 根据需求调整迁移文件|
|第六步|sequelize db:migrate|运行迁移，生成数据表|
|第七步|sequelize seed:generate --name article|新建种子文件|
|第八步| 人工处理| 将种子文件修改为自己想填充的数据|
|第九步|sequelize db:seed:all|运行种子文件，将数据填充到数据表中|
|第十步|npm start|启动项目|
