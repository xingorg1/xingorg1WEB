const webpack=require('webpack');
const webpackMerge=require('webpack-merge');
const config=require('../config/index');
const base=require('./webpack.base.config');
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const extractText=new ExtractTextPlugin(`../../css/modules/${config.base.ExtractTextPluginName}.css`,{
		allChunks:true
});
module.exports=webpackMerge(base,{
	watch:config.dev.webpackWatch,
	devtool:config.dev.devtool,
    module:{
    	rules:[
    		{
		        test: /\.css$/,
		        use: ExtractTextPlugin.extract({
		          fallback: `style-loader`,
		          use: {
		          		loader:`css-loader`,
		          		options:{
		          			sourceMap: config.dev.cssSourceMap
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
			          			sourceMap: config.dev.cssSourceMap
			          		}
			          	},
			          	{
			          		loader:`sass-loader`,
			          		options:{
			          			sourceMap: config.dev.cssSourceMap
			          		}
			          	}
		          ],
		        })
		    },
    		{
    			test:/\.(png|jpg|gif|svg|ico|tiff|woff|eot)$/,
    			use:[
	    			{
	    				loader:`url-loader`
	    			}
    			]
    		}
    	]
    },
    plugins: [
	    extractText
	]
});