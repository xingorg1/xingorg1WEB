/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'FontLogo\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-ims': '&#xe605;',
		'icon-yczs': '&#xe60b;',
		'icon-cmt': '&#xe600;',
		'icon-cyt': '&#xe601;',
		'icon-ep': '&#xe602;',
		'icon-ggzzks': '&#xe603;',
		'icon-hjzx': '&#xe604;',
		'icon-sjzx': '&#xe606;',
		'icon-wd': '&#xe607;',
		'icon-wxt': '&#xe608;',
		'icon-yjk': '&#xe609;',
		'icon-ytg': '&#xe60a;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
