const express = require('express');
const router = express.Router();

const { Article } = require('../../models');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const condition = {
            order: [['id', 'DESC']]
        };

        const articles = await Article.findAll(condition);

        res.json({
            code: true,
            data: articles,
            message: '文章列表获取成功'
        });
    } catch (error) {
        res.status(500).json({
            code: false,
            data: [],
            message: '文章列表获取失败',
            errors: [error.message]
        });
    }
});


/* GET home page. */
router.get('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;

        const article = await Article.findByPk(id)

        if (!article) {
            return res.status(404).json({
                code: false,
                message: '文章不存在'
            });
        }
        res.json({
            code: true,
            data: article,
            message: '文章详情获取成功'
        });
    } catch (error) {
        res.status(500).json({
            code: false,
            data: [],
            message: '文章列表获取失败',
            errors: [error.message]
        });
    }
});

module.exports = router;
