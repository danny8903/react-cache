self["webpackHotUpdatereact_cache"]("main",{

/***/ "./src/loadDataOptions/index.ts":
/*!**************************************!*\
  !*** ./src/loadDataOptions/index.ts ***!
  \**************************************/
/*! namespace exports */
/*! export createLoadDataOptions [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLoadDataOptions": () => /* binding */ createLoadDataOptions
/* harmony export */ });
/* harmony import */ var _neverLoadData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./neverLoadData */ "./src/loadDataOptions/neverLoadData.ts");
/* harmony import */ var _loadDataById__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadDataById */ "./src/loadDataOptions/loadDataById.ts");
/* harmony import */ var _loadDataByIdList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./loadDataByIdList */ "./src/loadDataOptions/loadDataByIdList.ts");
/* harmony import */ var _loadDataByUrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadDataByUrl */ "./src/loadDataOptions/loadDataByUrl.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.ts");





function createLoadDataOptions(url, options) {
  if (!options) return new _neverLoadData__WEBPACK_IMPORTED_MODULE_0__.default();
  (0,_utils__WEBPACK_IMPORTED_MODULE_4__.validateSchema)(options.schema);
  if (!!options.id && !!options.findEntityIds) throw new Error('Invalid options, you should only use "id" or "findEntityIds".');
  if (!!options.id) return new _loadDataById__WEBPACK_IMPORTED_MODULE_1__.default(options);
  if (!!options.findEntityIds) return new _loadDataByIdList__WEBPACK_IMPORTED_MODULE_2__.default(options);
  return new _loadDataByUrl__WEBPACK_IMPORTED_MODULE_3__.default({
    schema: options.schema,
    url: url
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "6538a56e8036f9e91a81"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS8uL3NyYy9sb2FkRGF0YU9wdGlvbnMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcmVhY3QtY2FjaGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sIm5hbWVzIjpbImNyZWF0ZUxvYWREYXRhT3B0aW9ucyIsInVybCIsIm9wdGlvbnMiLCJOZXZlckxvYWREYXRhIiwidmFsaWRhdGVTY2hlbWEiLCJzY2hlbWEiLCJpZCIsImZpbmRFbnRpdHlJZHMiLCJFcnJvciIsIkxvYWREYXRhQnlJZCIsIkxvYWREYXRhQnlJZExpc3QiLCJMb2FkRGF0YUJ5VXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQVNPLFNBQVNBLHFCQUFULENBQ0xDLEdBREssRUFFTEMsT0FGSyxFQUdxQjtBQUMxQixNQUFJLENBQUNBLE9BQUwsRUFBYyxPQUFPLElBQUlDLG1EQUFKLEVBQVA7QUFFZEMsd0RBQWMsQ0FBQ0YsT0FBTyxDQUFDRyxNQUFULENBQWQ7QUFFQSxNQUFJLENBQUMsQ0FBQ0gsT0FBTyxDQUFDSSxFQUFWLElBQWdCLENBQUMsQ0FBQ0osT0FBTyxDQUFDSyxhQUE5QixFQUNFLE1BQU0sSUFBSUMsS0FBSixDQUNKLCtEQURJLENBQU47QUFJRixNQUFJLENBQUMsQ0FBQ04sT0FBTyxDQUFDSSxFQUFkLEVBQWtCLE9BQU8sSUFBSUcsa0RBQUosQ0FBaUJQLE9BQWpCLENBQVA7QUFFbEIsTUFBSSxDQUFDLENBQUNBLE9BQU8sQ0FBQ0ssYUFBZCxFQUNFLE9BQU8sSUFBSUcsc0RBQUosQ0FBcUJSLE9BQXJCLENBQVA7QUFFRixTQUFPLElBQUlTLG1EQUFKLENBQWtCO0FBQUVOLFVBQU0sRUFBRUgsT0FBTyxDQUFDRyxNQUFsQjtBQUEwQkosT0FBRyxFQUFIQTtBQUExQixHQUFsQixDQUFQO0FBQ0QsQzs7Ozs7Ozs7OztXQ2pDRCxvRCIsImZpbGUiOiIzNzYyM2M0LW1haW4td3BzLWhtci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBOZXZlckxvYWREYXRhIGZyb20gJy4vbmV2ZXJMb2FkRGF0YSc7XG5pbXBvcnQgTG9hZERhdGFCeUlkLCB7IExvYWREYXRhQnlJZE9wdGlvbnMgfSBmcm9tICcuL2xvYWREYXRhQnlJZCc7XG5pbXBvcnQgTG9hZERhdGFCeUlkTGlzdCwgeyBMb2FkRGF0YUJ5SWRMaXN0T3B0aW9ucyB9IGZyb20gJy4vbG9hZERhdGFCeUlkTGlzdCc7XG5pbXBvcnQgTG9hZERhdGFCeVVybCBmcm9tICcuL2xvYWREYXRhQnlVcmwnO1xuaW1wb3J0IHsgTG9hZERhdGEsIFNjaGVtYSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGVTY2hlbWEgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnMgPSB7XG4gIHNjaGVtYTogU2NoZW1hO1xuICBpZD86IExvYWREYXRhQnlJZE9wdGlvbnNbJ2lkJ107XG4gIHNob3VsZEZldGNoRGF0YT86IExvYWREYXRhQnlJZE9wdGlvbnNbJ3Nob3VsZEZldGNoRGF0YSddO1xuICBmaW5kRW50aXR5SWRzPzogTG9hZERhdGFCeUlkTGlzdE9wdGlvbnNbJ2ZpbmRFbnRpdHlJZHMnXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVMb2FkRGF0YU9wdGlvbnMoXG4gIHVybDogc3RyaW5nLFxuICBvcHRpb25zPzogT3B0aW9uc1xuKTogTG9hZERhdGEgfCBOZXZlckxvYWREYXRhIHtcbiAgaWYgKCFvcHRpb25zKSByZXR1cm4gbmV3IE5ldmVyTG9hZERhdGEoKTtcblxuICB2YWxpZGF0ZVNjaGVtYShvcHRpb25zLnNjaGVtYSk7XG5cbiAgaWYgKCEhb3B0aW9ucy5pZCAmJiAhIW9wdGlvbnMuZmluZEVudGl0eUlkcylcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnSW52YWxpZCBvcHRpb25zLCB5b3Ugc2hvdWxkIG9ubHkgdXNlIFwiaWRcIiBvciBcImZpbmRFbnRpdHlJZHNcIi4nXG4gICAgKTtcblxuICBpZiAoISFvcHRpb25zLmlkKSByZXR1cm4gbmV3IExvYWREYXRhQnlJZChvcHRpb25zIGFzIExvYWREYXRhQnlJZE9wdGlvbnMpO1xuXG4gIGlmICghIW9wdGlvbnMuZmluZEVudGl0eUlkcylcbiAgICByZXR1cm4gbmV3IExvYWREYXRhQnlJZExpc3Qob3B0aW9ucyBhcyBMb2FkRGF0YUJ5SWRMaXN0T3B0aW9ucyk7XG5cbiAgcmV0dXJuIG5ldyBMb2FkRGF0YUJ5VXJsKHsgc2NoZW1hOiBvcHRpb25zLnNjaGVtYSwgdXJsIH0pO1xufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCI2NTM4YTU2ZTgwMzZmOWU5MWE4MVwiIl0sInNvdXJjZVJvb3QiOiIifQ==