function getStyle(obj, attr, value) {
	if(!value) {
		if(obj.currentStyle) {
			return obj.currentStyle(attr)
		} else {
			obj.getComputedStyle(attr, false)
		}
	} else {
		obj.style[attr] = value
	}
}