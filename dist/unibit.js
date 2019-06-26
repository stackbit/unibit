#!/usr/bin/env node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dist/scripts/unibit.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/loaders/base-loader.js":
/*!*************************************!*\
  !*** ./dist/loaders/base-loader.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _jsYaml = _interopRequireDefault(__webpack_require__(/*! js-yaml */ "js-yaml"));

var _moment = _interopRequireDefault(__webpack_require__(/*! moment */ "moment"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

var _site = _interopRequireDefault(__webpack_require__(/*! ../models/site */ "./dist/models/site.js"));

var _consts = _interopRequireDefault(__webpack_require__(/*! ./consts */ "./dist/loaders/consts.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseLoader =
/*#__PURE__*/
function () {
  function BaseLoader(options) {
    _classCallCheck(this, BaseLoader);

    this.inputDir = _lodash.default.get(options, 'inputDir');
    this.assert(this.inputDir, "options.inputDir must be specified");
    this.assert(_fs.default.existsSync(_path.default.resolve(this.inputDir)), "input directory '".concat(this.inputDir, "' does not exist"));

    var stackbitYamlPath = _utils.default.getFirstExistingFileSync(_consts.default.STACKBIT_YAML_NAMES, this.inputDir);

    this.stackbitYamlFileName = _path.default.basename(stackbitYamlPath);
    this.stackbitYaml = this.loadStackbitYaml(stackbitYamlPath);
    options = _lodash.default.assign({}, _lodash.default.cloneDeep(this.ssgConsts()), _lodash.default.pick(this.stackbitYaml, ['ssgName', 'buildCommand', 'publishDir', 'injectLocations', 'dataDir', 'pagesDir', 'pageTemplateKey', 'templatesDir', 'componentsDir']), options);
    this.ssgName = _lodash.default.get(options, 'ssgName');
    this.configFilePath = _lodash.default.get(options, 'configFilePath');
    this.dataDir = _lodash.default.get(options, 'dataDir');
    this.pagesDir = _lodash.default.get(options, 'pagesDir');
    this.staticDir = _lodash.default.get(options, 'staticDir');
    this.pageTemplateKey = _lodash.default.get(options, 'pageTemplateKey');
    this.templatesDir = _path.default.resolve(this.inputDir, _lodash.default.get(options, 'templatesDir'));
    this.componentsDir = _path.default.resolve(this.inputDir, _lodash.default.get(options, 'componentsDir'));
    this.publishDir = _lodash.default.get(options, 'publishDir');
    this.buildCommand = _lodash.default.get(options, 'buildCommand');
    this.injectLocations = _lodash.default.get(options, 'injectLocations');

    _lodash.default.defaults(this.stackbitYaml, {
      ssgName: this.ssgName,
      publishDir: this.publishDir,
      buildCommand: this.buildCommand,
      injectLocations: this.injectLocations
    });
  }

  _createClass(BaseLoader, [{
    key: "fail",
    value: function fail(message) {
      throw new Error("[".concat(this.constructor.name, "] ").concat(message));
    }
  }, {
    key: "assert",
    value: function assert(value, message) {
      if (!value) {
        this.fail(message);
      }
    }
  }, {
    key: "ssgConsts",
    value: function ssgConsts() {
      this.fail("ssgConsts method is not implemented");
    }
    /**
     * @return {Site}
     */

  }, {
    key: "loadSite",
    value: function loadSite() {
      console.log("[".concat(this.constructor.name, "] loading site from ").concat(_path.default.resolve(this.inputDir)));
      var data = {
        absPath: this.inputDir,
        ssgName: this.ssgName,
        staticDir: this.staticDir,
        dataDir: this.dataDir,
        pagesDir: this.pagesDir,
        pageTemplateKey: this.pageTemplateKey,
        config: this.loadConfig(),
        stackbitYamlFileName: this.stackbitYamlFileName,
        stackbitYaml: this.stackbitYaml,
        dataFiles: this.loadData(),
        templates: this.loadTemplates(),
        components: this.loadComponents(),
        pageTree: this.loadPages()
      };

      var _this$createMenus = this.createMenus(data),
          menus = _this$createMenus.menus,
          menuNames = _this$createMenus.menuNames,
          menusByName = _this$createMenus.menusByName;

      data.menus = menus;
      data.menuNames = menuNames;
      data.menusByName = menusByName;
      return new _site.default(data);
    }
  }, {
    key: "loadConfig",
    value: function loadConfig() {
      var absPath = _path.default.resolve(this.inputDir, this.configFilePath);

      console.log("[".concat(this.constructor.name, "] loading config from: ").concat(absPath));

      if (!_fs.default.existsSync(absPath)) {
        this.fail("".concat(absPath, " does not exist"));
      }

      return {
        absPath: absPath,
        relPath: this.configFilePath,
        data: _utils.default.parseFileSync(absPath)
      };
    }
  }, {
    key: "loadStackbitYaml",
    value: function loadStackbitYaml(stackbitYamlPath) {
      if (!stackbitYamlPath) {
        return {};
      }

      console.log("[".concat(this.constructor.name, "] loading content model from: ").concat(stackbitYamlPath));
      return _utils.default.parseFileSync(stackbitYamlPath);
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var absDataDir = _path.default.resolve(this.inputDir, this.dataDir);

      if (!_fs.default.existsSync(absDataDir)) {
        return [];
      }

      console.log("[".concat(this.constructor.name, "] loading data from: ").concat(absDataDir));
      var dataFiles = [];

      var files = _utils.default.readDirRecSync(absDataDir);

      _lodash.default.forEach(files, function (filePath) {
        var relFilePath = _path.default.relative(absDataDir, filePath);

        var pathObject = _path.default.parse(relFilePath);

        var data = _utils.default.parseFileSync(filePath);

        dataFiles.push({
          absPath: filePath,
          relPath: relFilePath,
          basename: pathObject.base,
          filename: pathObject.name,
          data: data
        });
      });

      return dataFiles;
    }
  }, {
    key: "loadTemplates",
    value: function loadTemplates() {
      console.log("[".concat(this.constructor.name, "] loading templates from: ").concat(this.templatesDir));
      return this.loadFiles(this.templatesDir);
    }
  }, {
    key: "loadComponents",
    value: function loadComponents() {
      console.log("[".concat(this.constructor.name, "] loading templates from: ").concat(this.componentsDir));
      return this.loadFiles(this.componentsDir);
    }
  }, {
    key: "loadFiles",
    value: function loadFiles(dirPath) {
      var _this = this;

      var files = [];

      _fs.default.readdirSync(dirPath).forEach(function (fileName) {
        var filePath = _path.default.resolve(dirPath, fileName);

        var fileStat = _fs.default.statSync(filePath);

        if (fileStat.isFile()) {
          var component = _this.loadFile(filePath, dirPath);

          files.push(component);
        } else {
          _this.fail("directory '".concat(dirPath, "' must include files only"));
        }
      });

      return files;
    }
  }, {
    key: "loadFile",
    value: function loadFile(filePath, baseDir) {
      var data = _fs.default.readFileSync(filePath, 'utf8');

      var pathObject = _path.default.parse(filePath);

      return {
        absPath: filePath,
        relPath: _path.default.relative(baseDir, filePath),
        basename: pathObject.base,
        filename: pathObject.name,
        data: data.trim()
      };
    }
  }, {
    key: "loadPages",
    value: function loadPages() {
      var absPagesDir = _path.default.resolve(this.inputDir, this.pagesDir);

      console.log("[".concat(this.constructor.name, "] loading pages from: ").concat(absPagesDir));
      return this.processPageDir(absPagesDir);
    }
  }, {
    key: "processPageDir",
    value: function processPageDir(pageDir) {
      var _this2 = this;

      var absPagesDir = _path.default.resolve(this.inputDir, this.pagesDir);

      var pageTree = {
        path: _path.default.relative(absPagesDir, pageDir),
        pages: [],
        folders: []
      };

      _fs.default.readdirSync(pageDir).forEach(function (fileName) {
        var filePath = _path.default.resolve(pageDir, fileName);

        var fileStat = _fs.default.statSync(filePath);

        if (fileStat.isDirectory()) {
          var folder = _this2.processPageDir(filePath);

          pageTree.folders.push(folder); // TODO: what if folder name is a number, add folderMap instead
          // TODO: remove in v0.3

          pageTree.folders[fileName] = folder;
        } else if (fileStat.isFile()) {
          var page = _this2.parsePageForFilePath(filePath);

          if (page) {
            pageTree.pages.push(page); // TODO: what if name is a number, add pageMap instead
            // TODO: remove in v0.3
            // pageTree.pages[page.filename] = page;
          }
        } else {
          _this2.fail("page file type is not supported: ".concat(filePath));
        }
      });

      return pageTree;
    }
  }, {
    key: "parsePageForFilePath",
    value: function parsePageForFilePath(filePath) {
      var ext = _path.default.extname(filePath);

      if (ext !== '.md') {
        return null;
      }

      var data = _fs.default.readFileSync(filePath, 'utf8');

      if (!data.startsWith('---\n')) {
        return null;
      }

      var index = data.indexOf('\n---\n');

      if (index === -1) {
        return null;
      }

      var absPagesDir = _path.default.resolve(this.inputDir, this.pagesDir);

      var pathObject = _path.default.parse(filePath);

      var relDir = _path.default.relative(absPagesDir, pathObject.dir);

      var yamlData = data.substring(4, index);

      var frontmatter = _jsYaml.default.safeLoad(yamlData, {
        schema: _jsYaml.default.JSON_SCHEMA
      });

      var markdown = data.substring(index + 5);
      var date;

      if (frontmatter.date) {
        date = new Date((0, _moment.default)(frontmatter.date).toISOString());
      } else {
        date = new Date(_fs.default.statSync(filePath).birthtimeMs);
      } // TODO: change spec to use frontmatter and remove frontmatter assign


      return Object.assign({}, frontmatter, {
        absPath: filePath,
        relPath: _path.default.relative(absPagesDir, filePath),
        absDir: pathObject.dir,
        relDir: relDir,
        url: _path.default.join(relDir, pathObject.name + '.html'),
        basename: pathObject.base,
        filename: pathObject.name,
        date: date,
        params: frontmatter,
        frontmatter: frontmatter,
        markdown: markdown
      });
    }
  }, {
    key: "createMenus",
    value: function createMenus(data) {
      var siteMenuItems = this.getSiteMenus(data);
      var pageMenuItems = this.getPageMenus(data);

      var menuItems = _lodash.default.chain(siteMenuItems).concat(pageMenuItems).compact().value();

      return this.createMenusFromMenuItems(menuItems);
    }
  }, {
    key: "getSiteMenus",
    value: function getSiteMenus(data) {
      return null;
    }
  }, {
    key: "getPageMenus",
    value: function getPageMenus(data) {
      var _this3 = this;

      var pages = _utils.default.flattenPageTree(data.pageTree);

      var pageMenuItems = [];

      _lodash.default.forEach(pages, function (page) {
        pageMenuItems = pageMenuItems.concat(_this3.getPageMenuItems(page));
      });

      return pageMenuItems;
    }
  }, {
    key: "getPageMenuItems",
    value: function getPageMenuItems(page) {
      var ssgConsts = this.ssgConsts();

      var menus = _lodash.default.get(page, ssgConsts.pageMenusKey, null);

      if (!menus || !_lodash.default.isPlainObject(menus)) {
        return [];
      }

      return _lodash.default.map(menus, function (menu, menuName) {
        return {
          menu: menuName,
          title: _lodash.default.get(menu, 'title', page.title),
          url: page.url,
          weight: _lodash.default.toNumber(_lodash.default.get(menu, 'weight', page.date.getTime())),
          identifier: _lodash.default.get(menu, 'identifier', page.url),
          page: page
        };
      });
    }
  }, {
    key: "createMenusFromMenuItems",
    value: function createMenusFromMenuItems(menuItems) {
      var _this4 = this;

      var rootMenus = {};
      var menusByName = {};
      var menuNames = [];

      _lodash.default.forEach(menuItems, function (menuItem) {
        var menuName = menuItem.menu;

        var identifier = _lodash.default.get(menuItem, 'identifier');

        var menu;

        if (!_lodash.default.includes(menuNames, menuName)) {
          menuNames.push(menuName);
        }

        if (!_lodash.default.has(menusByName, menuName)) {
          menu = [];
          rootMenus[menuName] = menu;
          menusByName[menuName] = menu;
        } else {
          menu = menusByName[menuName];
        }

        menuItem.children = []; // In case a menu item with a parent menu was defined before the item
        // with the menu identifier, copy that menu to menu item's children.

        if (_lodash.default.has(menusByName, identifier)) {
          if (_lodash.default.has(rootMenus, identifier)) {
            menuItem.children = rootMenus[identifier];
            delete rootMenus[identifier];
          } else {
            _this4.fail("A menu item identifier must be unique");
          }
        }

        menusByName[identifier] = menuItem.children;

        if (_lodash.default.has(menuItem, 'weight')) {
          var index = _lodash.default.sortedLastIndexBy(menu, menuItem, 'weight');

          menu.splice(index, 0, menuItem);
        } else {
          menu.push(menuItem);
        }
      });

      return {
        menus: rootMenus,
        menusByName: menusByName,
        menuNames: menuNames
      };
    }
  }]);

  return BaseLoader;
}();

exports.default = BaseLoader;
//# sourceMappingURL=base-loader.js.map

/***/ }),

/***/ "./dist/loaders/consts.js":
/*!********************************!*\
  !*** ./dist/loaders/consts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  STACKBIT_YAML: 'stackbit.yaml',
  STACKBIT_YAML_NAMES: ['stackbit.yaml', 'stackbit.yml', 'content-model.yml']
};
exports.default = _default;
//# sourceMappingURL=consts.js.map

/***/ }),

/***/ "./dist/loaders/gatsby-loader.js":
/*!***************************************!*\
  !*** ./dist/loaders/gatsby-loader.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GatsbyLoader =
/*#__PURE__*/
function (_BaseLoader) {
  _inherits(GatsbyLoader, _BaseLoader);

  function GatsbyLoader() {
    _classCallCheck(this, GatsbyLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(GatsbyLoader).apply(this, arguments));
  }

  _createClass(GatsbyLoader, [{
    key: "ssgConsts",
    value: function ssgConsts() {
      return _ssgConsts.GATSBY;
    }
  }]);

  return GatsbyLoader;
}(_baseLoader.default);

exports.default = GatsbyLoader;
//# sourceMappingURL=gatsby-loader.js.map

/***/ }),

/***/ "./dist/loaders/hugo-loader.js":
/*!*************************************!*\
  !*** ./dist/loaders/hugo-loader.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HugoLoader =
/*#__PURE__*/
function (_BaseLoader) {
  _inherits(HugoLoader, _BaseLoader);

  function HugoLoader() {
    _classCallCheck(this, HugoLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(HugoLoader).apply(this, arguments));
  }

  _createClass(HugoLoader, [{
    key: "ssgConsts",
    value: function ssgConsts() {
      return _ssgConsts.HUGO;
    }
  }]);

  return HugoLoader;
}(_baseLoader.default);

exports.default = HugoLoader;
//# sourceMappingURL=hugo-loader.js.map

/***/ }),

/***/ "./dist/loaders/index.js":
/*!*******************************!*\
  !*** ./dist/loaders/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSite = loadSite;
Object.defineProperty(exports, "UnibitLoader", {
  enumerable: true,
  get: function get() {
    return _unibitLoader.default;
  }
});
Object.defineProperty(exports, "JekyllLoader", {
  enumerable: true,
  get: function get() {
    return _jekyllLoader.default;
  }
});
Object.defineProperty(exports, "HugoLoader", {
  enumerable: true,
  get: function get() {
    return _hugoLoader.default;
  }
});

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _unibitLoader = _interopRequireDefault(__webpack_require__(/*! ./unibit-loader */ "./dist/loaders/unibit-loader.js"));

var _jekyllLoader = _interopRequireDefault(__webpack_require__(/*! ./jekyll-loader */ "./dist/loaders/jekyll-loader.js"));

var _hugoLoader = _interopRequireDefault(__webpack_require__(/*! ./hugo-loader */ "./dist/loaders/hugo-loader.js"));

var _gatsbyLoader = _interopRequireDefault(__webpack_require__(/*! ./gatsby-loader */ "./dist/loaders/gatsby-loader.js"));

var _consts = _interopRequireDefault(__webpack_require__(/*! ./consts */ "./dist/loaders/consts.js"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaderMap = {
  unibit: _unibitLoader.default,
  jekyll: _jekyllLoader.default,
  hugo: _hugoLoader.default,
  gatsby: _gatsbyLoader.default
};
/**
 * @param options
 * @return {Site}
 */

function loadSite(options) {
  var inputDir = _lodash.default.get(options, 'inputDir');

  var stackbitYamlPath = _utils.default.getFirstExistingFileSync(_consts.default.STACKBIT_YAML_NAMES, inputDir);

  if (!stackbitYamlPath) {
    throw new Error("can not load site, file not found: ".concat(_consts.default.STACKBIT_YAML));
  }

  var stackbitYaml = _utils.default.parseFileSync(stackbitYamlPath);

  var ssgName = _lodash.default.get(stackbitYaml, 'ssgName', 'unibit');

  if (!ssgName) {
    throw new Error("can not load site, ssgName must be defined in: ".concat(stackbitYamlPath));
  }

  var Loader = loaderForSSGName(ssgName);
  var loader = new Loader({
    inputDir: options.inputDir
  });
  return loader.loadSite();
}

function loaderForSSGName(ssgName) {
  if (!_lodash.default.has(loaderMap, ssgName)) {
    throw new Error("loader for ".concat(ssgName, " is not implemented"));
  }

  return _lodash.default.get(loaderMap, ssgName);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/loaders/jekyll-loader.js":
/*!***************************************!*\
  !*** ./dist/loaders/jekyll-loader.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var JekyllLoader =
/*#__PURE__*/
function (_BaseLoader) {
  _inherits(JekyllLoader, _BaseLoader);

  function JekyllLoader() {
    _classCallCheck(this, JekyllLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(JekyllLoader).apply(this, arguments));
  }

  _createClass(JekyllLoader, [{
    key: "ssgConsts",
    value: function ssgConsts() {
      return _ssgConsts.JEKYLL;
    }
  }]);

  return JekyllLoader;
}(_baseLoader.default);

exports.default = JekyllLoader;
//# sourceMappingURL=jekyll-loader.js.map

/***/ }),

/***/ "./dist/loaders/unibit-loader.js":
/*!***************************************!*\
  !*** ./dist/loaders/unibit-loader.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ../unibit/supporting-files/base.html */ "./dist/unibit/supporting-files/base.html.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UnibitLoader =
/*#__PURE__*/
function (_BaseLoader) {
  _inherits(UnibitLoader, _BaseLoader);

  function UnibitLoader() {
    _classCallCheck(this, UnibitLoader);

    return _possibleConstructorReturn(this, _getPrototypeOf(UnibitLoader).apply(this, arguments));
  }

  _createClass(UnibitLoader, [{
    key: "ssgConsts",
    value: function ssgConsts() {
      return _ssgConsts.UNIBIT;
    }
  }, {
    key: "loadTemplates",
    value: function loadTemplates() {
      var templates = _get(_getPrototypeOf(UnibitLoader.prototype), "loadTemplates", this).call(this);

      var baseLayoutFilePath = _path.default.resolve(this.templatesDir, _ssgConsts.BASE_TEMPLATE_FILE_NAME);

      var pathObject = _path.default.parse(baseLayoutFilePath);

      templates.push({
        absPath: baseLayoutFilePath,
        relPath: _path.default.relative(this.templatesDir, baseLayoutFilePath),
        basename: pathObject.base,
        filename: pathObject.name,
        data: _base.default
      });
      return templates;
    }
  }, {
    key: "getSiteMenus",
    value: function getSiteMenus(data) {
      var _this = this;

      var menus = _lodash.default.get(data.config.data, 'menus', null);

      if (!menus || !_lodash.default.isPlainObject(menus)) {
        return null;
      }

      return _lodash.default.flatMap(menus, function (menu, menuName) {
        return _lodash.default.map(menu, function (item, index) {
          var url = _lodash.default.get(item, 'url');

          var title = _lodash.default.get(item, 'title');

          var identifier = _lodash.default.get(item, 'identifier', "".concat(menuName, "_").concat(index + 1));

          var weight = _lodash.default.get(item, 'weight', null);

          _this.assert(url, "menu item defined in config file must have \"url\" field");

          _this.assert(title, "menu item defined in config file must have \"title\" field");

          _this.assert(identifier, "menu item defined in config file must have \"identifier\" field");

          var menuItem = {
            menu: menuName,
            title: title,
            url: url,
            identifier: identifier
          };

          if (weight !== null) {
            menuItem.weight = _lodash.default.toNumber(weight);
          }

          return menuItem;
        });
      });
    }
  }]);

  return UnibitLoader;
}(_baseLoader.default);

exports.default = UnibitLoader;
//# sourceMappingURL=unibit-loader.js.map

/***/ }),

/***/ "./dist/models/site.js":
/*!*****************************!*\
  !*** ./dist/models/site.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var siteProps = ['absPath', 'ssgName', 'staticDir', 'dataDir', 'pagesDir', 'pageTemplateKey', 'config', 'stackbitYamlFileName', 'stackbitYaml', 'dataFiles', 'templates', 'components', 'pageTree', 'menus', 'menuNames', 'menusByName'];
/**
 * @class Site
 *
 * @property {string} absPath
 * @property {string} ssgName
 * @property {string} staticDir
 * @property {string} dataDir
 * @property {string} pagesDir
 * @property {string} pageTemplateKey
 * @property {object} config
 * @property {string} stackbitYamlFileName
 * @property {object} stackbitYaml
 * @property {array} dataFiles
 * @property {array} templates
 * @property {array} components
 * @property {object} pageTree
 * @property {object} menus
 * @property {array} menuNames
 * @property {object} menusByName
 * @property {array} pages
 * @property {object} data
 *
 * @method clone
 */

var Site =
/*#__PURE__*/
function () {
  function Site(data) {
    var _this = this;

    _classCallCheck(this, Site);

    data = _lodash.default.pick(data, siteProps);
    data = _lodash.default.cloneDeep(data);
    this.addComputedProperties(data);

    _lodash.default.keys(data).forEach(function (key) {
      _this[key] = data[key];
    });

    _utils.default.deepFreeze(this);
  }

  _createClass(Site, [{
    key: "clone",
    value: function clone(options) {
      var data = _lodash.default.pick(this, siteProps);

      data = _lodash.default.assign({}, data, _lodash.default.pick(options, siteProps));
      return new Site(data);
    }
  }, {
    key: "addComputedProperties",
    value: function addComputedProperties(siteData) {
      siteData.pages = _utils.default.flattenPageTree(siteData.pageTree);
      siteData.data = this.mergeData(siteData.dataFiles);
    }
  }, {
    key: "mergeData",
    value: function mergeData(dataFiles) {
      var data = {};

      _lodash.default.forEach(dataFiles, function (dataFile) {
        var pathObject = _path.default.parse(dataFile.relPath);

        var props = _lodash.default.chain(pathObject.dir).split(_path.default.sep).concat(pathObject.name).compact().value();

        _lodash.default.set(data, props, dataFile.data);
      });

      return data;
    }
  }, {
    key: "clonePageTree",
    value: function clonePageTree(pageTree) {
      var _this2 = this;

      if (!pageTree) {
        return null;
      }

      var pages = [];
      pageTree.pages.forEach(function (page) {
        // let filename = page.filename;
        var clone = _lodash.default.cloneDeep(page);

        pages.push(clone); // pages[filename] = clone;
      });
      var folders = [];
      pageTree.folders.forEach(function (folder) {
        // let folderName = path.relative(pageTree.path, folder.path);
        var clone = _this2.clonePageTree(folder);

        folders.push(clone); // folders[folderName] = clone;
      });
      return {
        path: pageTree.path,
        pages: pages,
        folders: folders
      };
    }
  }]);

  return Site;
}();

exports.default = Site;
//# sourceMappingURL=site.js.map

/***/ }),

/***/ "./dist/scripts/unibit.js":
/*!********************************!*\
  !*** ./dist/scripts/unibit.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _yargs = _interopRequireDefault(__webpack_require__(/*! yargs */ "yargs"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _unibit = _interopRequireDefault(__webpack_require__(/*! ../unibit/unibit */ "./dist/unibit/unibit.js"));

var _validator = _interopRequireDefault(__webpack_require__(/*! ../validator/validator */ "./dist/validator/validator.js"));

var _consoleRenderer = _interopRequireDefault(__webpack_require__(/*! ../validator/console-renderer */ "./dist/validator/console-renderer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputDirOption = {
  alias: 'i',
  describe: 'Unibit site source directory.',
  default: function cws() {
    return process.cwd();
  },
  defaultDescription: 'current working directory'
};

var buildOptions = function buildOptions(yargs) {
  return yargs.options({
    'input-dir': inputDirOption,
    'output-dir': {
      alias: 'o',
      describe: 'Target directory for the generated site.',
      default: function cwsPublic() {
        return _path.default.join(process.cwd(), 'public');
      },
      defaultDescription: '"build" folder inside current working directory'
    },
    'with-banner': {
      describe: 'Show stackbit theme banner.',
      boolean: true,
      default: false,
      defaultDescription: 'Displays the Stackbit theme banner'
    }
  });
};

var argv = _yargs.default.usage('Usage: $0 <command> [options]').command('build', 'Build site', buildOptions).command('develop', 'Develop site', buildOptions).command('validate', 'Validate theme', function (yargs) {
  return yargs.options({
    'input-dir': inputDirOption
  });
}).alias('v', 'version').demandCommand(1, 'You need to specify at least one command').example('$0 build -i path/to/source -o path/to/target', 'Build site from Unibit site located in the "path/to/source" folder and save it in the "path/to/target" folder.').wrap(null).help().argv;

var command = argv._[0];

if (command === 'build' || command === 'develop') {
  var unibit = new _unibit.default({
    inputDir: argv.inputDir,
    outputDir: argv.outputDir,
    withBanner: argv.withBanner,
    watch: command === 'develop'
  });
  unibit.generate();
} else if (command === 'validate') {
  var validator = new _validator.default(argv.inputDir, new _consoleRenderer.default());
  validator.validate();

  if (!validator.isValid()) {
    process.exit(1);
  }
}
//# sourceMappingURL=unibit.js.map

/***/ }),

/***/ "./dist/ssg-converters/consts.js":
/*!***************************************!*\
  !*** ./dist/ssg-converters/consts.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssgConstsForSSGType = ssgConstsForSSGType;
exports.configModelTransformerForSSGType = configModelTransformerForSSGType;
exports.BUILD_SCRIPT = exports.UNIBIT = exports.GATSBY = exports.HUGO = exports.JEKYLL = exports.BODY_TEMPLATE_FILE_NAME = exports.BASE_TEMPLATE_FILE_NAME = exports.POST_BODY_COMPONENT_FILE_NAME = exports.HTML_HEAD_COMPONENT_FILE_NAME = exports.SSG_TYPES = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _configModelTransformer = _interopRequireDefault(__webpack_require__(/*! ./jekyll/config-model-transformer */ "./dist/ssg-converters/jekyll/config-model-transformer.js"));

var _configModelTransformer2 = _interopRequireDefault(__webpack_require__(/*! ./hugo/config-model-transformer */ "./dist/ssg-converters/hugo/config-model-transformer.js"));

var _configModelTransformer3 = _interopRequireDefault(__webpack_require__(/*! ./gatsby/config-model-transformer */ "./dist/ssg-converters/gatsby/config-model-transformer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SSG_TYPES = {
  JEKYLL: 'jekyll',
  HUGO: 'hugo',
  HEXO: 'hexo',
  GATSBY: 'gatsby',
  VUEPRESS: 'vuepress'
};
exports.SSG_TYPES = SSG_TYPES;
var HTML_HEAD_COMPONENT_FILE_NAME = 'html_head.html';
exports.HTML_HEAD_COMPONENT_FILE_NAME = HTML_HEAD_COMPONENT_FILE_NAME;
var POST_BODY_COMPONENT_FILE_NAME = 'post_body.html';
exports.POST_BODY_COMPONENT_FILE_NAME = POST_BODY_COMPONENT_FILE_NAME;
var BASE_TEMPLATE_FILE_NAME = 'base.html';
exports.BASE_TEMPLATE_FILE_NAME = BASE_TEMPLATE_FILE_NAME;
var BODY_TEMPLATE_FILE_NAME = 'body.html';
exports.BODY_TEMPLATE_FILE_NAME = BODY_TEMPLATE_FILE_NAME;
var BUILD_SCRIPT = './ssg-build.sh';
exports.BUILD_SCRIPT = BUILD_SCRIPT;
var JEKYLL = {
  ssgName: SSG_TYPES.JEKYLL,
  supportingFilesDirName: 'jekyll',
  configFilePath: '_config.yml',
  menusDataFilePath: 'menus.yml',
  dataDir: '_data',
  pagesDir: '',
  staticDir: '',
  pageTemplateKey: 'layout',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  templatesDir: '_layouts',
  componentsDir: '_includes',
  publishDir: '_site',
  buildCommand: 'jekyll build',
  menuItemFields: null,
  injectLocations: {
    htmlHead: {
      file: '_layouts/base.html',
      tagName: 'head'
    },
    htmlBody: {
      file: '_layouts/base.html',
      tagName: 'body'
    }
  }
};
exports.JEKYLL = JEKYLL;
var HUGO = {
  ssgName: SSG_TYPES.HUGO,
  version: '0.47',
  supportingFilesDirName: 'hugo',
  configFilePath: 'config.yaml',
  menusDataFilePath: null,
  dataDir: 'data',
  pagesDir: 'content',
  staticDir: 'static',
  pageTemplateKey: 'layout',
  pageMenusKey: 'menu',
  pageMenuTitleKey: 'name',
  templatesDir: 'layouts/_default',
  componentsDir: 'layouts/partials',
  publishDir: 'public',
  buildCommand: 'hugo',
  menuItemFields: [{
    type: 'string',
    name: 'parent',
    label: 'Parent Menu Identifier',
    description: 'The parent of an entry should be the identifier of another entry.'
  }],
  injectLocations: {
    htmlHead: {
      file: 'layouts/_default/baseof.html',
      tagName: 'head'
    },
    htmlBody: {
      file: 'layouts/_default/baseof.html',
      tagName: 'body'
    }
  }
};
exports.HUGO = HUGO;
var GATSBY_SCRIPT_INJECT_TOKEN = '{/* put additional scripts here */}';
var GATSBY_SCRIPT_INJECT_TOKEN_REG_EXP = '\\{\\/\\* put additional scripts here \\*\\/\\}';
var GATSBY = {
  ssgName: SSG_TYPES.GATSBY,
  supportingFilesDirName: 'gatsby',
  configFilePath: 'site-metadata.json',
  menusDataFilePath: 'menus.json',
  dataDir: 'src/data',
  pagesDir: 'src/pages',
  staticDir: 'static',
  pageTemplateKey: 'template',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  templatesDir: 'src/templates',
  componentsDir: 'src/components',
  publishDir: 'public',
  buildCommand: 'gatsby build',
  menuItemFields: null,
  scriptInjectToken: GATSBY_SCRIPT_INJECT_TOKEN,
  injectLocations: {
    htmlHead: {
      file: 'src/components/Layout.js',
      tagName: 'Helmet'
    },
    htmlBody: {
      file: 'gatsby-ssr.js',
      tokens: [GATSBY_SCRIPT_INJECT_TOKEN_REG_EXP],
      tokenIndex: 0,
      location: "replace"
    }
  }
};
exports.GATSBY = GATSBY;
var UNIBIT = {
  ssgName: 'unibit',
  supportingFilesDirName: null,
  configFilePath: 'config.yml',
  menusDataFilePath: null,
  dataDir: 'data',
  pagesDir: 'content',
  staticDir: 'static',
  pageTemplateKey: 'template',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  templatesDir: 'templates',
  componentsDir: 'components',
  publishDir: 'output',
  buildCommand: 'unibit build',
  menuItemFields: null,
  injectLocations: {
    htmlHead: {
      file: 'components/html_head.html'
    },
    htmlBody: {
      file: 'components/post_body.html'
    }
  }
};
exports.UNIBIT = UNIBIT;
var configMap = {
  jekyll: JEKYLL,
  hugo: HUGO,
  gatsby: GATSBY,
  unibit: UNIBIT
};

function ssgConstsForSSGType(ssgType) {
  if (_lodash.default.has(configMap, ssgType)) {
    return _lodash.default.get(configMap, ssgType);
  } else {
    throw new Error("Config for ".concat(ssgType, " is not implemented"));
  }
}

var configTransformerMap = {
  jekyll: _configModelTransformer.default,
  hugo: _configModelTransformer2.default,
  gatsby: _configModelTransformer3.default
};

function configModelTransformerForSSGType(ssgType) {
  if (_lodash.default.has(configTransformerMap, ssgType)) {
    return _lodash.default.get(configTransformerMap, ssgType);
  } else {
    throw new Error("Config transformer for ".concat(ssgType, " is not implemented"));
  }
}
//# sourceMappingURL=consts.js.map

/***/ }),

/***/ "./dist/ssg-converters/gatsby/config-model-transformer.js":
/*!****************************************************************!*\
  !*** ./dist/ssg-converters/gatsby/config-model-transformer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  transformConfigModel: function transformConfigModel(configModel, site, ssgConsts, cmsConsts) {
    if (_lodash.default.has(configModel, 'fields')) {
      configModel.fields.unshift({
        type: 'string',
        name: 'title',
        label: 'Title',
        description: 'Site title',
        required: true
      });
    }
  }
};
exports.default = _default;
//# sourceMappingURL=config-model-transformer.js.map

/***/ }),

/***/ "./dist/ssg-converters/hugo/config-model-transformer.js":
/*!**************************************************************!*\
  !*** ./dist/ssg-converters/hugo/config-model-transformer.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = {
  transformConfigModel: function transformConfigModel(configModel, site, ssgConsts, cmsConsts) {
    if (_lodash.default.has(configModel, 'fields')) {
      configModel.fields = [{
        type: 'string',
        name: 'title',
        label: 'Title',
        description: 'Site title',
        required: true
      }, {
        type: 'string',
        name: 'baseURL',
        label: 'Base URL',
        description: 'Hostname (and path) to the root',
        hidden: true
      }, {
        type: 'object',
        name: 'params',
        label: 'Params',
        description: 'Site parameters',
        required: true,
        fields: configModel.fields
      }].concat(_toConsumableArray(!_lodash.default.isEmpty(site.menus) ? [{
        type: 'site_menus',
        name: ssgConsts.pageMenusKey,
        label: 'Site Menus',
        description: "Menu items not related to a specific page"
      }] : []), [{
        type: 'list',
        name: 'disableKinds',
        label: 'Disable Kinds',
        description: 'Enable disabling of all pages of the specified Kinds.',
        items: {
          type: 'enum',
          options: ['page', 'home', 'section', 'taxonomy', 'taxonomyTerm', 'RSS', 'sitemap', 'robotsTXT', '404']
        },
        hidden: true
      }, {
        type: 'boolean',
        name: 'uglyURLs',
        label: 'Ugly URLs',
        description: 'When enabled, creates URL of the form /filename.html instead of /filename/.',
        hidden: true
      }]);
    }
  }
};
exports.default = _default;
//# sourceMappingURL=config-model-transformer.js.map

/***/ }),

/***/ "./dist/ssg-converters/jekyll/config-model-transformer.js":
/*!****************************************************************!*\
  !*** ./dist/ssg-converters/jekyll/config-model-transformer.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JEKYLL_PLUGIN_FIELDS_MAP = {
  'jekyll-paginate': [{
    type: 'number',
    name: 'paginate',
    label: 'Pagination - Items per page'
  }, {
    type: 'string',
    name: 'paginate_path',
    label: 'Pagination - Path template'
  }],
  'jekyll-sitemap': [{
    type: 'string',
    name: 'url',
    label: 'Full site URL - for Sitemap and SEO'
  }],
  'jekyll-seo-tag': [{
    type: 'string',
    name: 'description',
    label: 'Jekyll SEO - Description'
  }, {
    type: 'string',
    name: 'url',
    label: 'Full site URL - for SEO and Sitemap'
  }, {
    type: 'string',
    name: 'author',
    label: 'Jekyll SEO - Site author'
  }, {
    type: 'object',
    name: 'twitter',
    fields: [{
      type: 'string',
      name: 'username',
      label: 'Twitter Username'
    }, {
      type: 'string',
      name: 'card',
      label: 'Twitter card type'
    }]
  }, {
    type: 'object',
    name: 'facebook',
    fields: [{
      type: 'number',
      name: 'app_id',
      label: 'Facebook App Id',
      description: 'For Facebook insights'
    }, {
      type: 'string',
      name: 'publisher',
      label: 'Facebook publisher id or page url'
    }, {
      type: 'number',
      name: 'admins',
      label: 'Facebook Admin User Id',
      description: 'For Facebook insights'
    }]
  }, {
    type: 'image',
    name: 'logo',
    label: 'Site Logo'
  }, {
    type: 'object',
    name: 'social',
    fields: [{
      type: 'string',
      name: 'name',
      label: 'Name'
    }, {
      type: 'list',
      name: 'links'
    }]
  }, {
    type: 'string',
    name: 'lang',
    label: 'Site Language',
    description: '(e.g. en_US)'
  }]
};
var _default = {
  transformConfigModel: function transformConfigModel(configModel, site, ssgConsts, cmsConsts) {
    if (_lodash.default.has(configModel, 'fields')) {
      pushIfNotExistsByField(configModel.fields, [{
        type: 'string',
        name: 'title',
        label: 'Title',
        description: 'Site title',
        required: true
      }, {
        type: 'string',
        name: 'baseurl',
        label: 'Base URL',
        description: 'Serve the website from the given base URL',
        hidden: true
      }, {
        type: 'string',
        name: 'permalink',
        label: 'Permalink',
        description: 'The output path for your pages, posts, or collections.',
        default: '/posts/:slug:output_ext',
        hidden: true
      }], true);
      pushIfNotExistsByField(configModel.fields, [{
        type: 'object',
        name: 'sass',
        label: 'Sass',
        hidden: true,
        fields: [{
          type: 'number',
          name: 'indentWidth',
          label: 'Indent Width',
          description: 'Used to determine the number of spaces or tabs to be used for indentation.',
          default: 4
        }, {
          type: 'enum',
          name: 'style',
          label: 'Output Style',
          description: 'Determines the output format of the final CSS style.',
          options: ['nested', 'expanded', 'compact', 'compressed'],
          default: 'nested'
        }, {
          type: 'number',
          name: 'precision',
          label: 'Precision',
          description: 'Used to determine how many digits after the decimal will be allowed.',
          default: 10
        }]
      }, {
        type: 'list',
        name: 'plugins',
        label: 'Plugins',
        hidden: true
      }, {
        type: 'list',
        name: 'exclude',
        label: 'Exclude',
        description: 'Exclude directories and/or files from the conversion.',
        hidden: true
      }], false);

      var jekyllPlugins = _lodash.default.get(site, 'config.data.plugins', []);

      jekyllPlugins.forEach(function (plugin) {
        if (_lodash.default.has(JEKYLL_PLUGIN_FIELDS_MAP, plugin)) {
          pushIfNotExistsByField(configModel.fields, JEKYLL_PLUGIN_FIELDS_MAP[plugin], false);
        }
      });
    }
  }
};
exports.default = _default;

function pushIfNotExistsByField(arr, items) {
  var unshift = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!_lodash.default.isArray(items)) {
    items = [items];
  }

  if (unshift) {
    items = items.reverse();
  }

  items.forEach(function (item) {
    if (!_lodash.default.find(arr, {
      name: item.name
    })) {
      unshift ? arr.unshift(item) : arr.push(item);
    }
  });
}
//# sourceMappingURL=config-model-transformer.js.map

/***/ }),

/***/ "./dist/unibit/filters.js":
/*!********************************!*\
  !*** ./dist/unibit/filters.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relativeUrl = relativeUrl;
exports.dateFormat = dateFormat;
exports.sprintf = sprintf;
exports.sliceArray = sliceArray;
exports.sortArray = sortArray;
exports.split = split;
exports.append = append;
exports.replaceRegexp = replaceRegexp;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.where = where;

var _strftime = _interopRequireDefault(__webpack_require__(/*! strftime */ "strftime"));

var _moment = _interopRequireDefault(__webpack_require__(/*! moment */ "moment"));

var _sprintfJs = _interopRequireDefault(__webpack_require__(/*! sprintf-js */ "sprintf-js"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fail = _utils.default.failFunctionWithTag('UnibitFilters');

var assert = _utils.default.assertFunctionWithFail(fail);

function relativeUrl(context, url) {
  if (_lodash.default.startsWith(url, '#') || _lodash.default.startsWith(url, 'http')) {
    return url;
  }

  var urlsRelativeToBase = _lodash.default.get(context.config, 'urls_relative_to_base', true);

  if (!urlsRelativeToBase && !_lodash.default.startsWith(url, '/')) {
    var pageDir = _path.default.parse(context.renderingPage.outputUrl).dir;

    assert(!_lodash.default.startsWith(pageDir, '/'), "error in relativeUrl, page dir can not be absolute");
    return _path.default.relative(pageDir, url);
  } else {
    var baseUrl = _lodash.default.get(context.config, 'baseurl', '');

    return _path.default.join(baseUrl, '/', url);
  }
}

function dateFormat(date, format, type) {
  type = _lodash.default.defaultTo(type, 'strftime');
  var res;

  if (type === 'strftime') {
    res = (0, _strftime.default)(format, date);
  } else if (type === 'moment') {
    res = (0, _moment.default)(date).format(format);
  } else {
    res = date.toString();
  }

  return res;
}

function sprintf(str, format) {
  return _sprintfJs.default.sprintf(str, format);
}

function sliceArray(arr, begin, end) {
  return arr.slice(begin, end);
}

function sortArray(arr, keyPath) {
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'asc';
  return _lodash.default.orderBy(arr, keyPath, order);
}

function split(str, separator) {
  return _lodash.default.split(str, separator);
}

function append(str, appendStr) {
  return str + appendStr;
}

function replaceRegexp(str, pattern, replacement) {
  return str.replace(new RegExp(pattern), replacement);
}

function startsWith(str, prefix) {
  return _lodash.default.startsWith(str, prefix);
}

function endsWith(str, prefix) {
  return _lodash.default.endsWith(str, prefix);
}

function where(array, key, operator, match) {
  var predicate;
  var operatorMap = {
    '==': _lodash.default.eq,
    '!=': function _(value, otherValue) {
      return value !== otherValue;
    },
    '>': _lodash.default.gt,
    '>=': _lodash.default.ge,
    '<': _lodash.default.lt,
    '<=': _lodash.default.le
  };

  if (!operator) {
    predicate = function predicate(element) {
      return _lodash.default.has(element, key);
    };
  } else {
    if (!match) {
      match = operator;
      operator = '==';
    }

    predicate = function predicate(element) {
      var value = _lodash.default.get(element, key);

      return operatorMap[operator](value, match);
    };
  }

  return _lodash.default.filter(array, predicate);
}
//# sourceMappingURL=filters.js.map

/***/ }),

/***/ "./dist/unibit/live-reload.js":
/*!************************************!*\
  !*** ./dist/unibit/live-reload.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ws = __webpack_require__(/*! ws */ "ws");

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _events = _interopRequireDefault(__webpack_require__(/*! events */ "events"));

var _chokidar = _interopRequireDefault(__webpack_require__(/*! chokidar */ "chokidar"));

var _http = _interopRequireDefault(__webpack_require__(/*! http */ "http"));

var _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _url = _interopRequireDefault(__webpack_require__(/*! url */ "url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startingPort = 5000;
var portTryPool = 10;
var mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};
/**
 * Serve middleware for files from filesDir
 * @param {String} filesDir
 * @param {Object} req
 * @param {Object} res
 */

var serve = function serve(filesDir, req, res) {
  var parsedUrl = _url.default.parse(req.url);

  var sanitizePath = _path.default.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

  var pathname = _path.default.join(_path.default.resolve(filesDir), sanitizePath);

  _fsExtra.default.exists(pathname).then(function (exist) {
    if (!exist) {
      throw 404;
    }

    return _fsExtra.default.stat(pathname);
  }).then(function (stat) {
    if (stat.isDirectory()) {
      pathname += 'index.html';
    }

    return _fsExtra.default.readFile(pathname);
  }).then(function (data) {
    var ext = _path.default.parse(pathname).ext;

    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    res.end(data);
  }).catch(function (err) {
    if (err === 404) {
      res.statusCode = 404;
      res.end("File ".concat(pathname, " not found!"));
      return;
    }

    res.statusCode = 500;
    res.end("Error getting the file: ".concat(err, "."));
  });
};
/**
 * Start server on port, serving files from filesDir
 * @param {Number} port
 * @param {String} filesDir
 * @returns {Promise<Object>} resolves with object containing server, port and
 * websocket active connections. Rejects in case if port is occupied.
 */


var startServer = function startServer(port, filesDir) {
  return new Promise(function (resolve, reject) {
    var connections = [];

    var server = _http.default.createServer(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return serve.apply(void 0, [filesDir].concat(args));
    });

    server.listen(port, function () {
      var socket = new _ws.Server({
        server: server
      });
      socket.on('connection', function (connection) {
        connections.push(connection);
        connection.on('close', function () {
          return connections.splice(connections.indexOf(connection), 1);
        });
      });
      resolve({
        server: server,
        connections: connections,
        port: port
      });
    });
    server.on('error', function (error) {
      if (error.toString().match(/EADDRINUSE/)) {
        reject();
      }
    });
  });
};
/**
 * Get server running on first of available port from ports array, serve files
 * from filesDir
 * @param {Number[]} ports
 * @param {String} filesDir
 * @returns {null|Promise<Object>}
 */


var getServer = function getServer(ports, filesDir) {
  if (!ports.length) {
    return null;
  }

  return startServer(ports[0], filesDir).catch(function () {
    return getServer(ports.slice(1), filesDir);
  });
};
/**
 * Send reload message to all passed connections
 * @param {Object[]} connections
 */


var reload = function reload(connections) {
  console.log('Watcher: Reload page');
  connections.filter(function (connection) {
    return connection.readyState === 1;
  }).forEach(function (connection) {
    return connection.send();
  });
};
/**
 * Emits change event for file at path
 * @param {String} event
 * @param {String} filePath
 * @param {Object} emitter
 */


var fileDidChange = function fileDidChange(event, filePath, emitter) {
  console.log("Watcher: ".concat(_lodash.default.capitalize(event), " ").concat(filePath));
  emitter.emit('change', filePath, event);
};
/**
 * Watch files change in input dir, start live reload server on port and serve static files from outputDir
 * @param {Object} options
 * @param {String} options.inputDir original files directory
 * @param {String} options.outputDir directory with compiled files, root folder for serving server
 * @param {Number} [options.port=startingPort] server port
 * @returns {Promise<Object>} watcher api
 */


var watcher = function watcher(options) {
  var inputDir = _lodash.default.get(options, 'inputDir');

  var outputDir = _lodash.default.get(options, 'outputDir');

  var port = _lodash.default.get(options, 'port', startingPort);

  if (!inputDir) {
    throw new Error('Should provide inputDir');
  }

  if (!outputDir) {
    throw new Error('Should provide outputDir');
  }

  return getServer(_lodash.default.range(port, port + portTryPool), outputDir).then(function (server) {
    if (!server) {
      throw new Error("All ports from ".concat(port, " to ").concat(port + portTryPool, " are occupied"));
    }

    console.log("Started server at http://localhost:".concat(server.port));
    var eventEmitter = new _events.default();

    var watcher = _chokidar.default.watch(_path.default.resolve(inputDir), {
      ignoreInitial: true
    });

    watcher.on('change', function (filePath) {
      return fileDidChange('change', filePath, eventEmitter);
    }).on('add', function (filePath) {
      return fileDidChange('add', filePath, eventEmitter);
    }).on('unlink', function (filePath) {
      return fileDidChange('remove', filePath, eventEmitter);
    });
    console.log("Start watching files at ".concat(inputDir));
    return {
      events: eventEmitter,
      reload: reload.bind(null, server.connections),
      port: server.port
    };
  });
};

module.exports = watcher;
//# sourceMappingURL=live-reload.js.map

/***/ }),

/***/ "./dist/unibit/supporting-files/base.html.js":
/*!***************************************************!*\
  !*** ./dist/unibit/supporting-files/base.html.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = `<!doctype html>
<html>
    <head>    
        {% if stackbit_banner.show_banner %}<link rel="stylesheet" type="text/css" href={{ "assets/css/stackbit-banner.css" | relative_url }}>{% endif %}
        {% include "html_head.html" %}
        {% if liveReload %}<script type="text/javascript" src={{ "assets/js/live-reload.js" | relative_url }}></script>{% endif %}
    </head>
    <body{% if templates.body_class %} class="{{ templates.body_class }}"{% endif %}>
        {% if stackbit_banner.show_banner %}
            {% include stackbit_banner.component %}
        {% endif %}
        {% block body %}{% endblock %}
        {% include "post_body.html" %}
    </body> 
</html>
`;


/***/ }),

/***/ "./dist/unibit/supporting-files/stackbit-banner.html.js":
/*!**************************************************************!*\
  !*** ./dist/unibit/supporting-files/stackbit-banner.html.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = `<div id="theme-bar" class="theme-bar theme-bar-fixed theme-bar-hidden">
  <div class="theme-bar-left">
    <div class="theme-bar-name">
        {% if stackbit_banner.name %}{{ stackbit_banner.name }}{% endif %}
    </div>
  </div>
  <div class="theme-bar-center">
    {% if stackbit_banner.github_url %}
    <a
      class="theme-bar-button theme-bar-button-outlined"
      href="{% if stackbit_banner.github_url %}{{ stackbit_banner.github_url }}{% endif %}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path
          fill="currentColor"
          d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z"
        ></path>
      </svg>
      <span>Fork</span>
    </a>
    {% endif %}
    {% if stackbit_banner.launch_url %}
    <a
      class="theme-bar-button theme-bar-button-primary"
      href="{{ stackbit_banner.launch_url }}"
    >
      <svg fill="currentColor" viewBox="0 0 131 107">
        <defs>
          <path
            id="a"
            d="M116.6 62L66.5 89.9 15.4 62c-1.9-1.1-4.4-.3-5.4 1.6-1.1 1.9-.3 4.4 1.6 5.4l53 29c1.2.7 2.7.7 3.9 0l52-29c1.9-1.1 2.6-3.5 1.5-5.4-1.1-2-3.5-2.7-5.4-1.6zm-95-18.5l44.9-25.4 50 28.9c1.9 1.1 4.4.4 5.5-1.5 1.1-1.9.4-4.4-1.5-5.5l-52-30c-1.2-.7-2.7-.7-4 0l-53 30c-2.7 1.5-2.7 5.4 0 7l53 30c1.9 1.1 4.4.4 5.5-1.5 1.1-1.9.4-4.4-1.5-5.5L21.6 43.5zM1 64.5v-20c-.4-4.6 1.7-9.3 6.3-11.9l53-30c3.9-2.2 8.6-2.2 12.4.1l52 30c4.3 2.5 6.6 7.2 6.2 11.8v20c.4 4.7-2 9.5-6.4 11.9l-52 29c-3.8 2.1-8.3 2.1-12.1 0l-53-29C3 74 .7 69.3 1 64.5z"
          />
        </defs>
        <use fill-rule="evenodd" xlink:href="#a" />
      </svg>
      <span>New Site</span>
    </a>
    {% endif %}
  </div>
  <div class="theme-bar-right">
    <button
      id="remove-theme-bar"
      class="theme-bar-button theme-bar-button-link"
    >
      <svg viewBox="0 0 320 512" class="remove-icon">
        <path
          fill="currentColor"
          d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
        ></path>
      </svg>
    </button>
  </div>
</div>

<script>
  var body = document.querySelector("body");
  var themebar = document.querySelector("#theme-bar");
  var hideThemeBar = sessionStorage.getItem('hideThemeBar');
  if (body && !hideThemeBar) {
    body.classList.add("has-theme-bar");
    themebar.classList.remove("theme-bar-hidden");
  }
  document
    .querySelector("#remove-theme-bar")
    .addEventListener("click", function(e) {
      e.preventDefault();
      body.classList.remove("has-theme-bar");
      themebar.classList.add("theme-bar-hidden");
      sessionStorage.setItem('hideThemeBar', true);
    });
</script>
`;

/***/ }),

/***/ "./dist/unibit/unibit-nunjucks-loader.js":
/*!***********************************************!*\
  !*** ./dist/unibit/unibit-nunjucks-loader.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var baseHtml = __webpack_require__(/*! ./supporting-files/base.html */ "./dist/unibit/supporting-files/base.html.js");

var bannerHtml = __webpack_require__(/*! ./supporting-files/stackbit-banner.html */ "./dist/unibit/supporting-files/stackbit-banner.html.js");

function UnibitNunjucksLoader(opts) {}

UnibitNunjucksLoader.prototype.getSource = function (name) {
  // load the template
  // return an object with:
  //   - src:     String. The template source.
  //   - path:    String. Path to template.
  //   - noCache: Bool. Don't cache the template (optional).
  if (name === 'base.html') {
    return {
      src: baseHtml,
      path: name,
      noCache: false
    };
  }

  if (name === 'stackbit-banner.html') {
    return {
      src: bannerHtml,
      path: name,
      noCache: false
    };
  }

  return null;
};

var _default = UnibitNunjucksLoader;
exports.default = _default;
//# sourceMappingURL=unibit-nunjucks-loader.js.map

/***/ }),

/***/ "./dist/unibit/unibit.js":
/*!*******************************!*\
  !*** ./dist/unibit/unibit.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));

var _nunjucks = _interopRequireDefault(__webpack_require__(/*! nunjucks */ "nunjucks"));

var _marked = _interopRequireDefault(__webpack_require__(/*! marked */ "marked"));

var _prettier = _interopRequireDefault(__webpack_require__(/*! prettier */ "prettier"));

var _nodeSass = _interopRequireDefault(__webpack_require__(/*! node-sass */ "node-sass"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _liveReload = _interopRequireDefault(__webpack_require__(/*! ./live-reload */ "./dist/unibit/live-reload.js"));

var _unibitLoader = _interopRequireDefault(__webpack_require__(/*! ../loaders/unibit-loader */ "./dist/loaders/unibit-loader.js"));

var _unibitNunjucksLoader = _interopRequireDefault(__webpack_require__(/*! ./unibit-nunjucks-loader */ "./dist/unibit/unibit-nunjucks-loader.js"));

var filters = _interopRequireWildcard(__webpack_require__(/*! ./filters */ "./dist/unibit/filters.js"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Unibit =
/*#__PURE__*/
function () {
  function Unibit(options) {
    _classCallCheck(this, Unibit);

    this.prettierOptions = _lodash.default.get(options, 'prettier');
    this.inputDir = _lodash.default.get(options, 'inputDir');
    this.outputDir = _lodash.default.get(options, 'outputDir', 'output');
    this.inputConfig = _lodash.default.get(options, 'config', {});
    this.withBanner = _lodash.default.get(options, 'withBanner', false);
    this.watch = _lodash.default.get(options, 'watch', false);
    console.log("Unibit: generating site into ".concat(_path.default.resolve(this.outputDir)));

    _lodash.default.forEach(options, function (value, key) {
      console.log("  ".concat(key, ": ").concat(value));
    });

    this.watcher = null;
    this.isGenerating = false;
    this.enqueue = false;
    this.renderingPage = null;
    this.pageRenderQueue = [];
  }

  _createClass(Unibit, [{
    key: "loadSite",
    value: function loadSite() {
      this.loader = new _unibitLoader.default({
        inputDir: this.inputDir
      });
      this.site = this.loader.loadSite();
      this.config = _lodash.default.merge({}, this.site.config.data, this.inputConfig);
      this.pages = _lodash.default.cloneDeep(this.site.pages);
      this.showBanner = _lodash.default.get(this.site, 'stackbitYaml.stackbit_banner.show_banner', false) || this.withBanner;
      this.loadNunjucksEnv();
    }
  }, {
    key: "fail",
    value: function fail(message) {
      throw new Error("[".concat(this.constructor.name, "] ").concat(message));
    }
  }, {
    key: "assert",
    value: function assert(value, message) {
      if (!value) {
        this.fail(message);
      }
    }
  }, {
    key: "generate",
    value: function generate() {
      var _this = this;

      if (this.isGenerating) {
        this.enqueue = true;
        return Promise.resolve();
      }

      this.isGenerating = true;
      return Promise.resolve().then(function () {
        return _this.watch && !_this.watcher && _this.registerWatcher();
      }).then(function () {
        var outputDir = _path.default.resolve(_this.outputDir);

        _fsExtra.default.emptyDirSync(outputDir);

        _this.pageRenderQueue = [];
        _this.renderingPage = null;

        _this.loadSite();

        _this.copyStaticFiles();

        _this.copySupportingFiles();

        _this.compileSass();

        return _this.generatePages();
      }).then(function () {
        _this.isGenerating = false;

        if (_this.enqueue) {
          _this.enqueue = false;
          return _this.generate();
        } else if (_this.watcher) {
          _this.watcher.reload();
        }
      }).catch(function (err) {
        _this.isGenerating = false;
        _this.enqueue = false;
      });
    }
  }, {
    key: "registerWatcher",
    value: function registerWatcher() {
      var _this2 = this;

      var inputDir = this.inputDir,
          outputDir = this.outputDir;
      return (0, _liveReload.default)({
        inputDir: inputDir,
        outputDir: outputDir
      }).then(function (watcher) {
        _this2.watcher = watcher;

        _this2.watcher.events.on('change', _lodash.default.debounce(_this2.generate.bind(_this2), 200));
      });
    }
  }, {
    key: "copySupportingFiles",
    value: function copySupportingFiles() {
      if (this.showBanner) {
        _fs.default.copyFileSync(_path.default.join(__dirname, './supporting-files/stackbit-banner.css'), _path.default.join(this.outputDir, '/assets/css/stackbit-banner.css'));
      }

      if (this.watch) {
        _fs.default.copyFileSync(_path.default.join(__dirname, './supporting-files/live-reload.js'), _path.default.join(this.outputDir, '/assets/js/live-reload.js'));
      }
    }
  }, {
    key: "copyStaticFiles",
    value: function copyStaticFiles() {
      var src = _path.default.resolve(this.site.absPath, this.site.staticDir);

      var dest = _path.default.resolve(this.outputDir);

      _fsExtra.default.copySync(src, dest);
    }
  }, {
    key: "compileSass",
    value: function compileSass() {
      var sassOptions = _lodash.default.get(this.config, 'sass', null);

      if (sassOptions) {
        var inputFile = _lodash.default.get(sassOptions, 'input_file', null);

        var outputFile = _lodash.default.get(sassOptions, 'output_file', null);

        this.assert(inputFile, "if sass.input_file must be specified");
        this.assert(inputFile, "if sass.output_file must be specified");
        inputFile = _path.default.resolve(this.site.absPath, inputFile);
        outputFile = _path.default.resolve(this.outputDir, outputFile);
        var inputData = null;
        var includePaths = [_path.default.dirname(inputFile)];

        var ext = _path.default.extname(inputFile);

        if (ext === '.njk') {
          console.log('Unibit: converting scss file with Nunjucks: ' + inputFile);
          inputData = _fs.default.readFileSync(inputFile, 'utf8');
          inputData = this.env.renderString(inputData, {
            site: {
              params: this.config.params
            }
          });
          inputFile = null;
        }

        var res = _nodeSass.default.renderSync({
          file: inputFile,
          data: inputData,
          includePaths: includePaths,
          indentWidth: _lodash.default.get(sassOptions, 'indentWidth', 4),
          outputStyle: _lodash.default.get(sassOptions, 'outputStyle', 'nested'),
          precision: _lodash.default.get(sassOptions, 'precision', 10)
        });

        _fsExtra.default.outputFileSync(outputFile, res.css);
      }
    }
  }, {
    key: "generatePages",
    value: function generatePages() {
      var _this3 = this;

      this.pages.forEach(function (page) {
        page.content = _this3.markdownify(page.markdown);
      });
      var pages = this.pages.filter(function (page) {
        return _lodash.default.get(_this3.config.output, page.relDir, true);
      });
      var pageTree = this.mapFolders(this.site.pageTree);
      console.log('Unibit: generating ' + pages.length + ' pages...');
      return _utils.default.forEachPromise(pages, function (page) {
        var context = _this3.createPageContext(page, pageTree);

        return _this3.renderAndSavePage(context, page.url).then(function () {
          var pageRenderQueue = _lodash.default.remove(_this3.pageRenderQueue);

          return _utils.default.forEachPromise(pageRenderQueue, function (renderItem) {
            return _this3.renderAndSavePage(renderItem.context, renderItem.outputUrl);
          });
        });
      });
    }
    /**
     * Remove in v0.3
     */

  }, {
    key: "mapFolders",
    value: function mapFolders(pageTree) {
      var _this4 = this;

      var folders = [];

      _lodash.default.forEach(pageTree.folders, function (folder) {
        var folderName = _path.default.relative(pageTree.path, folder.path);

        var mapped = _this4.mapFolders(folder);

        folders.push(mapped);
        folders[folderName] = mapped;
      });

      return {
        path: pageTree.path,
        pages: pageTree.pages,
        folders: folders
      };
    }
  }, {
    key: "createPageContext",
    value: function createPageContext(page, pageTree) {
      // console.log('Unibit: generating page for ' + page.relPath);
      var config = this.config;
      var stackbitYaml = this.site.stackbitYaml;
      var env = this.env;
      var context = {
        site: {
          title: config.title,
          baseurl: config.baseurl,
          pages: this.pages,
          root: pageTree,
          data: this.site.data,
          menus: this.site.menus,
          params: config.params
        },
        templates: {
          title: null,
          body_class: null
        },
        stackbit_banner: this.getStackbitBannerContext(stackbitYaml),
        liveReload: this.watch,
        page: page
      };

      if (!_lodash.default.isEmpty(_lodash.default.get(config, 'templates.title'))) {
        context.templates.title = env.renderString(config.templates.title, context);
      }

      if (!_lodash.default.isEmpty(_lodash.default.get(config, 'templates.body_class'))) {
        context.templates.body_class = env.renderString(config.templates.body_class, context);
      }

      context.getPage = this.getPage.bind(this, context);
      context.getPages = this.getPages.bind(this, context);
      context.paginate = this.paginate.bind(this, context);
      context.link = this.link.bind(this);
      context.classNames = this.classNames.bind(this); // console.log("context:\n" + JSON.stringify(context, null, 4));

      return context;
    }
  }, {
    key: "getStackbitBannerContext",
    value: function getStackbitBannerContext(stackbitYaml) {
      var stackbitBanner = _lodash.default.get(stackbitYaml, 'stackbit_banner');

      return _lodash.default.assign({
        show_banner: this.showBanner,
        component: 'stackbit-banner.html',
        name: this.config.title,
        launch_url: "http://app.stackbit.com/wizard",
        github_url: ""
      }, stackbitBanner);
    }
  }, {
    key: "addPageToRenderQueue",
    value: function addPageToRenderQueue(context, outputUrl) {
      this.pageRenderQueue.push({
        context: context,
        outputUrl: outputUrl
      });
    }
  }, {
    key: "renderAndSavePage",
    value: function renderAndSavePage(context, outputUrl) {
      var _this5 = this;

      this.assert(this.renderingPage === null, "Unibit: tying to generate two pages in parallel");
      this.renderingPage = {
        context: context,
        outputUrl: outputUrl
      };
      return this.renderPage(context).then(function (res) {
        _this5.renderingPage = null;

        _this5.savePage(res, outputUrl);
      });
    }
  }, {
    key: "renderPage",
    value: function renderPage(context) {
      var _this6 = this;

      var templateFile = _lodash.default.get(context.page, 'template', 'body') + '.html';
      return new Promise(function (resolve, reject) {
        _this6.env.render(templateFile, context, function (err, res) {
          if (err) {
            console.error("err:", err);
            reject(err);
          } else {
            //console.log("result:\n" + res);
            resolve(res);
          }
        });
      });
    }
  }, {
    key: "savePage",
    value: function savePage(pageResult, outputUrl) {
      // let res = prettier.format(pageResult, _.merge({
      //     printWidth: 500,
      //     htmlWhitespaceSensitivity: 'css',
      //     parser: 'html',
      //     endOfLine: 'lf'
      // }, this.prettierOptions)) + '\n';
      var outputFile = _path.default.resolve(this.outputDir, outputUrl);

      _fsExtra.default.outputFileSync(outputFile, pageResult);
    }
  }, {
    key: "loadNunjucksEnv",
    value: function loadNunjucksEnv() {
      var fileSystemLoader = new _nunjucks.default.FileSystemLoader([this.loader.templatesDir, this.loader.componentsDir]);
      this.env = new _nunjucks.default.Environment([fileSystemLoader, new _unibitNunjucksLoader.default()]);
      this.env.addFilter('relative_url', _lodash.default.partial(filters.relativeUrl, {
        config: this.config,
        renderingPage: this.renderingPage
      }));
      this.env.addFilter('date_format', filters.dateFormat);
      this.env.addFilter('sprintf', filters.sprintf);
      this.env.addFilter('slice_array', filters.sliceArray);
      this.env.addFilter('sort_array', filters.sortArray);
      this.env.addFilter('split', filters.split);
      this.env.addFilter('markdownify', this.markdownify.bind(this));
      this.env.addFilter('append', filters.append);
      this.env.addFilter('replace_regexp', filters.replaceRegexp);
      this.env.addFilter('starts_with', filters.startsWith);
      this.env.addFilter('ends_with', filters.endsWith);
      this.env.addFilter('where', filters.where);
      this.env.addFilter('link', this.link.bind(this));
      this.env.addExtension('LinkExtension', new LinkExtension(this));
    }
  }, {
    key: "getPage",
    value: function getPage(context, pagePath) {
      if (!_lodash.default.startsWith(pagePath, '/')) {
        // if pagePath does not start with '/', join it to current's page
        // relDir and test against relPath of all pages. If no such page
        // exists, continue to regular flow.
        var fullPath = _path.default.join(context.page.relDir, pagePath);

        var result = _lodash.default.find(this.pages, function (page) {
          return page.relPath === fullPath;
        });

        if (result) {
          return result;
        }
      } else {
        // if pagePath starts with '/', remove it
        pagePath = pagePath.substring(1);
      }

      return _lodash.default.find(this.pages, function (page) {
        return page.relPath === pagePath;
      }) || null;
    }
  }, {
    key: "getPages",
    value: function getPages(context, folderPath) {
      if (!_lodash.default.startsWith(folderPath, '/')) {
        // if folderPath does not start with '/', join it to current's page
        // relDir and test against relDir of all pages. If no such pages
        // exists, continue to regular flow.
        var fullPath = _path.default.join(context.page.relDir, folderPath);

        var result = _lodash.default.filter(this.pages, function (page) {
          return page.relDir === fullPath;
        });

        if (!_lodash.default.isEmpty(result)) {
          return result;
        }
      } else {
        // if pagePath starts with '/', remove it
        folderPath = folderPath.substring(1);
      }

      return _lodash.default.filter(this.pages, function (page) {
        return page.relDir === folderPath;
      });
    }
  }, {
    key: "paginate",
    value: function paginate(context, items, itemsPerPage) {
      var _this7 = this;

      context = _lodash.default.merge({}, context);
      var pagesCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
      var pages = [];

      for (var i = 0; i < pagesCount; i++) {
        var pageNumber = i + 1;
        var url = void 0;

        if (i === 0) {
          url = context.page.url;
        } else {
          url = _path.default.join(context.page.relDir, 'page' + pageNumber, 'index.html');
        }

        var startIdx = i * itemsPerPage;
        var endIdx = Math.min(startIdx + itemsPerPage, items.length);
        var pageItems = items.slice(startIdx, endIdx);
        var page = {
          pageNumber: pageNumber,
          items: pageItems,
          itemsCount: pageItems.length,
          itemsPerPage: itemsPerPage,
          allItems: items,
          allItemsCount: items.length,
          pages: pages,
          pagesCount: pagesCount,
          url: url
        };
        pages.push(page);
      }

      pages.forEach(function (page, index) {
        var hasPrev = index > 0;
        var hasNext = index < pagesCount - 1;
        Object.assign(page, {
          hasPrev: hasPrev,
          prev: hasPrev ? pages[index - 1] : null,
          hasNext: hasNext,
          next: hasNext ? pages[index + 1] : null,
          first: pages[0],
          last: pages[pagesCount - 1]
        });
      });

      _lodash.default.tail(pages).forEach(function (page) {
        var outputUrl = page.url; // override the original paginate function to return current pagination page

        var pageContext = Object.assign({}, context, {
          paginate: function paginate() {
            return page;
          }
        });

        _this7.addPageToRenderQueue(pageContext, outputUrl);
      });

      return pages[0];
    }
  }, {
    key: "markdownify",
    value: function markdownify(str) {
      if (_lodash.default.isString(str)) {
        return this.env.filters.safe((0, _marked.default)(str, {
          baseUrl: this.config.baseurl
        }));
      } else {
        return str;
      }
    }
  }, {
    key: "link",
    value: function link(_link) {
      if (_lodash.default.startsWith(_link, '#')) {
        return _link;
      }

      var index = _link.indexOf('#');

      var hash = '';

      if (index !== -1) {
        hash = _link.substring(index);
        _link = _link.substring(0, index);
      }

      var page = _lodash.default.find(this.pages, function (page) {
        if (page.relPath === _link) {
          return true;
        }
      });

      this.assert(page, "could not find page for link: ".concat(_link));
      return page.url + hash;
    }
  }, {
    key: "classNames",
    value: function classNames() {
      var classNames = [];

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _lodash.default.forEach(args, function (arg) {
        if (_lodash.default.isString(arg)) {
          classNames.push(arg);
        } else {
          _lodash.default.forEach(arg, function (value, key) {
            if (value) {
              classNames.push(key);
            }
          });
        }
      });

      if (_lodash.default.isEmpty(classNames)) {
        return '';
      } else {
        return this.env.filters.safe("class=\"".concat(classNames.join(' '), "\""));
      }
    }
  }]);

  return Unibit;
}();

exports.default = Unibit;

var LinkExtension =
/*#__PURE__*/
function () {
  function LinkExtension(unibit) {
    _classCallCheck(this, LinkExtension);

    this.tags = ['link'];
    this.unibit = unibit;
  }

  _createClass(LinkExtension, [{
    key: "parse",
    value: function parse(parser, nodes, lexer) {
      // same implementation as nunjucks.Parser.parseExtends()
      var tagName = 'link';
      var tag = parser.peekToken();

      if (!parser.skipSymbol(tagName)) {
        parser.fail('parseTemplateRef: expected ' + tagName);
      }

      var expression = parser.parseExpression();
      var args = new nodes.NodeList(tag.lineno, tag.colno, [expression]);
      parser.advanceAfterBlockEnd(tag.value);
      return new nodes.CallExtension(this, 'generateLink', args);
    }
  }, {
    key: "generateLink",
    value: function generateLink(context, link) {
      var result = this.unibit.link(link);
      return new _nunjucks.default.runtime.SafeString(result);
    }
  }]);

  return LinkExtension;
}();
//# sourceMappingURL=unibit.js.map

/***/ }),

/***/ "./dist/utils/index.js":
/*!*****************************!*\
  !*** ./dist/utils/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _jsYaml = _interopRequireDefault(__webpack_require__(/*! js-yaml */ "js-yaml"));

var _toml = _interopRequireDefault(__webpack_require__(/*! @iarna/toml */ "@iarna/toml"));

var _micromatch = _interopRequireDefault(__webpack_require__(/*! micromatch */ "micromatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = {
  forEachPromise: forEachPromise,
  promiseAllMap: promiseAllMap,
  copyFilesRecursively: copyFilesRecursively,
  copy: copy,
  copyDefault: copyDefault,
  append: append,
  concat: concat,
  indent: indent,
  pascalCase: pascalCase,
  readDirRecSync: readDirRecSync,
  fieldPathToString: fieldPathToString,
  hrtimeAndPrint: hrtimeAndPrint,
  printHRTime: printHRTime,
  forEachDeep: forEachDeep,
  mapDeep: mapDeep,
  getFirstExistingFileSync: getFirstExistingFileSync,
  parseFirstExistingFileSync: parseFirstExistingFileSync,
  parseFileSync: parseFileSync,
  parseDataByFilePath: parseDataByFilePath,
  outputDataSync: outputDataSync,
  stringifyDataByFilePath: stringifyDataByFilePath,
  deepFreeze: deepFreeze,
  joinPathAndGlob: joinPathAndGlob,
  failFunctionWithTag: failFunctionWithTag,
  assertFunctionWithFail: assertFunctionWithFail,
  getPageModelNameByPageFilePath: getPageModelNameByPageFilePath,
  flattenPageTree: flattenPageTree
};

var INDENT = _lodash.default.repeat(' ', 4);
/**
 * Iterates over array items and invokes callback function for each of them.
 * The callback must return a promise and is called with three parameters: array item,
 * item index, array itself. Callbacks are invoked serially, such that callback for the
 * following item will not be called until the promise returned from the previous callback
 * is not fulfilled.
 *
 * @param {array} array
 * @param {function} callback
 * @param {object} [thisArg]
 * @return {Promise<any>}
 */


function forEachPromise(array, callback, thisArg) {
  return new Promise(function (resolve, reject) {
    var results = [];

    function next(index) {
      if (index < array.length) {
        callback.call(thisArg, array[index], index, array).then(function (result) {
          results[index] = result;
          next(index + 1);
        }).catch(function (error) {
          reject(error);
        });
      } else {
        resolve(results);
      }
    }

    next(0);
  });
}

function promiseAllMap(array, limit, interval, callback, thisArg) {
  return new Promise(function (resolve, reject) {
    var arrayCopy = array.slice();
    var results = [];
    var index = 0;
    var runCount = 0;
    var doneCount = 0;
    var lastRunTime = null;
    var timeout = null;
    limit = limit || null;
    interval = interval || null;

    function run() {
      var idx = index;

      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      index += 1;
      runCount += 1;
      lastRunTime = process.hrtime();
      Promise.resolve(callback.call(thisArg, arrayCopy[idx], idx, arrayCopy)).then(function (result) {
        runCount -= 1;
        doneCount += 1;
        results.push(result);
        next();
      }).catch(function (error) {
        reject(error);
      });
      next();
    }

    if (interval) {
      var origRun = run;

      run = function run() {
        if (!lastRunTime) {
          origRun();
        } else if (!timeout) {
          var diff = process.hrtime(lastRunTime);
          var diffMs = diff[0] * 1000 + diff[1] / 1000000;

          if (diffMs >= interval) {
            origRun();
          } else {
            timeout = setTimeout(origRun, interval - diffMs);
          }
        }
      };
    }

    if (limit) {
      var _origRun = run;

      run = function run() {
        if (runCount < limit) {
          _origRun();
        }
      };
    }

    function next() {
      if (index < arrayCopy.length) {
        run();
      } else if (doneCount === arrayCopy.length) {
        resolve(results);
      }
    }

    next();
  });
}
/**
 * Recursively copies files from source to target directories.
 * The optional "options" argument is an object with an optional "processNunjucksFile"
 * and "filePathMap" fields.
 *
 * If "processNunjucksFile" function is passed, it will be invoked for every file with ".njk"
 * extension with a filepath relative to the sourceDir as its single argument.
 * This function should return the result of processing Nunjucks template.
 *
 * Files named _gitignore will be copied as .gitignore
 *
 * @param {string} sourceDir
 * @param {string} targetDir
 * @param {object} [options]
 * @param {Function} options.processNunjucksFile Function that receives filePath
 *   relative to sourceDir and returns processed file data to be stored inside targetDir
 * @param {object} options.filePathMap Map between source and target file paths.
 *   If mapped value is null, the file will not be copied.
 */


function copyFilesRecursively(sourceDir, targetDir, options, _internalOptions) {
  if (!_internalOptions) {
    _internalOptions = {
      origSourceDir: sourceDir,
      origTargetDir: targetDir
    };
  }

  _fs.default.readdirSync(sourceDir).forEach(function (fileName) {
    var sourceFilePath = _path.default.join(sourceDir, fileName);

    var targetFilePath = _path.default.join(targetDir, fileName);

    var fileStat = _fs.default.statSync(sourceFilePath);

    if (fileStat.isDirectory()) {
      copyFilesRecursively(sourceFilePath, targetFilePath, options, _internalOptions);
    } else if (fileStat.isFile()) {
      var outputPathObject = _path.default.parse(targetFilePath);

      var data = null;

      if (outputPathObject.ext === '.njk') {
        if (!_lodash.default.has(options, 'processNunjucksFile') || !_lodash.default.isFunction(options.processNunjucksFile)) {
          throw new Error("utils.copyFilesRecursively(): file (".concat(sourceFilePath, ") has '.njk' extension but processNunjucksFile function was not passed"));
        }

        var relativeSourceFilePath = _path.default.relative(_internalOptions.origSourceDir, sourceFilePath);

        data = options.processNunjucksFile(relativeSourceFilePath);
        targetFilePath = _path.default.resolve(outputPathObject.dir, outputPathObject.name);
      }

      var relativeTargetFilePath = _path.default.relative(_internalOptions.origTargetDir, targetFilePath);

      if (_lodash.default.has(options, ['filePathMap', relativeTargetFilePath])) {
        var mappedFilePath = _lodash.default.get(options, ['filePathMap', relativeTargetFilePath]);

        if (mappedFilePath === null) {
          return;
        }

        targetFilePath = _path.default.join(_internalOptions.origTargetDir, mappedFilePath);
      }

      if (fileName === '_gitignore') {
        targetFilePath = _path.default.resolve(outputPathObject.dir, '.gitignore');
      }

      if (!data) {
        _fsExtra.default.copySync(sourceFilePath, targetFilePath);
      } else {
        _fsExtra.default.outputFileSync(targetFilePath, data, {
          mode: fileStat.mode
        });
      }
    } else {
      throw new Error("utils.copyFilesRecursively(): file type is not supported: ".concat(sourceFilePath));
    }
  });
}
/**
 * Copies the value at a sourcePath of the sourceObject to a targetPath of the targetObject.
 *
 * @param {Object} sourceObject
 * @param {String} sourcePath
 * @param {Object} targetObject
 * @param {String} targetPath
 * @param {Function} [transform]
 */


function copy(sourceObject, sourcePath, targetObject, targetPath, transform) {
  if (_lodash.default.has(sourceObject, sourcePath)) {
    var value = _lodash.default.get(sourceObject, sourcePath);

    if (transform) {
      value = transform(value);
    }

    _lodash.default.set(targetObject, targetPath, value);
  }
}

function copyDefault(sourceObject, sourcePath, targetObject, targetPath, transform) {
  if (!_lodash.default.has(targetObject, targetPath)) {
    copy(sourceObject, sourcePath, targetObject, targetPath, transform);
  }
}

function append(object, path, value) {
  if (!_lodash.default.has(object, path)) {
    _lodash.default.set(object, path, []);
  }

  _lodash.default.get(object, path).push(value);
}

function concat(object, path, value) {
  if (!_lodash.default.has(object, path)) {
    _lodash.default.set(object, path, []);
  }

  _lodash.default.set(object, path, _lodash.default.get(object, path).concat(value));
}

function indent(str, indent) {
  var indentFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (_lodash.default.isNumber(indent)) {
    indent = _lodash.default.repeat(INDENT, indent);
  }

  return (indentFirst ? indent : '') + str.split('\n').join("\n".concat(indent));
}

function pascalCase(str) {
  return _lodash.default.upperFirst(_lodash.default.camelCase(str));
}

function readDirRecSync(dir) {
  var list = [];

  var files = _fs.default.readdirSync(dir);

  _lodash.default.forEach(files, function (file) {
    var filePath = _path.default.join(dir, file);

    var stats = _fs.default.statSync(filePath);

    if (stats.isDirectory()) {
      list = list.concat(readDirRecSync(filePath));
    } else if (stats.isFile()) {
      list.push(filePath);
    }
  });

  return list;
}

function fieldPathToString(fieldPath) {
  return _lodash.default.reduce(fieldPath, function (accumulator, fieldName, index) {
    if (_lodash.default.isString(fieldName) && /\W/.test(fieldName)) {
      // field name is a string with non alphanumeric character
      accumulator += "['".concat(fieldName, "']");
    } else if (_lodash.default.isNumber(fieldName)) {
      accumulator += "[".concat(fieldName, "]");
    } else {
      if (index > 0) {
        accumulator += '.';
      }

      accumulator += fieldName;
    }

    return accumulator;
  }, '');
}

function hrtimeAndPrint(time) {
  var res = process.hrtime(time);
  return printHRTime(res);
}

function printHRTime(time) {
  var precision = 3;

  if (time[0] > 0) {
    return _lodash.default.round(time[0] + time[1] / 1e9, precision) + 'sec';
  } else if (time[1] >= 1e6) {
    return _lodash.default.round(time[1] / 1e6, precision) + 'ms';
  } else if (time[1] >= 1e3) {
    return _lodash.default.round(time[1] / 1e3, precision) + 'µs';
  } else if (time[1] >= 1e3) {
    return _lodash.default.round(time[1], precision) + 'ns';
  }
}
/**
 * Recursively iterates over elements of a collection and invokes iteratee for each element.
 *
 * @param {*} value The value to iterate
 * @param {Function} iteratee The iteratee function
 * @param {string|number} key The key of the `value` if the `object` is an Object, or the index of the `value` if the `object` is an Array
 * @param {Object} object The parent object of `value`.
 */


function forEachDeep(value, iteratee, key, object) {
  iteratee(value, key, object);

  if (_lodash.default.isPlainObject(value)) {
    _lodash.default.forEach(value, function (v, k) {
      forEachDeep(v, iteratee, k, value);
    });
  } else if (_lodash.default.isArray(value)) {
    _lodash.default.forEach(value, function (v, k) {
      forEachDeep(v, iteratee, k, value);
    });
  }
}
/**
 *
 * @param {*} value
 * @param {Function} iteratee Function (value: any, fieldPath: Array, stack: Array)
 * @param {object} [options]
 * @param {boolean} options.iterateCollections. Default: true
 * @param {boolean} options.iterateScalars. Default: true
 * @returns {*}
 */


function mapDeep(value, iteratee, options, _keyPath, _objectStack) {
  var iterate;

  if (_lodash.default.isPlainObject(value) || _lodash.default.isArray(value)) {
    iterate = _lodash.default.get(options, 'iterateCollections', true);
  } else {
    iterate = _lodash.default.get(options, 'iterateScalars', true);
  }

  if (iterate) {
    value = iteratee(value, _keyPath, _objectStack);
  }

  _keyPath = _keyPath || [];
  _objectStack = _objectStack || [];

  if (_lodash.default.isPlainObject(value)) {
    value = _lodash.default.mapValues(value, function (val, key) {
      return mapDeep(val, iteratee, options, _lodash.default.concat(_keyPath, key), _lodash.default.concat(_objectStack, value));
    });
  } else if (_lodash.default.isArray(value)) {
    value = _lodash.default.map(value, function (val, key) {
      return mapDeep(val, iteratee, options, _lodash.default.concat(_keyPath, key), _lodash.default.concat(_objectStack, value));
    });
  }

  return value;
}

function getFirstExistingFileSync(fileNames, inputDir) {
  return _lodash.default.chain(fileNames).map(function (filePath) {
    return _path.default.resolve(inputDir, filePath);
  }).find(function (filePath) {
    return _fs.default.existsSync(filePath);
  }).value();
}

function parseFirstExistingFileSync(fileNames, inputDir) {
  var filePath = _lodash.default.chain(fileNames).map(function (filePath) {
    return _path.default.resolve(inputDir, filePath);
  }).find(function (filePath) {
    return _fs.default.existsSync(filePath);
  }).value();

  if (filePath) {
    return parseFileSync(filePath);
  } else {
    return null;
  }
}

function parseFileSync(filePath) {
  var data = _fs.default.readFileSync(filePath, 'utf8');

  return parseDataByFilePath(data, filePath);
}

function parseDataByFilePath(string, filePath) {
  var extension = _path.default.extname(filePath).substring(1);

  var data;

  switch (extension) {
    case 'yml':
    case 'yaml':
      data = _jsYaml.default.safeLoad(string, {
        schema: _jsYaml.default.JSON_SCHEMA
      });
      break;

    case 'json':
      data = JSON.parse(string);
      break;

    case 'toml':
      data = _toml.default.parse(string);
      break;

    default:
      throw new Error("parseDataByFilePath error, extension '".concat(extension, "' of file ").concat(filePath, " is not supported"));
  }

  return data;
}

function outputDataSync(filePath, data) {
  var res = stringifyDataByFilePath(data, filePath);

  _fsExtra.default.outputFileSync(filePath, res);
}

function stringifyDataByFilePath(data, filePath) {
  var extension = _path.default.extname(filePath).substring(1);

  var result;

  switch (extension) {
    case 'yml':
    case 'yaml':
      result = _jsYaml.default.safeDump(data, {
        noRefs: true
      });
      break;

    case 'json':
      result = JSON.stringify(data, null, 4);
      break;

    case 'toml':
      result = _toml.default.stringify(data);
      break;

    case 'md':
      result = '---\n' + _jsYaml.default.safeDump(data.frontmatter, {
        noRefs: true
      }) + '---\n' + data.markdown;
      break;

    default:
      throw new Error("stringifyDataByFilePath error, extension '".concat(extension, "' of file ").concat(filePath, " is not supported"));
  }

  return result;
}

function deepFreeze(obj) {
  var _this = this;

  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach(function (prop) {
    if (obj.hasOwnProperty(prop) && obj[prop] !== null && (_typeof(obj[prop]) === "object" || typeof obj[prop] === "function") && !Object.isFrozen(obj[prop])) {
      _this.deepFreeze(obj[prop]);
    }
  });
  return obj;
}

function joinPathAndGlob(pathStr, glob) {
  var globParts = _lodash.default.chain(glob).trim('{}').split(',').compact().map(function (globPart) {
    return _path.default.join(pathStr, globPart);
  }).value();

  return globParts.length > 1 ? "{".concat(globParts.join(','), "}") : _lodash.default.head(globParts);
}

function failFunctionWithTag(tag) {
  return function fail(message) {
    throw new Error("[".concat(tag, "] ").concat(message));
  };
}

function assertFunctionWithFail(fail) {
  return function assert(value, message) {
    if (!value) {
      fail(message);
    }
  };
}

function getPageModelNameByPageFilePath(site, pageModels, assert, fail) {
  var result = {};

  _lodash.default.forEach(site.pages, function (page) {
    var pageFilePath = page.relPath;

    var pageTemplate = _lodash.default.get(page, ['params', site.pageTemplateKey]);

    assert(pageTemplate, "page '".concat(pageFilePath, "' does not have the '").concat(site.pageTemplateKey, "' field"));

    var matchedModels = _lodash.default.filter(pageModels, function (model) {
      if (_lodash.default.has(model, 'file')) {
        return _micromatch.default.isMatch(pageFilePath, model.file);
      } else {
        var folder = _lodash.default.get(model, 'folder', '');

        var match = _lodash.default.get(model, 'match', '**/*');

        var exclude = _lodash.default.get(model, 'exclude', null);

        match = joinPathAndGlob(folder, match);
        exclude = joinPathAndGlob(folder, exclude);

        var modelTemplate = _lodash.default.get(model, 'template');

        assert(modelTemplate, "model of type 'page' must have 'template' field, model: ".concat(model.name));
        return pageTemplate === modelTemplate && _micromatch.default.isMatch(pageFilePath, match) && (!exclude || !_micromatch.default.isMatch(pageFilePath, exclude));
      }
    });

    if (matchedModels.length === 0) {
      fail("page '".concat(pageFilePath, "' does not match any page model"));
    } else if (matchedModels.length > 1) {
      fail("page '".concat(pageFilePath, "' matches several page models '").concat(_lodash.default.map(matchedModels, 'name').join(', '), "'"));
    } else {
      result[pageFilePath] = _lodash.default.head(matchedModels).name;
    }
  });

  return result;
}

function flattenPageTree(pageTree) {
  var pages = [];

  _lodash.default.get(pageTree, 'folders', []).forEach(function (folder) {
    pages = pages.concat(flattenPageTree(folder));
  });

  return pages.concat(_lodash.default.get(pageTree, 'pages', []));
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/utils/merge-content-model-extensions.js":
/*!******************************************************!*\
  !*** ./dist/utils/merge-content-model-extensions.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeContentModelExtensions;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fail = _index.default.failFunctionWithTag('extendContentModels');

var assert = _index.default.assertFunctionWithFail(fail);

function mergeContentModelExtensions(models) {
  models = _lodash.default.cloneDeep(models);
  var extendedModelsByName = {};
  return _lodash.default.map(models, function (model, modelName) {
    model.name = modelName;
    return extendModel(model, models, extendedModelsByName);
  });
}

function extendModel(model, models, extendedModelsByName) {
  var _extendPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  assert(!_lodash.default.includes(_extendPath, model.name), "cyclic dependency detected in model extend tree: ".concat(_extendPath.join(' -> ') + model.name));

  if (_lodash.default.has(extendedModelsByName, model.name)) {
    return extendedModelsByName[model.name];
  }

  extendedModelsByName[model.name] = model;

  var _extends = _lodash.default.get(model, 'extends');

  var fields = _lodash.default.get(model, 'fields');

  if (!_extends) {
    return model;
  }

  if (!_lodash.default.isArray(_extends)) {
    _extends = [_extends];
  }

  _extendPath.push(model.name);

  _lodash.default.forEach(_extends, function (superModelName) {
    var superModel = _lodash.default.get(models, superModelName);

    assert(superModel, "model '".concat(model.name, "' extends non defined model '").concat(superModelName, "'"));
    assert(superModel.type === 'object', "only object model types can be extended");
    superModel = extendModel(superModel, models, extendedModelsByName, _extendPath);

    _index.default.copyDefault(superModel, 'hideContent', model, 'hideContent');

    _index.default.copyDefault(superModel, 'singleInstance', model, 'singleInstance');

    _index.default.copyDefault(superModel, 'labelField', model, 'labelField');

    var idx = 0;

    _lodash.default.forEach(superModel.fields, function (superField) {
      var field = _lodash.default.find(fields, {
        name: superField.name
      });

      if (field) {
        _lodash.default.defaultsDeep(field, _lodash.default.cloneDeep(superField));
      } else {
        fields.splice(idx++, 0, _lodash.default.cloneDeep(superField));
      }
    });
  });

  _extendPath.pop();

  return model;
}
//# sourceMappingURL=merge-content-model-extensions.js.map

/***/ }),

/***/ "./dist/validator/console-renderer.js":
/*!********************************************!*\
  !*** ./dist/validator/console-renderer.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _figures = _interopRequireDefault(__webpack_require__(/*! figures */ "figures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer =
/*#__PURE__*/
function () {
  function Renderer() {
    var showOnlyErrors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, Renderer);

    this.showOnlyErrors = showOnlyErrors;
  }

  _createClass(Renderer, [{
    key: "stage",
    value: function stage(name) {
      console.log("\n".concat(_chalk.default.bold(_chalk.default.blue(name))));
    }
  }, {
    key: "step",
    value: function step(name, errors) {
      if (_lodash.default.isEmpty(errors)) {
        if (!this.showOnlyErrors) {
          console.log("".concat(_chalk.default.bold(_chalk.default.green(_figures.default.tick)), " ").concat(_chalk.default.bold(name)));
        }
      } else {
        console.log("".concat(_chalk.default.bold(_chalk.default.red(_figures.default.cross)), " ").concat(_chalk.default.bold(name)));
        errors.forEach(function (err) {
          return console.log("  ".concat(_chalk.default.gray(_figures.default.arrowRight), " ").concat(err));
        });
      }
    }
  }, {
    key: "results",
    value: function results(errors) {
      if (_lodash.default.isEmpty(errors)) {
        console.log(_chalk.default.bold("\n".concat(_figures.default.info, " All ").concat(_chalk.default.green('OK'))));
      } else {
        console.log(_chalk.default.bold(_chalk.default.red("\n".concat(_figures.default.warning, " ").concat(errors.length, " errors found"))));
      }
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;
//# sourceMappingURL=console-renderer.js.map

/***/ }),

/***/ "./dist/validator/model-schema.js":
/*!****************************************!*\
  !*** ./dist/validator/model-schema.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(__webpack_require__(/*! @hapi/joi */ "@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StackbitYaml = _joi.default.object({
  stackbitVersion: _joi.default.string(),
  ssgName: _joi.default.string().valid('unibit', 'gatsby', 'hugo', 'jekyll'),
  uploadDir: _joi.default.string(),
  buildCommand: _joi.default.string(),
  publishDir: _joi.default.string(),
  collections: _joi.default.any(),
  injectLocations: _joi.default.any(),
  models: _joi.default.any(),
  dataDir: _joi.default.string(),
  pagesDir: _joi.default.string(),
  pageTemplateKey: _joi.default.string(),
  templatesDir: _joi.default.string(),
  componentsDir: _joi.default.string(),
  sourceMapping: _joi.default.any(),
  metadata: _joi.default.any(),
  stackbit_banner: _joi.default.any()
});

var PageModel = _joi.default.object({
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  template: _joi.default.string().required(),
  singleInstance: _joi.default.boolean(),
  file: _joi.default.string().when('singleInstance', {
    is: true,
    then: _joi.default.required()
  }),
  folder: _joi.default.string().when('singleInstance', {
    is: true,
    then: _joi.default.forbidden()
  }),
  match: _joi.default.string().when('singleInstance', {
    is: true,
    then: _joi.default.forbidden()
  }),
  exclude: _joi.default.string().when('singleInstance', {
    is: true,
    then: _joi.default.forbidden()
  }),
  hideContent: _joi.default.boolean(),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ObjectModel = _joi.default.object({
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  labelField: _joi.default.string(),
  extends: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$modelNames'))),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var DataModel = _joi.default.object({
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  file: _joi.default.string().required(),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ConfigModel = _joi.default.object({
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ModelField = _joi.default.object({
  type: _joi.default.string().required(),
  name: _joi.default.string().required(),
  label: _joi.default.string().required(),
  description: _joi.default.string().allow(''),
  required: _joi.default.boolean(),
  default: _joi.default.any(),
  const: _joi.default.any(),
  hidden: _joi.default.boolean(),
  readOnly: _joi.default.boolean(),
  unique: _joi.default.boolean(),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  })),
  widget: _joi.default.any(),
  validations: _joi.default.any(),
  items: _joi.default.lazy(function () {
    return ModelField.concat(_joi.default.object({
      name: _joi.default.optional(),
      label: _joi.default.optional()
    }));
  }),
  options: _joi.default.array(),
  labelField: _joi.default.string(),
  models: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$modelNames'))),
  format: _joi.default.string(),
  subtype: _joi.default.string()
}).nand('const', 'default');

var _default = {
  StackbitYaml: StackbitYaml,
  PageModel: PageModel,
  ObjectModel: ObjectModel,
  DataModel: DataModel,
  ConfigModel: ConfigModel,
  ModelField: ModelField
};
exports.default = _default;
//# sourceMappingURL=model-schema.js.map

/***/ }),

/***/ "./dist/validator/schema-builder.js":
/*!******************************************!*\
  !*** ./dist/validator/schema-builder.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _joi = _interopRequireDefault(__webpack_require__(/*! @hapi/joi */ "@hapi/joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SchemaBuilder =
/*#__PURE__*/
function () {
  function SchemaBuilder(_model, modelsByName, assert) {
    var _this = this;

    _classCallCheck(this, SchemaBuilder);

    _defineProperty(this, "fieldTypeToValidation", {
      string: function string() {
        return _joi.default.string().allow('');
      },
      text: function text() {
        return _joi.default.string().allow('');
      },
      markdown: function markdown() {
        return _joi.default.string().allow('');
      },
      image: function image() {
        return _joi.default.string().allow('');
      },
      file: function file() {
        return _joi.default.string().allow('');
      },
      color: function color() {
        return _joi.default.string().allow('');
      },
      boolean: function boolean() {
        return _joi.default.boolean();
      },
      enum: function _enum(field) {
        if (field.options) {
          return _joi.default.valid(field.options);
        } // TODO validation for other enum sources


        return _joi.default.any();
      },
      number: function number(field) {
        var result = _joi.default.number();

        if (field.subtype !== 'float') {
          result = result.integer();
        }

        if (field.min) {
          result = result.min(field.min);
        }

        if (field.max) {
          result = result.max(field.max);
        }

        if (field.step) {// TODO
        }

        return result;
      },
      date: function date() {
        return _joi.default.date();
      },
      datetime: function datetime() {
        return _joi.default.date();
      },
      reference: function reference(field) {
        if (field.models) {
          return _lodash.default.reduce(field.models, function (schema, modelName) {
            var model = _this.modelsByName[modelName];

            if (_this.assert) {
              _this.assert(model, "\"".concat(modelName, "\" not found in content model"));
            }

            if (model) {
              return schema.when(_joi.default.object({
                type: modelName
              }).unknown(), {
                then: new SchemaBuilder(model, _this.modelsByName, _this.assert).build()
              });
            } else {
              return _joi.default.object();
            }
          }, _joi.default.object({
            type: _joi.default.string().valid(field.models).required()
          }));
        }

        return _joi.default.string();
      },
      object: function object(field) {
        return new SchemaBuilder(field, _this.modelsByName, _this.assert).build();
      },
      list: function list(field) {
        if (field.items) {
          var itemsSchema = _this.fieldType(field.items);

          return _joi.default.array().items(itemsSchema);
        }

        return _joi.default.array();
      }
    });

    this.model = _model;
    this.modelsByName = modelsByName;
    this.assert = assert;
  }

  _createClass(SchemaBuilder, [{
    key: "build",
    value: function build() {
      var schema = _joi.default.any();

      if (this.model && this.model.fields) {
        schema = this.createFieldsSchema(this.model.fields);
      }

      return schema;
    }
  }, {
    key: "fieldType",
    value: function fieldType(field) {
      var validation = _lodash.default.get(this.fieldTypeToValidation, field.type);

      if (validation) {
        return validation(field);
      } else if (_lodash.default.get(this.modelsByName, field.type)) {
        var model = this.modelsByName[field.type];
        return new SchemaBuilder(model, this.modelsByName, this.assert).build();
      }

      return _joi.default.any();
    }
  }, {
    key: "createFieldsSchema",
    value: function createFieldsSchema(fields) {
      var _this2 = this;

      return _joi.default.object().keys(_lodash.default.reduce(fields, function (obj, field) {
        obj[field.name] = _this2.fieldType(field);

        if (field.required === true) {
          obj[field.name] = obj[field.name].required();
        }

        return obj;
      }, {}));
    }
  }]);

  return SchemaBuilder;
}();

exports.default = SchemaBuilder;
//# sourceMappingURL=schema-builder.js.map

/***/ }),

/***/ "./dist/validator/validator.js":
/*!*************************************!*\
  !*** ./dist/validator/validator.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _joi = _interopRequireDefault(__webpack_require__(/*! @hapi/joi */ "@hapi/joi"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

var _mergeContentModelExtensions = _interopRequireDefault(__webpack_require__(/*! ../utils/merge-content-model-extensions */ "./dist/utils/merge-content-model-extensions.js"));

var _loaders = __webpack_require__(/*! ../loaders */ "./dist/loaders/index.js");

var _modelSchema = _interopRequireDefault(__webpack_require__(/*! ./model-schema */ "./dist/validator/model-schema.js"));

var _schemaBuilder = _interopRequireDefault(__webpack_require__(/*! ./schema-builder */ "./dist/validator/schema-builder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator(dirPath, renderer) {
    _classCallCheck(this, Validator);

    this.dirPath = dirPath;
    this.renderer = renderer;
    this.errors = [];
  }

  _createClass(Validator, [{
    key: "validate",
    value: function validate() {
      var _this = this;

      this.renderer.stage('Loading Theme');
      this.step("Loading ".concat(this.dirPath), function () {
        var loadErr;

        try {
          _this.site = (0, _loaders.loadSite)({
            inputDir: _this.dirPath
          });
        } catch (err) {
          loadErr = err;
        }

        _this.assert(_lodash.default.isEmpty(loadErr), loadErr);

        _this.assert(_this.site, "Error loading theme at ".concat(_this.dirPath));
      });

      if (this.site) {
        this.renderer.stage('Validating Model');
        this.models = (0, _mergeContentModelExtensions.default)(this.site.stackbitYaml.models);
        this.modelsByName = _lodash.default.keyBy(this.models, 'name');

        var pageModels = _lodash.default.filter(this.models, {
          'type': 'page'
        });

        var dataModels = _lodash.default.filter(this.models, {
          'type': 'data'
        });

        var configModels = _lodash.default.filter(this.models, {
          'type': 'config'
        });

        this.validateStackbitYaml();
        this.renderer.stage('Validating Data');
        this.step(this.site.config.relPath, function () {
          _this.validateConfig(configModels, _this.site.config);
        });
        (this.site.dataFiles || []).forEach(function (dataFile) {
          _this.step(dataFile.relPath, function () {
            _this.validateDataFile(dataModels, dataFile);
          });
        });

        var pageModelNameByPageFilePath = _utils.default.getPageModelNameByPageFilePath(this.site, pageModels, _lodash.default.noop, _lodash.default.noop);

        (this.site.pages || []).forEach(function (page) {
          _this.step(page.relPath, function () {
            var modelName = pageModelNameByPageFilePath[page.relPath];

            var model = _lodash.default.get(_this.modelsByName, modelName);

            _this.assertModelMap(page, model ? [model] : null);

            if (model) {
              _this.validatePage(model, page);
            }
          });
        });
      }

      this.renderer.results(this.errors);
    }
  }, {
    key: "isValid",
    value: function isValid() {
      return _lodash.default.isEmpty(this.errors);
    }
  }, {
    key: "assert",
    value: function assert(condition, message) {
      if (!condition) {
        this.errors.push(message);
      }

      return condition;
    }
  }, {
    key: "assertModelMap",
    value: function assertModelMap(obj, models) {
      this.assert(!_lodash.default.isEmpty(models), "Couldn't find file in content model");
      this.assert(_lodash.default.isEmpty(models) || models.length === 1, "Appears multiple times in content model");
    }
  }, {
    key: "step",
    value: function step(name, wrappedFunc) {
      var numInitialErrors = this.errors.length;
      wrappedFunc();
      var newErrors = this.errors.slice(numInitialErrors);
      this.renderer.step(name, newErrors);
    }
  }, {
    key: "validateSchema",
    value: function validateSchema(key, val, schema) {
      var result = _joi.default.validate(val, schema, Object.assign({
        abortEarly: false,
        context: {
          modelNames: Object.keys(this.modelsByName)
        }
      }));

      if (result.error) {
        var _this$errors;

        var messages = (result.error.details || []).map(function (err) {
          return "[".concat(err.path.join('.'), "] ").concat(err.message);
        });

        (_this$errors = this.errors).push.apply(_this$errors, _toConsumableArray(messages));
      }
    }
  }, {
    key: "validateModelSchema",
    value: function validateModelSchema(context, model) {
      var modelSchemas = {
        page: _modelSchema.default.PageModel,
        object: _modelSchema.default.ObjectModel,
        data: _modelSchema.default.DataModel,
        config: _modelSchema.default.ConfigModel
      };

      var schema = _lodash.default.get(modelSchemas, model.type);

      if (schema) {
        this.validateSchema(context, model, schema);
      }
    }
  }, {
    key: "validateStackbitYaml",
    value: function validateStackbitYaml() {
      var _this2 = this;

      this.step('stackbit.yml', function () {
        _this2.validateSchema('stackbit.yml', _this2.site.stackbitYaml, _modelSchema.default.StackbitYaml);
      });
      this.models.forEach(function (model) {
        _this2.step(model.name, function () {
          _this2.validateModelSchema(model.name, _lodash.default.omit(model, ['name']));

          _this2.validateModelFields(model);
        });
      });
    }
  }, {
    key: "validateModelFields",
    value: function validateModelFields(model, fieldPath) {
      var _this3 = this;

      var fields = _lodash.default.get(this.modelsByName, model.type, {}).fields || model.fields;
      var keyPrefix = _lodash.default.isEmpty(fieldPath) ? '' : "".concat(fieldPath, ".");

      if (!_lodash.default.isEmpty(model.labelField) && _lodash.default.isString(model.labelField) && !model.models) {
        this.assert(!_lodash.default.isEmpty(fields) && _lodash.default.isArray(fields) && !_lodash.default.isEmpty(fields.filter(function (field) {
          return field.name === model.labelField && field.type === 'string';
        })), "[".concat(keyPrefix, "labelField] \"labelField\" must reference a valid field of type \"string\""));
      }

      if (_lodash.default.isArray(model.fields)) {
        model.fields.forEach(function (field, i) {
          return _this3.validateModelFields(field, "".concat(keyPrefix, "fields.").concat(i));
        });
      }

      if (model.items) {
        this.validateModelFields(model.items, "".concat(keyPrefix, "items"));
      }
    }
  }, {
    key: "validateDataFile",
    value: function validateDataFile(models, dataFile) {
      var _this4 = this;

      var dataModels = _lodash.default.filter(models, function (model) {
        return model.file === dataFile.relPath;
      });

      this.assertModelMap(dataFile, dataModels);

      if (dataModels.length === 1) {
        var schema = new _schemaBuilder.default(dataModels[0], this.modelsByName, function (condition, message) {
          return _this4.assert(condition, message);
        }).build();
        this.validateSchema(dataFile.relPath, dataFile.data, schema);
      }
    }
  }, {
    key: "validateConfig",
    value: function validateConfig(models, config) {
      var _this5 = this;

      this.assertModelMap(config, models);

      if (models.length === 1) {
        var schema = new _schemaBuilder.default(models[0], this.modelsByName, function (condition, message) {
          return _this5.assert(condition, message);
        }).build();
        this.validateSchema(config.relPath, config.data.params, schema);
      }
    }
  }, {
    key: "validatePage",
    value: function validatePage(model, page) {
      var _this6 = this;

      var schema = new _schemaBuilder.default(model, this.modelsByName, function (condition, message) {
        return _this6.assert(condition, message);
      }).build();
      this.validateSchema(page.relPath, _lodash.default.omit(page.params, [this.site.pageTemplateKey || 'template', 'menus']), schema);
      this.assert(!(model.hideContent && !_lodash.default.isEmpty(page.markdown)), "Unexpected content with \"hideContent: true\"");

      var pageTemplate = _lodash.default.get(page.params, this.site.pageTemplateKey);

      if (_lodash.default.isEmpty(pageTemplate)) {
        this.assert(!_lodash.default.isEmpty(pageTemplate), "[".concat(this.site.pageTemplateKey, "] template parameter is required"));
      } else {
        this.assert(model.template === pageTemplate, "Template mismatch \"".concat(model.template, " != ").concat(pageTemplate, "\""));
      }
    }
  }]);

  return Validator;
}();

exports.default = Validator;
;
//# sourceMappingURL=validator.js.map

/***/ }),

/***/ "@hapi/joi":
/*!****************************!*\
  !*** external "@hapi/joi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@hapi/joi");

/***/ }),

/***/ "@iarna/toml":
/*!******************************!*\
  !*** external "@iarna/toml" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@iarna/toml");

/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "chokidar":
/*!***************************!*\
  !*** external "chokidar" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chokidar");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "figures":
/*!**************************!*\
  !*** external "figures" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("figures");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "js-yaml":
/*!**************************!*\
  !*** external "js-yaml" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("js-yaml");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "marked":
/*!*************************!*\
  !*** external "marked" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("marked");

/***/ }),

/***/ "micromatch":
/*!*****************************!*\
  !*** external "micromatch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("micromatch");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "node-sass":
/*!****************************!*\
  !*** external "node-sass" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-sass");

/***/ }),

/***/ "nunjucks":
/*!***************************!*\
  !*** external "nunjucks" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nunjucks");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "prettier":
/*!***************************!*\
  !*** external "prettier" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prettier");

/***/ }),

/***/ "sprintf-js":
/*!*****************************!*\
  !*** external "sprintf-js" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sprintf-js");

/***/ }),

/***/ "strftime":
/*!***************************!*\
  !*** external "strftime" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("strftime");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ }),

/***/ "yargs":
/*!************************!*\
  !*** external "yargs" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("yargs");

/***/ })

/******/ });