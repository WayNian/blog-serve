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
    const res = await Blog.find({})
    ctx.body = result(0, '', {
        blogList: res
    })
})

//blog详情
router.post('/info', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const id = ctx.request.body.id
    const res = await Blog.findOne({ _id: id })
    ctx.body = result(0, '', {
        blogInfo: res
    })
})

//阅读数统计
router.post('/count', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const id = ctx.request.body.id
    const res = await Blog.findOne({ _id: id })
    console.log(id, res)
    let readNumAdded = res.readNum + 1
    await Blog.updateOne({ _id: id }, { $set: { readNum: readNumAdded }})
    ctx.body = result(0, '操作成功', {})
})

//热门博客列表
router.post('/hot-list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const res =  await Blog.find({})
    let hotBlogList = res
    if (!res.length) {
        ctx.body = result(0, '', {
            hotBlogList: []
        })
    } else {
        hotBlogList.sort((a, b) =>{
            return b.readNum - a.readNum
        })
        ctx.body = result(0, '', {
            hotBlogList: hotBlogList.length > 10 ? hotBlogList.slice(0, 9) : hotBlogList
        })

    }
})

module.exports = router