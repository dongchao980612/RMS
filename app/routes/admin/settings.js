const express = require('express');
const router = express.Router();

const { Setting } = require('../../models');

const {
    NotFoundError,
    success,
    failure
} = require('../../utils/response');




/**
 * 查询设置详情
 * GET /admin/settings/
 */
router.get('/', async function (req, res) {
    try {
        const setting = await getSetting();

        success(res, '查询设置详情成功', { setting });
    } catch (error) {
        failure(res, error)
    }
});



/*
 * 更新设置
 * PUT /admin/settings/
 */
router.put('/', async function (req, res) {
    try {

        const setting = await getSetting();

        // 验证参数
        const body = filterBody(req);


        await setting.update(body);

        success(res, '更新设置成功', { setting });

    } catch (error) {
        failure(res, error)
    }
});


/**
 * 公共方法 查询当前设置
 */
async function getSetting() {

    //查询当前设置
    const setting = await Setting.findOne();

    // 没找到抛出异常
    if (!setting) {
        throw new NotFoundError('设置未找到,请运行种子文件');
    }

    return setting;
}

/*
 * 白名单过滤
 * @ param: req
 * @ return 
 */
function filterBody(req) {
    return {
        name: req.body.name,
        icp: req.body.icp,
        copyright: req.body.copyright,
    };
}


module.exports = router;
