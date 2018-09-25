const Koa = require('koa');
const app = new Koa();
const bodyparser = require('koa-bodyparser');
const cors = require('koa2-cors');
const Router = require('koa-router');
const {connect, initSchemas} = require('./db');

app.use(bodyparser());
app.use(cors());

(async () => {
    initSchemas()
    await connect()
})()

const router = new Router()
const blog = require('./api/blog')

router.use('/api/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())



app.use(async (ctx)=> {
    ctx.body = '404'
    ctx.throw(404)
})
app.listen(3000, '0.0.0.0', () =>{
    console.log('---');
})