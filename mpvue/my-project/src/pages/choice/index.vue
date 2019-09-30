<template>
  <div class="choice-warp" id="Question">
    <header class="zhanshi">
      当前选择是：{{picked}}
    </header>
    <form action="" class="question">
     <h3 class="qus-title" :data-id="ExamInfo.QuestionID">{{ExamInfo.QuestionID}}、{{ExamInfo.Description}}</h3>
      <ul class="qus-list">
        <li
          v-bind:class="{'li-focus' : chooseNum==index}" 
          v-for="(item,index) in ExamInfo.QuestionAnswerCode" 
          :key="ExamInfo.QuestionID+index"
        >
          <label :for="'choice'+index" class="choice-item">{{item.Code}}、{{item.Description}}</label>
          <input type="radio" :value="item.Code" :id="'choice'+index" v-model="picked">
        </li>
      </ul>
    </form>
    <div 
      class="public-btn"
      v-if="!isLast" 
      @click="nextItem" 
      v-bind:class="{'public-btn-gray': unclickable}"
    >下一题</div>
    <div 
      class="public-btn"
      v-else 
      @click="submitItem" 
      v-bind:class="{'public-btn-gray': unclickable}"
    >提交</div>
    <div id='example-3'>
      <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
      <label for="jack">Jack</label>
      <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <br>
      <span>Checked names: {{ checkedNames }}</span>
    </div>
  </div>
</template>
<script>
import question from '../../../static/question.json'
export default {
  data () {
    return {
      checkedNames: [],
      picked: '',
      ExamInfo: {},
      unclickable: true,
      showLayer: false,
      layerItem: {
        isQuestion: false,
        isSubmit: false,
        isSuccess: false,
        isLoading: false
      },
      chooseNum: null,
      isFocus: false,
      isLast: false,
      isClicked: false
    }
  },
  created () {
    this.ExamInfo = question
    console.log(this.ExamInfo)
  },
  methods: {
  }
}
</script>

<style>
body{
  position: relative;
  background: linear-gradient(to bottom right, #311c74, #6C3199 100%);
  background: -webkit-linear-gradient(top left, #311c74, #6C3199 100%);
  background-size: 100% 100%;
}
  .question{
    display: block;
    position: relative;
    padding: .77rem .3rem .4rem;
    margin: 0 .3rem 1rem;
    -webkit-box-shadow: 0 0 .2rem 0 rgba(75,44,139,0.25);
    box-shadow: 0 0 .2rem 0 rgba(75,44,139,0.25);
    -webkit-border-radius: .2rem;
    border-radius: .2rem;
    background: #fff;
  }
  .zhanshi{
    padding: .1rem .35rem;
    color: #fff;
    font-size: .28rem;
  }
  .qus-title{
      margin-bottom: .77rem;
      font-size: .30rem;
      color: #353B52;
    }
  .qus-box{
    display: inline-block;
    width: .3rem;
    height: .3rem;
    margin-right: .2rem;
  }
  .qus-list li .choice-item{
    display: block;
    margin: .2rem auto 0;
    padding: .3rem .3rem .34rem;
    color: #2F3D48;
    font-size: .26rem;
    text-align: center;
    -webkit-box-shadow: 0 0 .1rem 0 rgba(49,32,114,0.16);
    box-shadow: 0 0 .1rem 0 rgba(49,32,114,0.16);
    -webkit-border-radius: 40px;
    border-radius: 40px;
    background: #fff;
  }
  .qus-list li.li-focus .choice-item{
      background: #7044d3;
      color: #FFF;
    }
#Question{
  padding-top: .58rem;
}
#Question{
  padding-bottom: .6rem;
}
.public-btn{
  padding: .32rem;
  margin: 0 .3rem 0;
  text-align: center;
  font-size: .34rem;
  color: #312072;
  background: #FDCC1E;
  -webkit-box-shadow: 0 0 .12rem 0 rgba(77,144,242,0.16);
  box-shadow: 0 0 .12rem 0 rgba(77,144,242,0.16);
  -webkit-border-radius: 1rem;
  border-radius: 1rem;
}
.public-btn-gray{
	color: #FFF;
	background: #9790A8;
}
</style>
