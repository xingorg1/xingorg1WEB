const webpack=require('webpack');
const webpackMerge=require('webpack-merge');
const config=require('../config/index');
const base=require('./webpack.base.config');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const extractText=new ExtractTextPlugin(`../../css/modules/${config.base.ExtractTextPluginName}.css`,{
		allChunks:true
});
const uglify=new webpack.optimize.UglifyJsPlugin({
	compress: {
		properties:false,
		screw_ie8: false,
	    warnings: false
	},
	output:{
	  	screw_ie8: false,
	  	quote_keys: true
	},
	mangle: {
      screw_ie8: false, 
    },
    support_ie8: true,
	sourceMap: config.prod.productionSourceMap
});
module.exports=webpackMerge(base,{
	devtool:config.prod.devtool,
    module:{
    	rules:[
    		{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: {
		          		loader:`css-loader`,
		          		options:{
		          			minimize:true,
		          			sourceMap: config.prod.cssSourceMap
		          		}
		          }
		        })
		    },
		    {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: [
			          	{
			          		loader:`css-loader`,
			          		options:{
			          			minimize:true,
			          			sourceMap: config.prod.cssSourceMap
			          		}
			          	},
			          	{
			          		loader:`sass-loader`,
			          		options:{
			          			sourceMap: config.prod.cssSourceMap
			          		}
			          	}
		          ],
		        })
		    },
    		{
    			test:/\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
    			use:[
	    			{
	    				loader:`url-loader`,
	    				options:{
	    					limit:5120
	    				}
	    			}
    			]
    		}
    	]
    },
	plugins: [
	    extractText,
	    uglify
	]
});