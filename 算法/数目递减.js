var num = 100;
function deal(num){
	// console.log(num);
	setTimeout(function(){
		console.log('===')
		num-=10;
		if(num==0){
			return false;
		}else{
			deal(num);
		}

	},1000);
	console.log(num);
	return num;
}
deal(num)
// var a = deal(num);
// console.log(a)