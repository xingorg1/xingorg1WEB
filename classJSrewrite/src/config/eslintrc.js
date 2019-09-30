module.exports={
	env:{
		'browser':true,
		'commonjs':true,
		'es6':true,
		'node':true,
	},
	parser:'babel-eslint',
	rules:{
		// 强制使用一致的换行风格
		'linkebreak-style':[1,'windows'],
		//强制使用单引号
		 'quotes': [ 1, 'single'],
		// 要求或禁止使用分号而不是 ASI
		'semi':[2,'always'],
		// 禁止不必要的分号
    	'no-extra-semi': 2,
    	//不能有未定义的变量
    	'no-undef': 1,
    	//禁用var，用let和const代替
    	'no-var': 1,
    	//switch语句最后必须有default
    	'default-case': 2,
    	//禁止出现空语句块
    	'no-empty':2,
    	//要求使用 === 和 !==
    	'eqeqeq':1,
    	//禁用 with 语句
    	'no-with':2,
    	//不允许标签与变量同名
        'no-label-var':1,
		// 双峰驼命名格式  
    	'camelcase': 2, 
	}
}