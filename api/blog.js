const Router = require('koa-router');
const mongoose = require('mongoose');
const {
    result
} = require('../utils/result.js');

const router = new Router()

//新增blog
router.post('/write', async (ctx, next) => {
    const Blog = mongoose.model('Blog')
    let newBlog = new Blog(ctx.request.body)
    await newBlog.save(() => {
        ctx.throw(500)
    })
    ctx.body = result(0, "", {})
})

//blog列表
router.post('/list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    console.log(ctx.request);
    await Blog.find((err, res) => {
        if (err) return ctx.throw(500)
        ctx.body = result(0, '', {
            blogList: res
        })
    })
})

//blog详情
router.post('/info', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    await Blog.findOne({
        uuid
    }, (err, res) => {
        if (err) return ctx.throw(500)
        ctx.body = result(0, '', {
            blogInfo: res
        })
    })
})

//阅读数统计
router.post('/count', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    await Blog.findOne({
        uuid
    }, async (err, res) => {
        if (err) return ctx.throw(500)
        let readNum = res.readNum + 1
        await Blog.updateOne({
            uuid
        }, {
            $set: {
                readNum
            }
        }, (err) => {
            if (err) return ctx.throw(500)
            ctx.body = result(0, '操作成功', {})
        })
    })
})

//热门博客列表
router.post('/hot-list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    await Blog.find((err, res) => {
        let hotList = res
        if (err) return ctx.throw(500)
        if (!res.length) {
            ctx.body = result(0, '', {
                hotList: []
            })
        } else {
            hotList.sort(function (a, b) {
                return b.readNum - a.readNum
            })
            ctx.body = result(0, '', {
                hotList: hotList.length > 10 ? hotList.slice(0, 9) : hotList
            })

        }
    })
})

module.exports = router