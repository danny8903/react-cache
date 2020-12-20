self["webpackHotUpdatereact_cache"]("main",{

/***/ "./examples/App.tsx":
/*!**************************!*\
  !*** ./examples/App.tsx ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.n, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/esm/react-router.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


 // import {StoreProvider, useGet, createStore, Schema} from '../src/index';

/**
 * const userSchema = new Schema.Entity<IUser>('user')
 * const schemas = {
 *  USER: userSchema,
    USER_ARRAY: [userSchema]
    }
 * const initStore = createStore({}, schemas);
 */

var MOCK_DATA = [{
  id: 1,
  first_name: 'Ruprecht',
  last_name: 'Fetherston',
  email: 'rfetherston0@gravatar.com',
  gender: 'Male'
}, {
  id: 2,
  first_name: 'Kev',
  last_name: 'Seamon',
  email: 'kseamon1@symantec.com',
  gender: 'Male'
}, {
  id: 3,
  first_name: 'Janine',
  last_name: 'Boffey',
  email: 'jboffey2@rambler.ru',
  gender: 'Female'
}, {
  id: 4,
  first_name: 'Audrey',
  last_name: 'Niess',
  email: 'aniess3@wordpress.org',
  gender: 'Female'
}, {
  id: 5,
  first_name: 'Emmit',
  last_name: 'McGiffie',
  email: 'emcgiffie4@behance.net',
  gender: 'Male'
}, {
  id: 6,
  first_name: 'Lydon',
  last_name: 'Kike',
  email: 'lkike5@domainmarket.com',
  gender: 'Male'
}, {
  id: 7,
  first_name: 'Richy',
  last_name: 'Wann',
  email: 'rwann6@dmoz.org',
  gender: 'Male'
}, {
  id: 8,
  first_name: 'Klarika',
  last_name: 'Saynor',
  email: 'ksaynor7@va.gov',
  gender: 'Female'
}, {
  id: 9,
  first_name: 'Neil',
  last_name: 'Corley',
  email: 'ncorley8@ucoz.com',
  gender: 'Male'
}, {
  id: 10,
  first_name: 'Karola',
  last_name: 'Machan',
  email: 'kmachan9@joomla.org',
  gender: 'Female'
}];

var sleep = function sleep(delay) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(null);
    }, delay);
  });
};

function useGet(url) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)({
    loading: false,
    error: undefined,
    data: null
  }),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var loading = result.loading,
      error = result.error,
      data = result.data;
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    setResult(_objectSpread(_objectSpread({}, result), {}, {
      loading: true
    }));
    sleep(1000).then(function () {
      setResult({
        loading: false,
        error: undefined,
        data: MOCK_DATA
      });
    });
  }, [url]);
  return {
    data: data,
    loading: loading,
    error: error
  };
}

function Home() {
  // const { data, loading } = useGet('/getList', schemas.USER_ARRAY, {} /** options */);
  var _useGet = useGet('/getList'),
      data = _useGet.data,
      loading = _useGet.loading;

  console.log({
    data: data,
    loading: loading
  });
  if (loading || !data) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, "Loading...");
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", null, data.map(function (d) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", {
      key: d.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
      to: "/".concat(d.id)
    }, d.email));
  })));
}

function Detail() {
  var _useParams = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_4__.useParams)(),
      id = _useParams.id; // const { data, loading } = useGet<ListData[]>('/getDetail', schemas.USER);


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h2", null, id));
}

function App() {
  return (
    /*#__PURE__*/
    // <StoreProvider store={initStore}>
    react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
      to: "/"
    }, "Home"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
      exact: true,
      path: "/"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Home, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
      path: "/:id"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Detail, null))))) // </StoreProvider>

  );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "8010a82ed53847821698"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS8uL2V4YW1wbGVzL0FwcC50c3giLCJ3ZWJwYWNrOi8vcmVhY3QtY2FjaGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sIm5hbWVzIjpbIk1PQ0tfREFUQSIsImlkIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImVtYWlsIiwiZ2VuZGVyIiwic2xlZXAiLCJkZWxheSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInVzZUdldCIsInVybCIsInVzZVN0YXRlIiwibG9hZGluZyIsImVycm9yIiwidW5kZWZpbmVkIiwiZGF0YSIsInJlc3VsdCIsInNldFJlc3VsdCIsInVzZUVmZmVjdCIsInRoZW4iLCJIb21lIiwiY29uc29sZSIsImxvZyIsIm1hcCIsImQiLCJEZXRhaWwiLCJ1c2VQYXJhbXMiLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtDQVNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBTUEsU0FBa0IsR0FBRyxDQUN6QjtBQUNFQyxJQUFFLEVBQUUsQ0FETjtBQUVFQyxZQUFVLEVBQUUsVUFGZDtBQUdFQyxXQUFTLEVBQUUsWUFIYjtBQUlFQyxPQUFLLEVBQUUsMkJBSlQ7QUFLRUMsUUFBTSxFQUFFO0FBTFYsQ0FEeUIsRUFRekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLEtBRmQ7QUFHRUMsV0FBUyxFQUFFLFFBSGI7QUFJRUMsT0FBSyxFQUFFLHVCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBUnlCLEVBZXpCO0FBQ0VKLElBQUUsRUFBRSxDQUROO0FBRUVDLFlBQVUsRUFBRSxRQUZkO0FBR0VDLFdBQVMsRUFBRSxRQUhiO0FBSUVDLE9BQUssRUFBRSxxQkFKVDtBQUtFQyxRQUFNLEVBQUU7QUFMVixDQWZ5QixFQXNCekI7QUFDRUosSUFBRSxFQUFFLENBRE47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QSxJQUFGO0FBQVFILFdBQU8sRUFBUEE7QUFBUixHQUFaO0FBQ0EsTUFBSUEsT0FBTyxJQUFJLENBQUNHLElBQWhCLEVBQXNCLG9CQUFPLDJFQUFQO0FBRXRCLHNCQUNFLDJFQUNFLDZEQUNHQSxJQUFJLENBQUNRLEdBQUwsQ0FBUyxVQUFDQyxDQUFEO0FBQUEsd0JBQ1I7QUFBSSxTQUFHLEVBQUVBLENBQUMsQ0FBQ3pCO0FBQVgsb0JBQ0UsaURBQUMsa0RBQUQ7QUFBTSxRQUFFLGFBQU15QixDQUFDLENBQUN6QixFQUFSO0FBQVIsT0FBdUJ5QixDQUFDLENBQUN0QixLQUF6QixDQURGLENBRFE7QUFBQSxHQUFULENBREgsQ0FERixDQURGO0FBV0Q7O0FBRUQsU0FBU3VCLE1BQVQsR0FBa0I7QUFBQSxtQkFDREMsMkRBQVMsRUFEUjtBQUFBLE1BQ1IzQixFQURRLGNBQ1JBLEVBRFEsRUFFaEI7OztBQUVBLHNCQUNFLDJFQUNFLDZEQUFLQSxFQUFMLENBREYsQ0FERjtBQUtEOztBQUVELFNBQVM0QixHQUFULEdBQWU7QUFDYjtBQUFBO0FBQ0U7QUFDQSxxREFBQywyREFBRCxxQkFDRSwyRUFDRSwwRUFDRSwwRUFDRSxpREFBQyxrREFBRDtBQUFNLFFBQUUsRUFBQztBQUFULGNBREYsQ0FERixDQURGLGVBT0UsNERBUEYsZUFTRSxpREFBQyxvREFBRCxxQkFDRSxpREFBQyxtREFBRDtBQUFPLFdBQUssTUFBWjtBQUFhLFVBQUksRUFBQztBQUFsQixvQkFDRSxpREFBQyxJQUFELE9BREYsQ0FERixlQUlFLGlEQUFDLG1EQUFEO0FBQU8sVUFBSSxFQUFDO0FBQVosb0JBQ0UsaURBQUMsTUFBRCxPQURGLENBSkYsQ0FURixDQURGLENBRkYsQ0FzQkU7O0FBdEJGO0FBd0JEOztBQUVELGlFQUFlQSxHQUFmLEU7Ozs7Ozs7Ozs7V0N6TUEsb0QiLCJmaWxlIjoiNDU1NmYzNC1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLFxuICBTd2l0Y2gsXG4gIFJvdXRlLFxuICBMaW5rLFxuICB1c2VQYXJhbXMsXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG4vLyBpbXBvcnQge1N0b3JlUHJvdmlkZXIsIHVzZUdldCwgY3JlYXRlU3RvcmUsIFNjaGVtYX0gZnJvbSAnLi4vc3JjL2luZGV4JztcblxuLyoqXG4gKiBjb25zdCB1c2VyU2NoZW1hID0gbmV3IFNjaGVtYS5FbnRpdHk8SVVzZXI+KCd1c2VyJylcbiAqIGNvbnN0IHNjaGVtYXMgPSB7XG4gKiAgVVNFUjogdXNlclNjaGVtYSxcbiAgICBVU0VSX0FSUkFZOiBbdXNlclNjaGVtYV1cbiAgICB9XG4gKiBjb25zdCBpbml0U3RvcmUgPSBjcmVhdGVTdG9yZSh7fSwgc2NoZW1hcyk7XG4gKi9cblxuY29uc3QgTU9DS19EQVRBOiB1bmtub3duID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgZmlyc3RfbmFtZTogJ1J1cHJlY2h0JyxcbiAgICBsYXN0X25hbWU6ICdGZXRoZXJzdG9uJyxcbiAgICBlbWFpbDogJ3JmZXRoZXJzdG9uMEBncmF2YXRhci5jb20nLFxuICAgIGdlbmRlcjogJ01hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDIsXG4gICAgZmlyc3RfbmFtZTogJ0tldicsXG4gICAgbGFzdF9uYW1lOiAnU2VhbW9uJyxcbiAgICBlbWFpbDogJ2tzZWFtb24xQHN5bWFudGVjLmNvbScsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogMyxcbiAgICBmaXJzdF9uYW1lOiAnSmFuaW5lJyxcbiAgICBsYXN0X25hbWU6ICdCb2ZmZXknLFxuICAgIGVtYWlsOiAnamJvZmZleTJAcmFtYmxlci5ydScsXG4gICAgZ2VuZGVyOiAnRmVtYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIGZpcnN0X25hbWU6ICdBdWRyZXknLFxuICAgIGxhc3RfbmFtZTogJ05pZXNzJyxcbiAgICBlbWFpbDogJ2FuaWVzczNAd29yZHByZXNzLm9yZycsXG4gICAgZ2VuZGVyOiAnRmVtYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiA1LFxuICAgIGZpcnN0X25hbWU6ICdFbW1pdCcsXG4gICAgbGFzdF9uYW1lOiAnTWNHaWZmaWUnLFxuICAgIGVtYWlsOiAnZW1jZ2lmZmllNEBiZWhhbmNlLm5ldCcsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogNixcbiAgICBmaXJzdF9uYW1lOiAnTHlkb24nLFxuICAgIGxhc3RfbmFtZTogJ0tpa2UnLFxuICAgIGVtYWlsOiAnbGtpa2U1QGRvbWFpbm1hcmtldC5jb20nLFxuICAgIGdlbmRlcjogJ01hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDcsXG4gICAgZmlyc3RfbmFtZTogJ1JpY2h5JyxcbiAgICBsYXN0X25hbWU6ICdXYW5uJyxcbiAgICBlbWFpbDogJ3J3YW5uNkBkbW96Lm9yZycsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogOCxcbiAgICBmaXJzdF9uYW1lOiAnS2xhcmlrYScsXG4gICAgbGFzdF9uYW1lOiAnU2F5bm9yJyxcbiAgICBlbWFpbDogJ2tzYXlub3I3QHZhLmdvdicsXG4gICAgZ2VuZGVyOiAnRmVtYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiA5LFxuICAgIGZpcnN0X25hbWU6ICdOZWlsJyxcbiAgICBsYXN0X25hbWU6ICdDb3JsZXknLFxuICAgIGVtYWlsOiAnbmNvcmxleThAdWNvei5jb20nLFxuICAgIGdlbmRlcjogJ01hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDEwLFxuICAgIGZpcnN0X25hbWU6ICdLYXJvbGEnLFxuICAgIGxhc3RfbmFtZTogJ01hY2hhbicsXG4gICAgZW1haWw6ICdrbWFjaGFuOUBqb29tbGEub3JnJyxcbiAgICBnZW5kZXI6ICdGZW1hbGUnLFxuICB9LFxuXTtcblxuY29uc3Qgc2xlZXAgPSAoZGVsYXk6IG51bWJlcikgPT5cbiAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgfSwgZGVsYXkpO1xuICB9KTtcblxudHlwZSBMaXN0RGF0YSA9IHtcbiAgaWQ6IG51bWJlcjtcbiAgZmlyc3RfbmFtZTogc3RyaW5nO1xuICBsYXN0X25hbWU6IHN0cmluZztcbiAgZW1haWw6IHN0cmluZztcbiAgZ2VuZGVyOiBzdHJpbmc7XG59O1xuXG5mdW5jdGlvbiB1c2VHZXQ8VD4odXJsOiBzdHJpbmcpIHtcbiAgY29uc3QgW3Jlc3VsdCwgc2V0UmVzdWx0XSA9IHVzZVN0YXRlPHtcbiAgICBsb2FkaW5nOiBib29sZWFuO1xuICAgIGVycm9yOiB1bmRlZmluZWQgfCBFcnJvcjtcbiAgICBkYXRhOiBUIHwgbnVsbDtcbiAgfT4oe1xuICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgZGF0YTogbnVsbCxcbiAgfSk7XG5cbiAgY29uc3QgeyBsb2FkaW5nLCBlcnJvciwgZGF0YSB9ID0gcmVzdWx0O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UmVzdWx0KHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIGxvYWRpbmc6IHRydWUsXG4gICAgfSk7XG5cbiAgICBzbGVlcCgxMDAwKS50aGVuKCgpID0+IHtcbiAgICAgIHNldFJlc3VsdCh7XG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgICAgICBkYXRhOiBNT0NLX0RBVEEgYXMgVCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCBbdXJsXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRhLFxuICAgIGxvYWRpbmcsXG4gICAgZXJyb3IsXG4gIH07XG59XG5cbmZ1bmN0aW9uIEhvbWUoKSB7XG4gIC8vIGNvbnN0IHsgZGF0YSwgbG9hZGluZyB9ID0gdXNlR2V0KCcvZ2V0TGlzdCcsIHNjaGVtYXMuVVNFUl9BUlJBWSwge30gLyoqIG9wdGlvbnMgKi8pO1xuXG4gIGNvbnN0IHsgZGF0YSwgbG9hZGluZyB9ID0gdXNlR2V0PExpc3REYXRhW10+KCcvZ2V0TGlzdCcpO1xuICBjb25zb2xlLmxvZyh7IGRhdGEsIGxvYWRpbmcgfSk7XG4gIGlmIChsb2FkaW5nIHx8ICFkYXRhKSByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDx1bD5cbiAgICAgICAge2RhdGEubWFwKChkKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17ZC5pZH0+XG4gICAgICAgICAgICA8TGluayB0bz17YC8ke2QuaWR9YH0+e2QuZW1haWx9PC9MaW5rPlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZnVuY3Rpb24gRGV0YWlsKCkge1xuICBjb25zdCB7IGlkIH0gPSB1c2VQYXJhbXM8eyBpZDogc3RyaW5nIH0+KCk7XG4gIC8vIGNvbnN0IHsgZGF0YSwgbG9hZGluZyB9ID0gdXNlR2V0PExpc3REYXRhW10+KCcvZ2V0RGV0YWlsJywgc2NoZW1hcy5VU0VSKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+e2lkfTwvaDI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICAvLyA8U3RvcmVQcm92aWRlciBzdG9yZT17aW5pdFN0b3JlfT5cbiAgICA8Um91dGVyPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cblxuICAgICAgICA8aHIgLz5cblxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiPlxuICAgICAgICAgICAgPEhvbWUgLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiLzppZFwiPlxuICAgICAgICAgICAgPERldGFpbCAvPlxuICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICAgPC9kaXY+XG4gICAgPC9Sb3V0ZXI+XG4gICAgLy8gPC9TdG9yZVByb3ZpZGVyPlxuICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiBcIjgwMTBhODJlZDUzODQ3ODIxNjk4XCIiXSwic291cmNlUm9vdCI6IiJ9