<template>
  <div class="about">
    <h1>{{msg}}</h1>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'mockjs',
  data(){
    return {
      msg: 'mockJs 练习'
    }
  },
  created(){
    console.log(this.$api)
    this.$api.get('https://www.easy-mock.com/mock/5d527deac658234a3db4318e/example/query')
    .then((data: any)=>{
      console.log('hah',data)
    })
  //   // 使用 Mock
    var Mock = require('mockjs')
    console.log(Mock)
    var data = Mock.mock({
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|2': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1
        }]
    })
    // 输出结果
    console.log(JSON.stringify(data, null, 4))
  }
})
</script>