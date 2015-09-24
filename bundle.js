(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modulesCreateElementJs = require('./modules/createElement.js');

var _modulesCreateElementJs2 = _interopRequireDefault(_modulesCreateElementJs);

exports['default'] = {
	createElement: _modulesCreateElementJs2['default']
};
module.exports = exports['default'];

},{"./modules/createElement.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = createElement;
var elements = undefined;
var $rootScope = undefined,
    $compile = undefined,
    $document = undefined;

/**
 * Compile HTML using $compile.
 *
 * @param elementHtml {string} The HTML string to compile
 * @options {{scope}}
 * @returns {IAugmentedJQuery}
 */

function createElement(elementHtml) {
	var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	var _ref$scope = _ref.scope;
	var scope = _ref$scope === undefined ? null : _ref$scope;

	inject(function ($injector) {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		$document = $injector.get('$document');
	});

	scope = scope || $rootScope.$new();
	elements = elements || [];
	var $element = $compile(angular.element(elementHtml))($rootScope);

	//Append to body
	$document.find('body').append($element);
	elements.push($element);

	//Digest to apply bindings.
	scope.$digest();

	return $element;
}

//Cleanup after each run
afterEach(function () {
	if (elements) {
		elements.map(function (e) {
			return e.remove();
		});
	}
	elements = null;
});
module.exports = exports['default'];

},{}]},{},[1]);
