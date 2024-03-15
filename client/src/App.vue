<template>
 <div>
    <!-- 切换页面的动态效果 -->
  <Transition name="move">
    <router-view></router-view>
  </Transition>
 </div>
</template>

<script setup>

</script>

<style lang="less">
// .move的进入动画效果  动画进行时间
.move-enter-active ,.move-leave-active{
    transition: all 0.5s ease-out;  //消散,淡出
}
//move-enter-from从哪个状态开始:从全透明,右移20px开始
//move-leave-to变回哪个状态
.move-enter-from,.move-leave-to{
    transform: translateX(20px); //先去到x轴20px位置
    opacity: 0;
}
</style>