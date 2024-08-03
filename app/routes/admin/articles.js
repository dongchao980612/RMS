const express = require('express');
const router = express.Router();

const { Article } = require('../../models');
const { Op } = require('sequelize');
/**
 * 查询文章列表
 * GET /admin/articles
 */
router.get('/', async function (req, res, next) {
    try {
        const query = req.query;

        const currentPage = Math.abs(parseInt(query.currentPage)) || 1;
        const pageSize = Math.abs(parseInt(query.pageSize)) || 10;

        const offset = (currentPage - 1) * pageSize;

        const condition = {
            order: [['id', 'ASC']],
            limit: pageSize,
            offset: offset
        };

        if (query.title) {
            condition.where = {
                title: {
                    [Op.like]: `%${query.title}%`
                }
            };
        }

        const { count, rows } = await Article.findAndCountAll(condition);

        res.json({
            status: true,
            pagination: {
                total: count,
                currentPage,
                pageSize
            },
            data: rows,
            message: '文章列表获取成功'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
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
                status: false,
                message: '文章不存在'
            });
        }
        res.json({
            status: true,
            data: article,
            message: '文章详情获取成功'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
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

        // 验证参数
        const body = filterBody(req);

        const article = await Article.create(body);
        res.status(201).json({
            status: true,
            data: article,
            message: '文章创建成功'
        });
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(e => e.message);
            return res.status(400).json({
                status: false,
                message: '请求参数错误',
                errors: errors
            });
        }
        else {
            res.status(500).json({
                status: false,
                data: [],
                message: '文章创建失败',
                errors: [error.message]
            });
        }
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
                status: true,
                message: '文章删除成功'
            });

        } else {
            return res.status(404).json({
                status: false,
                message: '文章不存在'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: false,
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

        // 验证参数
        const body = filterBody(req);

        if (article) {
            await article.update(req.body);
            res.json({
                status: true,
                data: article,
                message: '文章更新成功'
            });
        } else {
            return res.status(404).json({
                status: false,
                message: '文章不存在'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            data: [],
            message: '文章更新失败',
            errors: [error.message]
        });
    }
});

/*
 * 文章搜索
 * GET /admin/articles/page/:page
 */
router.get('/page/:page', async function (req, res, next) {
    try {
        const { page } = req.params;
        const condition = {
            order: [['id', 'DESC']]
        };
        const articles = await Article.findAndCountAll({
            ...condition,
            limit: 10,
            offset: (page - 1) * 10
        });
        res.json({
            status: true,
            data: articles,
            message: '文章搜索成功'
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            data: [],
            message: '文章搜索失败',
            errors: [error.message]
        });
    }
});


/*
 * 白名单过滤
 * @ param: whiteList
 * @ return 
 */
function filterBody(req) {
    return {
        title: req.body.title,
        content: req.body.content,
    };
}


module.exports = router;
