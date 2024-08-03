const express = require('express');
const router = express.Router();

const { Article } = require('../../models');

/**
 * 查询文章列表
 * GET /admin/articles
 */
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


/**
 * 查询文章详情
 * GET /admin/articles/:id
 */
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

/**
 * 创建文章
 * POST /admin/articles
 */
router.post('/', async function (req, res, next) {
    try {
        const article = await Article.create(req.body);
        res.status(201).json({
            code: true,
            data: article,
            message: '文章创建成功'
        });
    } catch (error) {
        res.status(500).json({
            code: false,
            data: [],
            message: '文章创建失败',
            errors: [error.message]
        });
    }
});
/**
 * 删除文章
 * DELETE /admin/articles/:id
 */
router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        if (article) {
            await article.destroy();
            res.json({
                code: true,
                message: '文章删除成功'
            });

        } else {
            return res.status(404).json({
                code: false,
                message: '文章不存在'
            });
        }

    } catch (error) {
        res.status(500).json({
            code: false,
            data: [],
            message: '文章删除失败',
            errors: [error.message]
        });
    }
});

/*
 * 更新文章
 * PUT /admin/articles/:id
 */
router.put('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);
        if (article) {
            await article.update(req.body);
            res.json({
                code: true,
                data: article,
                message: '文章更新成功'
            });
        } else {
            return res.status(404).json({
                code: false,
                message: '文章不存在'
            });
        }
    } catch (error) {
        res.status(500).json({
            code: false,
            data: [],
            message: '文章更新失败',
            errors: [error.message]
        });
    }
});

module.exports = router;
