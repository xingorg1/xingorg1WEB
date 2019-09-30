export let eventUtil = {
  /*
   * 添加事件
   * @param {variable} element 元素
   * @param {string} type 事件类型
   * @param {function} handler 回调函数
  */
  addHander: (element, type, handler)=>{
      if(element.addEventListener) {
          element.addEventListener(type, handler, false);
      } else if(element.attachEvent) {
          element.attachEvent('on' + type, handler);
      } else {
          element['on' + type] = handler;
      }
  },
  /*
   * 移除事件
   * @param {variable} element 要移除事件的元素
   * @param {string} type 事件类型
   * @param {function} handler 回调函数
  */
  removeHander: (element, type, handler)=>{
      if(element.removeEventListener) {
          element.removeEventListener(type, handler, false);
      } else if(element.detachEvent) {
          element.detachEvent('on' + type, handler);
      } else {
          element['on' + type] = handler;
      }
  },
  /*
   * 获取到拥有这个事件的标签名称——事件对象（如input）
   * @param {variable} event 
  */
  getEvent: (event)=>{
      return event?event:window.event;
  },
  /*
   * 获取事件的类型
   * @param {variable} event 
  */
  getType: (event)=>{
      return event.type;
  },
  /*
   * 获取事件来自于哪个元素
   * @param {variable} event 
  */
  getElement: (event)=>{
      return event.target || event.srcElement;
  },
  /*
   * 阻止、取消事件的默认行为|属性发生
   * @param {variable} event 
  */
  preventDefault: (event)=>{
      if(event.preventDefault){
          event.preventDefault();
      }else{
          event.returnValue = null;
      }
  },
  /*
   * 阻止冒泡行为
   * @param {variable} event 
  */
  stopPropagation: (event)=>{
      if(event.stopPropagation){
          event.stopPropagation();
      }else{
          event.cancelBubble = true;
      }
  }
};