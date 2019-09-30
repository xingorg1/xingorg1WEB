<template>
  <div>
    <div class="item-box" id="dropArea" @mousemove="move($event)">
      <div v-for="(list, i) in lists" :key="i" class="item" @mousedown="down($event)" @mouseup="up($event)" ref="itemList" :class="'item'+(i+1)">
        {{list}}
      </div>
    </div>
      <div class="result">数组：{{lists}}</div>
      <div class="result">数组new：{{newLists}}</div>

  </div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
import { eventUtil } from "../assets/js/eventUtil";
function getPos(ev) {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var scrollLeft =
    document.documentElement.scrollLeft || document.body.scrollLeft;
  let x = ev.clientX + scrollLeft - 200;
  let y = ev.clientY + scrollTop - 32;
  /*  if(x < 0){
        x = 0;
      }
  */

  return { x, y };
}
function copy(oList) {
  // var oList = document.getElementById("oList");
  var oListCopy = oList.cloneNode(true);
  document.body.appendChild(oListCopy);
}
export default {
  name: "Gjf",
  data() {
    return {
      oldTop: null,
      newTop: null,
      isDown: false,
      dropArea: null,
      downTarget: null,
      newTarget: null,
      oBox: null,
      initX: 0,
      initY: 0,
      indexs: null,
      lists: ["内容1", "内容2", "内容3", "内容4", "内容5"],
      newLists: []
    };
  },
  mounted() {
    this.dropArea = document.getElementById("dropArea");
  },
  methods: {
    down: function($event) {
      let self = this;
      eventUtil.preventDefault($event);
      console.log($event);
      this.isDown = true;
      var pos = getPos($event);
      this.downTarget = $event.target;
      this.initX = $event.clientX;
      this.initY = $event.clientY;
      // console.log(this.oldTop)
      this.oldTop = this.downTarget.offsetTop;
      this.newTarget = this.dropArea.removeChild(this.downTarget);
      document.body.appendChild(this.newTarget);
      this.newTarget.style.position = "absolute";
      this.newTarget.style.left = pos.x + "px";
      this.newTarget.style.top = pos.y + "px";
      refs(self);
      function refs(self) {
        let R = self.$refs.itemList;
        for (let i = 0; i < R.length; i++) {
          if (R[i].style.length > 0) {
            self.indexs = i;
            self.indexTxts = R[i];
            R.splice(i, 1);
          }
        }
        // console.log(self.indexs+':indexs')
        console.log(self.indexTxts.innerHTML + ":indexTs");
      }
    },
    move: function($event) {
      eventUtil.preventDefault($event);
      if (this.isDown) {
        var pos = getPos($event);
        // this.downTarget.style.position = 'absolute';
        this.downTarget.style.left = pos.x + "px";
        this.downTarget.style.top = pos.y + "px";
      }
    },
    up: function() {
      function insertEle(self, newNode, target) {
        var oTest = document.getElementById("box-one");
        var newNode = document.createElement("div");
        var reforeNode = document.getElementById("p1");
        newNode.innerHTML = " This is a newcon ";
        self.oTest.insertBefore(newNode, target); //新建的元素节点插入id为P1节点元素的后面。
      }
      function refsTop(self, type) {
        let number = null; //相比较时符合条件元素的位置
        let R = self.$refs.itemList;
        if (type === 1) {
          for (let i = 0; i < R.length; i++) {
            if (R[i].offsetTop < self.newTop) {
              number = i;
              self.newLists.push(R[i].innerText)
            }
          }
          self.newTarget.style.position = "static";
          console.log(number);
          if (number <= 0) {
            console.log(self.lists);
            self.lists.splice(self.indexs, 1);
            self.lists.splice(R[0], 0, self.indexTxts.innerText);
            console.log(self.lists);
            self.dropArea.insertBefore(self.newTarget, R[0]);
          } else if (number >= R.length) {
            self.lists.splice(self.indexs,1);
            self.lists.splice(R[R.length-1],0,self.indexTxts.innerText);
            self.dropArea.insertBefore(self.newTarget, R[R.length - 1]);
          } else {
            console.log(self.lists)
            self.lists.splice(self.indexs,1);
            self.lists.splice(R[number+1],0,self.indexTxts.innerText);
            console.log(self.lists)
            self.dropArea.insertBefore(self.newTarget, R[number].nextSibling);
          }
        } else if (type === 2) {
          for (let i = R.length - 1; i >= 0; i--) {
            if (R[i].offsetTop < self.newTop) {
              number = i;
              self.newLists.push(R[i].innerText)
            }
          }
          console.log(number);
          self.newTarget.style.position = "static";
          if (number <= 0) {
            console.log(self.lists)
            self.lists.splice(self.indexs,1);
            self.lists.splice(R[0],0,self.indexTxts.innerText);
            console.log(self.lists)
            self.dropArea.insertBefore(self.newTarget, R[0]);
          } else if (number >= R.length) {
            self.lists.splice(self.indexs,1);
            self.lists.splice(R[R.length-1],0,self.indexTxts.innerText);
            self.dropArea.insertBefore(self.newTarget, R[R.length - 1]);
          } else {
            console.log(self.lists)
            self.lists.splice(self.indexs,1);
            self.lists.splice(R[number+1],0,self.indexTxts.innerText);
            console.log(self.lists)
            self.dropArea.insertBefore(self.newTarget, R[number].nextSibling);
          }
        } else {
          // 相等
          self.dropArea.insertBefore(self.newTarget, self.indexs);
        }
        self.oldTop = null;
        self.newTop = null;
        self.isDown = false;
        self.downTarget = null;
        self.newTarget = null;
        self.oBox = null;
        self.initX = 0;
        self.initY = 0;
        self.indexs = null;
      }
      let self = this;
      this.isDown = false;
      // console.log(this.oldTop)
      this.newTop = this.newTarget.offsetTop;
      // console.log(this.newTarget.offsetTop);
      if (this.oldTop < this.newTop) {
        refsTop(self, 1);
        // 像下移动
        // console.log('bottom')
      } else if (this.oldTop > this.newTop) {
        // 向上移动
        // console.log('top')
        refsTop(self, 2);
      } else {
        // 原位置
        refsTop(self,3);
      }
      self.newLists = [];
      let R = self.$refs.itemList;
      for (let i = 0; i < R.length; i++) {
        self.newLists.push(R[i].innerText)
      }
    }
  }
};
</script>

<style scoped>
.item-box {
  width: 500px;
  height: 500px;
  padding: 20px 50px;
  margin: 0 auto;
  background: #eee;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item {
  /* position: absolute; */
  width: 400px;
  height: 64px;
  padding: 20px 0;
  background: #eafff5;
  border: 1px solid #aec5ae;
  margin-bottom: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
}
.box {
  border: 1px dashed black;
  position: absolute;
  width: 400px;
  height: 64px;
}
.item:hover {
  cursor: move;
}
.result {
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #aec5ae;
}
.item1 {
  background: #ffdeba;
}
.item2 {
  background: #fff4ba;
}
.item3 {
  background: #c4ffba;
}
.item4 {
  background: #baffff;
}
.item5 {
  background: #efbaff;
}
</style>
