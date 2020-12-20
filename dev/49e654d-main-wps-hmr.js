self["webpackHotUpdatereact_cache"]("main",{

/***/ "./src/store.ts":
/*!**********************!*\
  !*** ./src/store.ts ***!
  \**********************/
/*! namespace exports */
/*! export createStore [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createStore": () => /* binding */ createStore
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/BehaviorSubject.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var normalizr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! normalizr */ "./node_modules/normalizr/dist/normalizr.es.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "./src/interfaces.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var createStore = function createStore(initState, options) {
  var actionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject(); // const stateSubject = new BehaviorSubject<T>(initState);

  var entitiesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject({});
  var queryPoolSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject({});

  var updateQueryPool = function updateQueryPool(url, schemaName, id) {
    var queryPool = queryPoolSubject.getValue();

    var result = _objectSpread(_objectSpread({}, queryPool), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, url, [schemaName, id]));

    queryPoolSubject.next(result);
  };

  var updateStore = function updateStore(newEntities) {
    var entities = entitiesSubject.getValue();
    var result = Object.entries(newEntities).reduce(function (mergedEntities, _ref) {
      var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
          id = _ref2[0],
          value = _ref2[1];

      return _objectSpread(_objectSpread({}, mergedEntities), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, id, _objectSpread(_objectSpread({}, mergedEntities[id] || {}), value)));
    }, entities);
    entitiesSubject.next(result);
  };

  var lookup$ = actionSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(function (action) {
    if (action.type === _interfaces__WEBPACK_IMPORTED_MODULE_2__.StoreActionTypes.fetch) {
      var queryPool = queryPoolSubject.getValue();
      var entities = entitiesSubject.getValue();
      var _options = action.options,
          _url = action.url;

      if (!_options || !_options.lookupType || _options.lookupType === _interfaces__WEBPACK_IMPORTED_MODULE_2__.LookupTypes.url) {
        if (Object.keys(queryPool).includes(_url)) {
          var _queryPool$_url = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(queryPool[_url], 2),
              schemaName = _queryPool$_url[0],
              dataId = _queryPool$_url[1];

          if (entities[schemaName]) {
            return Array.isArray(dataId) ? dataId.map(function (id) {
              return entities[schemaName][id];
            }) : entities[schemaName][dataId];
          }
        }

        return null;
      }

      console.error("Invalid lookupType: ".concat(_options.lookupType));
      return new Error();
    }

    if (action.type === _interfaces__WEBPACK_IMPORTED_MODULE_2__.StoreActionTypes.fetchSuccess) {
      var _options2 = action.options,
          _url2 = action.url,
          data = action.data,
          schema = action.schema;

      if (!_options2 || !_options2.lookupType || _options2.lookupType === _interfaces__WEBPACK_IMPORTED_MODULE_2__.LookupTypes.url) {
        try {
          var normalized = (0,normalizr__WEBPACK_IMPORTED_MODULE_6__.normalize)(data, Array.isArray(data) ? [schema] : schema);
          /** pass userMergeStrategy and userProcessStrategy */

          updateStore(normalized.entities);
          updateQueryPool(_url2, schema.key, normalized.result);
          return normalized.entities;
        } catch (err) {
          console.error('failed to normalize data', err);
          return new Error();
        }
      }

      console.error("Invalid lookupType: ".concat(_options2.lookupType));
      return new Error();
    }

    console.error("Invalid action: ".concat(JSON.stringify(action)));
    return new Error();
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.filter)(function (result) {
    return !(result instanceof Error);
  }));

  var dispatch = function dispatch(action) {
    return actionSubject.next(action);
  };

  var subscribeChange = function subscribeChange(observer) {
    return lookup$.subscribe(observer);
  };

  return {
    dispatch: dispatch,
    subscribeChange: subscribeChange,
    httpRequestFunction: options && options.httpRequestFunction // getState: () => finalStateSubject.getValue(),
    // subscribe: (observer: Observer<{ action: A; state: T }>) =>
    //   store$.subscribe(observer),
    // cleanup,

  };
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "b3545bc3f447234b15cd"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS8uL3NyYy9zdG9yZS50cyIsIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOlsiY3JlYXRlU3RvcmUiLCJpbml0U3RhdGUiLCJvcHRpb25zIiwiYWN0aW9uU3ViamVjdCIsIlN1YmplY3QiLCJlbnRpdGllc1N1YmplY3QiLCJCZWhhdmlvclN1YmplY3QiLCJxdWVyeVBvb2xTdWJqZWN0IiwidXBkYXRlUXVlcnlQb29sIiwidXJsIiwic2NoZW1hTmFtZSIsImlkIiwicXVlcnlQb29sIiwiZ2V0VmFsdWUiLCJyZXN1bHQiLCJuZXh0IiwidXBkYXRlU3RvcmUiLCJuZXdFbnRpdGllcyIsImVudGl0aWVzIiwiT2JqZWN0IiwiZW50cmllcyIsInJlZHVjZSIsIm1lcmdlZEVudGl0aWVzIiwidmFsdWUiLCJsb29rdXAkIiwicGlwZSIsIm1hcCIsImFjdGlvbiIsInR5cGUiLCJTdG9yZUFjdGlvblR5cGVzIiwibG9va3VwVHlwZSIsIkxvb2t1cFR5cGVzIiwia2V5cyIsImluY2x1ZGVzIiwiZGF0YUlkIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uc29sZSIsImVycm9yIiwiRXJyb3IiLCJkYXRhIiwic2NoZW1hIiwibm9ybWFsaXplZCIsIm5vcm1hbGl6ZSIsImtleSIsImVyciIsIkpTT04iLCJzdHJpbmdpZnkiLCJmaWx0ZXIiLCJkaXNwYXRjaCIsInN1YnNjcmliZUNoYW5nZSIsIm9ic2VydmVyIiwic3Vic2NyaWJlIiwiaHR0cFJlcXVlc3RGdW5jdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBSUE7QUFDQTtBQUVBO0FBVU8sSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FDekJDLFNBRHlCLEVBRXpCQyxPQUZ5QixFQUdGO0FBQ3ZCLE1BQU1DLGFBQWEsR0FBRyxJQUFJQyx5Q0FBSixFQUF0QixDQUR1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ZCxDQUFtQlksTUFBbkIsQ0FBekI7QUFBQSxHQUFqQjs7QUFDQSxNQUFNdUIsZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixDQUFjQyxRQUFkO0FBQUEsV0FDckIzQixPQUFELENBQTJCNEIsU0FBM0IsQ0FBcUNELFFBQXJDLENBRHNCO0FBQUEsR0FBeEI7O0FBR0EsU0FBTztBQUNMRixZQUFRLEVBQVJBLFFBREs7QUFFTEMsbUJBQWUsRUFBZkEsZUFGSztBQUdMRyx1QkFBbUIsRUFBRW5ELE9BQU8sSUFBSUEsT0FBTyxDQUFDbUQsbUJBSG5DLENBSUw7QUFDQTtBQUNBO0FBQ0E7O0FBUEssR0FBUDtBQVNELENBckhNLEM7Ozs7Ozs7Ozs7V0NqQlAsb0QiLCJmaWxlIjoiNDllNjU0ZC1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJqZWN0LCBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE9ic2VydmVyIH0gZnJvbSAncnhqcy9pbnRlcm5hbC90eXBlcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9pbnRlcm5hbC9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgbWFwLCBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBub3JtYWxpemUgfSBmcm9tICdub3JtYWxpenInO1xuXG5pbXBvcnQge1xuICBTdG9yZUFjdGlvbixcbiAgU3RvcmVBY3Rpb25UeXBlcyxcbiAgRW50aXRpZXMsXG4gIEZsYXR0ZW5Kc29uLFxuICBMb29rdXBUeXBlcyxcbiAgU3RvcmVPcHRpb25zLFxuICBJU3RvcmVDb250ZXh0VmFsdWUsXG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVTdG9yZSA9IChcbiAgaW5pdFN0YXRlOiB1bmtub3duLFxuICBvcHRpb25zPzogU3RvcmVPcHRpb25zXG4pOiBJU3RvcmVDb250ZXh0VmFsdWUgPT4ge1xuICBjb25zdCBhY3Rpb25TdWJqZWN0ID0gbmV3IFN1YmplY3Q8U3RvcmVBY3Rpb24+KCk7XG4gIC8vIGNvbnN0IHN0YXRlU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8VD4oaW5pdFN0YXRlKTtcbiAgY29uc3QgZW50aXRpZXNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxFbnRpdGllcz4oe30pO1xuICBjb25zdCBxdWVyeVBvb2xTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7XG4gICAgW3VybDogc3RyaW5nXTogW1xuICAgICAgc3RyaW5nIC8qKiBTY2hlbWEgTmFtZSAqLyxcbiAgICAgIC8qKiBpZCBvciBpZCBsaXN0LCBkZXBlbmRlZCBvbiBpZiBpbnB1dCBkYXRhIGlzIGFuIGFycmF5IG9yIG5vdCAqL1xuICAgICAgc3RyaW5nIHwgc3RyaW5nW11cbiAgICBdO1xuICB9Pih7fSk7XG5cbiAgY29uc3QgdXBkYXRlUXVlcnlQb29sID0gKFxuICAgIHVybDogc3RyaW5nLFxuICAgIHNjaGVtYU5hbWU6IHN0cmluZyxcbiAgICBpZDogc3RyaW5nIHwgc3RyaW5nW11cbiAgKSA9PiB7XG4gICAgY29uc3QgcXVlcnlQb29sID0gcXVlcnlQb29sU3ViamVjdC5nZXRWYWx1ZSgpO1xuXG4gICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgLi4ucXVlcnlQb29sLFxuICAgICAgW3VybF06IFtzY2hlbWFOYW1lLCBpZF0gYXMgW3N0cmluZywgc3RyaW5nIHwgc3RyaW5nW11dLFxuICAgIH07XG4gICAgcXVlcnlQb29sU3ViamVjdC5uZXh0KHJlc3VsdCk7XG4gIH07XG5cbiAgY29uc3QgdXBkYXRlU3RvcmUgPSAobmV3RW50aXRpZXM6IEVudGl0aWVzKSA9PiB7XG4gICAgY29uc3QgZW50aXRpZXMgPSBlbnRpdGllc1N1YmplY3QuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCByZXN1bHQgPSBPYmplY3QuZW50cmllcyhuZXdFbnRpdGllcykucmVkdWNlKFxuICAgICAgKG1lcmdlZEVudGl0aWVzLCBbaWQsIHZhbHVlXSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm1lcmdlZEVudGl0aWVzLFxuICAgICAgICAgIFtpZF06IHtcbiAgICAgICAgICAgIC4uLihtZXJnZWRFbnRpdGllc1tpZF0gfHwge30pLFxuICAgICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBlbnRpdGllc1xuICAgICk7XG4gICAgZW50aXRpZXNTdWJqZWN0Lm5leHQocmVzdWx0KTtcbiAgfTtcblxuICBjb25zdCBsb29rdXAkID0gYWN0aW9uU3ViamVjdC5waXBlKFxuICAgIG1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFN0b3JlQWN0aW9uVHlwZXMuZmV0Y2gpIHtcbiAgICAgICAgY29uc3QgcXVlcnlQb29sID0gcXVlcnlQb29sU3ViamVjdC5nZXRWYWx1ZSgpO1xuICAgICAgICBjb25zdCBlbnRpdGllcyA9IGVudGl0aWVzU3ViamVjdC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIGNvbnN0IHsgb3B0aW9ucywgdXJsIH0gPSBhY3Rpb247XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhb3B0aW9ucyB8fFxuICAgICAgICAgICFvcHRpb25zLmxvb2t1cFR5cGUgfHxcbiAgICAgICAgICBvcHRpb25zLmxvb2t1cFR5cGUgPT09IExvb2t1cFR5cGVzLnVybFxuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMocXVlcnlQb29sKS5pbmNsdWRlcyh1cmwpKSB7XG4gICAgICAgICAgICBjb25zdCBbc2NoZW1hTmFtZSwgZGF0YUlkXSA9IHF1ZXJ5UG9vbFt1cmxdO1xuXG4gICAgICAgICAgICBpZiAoZW50aXRpZXNbc2NoZW1hTmFtZV0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZGF0YUlkKVxuICAgICAgICAgICAgICAgID8gZGF0YUlkLm1hcCgoaWQpID0+IChlbnRpdGllc1tzY2hlbWFOYW1lXSBhcyBGbGF0dGVuSnNvbilbaWRdKVxuICAgICAgICAgICAgICAgIDogKGVudGl0aWVzW3NjaGVtYU5hbWVdIGFzIEZsYXR0ZW5Kc29uKVtkYXRhSWRdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIGxvb2t1cFR5cGU6ICR7b3B0aW9ucy5sb29rdXBUeXBlfWApO1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24udHlwZSA9PT0gU3RvcmVBY3Rpb25UeXBlcy5mZXRjaFN1Y2Nlc3MpIHtcbiAgICAgICAgY29uc3QgeyBvcHRpb25zLCB1cmwsIGRhdGEsIHNjaGVtYSB9ID0gYWN0aW9uO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIW9wdGlvbnMgfHxcbiAgICAgICAgICAhb3B0aW9ucy5sb29rdXBUeXBlIHx8XG4gICAgICAgICAgb3B0aW9ucy5sb29rdXBUeXBlID09PSBMb29rdXBUeXBlcy51cmxcbiAgICAgICAgKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUoXG4gICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoZGF0YSkgPyBbc2NoZW1hXSA6IHNjaGVtYVxuICAgICAgICAgICAgKTsgLyoqIHBhc3MgdXNlck1lcmdlU3RyYXRlZ3kgYW5kIHVzZXJQcm9jZXNzU3RyYXRlZ3kgKi9cblxuICAgICAgICAgICAgdXBkYXRlU3RvcmUobm9ybWFsaXplZC5lbnRpdGllcyk7XG4gICAgICAgICAgICB1cGRhdGVRdWVyeVBvb2wodXJsLCBzY2hlbWEua2V5LCBub3JtYWxpemVkLnJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gbm9ybWFsaXplZC5lbnRpdGllcztcbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2ZhaWxlZCB0byBub3JtYWxpemUgZGF0YScsIGVycik7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgbG9va3VwVHlwZTogJHtvcHRpb25zLmxvb2t1cFR5cGV9YCk7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoKTtcbiAgICAgIH1cblxuICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBhY3Rpb246ICR7SlNPTi5zdHJpbmdpZnkoYWN0aW9uKX1gKTtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoKTtcbiAgICB9KSxcbiAgICBmaWx0ZXIoKHJlc3VsdCkgPT4gIShyZXN1bHQgaW5zdGFuY2VvZiBFcnJvcikpXG4gICk7XG5cbiAgY29uc3QgZGlzcGF0Y2ggPSAoYWN0aW9uOiBTdG9yZUFjdGlvbikgPT4gYWN0aW9uU3ViamVjdC5uZXh0KGFjdGlvbik7XG4gIGNvbnN0IHN1YnNjcmliZUNoYW5nZSA9IDxUID0gdW5rbm93bj4ob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PlxuICAgIChsb29rdXAkIGFzIE9ic2VydmFibGU8VD4pLnN1YnNjcmliZShvYnNlcnZlcik7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaCxcbiAgICBzdWJzY3JpYmVDaGFuZ2UsXG4gICAgaHR0cFJlcXVlc3RGdW5jdGlvbjogb3B0aW9ucyAmJiBvcHRpb25zLmh0dHBSZXF1ZXN0RnVuY3Rpb24sXG4gICAgLy8gZ2V0U3RhdGU6ICgpID0+IGZpbmFsU3RhdGVTdWJqZWN0LmdldFZhbHVlKCksXG4gICAgLy8gc3Vic2NyaWJlOiAob2JzZXJ2ZXI6IE9ic2VydmVyPHsgYWN0aW9uOiBBOyBzdGF0ZTogVCB9PikgPT5cbiAgICAvLyAgIHN0b3JlJC5zdWJzY3JpYmUob2JzZXJ2ZXIpLFxuICAgIC8vIGNsZWFudXAsXG4gIH07XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCJiMzU0NWJjM2Y0NDcyMzRiMTVjZFwiIl0sInNvdXJjZVJvb3QiOiIifQ==