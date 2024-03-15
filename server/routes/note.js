const Router = require('@koa/router')
const router = new Router()
const {findNoteListByType,findNoteDetailById,notePublish}  =require('../controllers/mysqlControl')
const {formateDate} = require('../config/utils')
//获取列表详情
router.post('/findNoteListByType',async (ctx)=>{
   const {note_type} = ctx.request.body
//    console.log(note_type);
      try {
        const result = await findNoteListByType(note_type)
         console.log(result);
        ctx.body = {
            code:'8000',
            data:result,
            msg:'success'
        }
      } catch (error) {
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
      }
})

router.post('/findNoteDetailById',async(ctx)=>{
  const {id} = ctx.request.body
  try {
    const result = await findNoteDetailById(id)
    if(result.length){
      ctx.body={
        code:'8000',
        data:result[0], //返回一个对象，直接返回文章信息
        msg:'success'
      }
    }else{  //返回一个空数组，可能用户id传输错误
      ctx.body ={  
        code:'8004',
        data:'error',
        msg:'查找失败'
      }
    }
  } catch (error) {
    ctx.body ={  
      code:'8005',
      data:error,
      msg:'服务端异常'
    }
  }
})

//发布笔记
router.post('/publish',async(ctx)=>{
   const {note_content,title,head_img,note_type,nickname,userId} = ctx.request.body
   const c_time = formateDate(new Date())
   const m_time = formateDate(new Date())
   try {
    const result = await notePublish([note_content,title,head_img,note_type,nickname,userId,c_time,m_time])
    if(result.affectedRows !==0){
      ctx.body = {
        code:'8000',
        data:'succes',
        msg:'发布成功'
      }
    }else{
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'发布失败'
      }
    }
   } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
   }
})
module.exports = router