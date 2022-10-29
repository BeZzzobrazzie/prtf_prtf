/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks lazy recursive ^\\.\\/.*\\.js$":
/*!********************************************************!*\
  !*** ./src/blocks/ lazy ^\.\/.*\.js$ namespace object ***!
  \********************************************************/
/***/ ((module) => {

eval("function webpackEmptyAsyncContext(req) {\n\t// Here Promise.resolve().then() is used instead of new Promise() to prevent\n\t// uncaught exception popping up in devtools\n\treturn Promise.resolve().then(() => {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t});\n}\nwebpackEmptyAsyncContext.keys = () => ([]);\nwebpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;\nwebpackEmptyAsyncContext.id = \"./src/blocks lazy recursive ^\\\\.\\\\/.*\\\\.js$\";\nmodule.exports = webpackEmptyAsyncContext;\n\n//# sourceURL=webpack://prtf_prtf/./src/blocks/_lazy_^\\.\\/.*\\.js$_namespace_object?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_baseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/baseClass */ \"./src/js/base/baseClass.js\");\n\r\n\r\nclass Main extends _base_baseClass__WEBPACK_IMPORTED_MODULE_0__.BaseClass {\r\n  constructor(domElement) {\r\n    super(domElement);\r\n    console.log(this);\r\n  }\r\n\r\n\r\n}\r\n\r\n\r\nlet m = new Main(document.querySelector('body'));\r\n\n\n//# sourceURL=webpack://prtf_prtf/./src/js/app.js?");

/***/ }),

/***/ "./src/js/base/baseClass.js":
/*!**********************************!*\
  !*** ./src/js/base/baseClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseClass\": () => (/* binding */ BaseClass)\n/* harmony export */ });\nclass BaseClass {\r\n  constructor(domElement) {\r\n    this.domElement = domElement;\r\n    this.children = [];\r\n    this.init(this.domElement);\r\n    this.initEventListener(this.domElement);\r\n  }\r\n\r\n  \r\n  init(domElement) {\r\n    for (let child of domElement.children) {\r\n      //нужно импортировать js реализацию каждого блока ребёнка\r\n      //если js реализации нет, создать болванку\r\n      for(let c of child.classList) {\r\n        //сделаем допущение, что на одном DOM-элементе может быть только один класс (что не верно, ибо это не так)\r\n\r\n        let prom;\r\n        switch(this.checkClassBem(c)) {\r\n          case 'block':\r\n            prom = __webpack_require__(\"./src/blocks lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\" + this.pathToModuleBlock(c) + \".js\");\r\n            prom.then(\r\n              result => this.handlerImportResult(result, child), \r\n              error => this.handlerImportError(error, child)\r\n            );\r\n            break;\r\n          case 'element':\r\n            prom = __webpack_require__(\"./src/blocks lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\" + this.pathToModuleElement(c) + \".js\");\r\n            prom.then(\r\n              result => this.handlerImportResult(result, child), \r\n              error => this.handlerImportError(error, child)\r\n            );\r\n            break;\r\n          case 'mod':\r\n            break;\r\n          case 'error':\r\n            break;\r\n        }\r\n      }\r\n    }\r\n  }\r\n\r\n  createBlank(child) {\r\n    return new BaseClass(child);\r\n  }\r\n  pathToModuleBlock(cls) {\r\n    let path = String(cls) + '/' + String(cls);\r\n    return path;\r\n  }\r\n  pathToModuleElement(cls) {\r\n    let arrClsSplit = cls.split('__');\r\n    let blockDirr = arrClsSplit[0];\r\n    let elementDirr = '__' + arrClsSplit[1];\r\n    let path = String(blockDirr) + '/' + String(elementDirr) + '/' + String(cls);\r\n    return path;\r\n  }\r\n  translateNameClass(cls) {\r\n    if(cls.includes('-')) {\r\n      let arr = cls.split('-');\r\n      let result = arr[0];\r\n      for(let a = 1; a < arr.length; a++) {\r\n        result += arr[a][0].toUpperCase() + arr[a].slice(1);\r\n      }\r\n      return result;\r\n    }\r\n  }\r\n  handlerImportResult(result, child) {\r\n    //console.log(result);\r\n    for(let key in result) {\r\n      this.children.push(new result[key](child));\r\n    }\r\n  }\r\n  handlerImportError(error, child) {\r\n    //console.log(error);\r\n    this.children.push(this.createBlank(child));\r\n  }\r\n  checkClassBem(cls) {\r\n    if(!cls.includes('_')) {\r\n      return 'block'\r\n    }\r\n    else if(cls.includes(cls.match(/[^_]__[^_]/)) && !cls.includes(cls.match(/[^_]_[^_]/))) {\r\n      return 'element'\r\n    }\r\n    else if(cls.includes(cls.match(/[^_]_[^_]/))) {\r\n      return 'mod'\r\n    }\r\n    else {\r\n      return 'error'\r\n    }\r\n  }\r\n\r\n\r\n  initEventListener(domElement) {\r\n\r\n  }\r\n\r\n  handleEvent(event) {\r\n\r\n  }\r\n\r\n  queryChild(cls) {\r\n    for(let el of this.children) {\r\n      if(el.domElement.classList.contains(cls)) {\r\n        //console.log(el);\r\n        return el;\r\n      }\r\n      else {\r\n        el.queryChild(cls);\r\n      }\r\n    }\r\n  }\r\n\r\n\r\n  addMod() {} // добавляет модификатор в classList DOMElement'а \r\n  \r\n  importMod() {} // импортирует модуль модификатора в блок\r\n\r\n  removeMod() {} // удаляет модификатор из classList DOMElement'а \r\n\r\n\r\n  /*\r\n    Должен иметь:\r\n    - ссылку на dom элемент;\r\n    - метод инициализации детей;\r\n    - коллекцию с сылками на js объекты детей;\r\n    - метод инициализации обработчиков;\r\n  */\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://prtf_prtf/./src/js/base/baseClass.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ })()
;