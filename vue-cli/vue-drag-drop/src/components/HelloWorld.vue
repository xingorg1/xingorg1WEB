<template>
  <div class="hello">
    <div v-for="(list, i) in lists" :key="i">
			<drop class="drop list" @drop="handleDrop(list, ...arguments)">
				<drag v-for="item in list"
					class="drag"
					:key="item"
					:class="{ [item]: true }"
					:transfer-data="{ item: item, list: list, example: 'lists' }">
						{{ item }}
				</drag>
			</drop>
		</div>
  </div>
</template>

<script>
import { Drag, Drop } from 'vue-drag-drop';
export default {
  name: 'HelloWorld',
  data () {
    return {
      lists: [
					['A', 'B', 'C'],
					['D', 'E', 'F'],
				]
    }
  },
  methods: {
    handleDrop(toList, data) {
      const fromList = data.list;
      if (fromList) {
        toList.push(data.item);
        fromList.splice(fromList.indexOf(data.item), 1);
        // toList.sort((a, b) => a > b);
      }
    },
  }
}
</script>

<style scoped>
  .drag, .drop {
      box-sizing: border-box;
      display: inline-block;
      border-radius: 10px;
      width: 100px;
      height: 100px;
      background: #ccc;
      vertical-align: middle;
      margin-right: 20px;
      position: relative;
      padding: 5px;
      padding-top: 35px;
      text-align: center;
      margin: 3px;
  }
  .drag {
    color: #fff;
    cursor: move;
    background: #777;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
		display: inline-block;
	}
	.drag.A { background: #aaa; }
	.drag.B { background: #888; }
	.drag.C { background: #666; }
	.drag.D { background: #444; }
	.drag.E { background: #222; }
	.drag.F { background: #000; }
	.drop {
		display: inline-block;
		vertical-align: top;
		padding: 15px;
		margin-bottom: 20px;
		width: auto;
		height: auto;
	}
</style>
