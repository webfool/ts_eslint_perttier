"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

require("core-js/modules/es.function.name");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _class;

// 测试装饰器是否能被 babel 正常编译
var MyClass = deco(_class = function MyClass() {
  (0, _classCallCheck2.default)(this, MyClass);
}) || _class;

function deco(target) {
  ;
  target.isTest = true;
} // 测试类属性的语法是否能被 babel 正常编译


var TestProperty = function TestProperty() {
  (0, _classCallCheck2.default)(this, TestProperty);
  this.name = 'hw';
};