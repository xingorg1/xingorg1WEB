<template>
  <div class="test">
    <div class="" id="header">
      <h3>test.vue</h3>
    </div>
    <div class="" id="canvas">
    </div>
    <swiper class="swiper" id="" :options="swiperOption" ref="mySwiper">
      <swiper-slide class="swiper-slide1"> I'm Slide 1</swiper-slide>
      <swiper-slide class="swiper-slide2"> I'm Slide 2</swiper-slide>
      <swiper-slide class="swiper-slide1"> I'm Slide 3</swiper-slide>
      <swiper-slide class="swiper-slide2"> I'm Slide 4</swiper-slide>
      <swiper-slide class="swiper-slide1"> I'm Slide 5</swiper-slide>
      <swiper-slide class="swiper-slide2"> I'm Slide 6</swiper-slide>
      <swiper-slide class="swiper-slide1"> I'm Slide 7</swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-scrollbar"   slot="scrollbar"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'Test',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      T: 0,
      swiperOption: {
        // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载便使用获取swiper对象来做什么事，那么这个属性一定要是true
        notNextTick: true,
        // swiper configs 所有的配置同swiper官方api配置
        autoplay: 1000,
        direction: 'vertical',
        grabCursor: true,
        setWrapperSize: true,
        autoHeight: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        scrollbar: '.swiper-scrollbar',
        mousewheelControl: false,
        height: window.innerHeight,
        observeParents: true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true,
        // swiper callbacks：swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        onTransitionStart(swiper){
          console.log(swiper)
        },
        // more Swiper configs and callbacks...
      }
    }
  }
  // 如果你需要得到当前的swiper对象来做一些事情，你可以像下面这样定义一个方法属性来获取当前的swiper对象，同时notNextTick必须为true
}
</script>
<style>
  #header{
    position: absolute;
    top: 5rem;
    left: 0;
    width: 100%;
    z-index: 444;
    height: 3rem;
    background: #ccc;
  }
  #canvas{
    width: 100%;
    height: 13rem;
    background: #74b585;
  }
  .swiper1{
    
  }
  .swiper-slide1{
    background: #eee;
  }
  .swiper-slide2{
    background: pink;
  }
</style>