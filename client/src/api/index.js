import axios from 'axios'
import {showFailToast } from 'vant';

axios.defaults.baseURL ='http://localhost:3000'
axios.defaults.headers.post['Content-Type'] = 'application/json'

//请求拦截

//响应拦截   公共封装的部分就不要写业务逻辑，每个页面的业务逻辑不同
axios.interceptors.response.use(res=>{
    if(res.status !==200){  //程序错误
        showFailToast('服务端异常');
    }else{
        if(res.data.code!=='8000'){ // 逻辑性错误 code后端提供
        //    不能写死，看后端传递的msg,后端对象传递过来时就是包含data的，
        //若获取data键，那就是res.data.data
        showFailToast(res.data.msg);
        //promise对象身上挂在了reject方法，只用到了reject这一个函数就这么使用
    // axios内置了promise， <--  返回的Promise.reject(res)就给到了axios，axios后面接
    // .catch就能捕获错误 return promise.reject(res)能返回  -->
        // return res.data  //返回数据,但还是会放行代码  错误代码
        // return Promise.reject(res)
        return res.data 
        }
          return res.data  
    }
})
export default axios