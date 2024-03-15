const Router = require('@koa/router')
const router = new Router()
// 抛出的是一个对象，因此可以解构
const {userLogin,userFind,userRegister} = require('../controllers/mysqlControl')

//定义登录接口
router.post('/login',async (ctx)=>{
    //获取前端传递的账号和密码，去数据库中校验账号密码的正确性
    const {username ,password} = ctx.request.body
   try {            
     const result  = await userLogin(username ,password) //调用后应接.then，但可以选择await
     //若成功返回就会是一个数组里面包含对象，若数据库没有用户和密码就返回空数组
    //  console.log(result);
    if(result.length){  //if满足账号密码存在
      let data = {
        id:result[0].id,
        nickname:result[0].nickname,
        username:result[0].username
      }
    ctx.body = {
        code:'8000', //自己设定一个code，不是状态码
        data:data, //data为上面定义的data对象
        mag:'登录成功'
    }
    }else{
        ctx.body = {
            code:'8004',
            data:'error',
            msg:'账号或密码错误'
        }
    }
   } catch (error) {  //此处异常为程序错误，例sql语句错误
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
   }
    // console.log(username,password);
})  


// 定义注册接口
router.post('/register',async(ctx)=>{
  //  拿到前端传过来的 username,password,nickname
   // 到数据库中校验 username 是否存在，若不存在往数据库植入新的数据
     const {username,password,nickname} = ctx.request.body  //请求体
    // 判断传递消息是否为空
     if(!username||!password||!nickname){
      ctx.body ={
        code:'8001',
        msg:'账号密码昵称不能为空',
      }
      return
     } 

     try {
      const findRes = await userFind(username)
      // console.log(findRes);//返回一个数组,包含对象
      if(findRes.length){ //账号已经存在
        ctx.body = {
          code:'8003',
          data:'error',
          msg:'账号已经存在'
        }
        return
      }
      // 植入操作
      const registerRes = await userRegister([username,password,nickname])
      // console.log(registerRes); 打印结果包含affectedRows
      if(registerRes.affectedRows!==0){
        ctx.body ={
          code:'8000',
          data:'success',
          mag:'注册成功'
        }
      }else{
        ctx.body ={
          code:'8004',
          data:'error',
          mag:'注册失败'
        }
      }
     } catch (error) {  //程序性错误
      ctx.body ={
        code:'8005',
        data:error,
        mag:'服务器异常'
      }
     }
})
module.exports = router