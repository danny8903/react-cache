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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/Subject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/BehaviorSubject.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/observable/of.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/observable/empty.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/mergeMap.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/pluck.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/filter.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/internal/operators/shareReplay.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "./src/interfaces.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }





var createStore = function createStore(storeOptions) {
  var actionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject();
  var lastUpdatesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null);
  var entitiesSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject({});
  var queryPoolSubject = new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject({});

  var parseQueryPool = function parseQueryPool(url, id) {
    var queryPool = queryPoolSubject.getValue();
    return _objectSpread(_objectSpread({}, queryPool), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, url, id));
  };

  var parseEntities = function parseEntities(newEntities) {
    var entities = entitiesSubject.getValue();
    return Object.entries(newEntities).reduce(function (mergedEntities, _ref) {
      var _ref2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_ref, 2),
          id = _ref2[0],
          value = _ref2[1];

      return _objectSpread(_objectSpread({}, mergedEntities), {}, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()({}, id, _objectSpread(_objectSpread({}, mergedEntities[id] || {}), value)));
    }, entities);
  };

  var actionHandler$ = actionSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.mergeMap)(function (action) {
    if (action.type === _interfaces__WEBPACK_IMPORTED_MODULE_2__.StoreActionTypes.fetchSuccess) {
      var options = action.options,
          url = action.url,
          data = action.data;

      try {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(options.normalize({
          data: data,
          url: url
        }));
      } catch (err) {
        console.error('failed to normalize data', err);
        return rxjs__WEBPACK_IMPORTED_MODULE_8__.EMPTY;
      }
    }

    console.error("Invalid action: ".concat(JSON.stringify(action)));
    return rxjs__WEBPACK_IMPORTED_MODULE_8__.EMPTY;
  }));
  var updateEntities$ = actionHandler$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.pluck)('entities'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(parseEntities));
  var updateQueryPool$ = actionHandler$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(function (_ref3) {
    var url = _ref3.url;
    return !!url;
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(function (_ref4) {
    var url = _ref4.url,
        result = _ref4.result;
    return parseQueryPool(url, result);
  }));
  var lastUpdate$ = actionHandler$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.pluck)('entities'), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(_utils__WEBPACK_IMPORTED_MODULE_3__.convertEntitiesToNameAndIds));
  var queryPoolSubscription = updateQueryPool$.subscribe(queryPoolSubject);
  var lastUpdateSubscription = lastUpdate$.subscribe(lastUpdatesSubject);
  var entitiesSubscription = updateEntities$.subscribe(entitiesSubject);
  var storeUpdates$ = entitiesSubject.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(function (entities) {
    var queryPool = getQueryPool();
    var updates = getLastUpdates();
    console.log({
      entities: entities,
      queryPool: queryPool,
      updates: updates
    });
    return {
      entities: entities,
      queryPool: queryPool,
      updates: updates
    };
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.filter)(function (_ref5) {
    var updates = _ref5.updates;
    return !!updates;
  }), // this is used to exclude the init value of BehaviorSubject
  (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.shareReplay)(1));

  var cleanup = function cleanup() {
    entitiesSubscription.unsubscribe();
    queryPoolSubscription.unsubscribe();
    lastUpdateSubscription.unsubscribe();
    entitiesSubject.complete();
    queryPoolSubject.complete();
    lastUpdatesSubject.complete();
  };

  var dispatch = function dispatch(action) {
    return actionSubject.next(action);
  };

  var subscribeUpdates = function subscribeUpdates(observer) {
    return storeUpdates$.subscribe(observer);
  };

  var getEntities = function getEntities() {
    return entitiesSubject.getValue();
  };

  var getQueryPool = function getQueryPool() {
    return queryPoolSubject.getValue();
  };

  var getLastUpdates = function getLastUpdates() {
    return lastUpdatesSubject.getValue();
  };

  var DEFAULT_HTTP_REQUEST_FUNCTION = function DEFAULT_HTTP_REQUEST_FUNCTION(url) {
    return fetch(url).then(function (response) {
      return response.json().then(function (json) {
        return !response.ok ? Promise.reject(json) : json;
      });
    });
  };

  var httpRequestFunction = !storeOptions || !storeOptions.httpRequestFunction ? DEFAULT_HTTP_REQUEST_FUNCTION : storeOptions.httpRequestFunction;
  return {
    dispatch: dispatch,
    getEntities: getEntities,
    getQueryPool: getQueryPool,
    subscribeUpdates: subscribeUpdates,
    httpRequestFunction: httpRequestFunction,
    cleanup: cleanup
  };
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "b80ed1f044e222e5f7c0"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS8uL3NyYy9zdG9yZS50cyIsIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwibmFtZXMiOlsiY3JlYXRlU3RvcmUiLCJzdG9yZU9wdGlvbnMiLCJhY3Rpb25TdWJqZWN0IiwiU3ViamVjdCIsImxhc3RVcGRhdGVzU3ViamVjdCIsIkJlaGF2aW9yU3ViamVjdCIsImVudGl0aWVzU3ViamVjdCIsInF1ZXJ5UG9vbFN1YmplY3QiLCJwYXJzZVF1ZXJ5UG9vbCIsInVybCIsImlkIiwicXVlcnlQb29sIiwiZ2V0VmFsdWUiLCJwYXJzZUVudGl0aWVzIiwibmV3RW50aXRpZXMiLCJlbnRpdGllcyIsIk9iamVjdCIsImVudHJpZXMiLCJyZWR1Y2UiLCJtZXJnZWRFbnRpdGllcyIsInZhbHVlIiwiYWN0aW9uSGFuZGxlciQiLCJwaXBlIiwibWVyZ2VNYXAiLCJhY3Rpb24iLCJ0eXBlIiwiU3RvcmVBY3Rpb25UeXBlcyIsIm9wdGlvbnMiLCJkYXRhIiwib2YiLCJub3JtYWxpemUiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJFTVBUWSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cGRhdGVFbnRpdGllcyQiLCJwbHVjayIsIm1hcCIsInVwZGF0ZVF1ZXJ5UG9vbCQiLCJmaWx0ZXIiLCJyZXN1bHQiLCJsYXN0VXBkYXRlJCIsImNvbnZlcnRFbnRpdGllc1RvTmFtZUFuZElkcyIsInF1ZXJ5UG9vbFN1YnNjcmlwdGlvbiIsInN1YnNjcmliZSIsImxhc3RVcGRhdGVTdWJzY3JpcHRpb24iLCJlbnRpdGllc1N1YnNjcmlwdGlvbiIsInN0b3JlVXBkYXRlcyQiLCJnZXRRdWVyeVBvb2wiLCJ1cGRhdGVzIiwiZ2V0TGFzdFVwZGF0ZXMiLCJsb2ciLCJzaGFyZVJlcGxheSIsImNsZWFudXAiLCJ1bnN1YnNjcmliZSIsImNvbXBsZXRlIiwiZGlzcGF0Y2giLCJuZXh0Iiwic3Vic2NyaWJlVXBkYXRlcyIsIm9ic2VydmVyIiwiZ2V0RW50aXRpZXMiLCJERUZBVUxUX0hUVFBfUkVRVUVTVF9GVU5DVElPTiIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsIm9rIiwiUHJvbWlzZSIsInJlamVjdCIsImh0dHBSZXF1ZXN0RnVuY3Rpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBR0E7QUFFQTtBQWFBO0FBRU8sSUFBTUEsV0FBVyxHQUFHLFNBQWRBLFdBQWMsQ0FDekJDLFlBRHlCLEVBRUY7QUFDdkIsTUFBTUMsYUFBYSxHQUFHLElBQUlDLHlDQUFKLEVBQXRCO0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsSUFBSUMsaURBQUosQ0FDekIsSUFEeUIsQ0FBM0I7QUFHQSxNQUFNQyxlQUFlLEdBQUcsSUFBSUQsaURBQUosQ0FBOEIsRUFBOUIsQ0FBeEI7QUFDQSxNQUFNRSxnQkFBZ0IsR0FBRyxJQUFJRixpREFBSixDQUErQixFQUEvQixDQUF6Qjs7QUFFQSxNQUFNRyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLEdBQUQsRUFBY0MsRUFBZCxFQUFvRDtBQUN6RSxRQUFNQyxTQUFTLEdBQUdKLGdCQUFnQixDQUFDSyxRQUFqQixFQUFsQjtBQUVBLDJDQUNLRCxTQURMLHdGQUVHRixHQUZILEVBRVNDLEVBRlQ7QUFJRCxHQVBEOztBQVNBLE1BQU1HLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsV0FBRCxFQUFxQztBQUN6RCxRQUFNQyxRQUFRLEdBQUdULGVBQWUsQ0FBQ00sUUFBaEIsRUFBakI7QUFDQSxXQUFPSSxNQUFNLENBQUNDLE9BQVAsQ0FBZUgsV0FBZixFQUE0QkksTUFBNUIsQ0FBbUMsVUFBQ0MsY0FBRCxRQUFpQztBQUFBO0FBQUEsVUFBZlQsRUFBZTtBQUFBLFVBQVhVLEtBQVc7O0FBQ3pFLDZDQUNLRCxjQURMLHdGQUVHVCxFQUZILGtDQUdRUyxjQUFjLENBQUNULEVBQUQsQ0FBZCxJQUFzQixFQUg5QixH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RDtBQUFBLE9BRlIsQ0FEcUI7QUFBQSxLQUFoQixDQUFQO0FBS0QsR0FORDs7QUFRQSxNQUFNSSxtQkFBbUIsR0FDdkIsQ0FBQ3RFLFlBQUQsSUFBaUIsQ0FBQ0EsWUFBWSxDQUFDc0UsbUJBQS9CLEdBQ0lSLDZCQURKLEdBRUk5RCxZQUFZLENBQUNzRSxtQkFIbkI7QUFLQSxTQUFPO0FBQ0xiLFlBQVEsRUFBUkEsUUFESztBQUVMSSxlQUFXLEVBQVhBLFdBRks7QUFHTFosZ0JBQVksRUFBWkEsWUFISztBQUlMVSxvQkFBZ0IsRUFBaEJBLGdCQUpLO0FBS0xXLHVCQUFtQixFQUFuQkEsbUJBTEs7QUFNTGhCLFdBQU8sRUFBUEE7QUFOSyxHQUFQO0FBUUQsQ0F0SE0sQzs7Ozs7Ozs7OztXQ3BCUCxvRCIsImZpbGUiOiIxNGViN2EzLW1haW4td3BzLWhtci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YmplY3QsIEJlaGF2aW9yU3ViamVjdCwgRU1QVFksIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPYnNlcnZlciB9IGZyb20gJ3J4anMvaW50ZXJuYWwvdHlwZXMnO1xuXG5pbXBvcnQgeyBtYXAsIGZpbHRlciwgbWVyZ2VNYXAsIHBsdWNrLCBzaGFyZVJlcGxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgU3RvcmVBY3Rpb24sXG4gIFN0b3JlQWN0aW9uVHlwZXMsXG4gIEVudGl0aWVzLFxuICBTdG9yZU9wdGlvbnMsXG4gIElTdG9yZUNvbnRleHRWYWx1ZSxcbiAgUXVlcnlQb29sLFxuICBIdHRwUmVxdWVzdEZ1bmN0aW9uLFxuICBTY2hlbWFJZENvbGxlY3Rpb24sXG4gIFN0b3JlVXBkYXRlcyxcbiAgVXBkYXRlZEVudGl0aWVzQW5kSWRzLFxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQgeyBjb252ZXJ0RW50aXRpZXNUb05hbWVBbmRJZHMgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVN0b3JlID0gKFxuICBzdG9yZU9wdGlvbnM/OiBTdG9yZU9wdGlvbnNcbik6IElTdG9yZUNvbnRleHRWYWx1ZSA9PiB7XG4gIGNvbnN0IGFjdGlvblN1YmplY3QgPSBuZXcgU3ViamVjdDxTdG9yZUFjdGlvbj4oKTtcbiAgY29uc3QgbGFzdFVwZGF0ZXNTdWJqZWN0ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxVcGRhdGVkRW50aXRpZXNBbmRJZHM+KFxuICAgIG51bGwgYXMgYW55XG4gICk7XG4gIGNvbnN0IGVudGl0aWVzU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RW50aXRpZXM+KHt9KTtcbiAgY29uc3QgcXVlcnlQb29sU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8UXVlcnlQb29sPih7fSk7XG5cbiAgY29uc3QgcGFyc2VRdWVyeVBvb2wgPSAodXJsOiBzdHJpbmcsIGlkOiBTY2hlbWFJZENvbGxlY3Rpb24pOiBRdWVyeVBvb2wgPT4ge1xuICAgIGNvbnN0IHF1ZXJ5UG9vbCA9IHF1ZXJ5UG9vbFN1YmplY3QuZ2V0VmFsdWUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5xdWVyeVBvb2wsXG4gICAgICBbdXJsXTogaWQsXG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBwYXJzZUVudGl0aWVzID0gKG5ld0VudGl0aWVzOiBFbnRpdGllcyk6IEVudGl0aWVzID0+IHtcbiAgICBjb25zdCBlbnRpdGllcyA9IGVudGl0aWVzU3ViamVjdC5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBPYmplY3QuZW50cmllcyhuZXdFbnRpdGllcykucmVkdWNlKChtZXJnZWRFbnRpdGllcywgW2lkLCB2YWx1ZV0pID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm1lcmdlZEVudGl0aWVzLFxuICAgICAgICBbaWRdOiB7XG4gICAgICAgICAgLi4uKG1lcmdlZEVudGl0aWVzW2lkXSB8fCB7fSksXG4gICAgICAgICAgLi4udmFsdWUsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sIGVudGl0aWVzKTtcbiAgfTtcblxuICBjb25zdCBhY3Rpb25IYW5kbGVyJCA9IGFjdGlvblN1YmplY3QucGlwZShcbiAgICBtZXJnZU1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICBpZiAoYWN0aW9uLnR5cGUgPT09IFN0b3JlQWN0aW9uVHlwZXMuZmV0Y2hTdWNjZXNzKSB7XG4gICAgICAgIGNvbnN0IHsgb3B0aW9ucywgdXJsLCBkYXRhIH0gPSBhY3Rpb247XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gb2Yob3B0aW9ucy5ub3JtYWxpemUoeyBkYXRhLCB1cmwgfSkpO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdmYWlsZWQgdG8gbm9ybWFsaXplIGRhdGEnLCBlcnIpO1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIGFjdGlvbjogJHtKU09OLnN0cmluZ2lmeShhY3Rpb24pfWApO1xuICAgICAgcmV0dXJuIEVNUFRZO1xuICAgIH0pXG4gICk7XG5cbiAgY29uc3QgdXBkYXRlRW50aXRpZXMkID0gYWN0aW9uSGFuZGxlciQucGlwZShcbiAgICBwbHVjaygnZW50aXRpZXMnKSxcbiAgICBtYXAocGFyc2VFbnRpdGllcylcbiAgKTtcblxuICBjb25zdCB1cGRhdGVRdWVyeVBvb2wkID0gYWN0aW9uSGFuZGxlciQucGlwZShcbiAgICBmaWx0ZXIoKHsgdXJsIH0pID0+ICEhdXJsKSxcbiAgICBtYXAoKHsgdXJsLCByZXN1bHQgfSkgPT4gcGFyc2VRdWVyeVBvb2wodXJsIGFzIHN0cmluZywgcmVzdWx0KSlcbiAgKTtcblxuICBjb25zdCBsYXN0VXBkYXRlJCA9IGFjdGlvbkhhbmRsZXIkLnBpcGUoXG4gICAgcGx1Y2soJ2VudGl0aWVzJyksXG4gICAgbWFwKGNvbnZlcnRFbnRpdGllc1RvTmFtZUFuZElkcylcbiAgKTtcblxuICBjb25zdCBxdWVyeVBvb2xTdWJzY3JpcHRpb24gPSB1cGRhdGVRdWVyeVBvb2wkLnN1YnNjcmliZShxdWVyeVBvb2xTdWJqZWN0KTtcbiAgY29uc3QgbGFzdFVwZGF0ZVN1YnNjcmlwdGlvbiA9IGxhc3RVcGRhdGUkLnN1YnNjcmliZShsYXN0VXBkYXRlc1N1YmplY3QpO1xuICBjb25zdCBlbnRpdGllc1N1YnNjcmlwdGlvbiA9IHVwZGF0ZUVudGl0aWVzJC5zdWJzY3JpYmUoZW50aXRpZXNTdWJqZWN0KTtcblxuICBjb25zdCBzdG9yZVVwZGF0ZXMkID0gZW50aXRpZXNTdWJqZWN0LnBpcGUoXG4gICAgbWFwKChlbnRpdGllcykgPT4ge1xuICAgICAgY29uc3QgcXVlcnlQb29sID0gZ2V0UXVlcnlQb29sKCk7XG4gICAgICBjb25zdCB1cGRhdGVzID0gZ2V0TGFzdFVwZGF0ZXMoKTtcbiAgICAgIGNvbnNvbGUubG9nKHsgZW50aXRpZXMsIHF1ZXJ5UG9vbCwgdXBkYXRlcyB9KTtcbiAgICAgIHJldHVybiB7IGVudGl0aWVzLCBxdWVyeVBvb2wsIHVwZGF0ZXMgfTtcbiAgICB9KSxcbiAgICBmaWx0ZXIoKHsgdXBkYXRlcyB9KSA9PiAhIXVwZGF0ZXMpLCAvLyB0aGlzIGlzIHVzZWQgdG8gZXhjbHVkZSB0aGUgaW5pdCB2YWx1ZSBvZiBCZWhhdmlvclN1YmplY3RcbiAgICBzaGFyZVJlcGxheSgxKVxuICApO1xuXG4gIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgZW50aXRpZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBxdWVyeVBvb2xTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsYXN0VXBkYXRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgZW50aXRpZXNTdWJqZWN0LmNvbXBsZXRlKCk7XG4gICAgcXVlcnlQb29sU3ViamVjdC5jb21wbGV0ZSgpO1xuICAgIGxhc3RVcGRhdGVzU3ViamVjdC5jb21wbGV0ZSgpO1xuICB9O1xuXG4gIGNvbnN0IGRpc3BhdGNoID0gKGFjdGlvbjogU3RvcmVBY3Rpb24pID0+IGFjdGlvblN1YmplY3QubmV4dChhY3Rpb24pO1xuICBjb25zdCBzdWJzY3JpYmVVcGRhdGVzID0gKG9ic2VydmVyOiBPYnNlcnZlcjxTdG9yZVVwZGF0ZXM+KSA9PlxuICAgIHN0b3JlVXBkYXRlcyQuc3Vic2NyaWJlKG9ic2VydmVyKTtcblxuICBjb25zdCBnZXRFbnRpdGllcyA9ICgpID0+IGVudGl0aWVzU3ViamVjdC5nZXRWYWx1ZSgpO1xuICBjb25zdCBnZXRRdWVyeVBvb2wgPSAoKSA9PiBxdWVyeVBvb2xTdWJqZWN0LmdldFZhbHVlKCk7XG4gIGNvbnN0IGdldExhc3RVcGRhdGVzID0gKCkgPT4gbGFzdFVwZGF0ZXNTdWJqZWN0LmdldFZhbHVlKCk7XG5cbiAgY29uc3QgREVGQVVMVF9IVFRQX1JFUVVFU1RfRlVOQ1RJT046IEh0dHBSZXF1ZXN0RnVuY3Rpb24gPSAodXJsOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT5cbiAgICAgIHJlc3BvbnNlXG4gICAgICAgIC5qc29uKClcbiAgICAgICAgLnRoZW4oKGpzb24pID0+ICghcmVzcG9uc2Uub2sgPyBQcm9taXNlLnJlamVjdChqc29uKSA6IGpzb24pKVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaHR0cFJlcXVlc3RGdW5jdGlvbiA9XG4gICAgIXN0b3JlT3B0aW9ucyB8fCAhc3RvcmVPcHRpb25zLmh0dHBSZXF1ZXN0RnVuY3Rpb25cbiAgICAgID8gREVGQVVMVF9IVFRQX1JFUVVFU1RfRlVOQ1RJT05cbiAgICAgIDogc3RvcmVPcHRpb25zLmh0dHBSZXF1ZXN0RnVuY3Rpb247XG5cbiAgcmV0dXJuIHtcbiAgICBkaXNwYXRjaCxcbiAgICBnZXRFbnRpdGllcyxcbiAgICBnZXRRdWVyeVBvb2wsXG4gICAgc3Vic2NyaWJlVXBkYXRlcyxcbiAgICBodHRwUmVxdWVzdEZ1bmN0aW9uLFxuICAgIGNsZWFudXAsXG4gIH07XG59O1xuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gXCJiODBlZDFmMDQ0ZTIyMmU1ZjdjMFwiIl0sInNvdXJjZVJvb3QiOiIifQ==