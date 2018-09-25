const Router = require('koa-router');
const mongoose = require('mongoose');

const router = new Router()

router.post('/write', async (ctx) => {
    const Blog = mongoose.model('Blog')
    let newBlog = new Blog(ctx.request.body)
    await newBlog.save().then(() => {
        ctx.body = {
            code: 0,
            msg: '',
            data: {}
        }
    }).catch(error => {
        ctx.body = {
            code: 1,
            msg: '提交失败',
            data: {}
        }
    })
})

router.post('/list', async (ctx) => {
    const Blog = mongoose.model('Blog')
    console.log(ctx.request);
    await Blog.find().exec()
        .then((res) => {
            ctx.body = {
                code: 0,
                msg: '',
                data: {
                    blogList: res
                }
            }
        })
        .catch(() => {
            ctx.body = {
                code: 1,
                msg: '获取数据失败',
                data: {}
            }
        })

})

router.post('/info', async (ctx) => {
    const Blog = mongoose.model('Blog')
    const uuid = ctx.request.body.uuid
    console.log(uuid);
    
    await Blog.find({uuid}).exec()
        .then((res) => {
            console.log(res);
            ctx.body = {
                code: 0,
                msg: '',
                data: {
                    blogList: res[0]
                }
            }
        })
        .catch(() => {
            ctx.body = {
                code: 1,
                msg: '获取数据失败',
                data: {}
            }
        })
})

module.exports = router