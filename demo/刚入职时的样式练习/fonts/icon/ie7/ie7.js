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
		el.innerHTML = '<span style="font-family: \'iMS-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-trend': '&#xe64a;',
		'icon-navarrow': '&#xe64b;',
		'icon-car': '&#xe600;',
		'icon-home': '&#xe601;',
		'icon-head': '&#xe602;',
		'icon-loudspeaker': '&#xe603;',
		'icon-camera': '&#xe604;',
		'icon-info': '&#xe605;',
		'icon-userinfo': '&#xe606;',
		'icon-upload': '&#xe607;',
		'icon-export': '&#xe608;',
		'icon-download2': '&#xe609;',
		'icon-import': '&#xe60a;',
		'icon-encipheredfile': '&#xe60b;',
		'icon-finance': '&#xe60c;',
		'icon-envelop': '&#xe60d;',
		'icon-print': '&#xe60e;',
		'icon-customer': '&#xe60f;',
		'icon-briefcase': '&#xe610;',
		'icon-download': '&#xe611;',
		'icon-download3': '&#xe612;',
		'icon-setting': '&#xe613;',
		'icon-add': '&#xe614;',
		'icon-score': '&#xe615;',
		'icon-star': '&#xe616;',
		'icon-piechart': '&#xe617;',
		'icon-password': '&#xe618;',
		'icon-bargraph': '&#xe619;',
		'icon-calendar': '&#xe61a;',
		'icon-location': '&#xe61b;',
		'icon-cellphone': '&#xe61c;',
		'icon-telephone': '&#xe61d;',
		'icon-refresh': '&#xe61e;',
		'icon-rankinglist': '&#xe61f;',
		'icon-smileface': '&#xe620;',
		'icon-sadface': '&#xe621;',
		'icon-return': '&#xe622;',
		'icon-done2': '&#xe623;',
		'icon-close': '&#xe624;',
		'icon-customerservice': '&#xe625;',
		'icon-delete': '&#xe626;',
		'icon-delete2': '&#xe627;',
		'icon-help': '&#xe629;',
		'icon-edit': '&#xe62a;',
		'icon-play': '&#xe62b;',
		'icon-history': '&#xe62c;',
		'icon-hot': '&#xe62d;',
		'icon-new': '&#xe62e;',
		'icon-400': '&#xe62f;',
		'icon-linechart': '&#xe630;',
		'icon-logout': '&#xe631;',
		'icon-message': '&#xe632;',
		'icon-light': '&#xe633;',
		'icon-notice': '&#xe634;',
		'icon-warning3': '&#xe635;',
		'icon-warning2': '&#xe636;',
		'icon-warning': '&#xe637;',
		'icon-nextpage': '&#xe638;',
		'icon-previouspage': '&#xe639;',
		'icon-pulldown': '&#xe63a;',
		'icon-pullup': '&#xe63b;',
		'icon-snow': '&#xe63c;',
		'icon-uparrow': '&#xe63d;',
		'icon-downarrow': '&#xe63e;',
		'icon-zoomin': '&#xe63f;',
		'icon-search': '&#xe640;',
		'icon-zoomout': '&#xe641;',
		'icon-dots': '&#xe642;',
		'icon-square': '&#xe643;',
		'icon-welldone': '&#xe628;',
		'icon-sorry': '&#xe644;',
		'icon-fail': '&#xe645;',
		'icon-success': '&#xe646;',
		'icon-success2': '&#xe647;',
		'icon-warmprompt': '&#xe648;',
		'icon-warning4': '&#xe649;',
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
