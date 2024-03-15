<template>
  <div class="noteList">
   <ul v-if="state.noteList.length">
    <li v-for="item in state.noteList" :key="item.id" @click="goNoteDetail(item.id)">
        <div class="img">
            <img :src="item.head_img" alt="">
        </div>
        <p class="time">{{item.c_time}}</p>
        <P class="title">{{item.title }}</P>
    </li>
   </ul>
   <p class="empty" v-else>当前分类下还没有文章</p>
  </div>
</template>
<script setup>
//页面加载中发请求,拿到当前分类的数据
import {onMounted} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import axios from '../api'
import { reactive } from 'vue';
const router = new useRouter() //路由实例
const route = new useRoute()  //当前路由详情
const state = reactive({
    noteList:[]
})
// console.log(route.query.title);
onMounted(async ()=>{
    const {data} =  await axios.post('/findNoteListByType',{
      note_type:route.query.title
  })  
//   console.log(data);
       state.noteList = data
})

// 去详情页面
const goNoteDetail =(id)=>{
  router.push({path:'/noteDetail',query:{id:id}})
}
</script>

<style lang="less" scoped>
.noteList{
    width: 100%;
    padding: 1rem 0.667rem 0;
    box-sizing: border-box;
    ul{
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 50px;
        grid-row-gap: 30px;
        li{
            img{
                width: 100%;
                height: 4rem;
                border-radius: 0.27rem;
            }
            .time{
                font-size: 0.37rem;
                color: rgba(16,16,16,1);
                margin: 10px 0 5px 0;
            }
            .title{
                width: 3.5rem;
                font-size: 0.37rem;
                color: rgba(16,16,16,1);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
</style>