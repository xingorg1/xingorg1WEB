var data1 = [
   {name: '海门', value: 9},
   {name: '鄂尔多斯', value: 12},
   {name: '招远', value: 121},
   {name: '舟山', value: 12},
   {name: '齐齐哈尔', value: 141},
];
var data2 = [
   {name: '海门', value: 9},
   {name: '鄂尔多斯', value: 12},
   {name: '招远', value: 12},
   {name: '舟山', value: 12},
   {name: '齐齐哈尔', value: 14},
];
var data3 = [90,91,92,93,94,95];
var data4 = [900,91,90,98,94,95];
var box = document.getElementById('lodashBox');
// var result = _.difference([1, 2, 3], [4, 2,1]);
// var result = _.union([1, 2], [4, 2]);
// var result = _.xor([4,3,23,5,3],[1,2,23,5,3]);
var result = _.xor(data3,data4);
console.log(result)
lodashBox.innerText = result