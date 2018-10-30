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
    const res = await Blog.find({})
    ctx.body = result(0, '', {
        blogList: res
    })
})

//blog详情
router.post('/info', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    const res = await Blog.findOne({ uuid })
    ctx.body = result(0, '', {
        blogInfo: res
    })
})

//阅读数统计
router.post('/count', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    const readNum = await Blog.findOne({ uuid })
    let readNumAdded = readNum + 1
    await Blog.updateOne({ uuid }, { $set: { readNumAdded }})
    ctx.body = result(0, '操作成功', {})
})

//热门博客列表
router.post('/hot-list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const res =  await Blog.find({})
    let hotList = res
    if (!res.length) {
        ctx.body = result(0, '', {
            hotList: []
        })
    } else {
        hotList.sort((a, b) =>{
            return b.readNum - a.readNum
        })
        ctx.body = result(0, '', {
            hotList: hotList.length > 10 ? hotList.slice(0, 9) : hotList
        })

    }
})

module.exports = router