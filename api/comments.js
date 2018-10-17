const Router = require('koa-router');
const mongoose = require('mongoose');
const {
    result
} = require('../utils/result.js');

const router = new Router()

//Comments列表
router.post('/list', async (ctx) => {
    const Comments = mongoose.model('Comments')
    let newBlog = new Blog(ctx.request.body)
    await newBlog.save((err, res) => {
        if (err) return ctx.throw(500)
        ctx.body = result
    })
})


module.exports = router