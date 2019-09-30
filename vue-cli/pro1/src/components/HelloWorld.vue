<template>
  <div class="hello">
    <CompTest :propsVal = "propsVal " @changeFather= "fatherChangeSelf($event) "></CompTest>
  </div>
</template>

<script>
  console.log(params);
  // console.log(params1);
  {
    var params = 1;
    let params1 = 2;
    console.log(params1);// 突然想到，let这句被抛弃是不是因为变成var就实现不了暂时性死区的目的，所以直接把他删除了呢？那我下边加一句console引用，他还会消失吗？
  }
  function test(){
    console.log(params3);
    let params3 = 3;
  }
  test();
import CompTest from './CompTest';
export default {
  name: 'HelloWorld',
  components: {
    'CompTest' : CompTest
  },
  data () {
    return {
      // msg: '我是一个粉刷匠，粉刷本领强！',
      propsVal: '父组件传值，点击后修改'
    }
  },
  beforeMount () {
    var self = this
    console.log(self.msg)
  },
  methods:{
    fatherChangeSelf(val){
      console.log('methods');
      this.propsVal = val;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
