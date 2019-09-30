/*
 * @Author: guojufeng@ 
 * @Date: 2017-12-29 10:10:52
 * 一款手势驱动的裁图插件
 * @param {object=} parameter 参数配置
 * @param {String|HTMLElement} parameter.cutBoxId: 裁剪控件元素idName
 * @param {Array} parameter.sizeArr: 裁剪框大小 [200,300]
 * @param {String|HTMLElement} parameter.selectFileId: 上传图片的 <input type="file"> 控件的选择器或者DOM对象。如果有多个，可使用英文逗号隔开的选择器字符串，或者DOM对象数组。
 * @param {String|HTMLElement} parameter.confirmBtnId: 确认截图按钮的选择器或者DOM对象。如果有多个，可使用英文逗号隔开的选择器字符串，或者DOM对象数组。
*/
/*解决问题： photoclip在点击事件的时候被重新创建， clipArea会执行多次，没有被销毁。clipArea.destroy();*/
// const photoClip = require('./Photoclip.min');
import photoClip from './Photoclip.min';
export let photoclip = (parameter)=>{
	const promise = new Promise((resolve, reject)=>{
		let clipArea = new photoClip(parameter.cutBoxId, {
			size: parameter.sizeArr,//裁剪框大小
			outputSize: parameter.outputSize,//裁剪图片大小
			file: parameter.selectFileId,
			ok: parameter.confirmBtnId,
			errorMsg: {//配置操作错误的提示信息
				noSupport: '您的浏览器无法支持，请升级浏览器版本或者更换浏览器重试！',
				imgHandleError: '压缩插件处理图片失败。',
				imgLoadError: '图片加载出错，请重试！',
				noImg: '请先选择图片上传哦！',
				clipError: '图片裁剪失败，请重试！'
			},
			loadStart: ()=> { //图片开始加载的回调函数。
				$(".clip-loading").removeClass("hide");
			},
			loadComplete: ()=> {//图片加载完成的回调函数。
				$(".clip-loading").addClass("hide");
			},
			loadError: (err)=> {//图片加载失败
				alert(err);
			},
			done: (dataURL)=> {//裁剪完成的回调函数。DataURL裁剪出的图像数据
				if (dataURL){
			    resolve(dataURL);//获取图像base64码成功，执行回调。
			    clipArea.destroy();
			  } else {
			    reject(new Error('获取图像base64码失败'));//获取图像base64码失败
			  }
			},
			fail: (err)=> {//裁剪失败
				alert(err);
			}
		});
	});
	return promise;
};