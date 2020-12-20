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
      id = _useParams.id; // const { data, loading } = useGet<ListData[]>('/getDetail');


  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h2", null, id));
}

function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.Link, {
    to: "/"
  }, "Home"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("hr", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Switch, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
    exact: true,
    path: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Home, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.Route, {
    path: "/:id"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(Detail, null)))));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "bdfba229293d2801b9cf"
/******/ 	})();
/******/ 	
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZWFjdC1jYWNoZS8uL2V4YW1wbGVzL0FwcC50c3giLCJ3ZWJwYWNrOi8vcmVhY3QtY2FjaGUvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sIm5hbWVzIjpbIk1PQ0tfREFUQSIsImlkIiwiZmlyc3RfbmFtZSIsImxhc3RfbmFtZSIsImVtYWlsIiwiZ2VuZGVyIiwic2xlZXAiLCJkZWxheSIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsInVzZUdldCIsInVybCIsInVzZVN0YXRlIiwibG9hZGluZyIsImVycm9yIiwidW5kZWZpbmVkIiwiZGF0YSIsInJlc3VsdCIsInNldFJlc3VsdCIsInVzZUVmZmVjdCIsInRoZW4iLCJIb21lIiwiY29uc29sZSIsImxvZyIsIm1hcCIsImQiLCJEZXRhaWwiLCJ1c2VQYXJhbXMiLCJBcHAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBVUEsSUFBTUEsU0FBa0IsR0FBRyxDQUN6QjtBQUNFQyxJQUFFLEVBQUUsQ0FETjtBQUVFQyxZQUFVLEVBQUUsVUFGZDtBQUdFQyxXQUFTLEVBQUUsWUFIYjtBQUlFQyxPQUFLLEVBQUUsMkJBSlQ7QUFLRUMsUUFBTSxFQUFFO0FBTFYsQ0FEeUIsRUFRekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLEtBRmQ7QUFHRUMsV0FBUyxFQUFFLFFBSGI7QUFJRUMsT0FBSyxFQUFFLHVCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBUnlCLEVBZXpCO0FBQ0VKLElBQUUsRUFBRSxDQUROO0FBRUVDLFlBQVUsRUFBRSxRQUZkO0FBR0VDLFdBQVMsRUFBRSxRQUhiO0FBSUVDLE9BQUssRUFBRSxxQkFKVDtBQUtFQyxRQUFNLEVBQUU7QUFMVixDQWZ5QixFQXNCekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLFFBRmQ7QUFHRUMsV0FBUyxFQUFFLE9BSGI7QUFJRUMsT0FBSyxFQUFFLHVCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBdEJ5QixFQTZCekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLE9BRmQ7QUFHRUMsV0FBUyxFQUFFLFVBSGI7QUFJRUMsT0FBSyxFQUFFLHdCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBN0J5QixFQW9DekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLE9BRmQ7QUFHRUMsV0FBUyxFQUFFLE1BSGI7QUFJRUMsT0FBSyxFQUFFLHlCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBcEN5QixFQTJDekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLE9BRmQ7QUFHRUMsV0FBUyxFQUFFLE1BSGI7QUFJRUMsT0FBSyxFQUFFLGlCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBM0N5QixFQWtEekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLFNBRmQ7QUFHRUMsV0FBUyxFQUFFLFFBSGI7QUFJRUMsT0FBSyxFQUFFLGlCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBbER5QixFQXlEekI7QUFDRUosSUFBRSxFQUFFLENBRE47QUFFRUMsWUFBVSxFQUFFLE1BRmQ7QUFHRUMsV0FBUyxFQUFFLFFBSGI7QUFJRUMsT0FBSyxFQUFFLG1CQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBekR5QixFQWdFekI7QUFDRUosSUFBRSxFQUFFLEVBRE47QUFFRUMsWUFBVSxFQUFFLFFBRmQ7QUFHRUMsV0FBUyxFQUFFLFFBSGI7QUFJRUMsT0FBSyxFQUFFLHFCQUpUO0FBS0VDLFFBQU0sRUFBRTtBQUxWLENBaEV5QixDQUEzQjs7QUF5RUEsSUFBTUMsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ0MsS0FBRDtBQUFBLFNBQ1osSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBYTtBQUN2QkMsY0FBVSxDQUFDLFlBQU07QUFDZkQsYUFBTyxDQUFDLElBQUQsQ0FBUDtBQUNELEtBRlMsRUFFUEYsS0FGTyxDQUFWO0FBR0QsR0FKRCxDQURZO0FBQUEsQ0FBZDs7QUFlQSxTQUFTSSxNQUFULENBQW1CQyxHQUFuQixFQUFnQztBQUFBLGtCQUNGQywrQ0FBUSxDQUlqQztBQUNEQyxXQUFPLEVBQUUsS0FEUjtBQUVEQyxTQUFLLEVBQUVDLFNBRk47QUFHREMsUUFBSSxFQUFFO0FBSEwsR0FKaUMsQ0FETjtBQUFBO0FBQUEsTUFDdkJDLE1BRHVCO0FBQUEsTUFDZkMsU0FEZTs7QUFBQSxNQVd0QkwsT0FYc0IsR0FXR0ksTUFYSCxDQVd0QkosT0FYc0I7QUFBQSxNQVdiQyxLQVhhLEdBV0dHLE1BWEgsQ0FXYkgsS0FYYTtBQUFBLE1BV05FLElBWE0sR0FXR0MsTUFYSCxDQVdORCxJQVhNO0FBYTlCRyxrREFBUyxDQUFDLFlBQU07QUFDZEQsYUFBUyxpQ0FDSkQsTUFESTtBQUVQSixhQUFPLEVBQUU7QUFGRixPQUFUO0FBS0FSLFNBQUssQ0FBQyxJQUFELENBQUwsQ0FBWWUsSUFBWixDQUFpQixZQUFNO0FBQ3JCRixlQUFTLENBQUM7QUFDUkwsZUFBTyxFQUFFLEtBREQ7QUFFUkMsYUFBSyxFQUFFQyxTQUZDO0FBR1JDLFlBQUksRUFBRWpCO0FBSEUsT0FBRCxDQUFUO0FBS0QsS0FORDtBQU9ELEdBYlEsRUFhTixDQUFDWSxHQUFELENBYk0sQ0FBVDtBQWVBLFNBQU87QUFDTEssUUFBSSxFQUFKQSxJQURLO0FBRUxILFdBQU8sRUFBUEEsT0FGSztBQUdMQyxTQUFLLEVBQUxBO0FBSEssR0FBUDtBQUtEOztBQUVELFNBQVNPLElBQVQsR0FBZ0I7QUFBQSxnQkFDWVgsTUFBTSxDQUFhLFVBQWIsQ0FEbEI7QUFBQSxNQUNOTSxJQURNLFdBQ05BLElBRE07QUFBQSxNQUNBSCxPQURBLFdBQ0FBLE9BREE7O0FBRWRTLFNBQU8sQ0FBQ0MsR0FBUixDQUFZO0FBQUVQLFFBQUksRUFBSkEsSUFBRjtBQUFRSCxXQUFPLEVBQVBBO0FBQVIsR0FBWjtBQUNBLE1BQUlBLE9BQU8sSUFBSSxDQUFDRyxJQUFoQixFQUFzQixvQkFBTywyRUFBUDtBQUV0QixzQkFDRSwyRUFDRSw2REFDR0EsSUFBSSxDQUFDUSxHQUFMLENBQVMsVUFBQ0MsQ0FBRDtBQUFBLHdCQUNSO0FBQUksU0FBRyxFQUFFQSxDQUFDLENBQUN6QjtBQUFYLG9CQUNFLGlEQUFDLGtEQUFEO0FBQU0sUUFBRSxhQUFNeUIsQ0FBQyxDQUFDekIsRUFBUjtBQUFSLE9BQXVCeUIsQ0FBQyxDQUFDdEIsS0FBekIsQ0FERixDQURRO0FBQUEsR0FBVCxDQURILENBREYsQ0FERjtBQVdEOztBQUVELFNBQVN1QixNQUFULEdBQWtCO0FBQUEsbUJBQ0RDLDJEQUFTLEVBRFI7QUFBQSxNQUNSM0IsRUFEUSxjQUNSQSxFQURRLEVBRWhCOzs7QUFFQSxzQkFDRSwyRUFDRSw2REFBS0EsRUFBTCxDQURGLENBREY7QUFLRDs7QUFFRCxTQUFTNEIsR0FBVCxHQUFlO0FBQ2Isc0JBQ0UsaURBQUMsMkRBQUQscUJBQ0UsMkVBQ0UsMEVBQ0UsMEVBQ0UsaURBQUMsa0RBQUQ7QUFBTSxNQUFFLEVBQUM7QUFBVCxZQURGLENBREYsQ0FERixlQU9FLDREQVBGLGVBU0UsaURBQUMsb0RBQUQscUJBQ0UsaURBQUMsbURBQUQ7QUFBTyxTQUFLLE1BQVo7QUFBYSxRQUFJLEVBQUM7QUFBbEIsa0JBQ0UsaURBQUMsSUFBRCxPQURGLENBREYsZUFJRSxpREFBQyxtREFBRDtBQUFPLFFBQUksRUFBQztBQUFaLGtCQUNFLGlEQUFDLE1BQUQsT0FERixDQUpGLENBVEYsQ0FERixDQURGO0FBc0JEOztBQUVELGlFQUFlQSxHQUFmLEU7Ozs7Ozs7Ozs7V0M1TEEsb0QiLCJmaWxlIjoiYjVjNGI4Zi1tYWluLXdwcy1obXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyLFxuICBTd2l0Y2gsXG4gIFJvdXRlLFxuICBMaW5rLFxuICB1c2VQYXJhbXMsXG59IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5pbXBvcnQgdGVzdCBmcm9tICcuLi9zcmMvaW5kZXgnO1xuXG5jb25zdCBNT0NLX0RBVEE6IHVua25vd24gPSBbXG4gIHtcbiAgICBpZDogMSxcbiAgICBmaXJzdF9uYW1lOiAnUnVwcmVjaHQnLFxuICAgIGxhc3RfbmFtZTogJ0ZldGhlcnN0b24nLFxuICAgIGVtYWlsOiAncmZldGhlcnN0b24wQGdyYXZhdGFyLmNvbScsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogMixcbiAgICBmaXJzdF9uYW1lOiAnS2V2JyxcbiAgICBsYXN0X25hbWU6ICdTZWFtb24nLFxuICAgIGVtYWlsOiAna3NlYW1vbjFAc3ltYW50ZWMuY29tJyxcbiAgICBnZW5kZXI6ICdNYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiAzLFxuICAgIGZpcnN0X25hbWU6ICdKYW5pbmUnLFxuICAgIGxhc3RfbmFtZTogJ0JvZmZleScsXG4gICAgZW1haWw6ICdqYm9mZmV5MkByYW1ibGVyLnJ1JyxcbiAgICBnZW5kZXI6ICdGZW1hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDQsXG4gICAgZmlyc3RfbmFtZTogJ0F1ZHJleScsXG4gICAgbGFzdF9uYW1lOiAnTmllc3MnLFxuICAgIGVtYWlsOiAnYW5pZXNzM0B3b3JkcHJlc3Mub3JnJyxcbiAgICBnZW5kZXI6ICdGZW1hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDUsXG4gICAgZmlyc3RfbmFtZTogJ0VtbWl0JyxcbiAgICBsYXN0X25hbWU6ICdNY0dpZmZpZScsXG4gICAgZW1haWw6ICdlbWNnaWZmaWU0QGJlaGFuY2UubmV0JyxcbiAgICBnZW5kZXI6ICdNYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiA2LFxuICAgIGZpcnN0X25hbWU6ICdMeWRvbicsXG4gICAgbGFzdF9uYW1lOiAnS2lrZScsXG4gICAgZW1haWw6ICdsa2lrZTVAZG9tYWlubWFya2V0LmNvbScsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogNyxcbiAgICBmaXJzdF9uYW1lOiAnUmljaHknLFxuICAgIGxhc3RfbmFtZTogJ1dhbm4nLFxuICAgIGVtYWlsOiAncndhbm42QGRtb3oub3JnJyxcbiAgICBnZW5kZXI6ICdNYWxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiA4LFxuICAgIGZpcnN0X25hbWU6ICdLbGFyaWthJyxcbiAgICBsYXN0X25hbWU6ICdTYXlub3InLFxuICAgIGVtYWlsOiAna3NheW5vcjdAdmEuZ292JyxcbiAgICBnZW5kZXI6ICdGZW1hbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6IDksXG4gICAgZmlyc3RfbmFtZTogJ05laWwnLFxuICAgIGxhc3RfbmFtZTogJ0NvcmxleScsXG4gICAgZW1haWw6ICduY29ybGV5OEB1Y296LmNvbScsXG4gICAgZ2VuZGVyOiAnTWFsZScsXG4gIH0sXG4gIHtcbiAgICBpZDogMTAsXG4gICAgZmlyc3RfbmFtZTogJ0thcm9sYScsXG4gICAgbGFzdF9uYW1lOiAnTWFjaGFuJyxcbiAgICBlbWFpbDogJ2ttYWNoYW45QGpvb21sYS5vcmcnLFxuICAgIGdlbmRlcjogJ0ZlbWFsZScsXG4gIH0sXG5dO1xuXG5jb25zdCBzbGVlcCA9IChkZWxheTogbnVtYmVyKSA9PlxuICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICB9LCBkZWxheSk7XG4gIH0pO1xuXG50eXBlIExpc3REYXRhID0ge1xuICBpZDogbnVtYmVyO1xuICBmaXJzdF9uYW1lOiBzdHJpbmc7XG4gIGxhc3RfbmFtZTogc3RyaW5nO1xuICBlbWFpbDogc3RyaW5nO1xuICBnZW5kZXI6IHN0cmluZztcbn07XG5cbmZ1bmN0aW9uIHVzZUdldDxUPih1cmw6IHN0cmluZykge1xuICBjb25zdCBbcmVzdWx0LCBzZXRSZXN1bHRdID0gdXNlU3RhdGU8e1xuICAgIGxvYWRpbmc6IGJvb2xlYW47XG4gICAgZXJyb3I6IHVuZGVmaW5lZCB8IEVycm9yO1xuICAgIGRhdGE6IFQgfCBudWxsO1xuICB9Pih7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgZXJyb3I6IHVuZGVmaW5lZCxcbiAgICBkYXRhOiBudWxsLFxuICB9KTtcblxuICBjb25zdCB7IGxvYWRpbmcsIGVycm9yLCBkYXRhIH0gPSByZXN1bHQ7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRSZXN1bHQoe1xuICAgICAgLi4ucmVzdWx0LFxuICAgICAgbG9hZGluZzogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHNsZWVwKDEwMDApLnRoZW4oKCkgPT4ge1xuICAgICAgc2V0UmVzdWx0KHtcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgIGVycm9yOiB1bmRlZmluZWQsXG4gICAgICAgIGRhdGE6IE1PQ0tfREFUQSBhcyBULFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0sIFt1cmxdKTtcblxuICByZXR1cm4ge1xuICAgIGRhdGEsXG4gICAgbG9hZGluZyxcbiAgICBlcnJvcixcbiAgfTtcbn1cblxuZnVuY3Rpb24gSG9tZSgpIHtcbiAgY29uc3QgeyBkYXRhLCBsb2FkaW5nIH0gPSB1c2VHZXQ8TGlzdERhdGFbXT4oJy9nZXRMaXN0Jyk7XG4gIGNvbnNvbGUubG9nKHsgZGF0YSwgbG9hZGluZyB9KTtcbiAgaWYgKGxvYWRpbmcgfHwgIWRhdGEpIHJldHVybiA8ZGl2PkxvYWRpbmcuLi48L2Rpdj47XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHVsPlxuICAgICAgICB7ZGF0YS5tYXAoKGQpID0+IChcbiAgICAgICAgICA8bGkga2V5PXtkLmlkfT5cbiAgICAgICAgICAgIDxMaW5rIHRvPXtgLyR7ZC5pZH1gfT57ZC5lbWFpbH08L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgIDwvZGl2PlxuICApO1xufVxuXG5mdW5jdGlvbiBEZXRhaWwoKSB7XG4gIGNvbnN0IHsgaWQgfSA9IHVzZVBhcmFtczx7IGlkOiBzdHJpbmcgfT4oKTtcbiAgLy8gY29uc3QgeyBkYXRhLCBsb2FkaW5nIH0gPSB1c2VHZXQ8TGlzdERhdGFbXT4oJy9nZXREZXRhaWwnKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDI+e2lkfTwvaDI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIEFwcCgpIHtcbiAgcmV0dXJuIChcbiAgICA8Um91dGVyPlxuICAgICAgPGRpdj5cbiAgICAgICAgPHVsPlxuICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgIDxMaW5rIHRvPVwiL1wiPkhvbWU8L0xpbms+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgPC91bD5cblxuICAgICAgICA8aHIgLz5cblxuICAgICAgICA8U3dpdGNoPlxuICAgICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiPlxuICAgICAgICAgICAgPEhvbWUgLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiLzppZFwiPlxuICAgICAgICAgICAgPERldGFpbCAvPlxuICAgICAgICAgIDwvUm91dGU+XG4gICAgICAgIDwvU3dpdGNoPlxuICAgICAgPC9kaXY+XG4gICAgPC9Sb3V0ZXI+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDtcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IFwiYmRmYmEyMjkyOTNkMjgwMWI5Y2ZcIiJdLCJzb3VyY2VSb290IjoiIn0=