/**
 * 自定义404错误类
 */
class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = 'NotFoundError'
    }
}

/**
 * 成功响应 返回json格式数据
 * @param {object} res response对象
 * @param {string} message 响应信息
 * @param {object} data 响应数据
 * @param {number} code 响应状态码
 */
function success(res, message, data = {}, code = 200) {
    res.status(code).json({
        status: true,
        message,
        data
    });
}

/**
 * 错误响应 返回json格式数据
 * @param {object} res response对象
 * @param {Error} error 错误对象
 */
function failure(res, error) {
    if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(e => e.message);
        return res.status(400).json({
            status: false,
            message: '请求参数错误',
            errors: errors
        });
    }

    if (error.name === 'NotFondError') {
        return res.status(404).json({
            status: false,
            message: '资源不存在',
            errors: [error.message]
        });
    }

    res.status(500).json({
        status: false,
        message: "服务器错误",
        errors: [error.message]
    });
}



module.exports = {
    NotFoundError,
    success,
    failure

}