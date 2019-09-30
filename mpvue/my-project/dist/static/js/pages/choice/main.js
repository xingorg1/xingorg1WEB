global.webpackJsonp([3],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(9);



var app = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]);
app.$mount();

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_da39b59a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(13);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(1)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_da39b59a_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\choice\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-da39b59a", Component.options)
  } else {
    hotAPI.reload("data-v-da39b59a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_question_json__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__static_question_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__static_question_json__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      checkedNames: [],
      picked: '',
      ExamInfo: {},
      unclickable: true,
      showLayer: false,
      layerItem: {
        isQuestion: false,
        isSubmit: false,
        isSuccess: false,
        isLoading: false
      },
      chooseNum: null,
      isFocus: false,
      isLast: false,
      isClicked: false
    };
  },
  created: function created() {
    this.ExamInfo = __WEBPACK_IMPORTED_MODULE_0__static_question_json___default.a;
    console.log(this.ExamInfo);
  },

  methods: {}
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {"QuestionID":1,"RightCode":"C","Description":"我是题目我是题目我是题目（单选）","IsMulti":false,"QuestionAnswerCode":[{"Code":"A","Description":"选项一"},{"Code":"B","Description":"选项二"},{"Code":"C","Description":"选项散"},{"Code":"D","Description":"选项四"}]}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "choice-warp",
    attrs: {
      "id": "Question"
    }
  }, [_c('header', {
    staticClass: "zhanshi"
  }, [_vm._v("\n    当前选择是：" + _vm._s(_vm.picked) + "\n  ")]), _vm._v(" "), _c('form', {
    staticClass: "question",
    attrs: {
      "action": ""
    }
  }, [_c('h3', {
    staticClass: "qus-title",
    attrs: {
      "data-id": _vm.ExamInfo.QuestionID
    }
  }, [_vm._v(_vm._s(_vm.ExamInfo.QuestionID) + "、" + _vm._s(_vm.ExamInfo.Description))]), _vm._v(" "), _c('ul', {
    staticClass: "qus-list"
  }, _vm._l((_vm.ExamInfo.QuestionAnswerCode), function(item, index) {
    return _c('li', {
      key: _vm.ExamInfo.QuestionID + index,
      class: {
        'li-focus': _vm.chooseNum == index
      }
    }, [_c('label', {
      staticClass: "choice-item",
      attrs: {
        "for": 'choice' + index
      }
    }, [_vm._v(_vm._s(item.Code) + "、" + _vm._s(item.Description))]), _vm._v(" "), _c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.picked),
        expression: "picked"
      }],
      attrs: {
        "type": "radio",
        "value": item.Code,
        "id": 'choice' + index,
        "eventid": '0-' + index
      },
      domProps: {
        "checked": _vm._q(_vm.picked, item.Code)
      },
      on: {
        "__c": function($event) {
          _vm.picked = item.Code
        }
      }
    })], 1)
  }))], 1), _vm._v(" "), (!_vm.isLast) ? _c('div', {
    staticClass: "public-btn",
    class: {
      'public-btn-gray': _vm.unclickable
    },
    attrs: {
      "eventid": '2'
    },
    on: {
      "click": _vm.nextItem
    }
  }, [_vm._v("下一题")]) : _c('div', {
    staticClass: "public-btn",
    class: {
      'public-btn-gray': _vm.unclickable
    },
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.submitItem
    }
  }, [_vm._v("提交")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "example-3"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checkedNames),
      expression: "checkedNames"
    }],
    attrs: {
      "type": "checkbox",
      "id": "jack",
      "value": "Jack",
      "eventid": '3'
    },
    domProps: {
      "checked": Array.isArray(_vm.checkedNames) ? _vm._i(_vm.checkedNames, "Jack") > -1 : (_vm.checkedNames)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.checkedNames,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = "Jack",
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checkedNames = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checkedNames = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checkedNames = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "jack"
    }
  }, [_vm._v("Jack")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checkedNames),
      expression: "checkedNames"
    }],
    attrs: {
      "type": "checkbox",
      "id": "john",
      "value": "John",
      "eventid": '4'
    },
    domProps: {
      "checked": Array.isArray(_vm.checkedNames) ? _vm._i(_vm.checkedNames, "John") > -1 : (_vm.checkedNames)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.checkedNames,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = "John",
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checkedNames = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checkedNames = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checkedNames = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "john"
    }
  }, [_vm._v("John")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.checkedNames),
      expression: "checkedNames"
    }],
    attrs: {
      "type": "checkbox",
      "id": "mike",
      "value": "Mike",
      "eventid": '5'
    },
    domProps: {
      "checked": Array.isArray(_vm.checkedNames) ? _vm._i(_vm.checkedNames, "Mike") > -1 : (_vm.checkedNames)
    },
    on: {
      "__c": function($event) {
        var $$a = _vm.checkedNames,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = "Mike",
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.checkedNames = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.checkedNames = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.checkedNames = $$c
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    attrs: {
      "for": "mike"
    }
  }, [_vm._v("Mike")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('span', [_vm._v("Checked names: " + _vm._s(_vm.checkedNames))])], 1)], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-da39b59a", esExports)
  }
}

/***/ })
],[8]);
//# sourceMappingURL=main.js.map