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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _base_baseClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/baseClass */ \"./src/js/base/baseClass.js\");\n\n\nclass Main extends _base_baseClass__WEBPACK_IMPORTED_MODULE_0__.BaseClass {\n  constructor(domElement) {\n    super(domElement);\n    console.log(this);\n  }\n\n\n}\n\n\nlet m = new Main(document.querySelector('body'));\n\n\n//# sourceURL=webpack://prtf_prtf/./src/js/app.js?");

/***/ }),

/***/ "./src/js/base/baseClass.js":
/*!**********************************!*\
  !*** ./src/js/base/baseClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseClass\": () => (/* binding */ BaseClass)\n/* harmony export */ });\nclass BaseClass {\n  constructor(domElement) {\n    this.domElement = domElement;\n    this.children = [];\n    this.init(this.domElement);\n    this.initEventListener(this.domElement);\n  }\n\n  \n  init(domElement) {\n    for (let child of domElement.children) {\n      //нужно импортировать js реализацию каждого блока ребёнка\n      //если js реализации нет, создать болванку\n      for(let c of child.classList) {\n        //сделаем допущение, что на одном DOM-элементе может быть только один класс (что не верно, ибо это не так)\n\n        let prom;\n        switch(this.checkClassBem(c)) {\n          case 'block':\n            prom = __webpack_require__(\"./src/blocks lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\" + this.pathToModuleBlock(c) + \".js\");\n            prom.then(\n              result => this.handlerImportResult(result, child), \n              error => this.handlerImportError(error, child)\n            );\n            break;\n          case 'element':\n            prom = __webpack_require__(\"./src/blocks lazy recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\" + this.pathToModuleElement(c) + \".js\");\n            prom.then(\n              result => this.handlerImportResult(result, child), \n              error => this.handlerImportError(error, child)\n            );\n            break;\n          case 'mod':\n            break;\n          case 'error':\n            break;\n        }\n      }\n    }\n  }\n\n  createBlank(child) {\n    return new BaseClass(child);\n  }\n  pathToModuleBlock(cls) {\n    let path = String(cls) + '/' + String(cls);\n    return path;\n  }\n  pathToModuleElement(cls) {\n    let arrClsSplit = cls.split('__');\n    let blockDirr = arrClsSplit[0];\n    let elementDirr = '__' + arrClsSplit[1];\n    let path = String(blockDirr) + '/' + String(elementDirr) + '/' + String(cls);\n    return path;\n  }\n  translateNameClass(cls) {\n    if(cls.includes('-')) {\n      let arr = cls.split('-');\n      let result = arr[0];\n      for(let a = 1; a < arr.length; a++) {\n        result += arr[a][0].toUpperCase() + arr[a].slice(1);\n      }\n      return result;\n    }\n  }\n  handlerImportResult(result, child) {\n    //console.log(result);\n    for(let key in result) {\n      this.children.push(new result[key](child));\n    }\n  }\n  handlerImportError(error, child) {\n    //console.log(error);\n    this.children.push(this.createBlank(child));\n  }\n  checkClassBem(cls) {\n    if(!cls.includes('_')) {\n      return 'block'\n    }\n    else if(cls.includes(cls.match(/[^_]__[^_]/)) && !cls.includes(cls.match(/[^_]_[^_]/))) {\n      return 'element'\n    }\n    else if(cls.includes(cls.match(/[^_]_[^_]/))) {\n      return 'mod'\n    }\n    else {\n      return 'error'\n    }\n  }\n\n\n  initEventListener(domElement) {\n\n  }\n\n  handleEvent(event) {\n\n  }\n\n  queryChild(cls) {\n    for(let el of this.children) {\n      if(el.domElement.classList.contains(cls)) {\n        //console.log(el);\n        return el;\n      }\n      else {\n        el.queryChild(cls);\n      }\n    }\n  }\n\n\n  addMod() {} // добавляет модификатор в classList DOMElement'а \n  \n  importMod() {} // импортирует модуль модификатора в блок\n\n  removeMod() {} // удаляет модификатор из classList DOMElement'а \n\n\n  /*\n    Должен иметь:\n    - ссылку на dom элемент;\n    - метод инициализации детей;\n    - коллекцию с сылками на js объекты детей;\n    - метод инициализации обработчиков;\n  */\n\n}\n\n\n\n//# sourceURL=webpack://prtf_prtf/./src/js/base/baseClass.js?");

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