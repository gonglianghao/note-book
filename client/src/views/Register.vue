<template>
    <div class="login">
        <h1>注册</h1>
        <div class="login-wrapper">
            <div class="avatar">
                <img src="../assets/avatar/xin.jpg" alt="">
            </div>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="state.nickname" name="昵称" label="昵称" placeholder="昵称"
                        :rules="[{ required: true, message: '请填写昵称' }]" />
                    <van-field v-model="state.username" name="用户名" label="用户名" placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]" />
                    <van-field v-model="state.password" type="password" name="密码" label="密码" placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block color="#7232dd" native-type="submit">
                        注册
                    </van-button>
                </div>
            </van-form>
        </div>
        <p class="register" @click="login"> 已有账号？点击这里登录</p>
    </div>
</template>
   
<script setup>
import { reactive} from 'vue'
import {useRouter} from 'vue-router' 
import axios from '../api/index'
import { showSuccessToast } from 'vant';

const router  = useRouter()
const state = reactive({   //将对象变成响应式
    username:'',
    password:'',
    nickname:''
})

const onSubmit = async()=>{
//    发请求，将state.username,state.password nickname传给后端
   const data = await axios.post('/register',{
        username:state.username,
        password:state.password,
        nickname:state.nickname
     })
     showSuccessToast(data.msg);
     setTimeout(()=>{
        router.push('/Login')
     },1500)
 }
//登录事件
const login = ()=>{
  router.push('/login')
}
</script>
   
<style lang="less" scoped>
.login {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    padding: 0 0.3rem;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    h1 {
        height: 0.6933rem;
        text-align: center;
        margin-top: 1.12rem;
        font-size: 0.48rem;
    }

    .login-wrapper {
        width: 7.44rem;
        height: 10.77rem;
        border: 1px solid rgba(187, 187, 187, 1);
        margin: 0 auto;
        margin-top: 1.7rem;
        border-radius: 0.3rem;
        box-shadow: 0 0 0.533rem 0 rgba(170, 170, 170, 1);

        .avatar {
            width: 2.4rem;
            height: 2.4rem;
            overflow: hidden;
            border-radius: 50%;
            margin: 1rem auto 0.77rem;

            img {
                width: 100%;
            }
        }
    }

    .register {
        position: absolute;
        bottom: 30px;
        width: 80%;
        left: 50%;
        text-align: center;
        font-size: 0.374rem;
        transform: translateX(-50%);
        height: 0.6rem;
        line-height: 0.6rem;
        color: rgba(16, 16, 16, 1);
    }
}
</style>

<style>
.van-cell__title{
    width: 45px;
}
</style>