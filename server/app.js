const koa  = require('koa')
const bodyPapser = require('koa-bodyparser')//让koa能解析post参数
const cors = require('koa2-cors')
const app = new koa()
const user = require('./routes/user')
const note = require('./routes/note')
app.use(cors()) //告诉浏览器允许跨域
app.use(bodyPapser())//得现有解析post参数的能力，再让路由生效
app.use(user.routes(),user.allowedMethods())
app.use(note.routes(),note.allowedMethods())
app.listen(3000,()=>{
    console.log('项目启动');
})
