<template>
  <div class="comp1">
    <h1>{{ msg }}</h1>
    <h2 @click="goToChangeFather()">{{ propsVal }}</h2>
  </div>
</template>

<script>

export default {
  name: 'CompTest',
  props: ['propsVal'],
  data () {
    return {
      msg: 'CompTest组件，测试组件传值'
    }
  },
  methods: {
    goToChangeFather(){
      this.$emit('changeFather','子组件修改了propsVal')
    }
  }
}
</script>

<style >

</style>
