const Router = require('koa-router');
const mongoose = require('mongoose');
const {
    result
} = require('../utils/result.js');

const router = new Router()

router.post('/write', async (ctx) => {
    const Blog = mongoose.model('Blog')
    let newBlog = new Blog(ctx.request.body)
    await newBlog.save().then(() => {
        ctx.body = result
    }).catch(error => {
        ctx.throw(500)
    })
})

router.post('/list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    console.log(ctx.request);
    await Blog.find().exec()
        .then((res) => {
            ctx.body = result(0, '', {
                blogList: res
            })
        })
        .catch(() => {
            ctx.throw(500)
        })

})

router.post('/info', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    console.log(uuid);

    await Blog.find({
            uuid
        }).exec()
        .then((res) => {
            console.log(res);
            ctx.body = result(0, '', {
                blogList: res[0]
            })
        })
        .catch(() => {
            ctx.throw(500)
        })
})

module.exports = router