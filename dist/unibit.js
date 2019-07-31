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

/***/ "./dist/downloader/index.js":
/*!**********************************!*\
  !*** ./dist/downloader/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = download;

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _ora = _interopRequireDefault(__webpack_require__(/*! ora */ "ora"));

var _downloadGitRepo = _interopRequireDefault(__webpack_require__(/*! download-git-repo */ "download-git-repo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function download(repository, name) {
  var destination = _path.default.resolve(process.cwd(), name);

  var spinner = (0, _ora.default)("Creating new site into ".concat(destination)).start();

  if (_fs.default.existsSync(destination)) {
    spinner.fail("Could not create new site. Directory already exists at ".concat(destination, "!"));
    process.exit(1);
  }

  (0, _downloadGitRepo.default)(repository, name, function (err) {
    if (err) {
      spinner.fail('Could not create new site. Please try again');
      process.exit(1);
    } else {
      spinner.succeed("New site created into ".concat(destination));
    }
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

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

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

var _site = _interopRequireDefault(__webpack_require__(/*! ../models/site */ "./dist/models/site.js"));

var _consts = _interopRequireDefault(__webpack_require__(/*! ./consts */ "./dist/loaders/consts.js"));

var ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _modelsLoader = _interopRequireDefault(__webpack_require__(/*! ../utils/models-loader */ "./dist/utils/models-loader.js"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    this.inputDir = _path.default.resolve(this.inputDir);
    this.assert(_fs.default.existsSync(this.inputDir), "input directory '".concat(this.inputDir, "' does not exist"));

    var stackbitYamlPath = _utils.default.getFirstExistingFileSync(_consts.default.STACKBIT_YAML_NAMES, this.inputDir);

    this.stackbitYamlFileName = _path.default.basename(stackbitYamlPath);
    this.stackbitYaml = this.loadStackbitYaml(stackbitYamlPath);

    var ssgName = _lodash.default.get(this.stackbitYaml, 'ssgName', 'unibit');

    this.ssgConsts = _lodash.default.cloneDeep(ssgConsts.ssgConstsForSSGType(ssgName));
    options = _lodash.default.assign({}, this.ssgConsts, _lodash.default.pick(this.stackbitYaml, ['ssgName', 'ssgVersion', 'buildCommand', 'publishDir', 'injectLocations', 'dataDir', 'pagesDir', 'staticDir', 'pageLayoutKey', 'pageMenusKey', 'layoutsDir', 'componentsDir']), options);

    var layoutsDir = _lodash.default.get(options, 'layoutsDir', null);

    var componentsDir = _lodash.default.get(options, 'componentsDir', null);

    var pageLayoutKey = _lodash.default.get(options, 'pageLayoutKey');

    this.ssgName = _lodash.default.get(options, 'ssgName');
    this.ssgVersion = _lodash.default.get(options, 'ssgVersion');
    this.configFilePaths = _lodash.default.get(options, 'configFilePaths');
    this.dataDir = _lodash.default.get(options, 'dataDir', '');
    this.pagesDir = _lodash.default.get(options, 'pagesDir');
    this.staticDir = _lodash.default.get(options, 'staticDir');
    this.pageLayoutKey = Boolean(pageLayoutKey) ? pageLayoutKey : null;
    this.pageMenusKey = _lodash.default.get(options, 'pageMenusKey');
    this.layoutsDir = _lodash.default.isNull(layoutsDir) ? null : _path.default.resolve(this.inputDir, layoutsDir);
    this.componentsDir = _lodash.default.isNull(componentsDir) ? null : _path.default.resolve(this.inputDir, componentsDir);
    this.publishDir = _lodash.default.get(options, 'publishDir');
    this.buildCommand = _lodash.default.get(options, 'buildCommand');
    this.injectLocations = _lodash.default.get(options, 'injectLocations', null);

    _lodash.default.defaults(this.stackbitYaml, {
      ssgName: this.ssgName,
      publishDir: this.publishDir,
      buildCommand: this.buildCommand,
      injectLocations: this.injectLocations
    });

    _utils.default.logObject(options, "Configuration");
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
    /**
     * @return {Site}
     */

  }, {
    key: "loadSite",
    value: function loadSite() {
      console.log("[".concat(this.constructor.name, "] loading site from ").concat(this.inputDir));
      var data = {
        absPath: this.inputDir,
        ssgName: this.ssgName,
        ssgVersion: this.ssgVersion,
        staticDir: this.staticDir,
        dataDir: this.dataDir,
        pagesDir: this.pagesDir,
        pageLayoutKey: this.pageLayoutKey,
        pageMenusKey: this.pageMenusKey,
        config: this.loadConfig(),
        stackbitYamlFileName: this.stackbitYamlFileName,
        stackbitYaml: this.stackbitYaml,
        dataFiles: this.loadData(),
        layouts: this.loadLayouts(),
        components: this.loadComponents(),
        pages: this.loadPages()
      };
      data.menuItems = this.createMenuItems(data);
      return new _site.default(data);
    }
  }, {
    key: "loadConfig",
    value: function loadConfig() {
      if (!this.configFilePaths) {
        return null;
      }

      var absPath = _utils.default.getFirstExistingFileSync(this.configFilePaths, this.inputDir);

      this.assert(absPath, "could not find configuration file ".concat(this.configFilePaths.join(', ')));
      console.log("[".concat(this.constructor.name, "] loading config from: ").concat(absPath));
      return {
        absPath: absPath,
        relPath: _path.default.relative(this.inputDir, absPath),
        data: _utils.default.parseFileSync(absPath)
      };
    }
  }, {
    key: "loadStackbitYaml",
    value: function loadStackbitYaml(stackbitYamlPath) {
      if (!stackbitYamlPath) {
        return {};
      }

      console.log("[".concat(this.constructor.name, "] loading ").concat(stackbitYamlPath));

      var stackbitYaml = _utils.default.parseFileSync(stackbitYamlPath); // for backward compatibility: templatesDir => layoutsDir


      _utils.default.rename(stackbitYaml, 'templatesDir', 'layoutsDir'); // for backward compatibility: pageTemplateKey => pageLayoutKey


      _utils.default.rename(stackbitYaml, 'pageTemplateKey', 'pageLayoutKey'); // for backward compatibility: version => ssgVersion


      _utils.default.rename(stackbitYaml, 'version', 'ssgVersion');

      return stackbitYaml;
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this = this;

      var models = (0, _modelsLoader.default)(this.stackbitYaml.models);

      var dataModels = _lodash.default.filter(models, {
        'type': 'data'
      });

      var allowedExtensions = ['yaml', 'yml', 'toml', 'json'];
      return _lodash.default.chain(dataModels).map(function (dataModel) {
        var filePath = dataModel.file;

        var extension = _path.default.extname(filePath).substring(1);

        _this.assert(_lodash.default.includes(allowedExtensions, extension), "data file extension not allowed, extension: ".concat(extension, ", model: ").concat(dataModel.name, ", file: ").concat(filePath));

        var absFilePath = _path.default.resolve(_this.inputDir, _this.dataDir, filePath);

        if (!_fs.default.existsSync(absFilePath)) {
          return null;
        }

        console.log("[".concat(_this.constructor.name, "] loading data file from: ").concat(absFilePath));

        var pathObject = _path.default.parse(filePath);

        var data = _utils.default.parseFileSync(absFilePath);

        return {
          absPath: absFilePath,
          relPath: filePath,
          basename: pathObject.base,
          filename: pathObject.name,
          data: data
        };
      }).compact().value();
    }
  }, {
    key: "loadLayouts",
    value: function loadLayouts() {
      if (!this.layoutsDir) {
        return [];
      }

      console.log("[".concat(this.constructor.name, "] loading layouts from: ").concat(this.layoutsDir));
      return this.loadFiles(this.layoutsDir);
    }
  }, {
    key: "loadComponents",
    value: function loadComponents() {
      if (!this.componentsDir) {
        return [];
      }

      console.log("[".concat(this.constructor.name, "] loading components from: ").concat(this.componentsDir));
      return this.loadFiles(this.componentsDir);
    }
  }, {
    key: "loadFiles",
    value: function loadFiles(dirPath) {
      var _this2 = this;

      var files = [];

      _fs.default.readdirSync(dirPath).forEach(function (fileName) {
        var filePath = _path.default.resolve(dirPath, fileName);

        var fileStat = _fs.default.statSync(filePath);

        if (fileStat.isFile()) {
          var component = _this2.loadFile(filePath, dirPath);

          files.push(component);
        } else {
          _this2.fail("directory '".concat(dirPath, "' must include files only"));
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
      if (_lodash.default.isNil(this.pagesDir)) {
        this.fail("Could not find the pages directory. \n    ".concat(_chalk.default.cyan("Please define the directory where your content is located. Typically this is the folder with your .md files. \n    Set a value for \"pagesDir\" in the stackbit.yaml")));
      }

      var absPagesDir = _path.default.resolve(this.inputDir, this.pagesDir);

      var ignoredFiled = ['node_modules'];
      console.log("[".concat(this.constructor.name, "] loading pages from: ").concat(absPagesDir));
      return this.processPageDir(absPagesDir, ignoredFiled);
    }
  }, {
    key: "processPageDir",
    value: function processPageDir(pageDir, ignoredFiles) {
      var _this3 = this;

      var pages = [];

      _fs.default.readdirSync(pageDir).forEach(function (fileName) {
        var filePath = _path.default.resolve(pageDir, fileName);

        var fileStat = _fs.default.statSync(filePath);

        if (fileStat.isDirectory()) {
          if (_lodash.default.includes(ignoredFiles, fileName)) {
            return;
          }

          pages = pages.concat(_this3.processPageDir(filePath, ignoredFiles));
        } else if (fileStat.isFile()) {
          var page = _this3.parsePageForFilePath(filePath);

          if (page) {
            pages.push(page);
          }
        } else {
          _this3.fail("page file type is not supported: ".concat(filePath));
        }
      });

      return pages;
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
    key: "createMenuItems",
    value: function createMenuItems(data) {
      var siteMenuItems = this.getSiteMenus(data);
      var pageMenuItems = this.getPageMenus(data);
      return _lodash.default.chain(siteMenuItems).concat(pageMenuItems).compact().value();
    }
  }, {
    key: "getSiteMenus",
    value: function getSiteMenus(data) {
      return null;
    }
  }, {
    key: "getPageMenus",
    value: function getPageMenus(data) {
      var _this4 = this;

      var pageMenuItems = [];

      _lodash.default.forEach(data.pages, function (page) {
        pageMenuItems = pageMenuItems.concat(_this4.getPageMenuItems(page));
      });

      return pageMenuItems;
    }
  }, {
    key: "getPageMenuItems",
    value: function getPageMenuItems(page) {
      var menus = _lodash.default.get(page, this.pageMenusKey, null);

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

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _figures = _interopRequireDefault(__webpack_require__(/*! figures */ "figures"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

var _unibitLoader = _interopRequireDefault(__webpack_require__(/*! ./unibit-loader */ "./dist/loaders/unibit-loader.js"));

var _consts = _interopRequireDefault(__webpack_require__(/*! ./consts */ "./dist/loaders/consts.js"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loaderMap = {
  unibit: _unibitLoader.default
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

  var ssgName = _lodash.default.get(stackbitYaml, 'ssgName');

  if (!ssgName) {
    ssgName = 'unibit';
    console.log("ssgName: ".concat(_chalk.default.magenta(ssgName), " ").concat(_chalk.default.gray("(\"ssgName\" was not defined in the ".concat(_consts.default.STACKBIT_YAML, " so a default value of \"ssgName: unibit\" has been assigned. If this theme is not built with Unibit you should set this value to \"ssgName: custom\" in the stackbit.yaml to avoid incorrect default settings.)")), "\n "));
  } else {
    console.log("ssgName: ".concat(_chalk.default.magenta(ssgName), "\n "));
  }

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
  if (_lodash.default.has(loaderMap, ssgName)) {
    return _lodash.default.get(loaderMap, ssgName);
  } else {
    // throw new Error(`loader for ${ssgName} is not implemented`);
    return _baseLoader.default;
  }
}
//# sourceMappingURL=index.js.map

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

var _fs = _interopRequireDefault(__webpack_require__(/*! fs */ "fs"));

var _fsExtra = _interopRequireDefault(__webpack_require__(/*! fs-extra */ "fs-extra"));

var _path = _interopRequireDefault(__webpack_require__(/*! path */ "path"));

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var ssgConsts = _interopRequireWildcard(__webpack_require__(/*! ../ssg-converters/consts */ "./dist/ssg-converters/consts.js"));

var _baseLoader = _interopRequireDefault(__webpack_require__(/*! ./base-loader */ "./dist/loaders/base-loader.js"));

var _base = _interopRequireDefault(__webpack_require__(/*! ../unibit/supporting-files/base.html */ "./dist/unibit/supporting-files/base.html.js"));

var _utils = _interopRequireDefault(__webpack_require__(/*! ../utils */ "./dist/utils/index.js"));

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

  function UnibitLoader(options) {
    var _this;

    _classCallCheck(this, UnibitLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnibitLoader).call(this, options)); // For backward compatibility check if theme has templates folder instead layouts

    if (!_fsExtra.default.pathExistsSync(_this.layoutsDir)) {
      var templatesPath = _path.default.resolve(_this.inputDir, 'templates');

      if (_fsExtra.default.pathExistsSync(templatesPath)) {
        _this.layoutsDir = templatesPath;
      }
    }

    return _this;
  }

  _createClass(UnibitLoader, [{
    key: "loadData",
    value: function loadData() {
      // Here we override the BaseLoader loadData() method because loading
      // data files in Unibit is different. All data files inside the
      // "data" folder are data files. As a consequence, all these data files
      // must have matching model in stackbit.yaml
      var absDataDir = _path.default.resolve(this.inputDir, ssgConsts.UNIBIT.dataDir);

      if (!_fs.default.existsSync(absDataDir)) {
        return [];
      }

      console.log("[".concat(this.constructor.name, "] loading data from: ").concat(absDataDir));
      var allowedExtensions = ['yaml', 'yml', 'toml', 'json'];

      var files = _utils.default.readDirRecSync(absDataDir);

      return _lodash.default.chain(files).filter(function (filePath) {
        return _lodash.default.includes(allowedExtensions, _path.default.extname(filePath).substring(1));
      }).map(function (filePath) {
        var relFilePath = _path.default.relative(absDataDir, filePath);

        var pathObject = _path.default.parse(relFilePath);

        var data = _utils.default.parseFileSync(filePath);

        return {
          absPath: filePath,
          relPath: relFilePath,
          basename: pathObject.base,
          filename: pathObject.name,
          data: data
        };
      }).value();
    }
  }, {
    key: "loadLayouts",
    value: function loadLayouts() {
      var layouts = _get(_getPrototypeOf(UnibitLoader.prototype), "loadLayouts", this).call(this);

      var baseLayoutFilePath = _path.default.resolve(this.layoutsDir, ssgConsts.BASE_LAYOUT_FILE_NAME);

      var pathObject = _path.default.parse(baseLayoutFilePath);

      layouts.push({
        absPath: baseLayoutFilePath,
        relPath: _path.default.relative(this.layoutsDir, baseLayoutFilePath),
        basename: pathObject.base,
        filename: pathObject.name,
        data: _base.default
      });
      return layouts;
    }
  }, {
    key: "parsePageForFilePath",
    value: function parsePageForFilePath(filePath) {
      var page = _get(_getPrototypeOf(UnibitLoader.prototype), "parsePageForFilePath", this).call(this, filePath); // Backward compatibility of page.params.template with new page.params.layout


      _utils.default.rename(page, 'params.template', 'params.layout');

      return page;
    }
  }, {
    key: "getSiteMenus",
    value: function getSiteMenus(data) {
      var _this2 = this;

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

          _this2.assert(url, "menu item defined in config file must have \"url\" field");

          _this2.assert(title, "menu item defined in config file must have \"title\" field");

          _this2.assert(identifier, "menu item defined in config file must have \"identifier\" field");

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

var siteProps = ['absPath', 'ssgName', 'ssgVersion', 'staticDir', 'dataDir', 'pagesDir', 'pageLayoutKey', 'pageMenusKey', 'config', 'stackbitYamlFileName', 'stackbitYaml', 'dataFiles', 'layouts', 'components', 'pages', 'menuItems'];
/**
 * @class Site
 *
 * @property {string} absPath
 *   Absolute path of the root folder of this theme (set automatically)
 *
 * @property {string} ssgName
 *   The name of the Static Site Generator of this theme
 *
 * @property {string} ssgVersion
 *   The version of the Static Site Generator
 *
 * @property {string} staticDir
 *
 * @property {string} dataDir
 *
 * @property {string} pagesDir
 *   The folder, relative to project root, where all markdown pages are located
 *
 * @property {string} pageLayoutKey
 *   The name of the key referencing the layout file of the page
 *
 * @property {string} pageMenusKey
 *
 * @property {object} config
 *
 * @property {string} stackbitYamlFileName
 *
 * @property {object} stackbitYaml
 *
 * @property {array} dataFiles
 *
 * @property {array} layouts
 *
 * @property {array} components
 *
 * @property {array} pages
 *
 * @property {object} menus
 *
 * @property {array} menuNames
 *
 * @property {object} menusByName
 *
 * @property {array} pages
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
      _lodash.default.merge(siteData, this.createMenusFromMenuItems(siteData.menuItems));
    }
  }, {
    key: "createMenusFromMenuItems",
    value: function createMenusFromMenuItems(menuItems) {
      var _this2 = this;

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
            _this2.fail("A menu item identifier must be unique");
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

var _downloader = _interopRequireDefault(__webpack_require__(/*! ../downloader */ "./dist/downloader/index.js"));

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
      defaultDescription: 'Displays the Stackbit theme banner'
    },
    'ugly-urls': {
      describe: 'Generate ugly urls',
      boolean: true,
      defaultDescription: 'When this flag is missing, Unibit generates pretty URLs by default, unless uglyUrls defined in config.yaml'
    }
  }).alias('h', 'help');
};

var argv = _yargs.default.usage('Usage: $0 <command> [options]').command('build', 'Build site', buildOptions).command('develop', 'Develop site', buildOptions).command('init [path]', 'Initialize new site', function (yargs) {
  yargs.positional('path', {
    describe: 'Initializes new starter site in the provided directory',
    default: 'unibit-universal'
  });
}).command('validate', 'Validate theme', function (yargs) {
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
    uglyUrls: argv.uglyUrls,
    watch: command === 'develop'
  });
  unibit.generate();
} else if (command === 'validate') {
  var validator = new _validator.default(argv.inputDir, new _consoleRenderer.default());
  validator.validate();

  if (!validator.isValid()) {
    process.exit(1);
  }
} else if (command === 'init') {
  new _downloader.default('github:stackbithq/stackbit-theme-universal', argv.path);
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
exports.BUILD_SCRIPT = exports.UNIBIT = exports.GATSBY = exports.HUGO = exports.JEKYLL = exports.BODY_LAYOUT_FILE_NAME = exports.BASE_LAYOUT_FILE_NAME = exports.POST_BODY_COMPONENT_FILE_NAME = exports.HTML_HEAD_COMPONENT_FILE_NAME = exports.SSG_TYPES = void 0;

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
var BASE_LAYOUT_FILE_NAME = 'base.html';
exports.BASE_LAYOUT_FILE_NAME = BASE_LAYOUT_FILE_NAME;
var BODY_LAYOUT_FILE_NAME = 'body.html';
exports.BODY_LAYOUT_FILE_NAME = BODY_LAYOUT_FILE_NAME;
var BUILD_SCRIPT = './ssg-build.sh';
exports.BUILD_SCRIPT = BUILD_SCRIPT;
var JEKYLL = {
  ssgName: SSG_TYPES.JEKYLL,
  ssgVersion: '3.8.4',
  supportingFilesDirName: 'jekyll',
  configFilePaths: ['_config.yml', '_config.yaml', '_config.toml'],
  menusDataFilePath: 'menus.yml',
  dataDir: '_data',
  pagesDir: '',
  staticDir: '',
  pageLayoutKey: 'layout',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  layoutsDir: '_layouts',
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
  ssgVersion: '0.47',
  supportingFilesDirName: 'hugo',
  configFilePaths: ['config.yaml', 'config.yml', 'config.toml', 'config.json'],
  menusDataFilePath: null,
  dataDir: 'data',
  pagesDir: 'content',
  staticDir: 'static',
  pageLayoutKey: 'layout',
  pageMenusKey: 'menu',
  pageMenuTitleKey: 'name',
  layoutsDir: 'layouts/_default',
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
  ssgVersion: '2.3.30',
  supportingFilesDirName: 'gatsby',
  configFilePaths: ['site-metadata.json'],
  menusDataFilePath: 'menus.json',
  dataDir: 'src/data',
  pagesDir: 'src/pages',
  staticDir: 'static',
  pageLayoutKey: 'template',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  layoutsDir: 'src/templates',
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
  ssgVersion: '0.1.12',
  supportingFilesDirName: null,
  configFilePaths: ['config.yaml', 'config.yml'],
  menusDataFilePath: null,
  dataDir: 'data',
  pagesDir: 'content',
  staticDir: 'static',
  pageLayoutKey: 'layout',
  pageMenusKey: 'menus',
  pageMenuTitleKey: 'title',
  layoutsDir: 'layouts',
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
    // throw new Error(`Config for ${ssgType} is not implemented`);
    return {};
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
    // throw new Error(`Config transformer for ${ssgType} is not implemented`);
    return null;
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

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var _utils = __webpack_require__(/*! ../utils */ "./dist/utils/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startingPort = 5000;
var portTryPool = 10;
var logger = (0, _utils.createLogger)('LiveReload');
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

  _fsExtra.default.stat(pathname).then(function (stat) {
    if (stat.isDirectory()) {
      pathname = _path.default.join(pathname, 'index.html');
    }

    return _fsExtra.default.readFile(pathname);
  }).then(function (data) {
    var ext = _path.default.parse(pathname).ext;

    res.setHeader('Content-type', mimeType[ext] || 'text/plain');
    res.end(data);
  }).catch(function (err) {
    if (err && err.code === 'ENOENT') {
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
  logger.log('Reload page');
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
  logger.log("".concat(_lodash.default.capitalize(event), " ").concat(filePath));
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

    logger.log("Started server at http://localhost:".concat(server.port));
    var eventEmitter = new _events.default();

    var watcher = _chokidar.default.watch([], {
      ignoreInitial: true
    });

    watcher.on('change', function (filePath) {
      return fileDidChange('change', filePath, eventEmitter);
    }).on('add', function (filePath) {
      return fileDidChange('add', filePath, eventEmitter);
    }).on('unlink', function (filePath) {
      return fileDidChange('remove', filePath, eventEmitter);
    });
    logger.log("Start watching files at ".concat(inputDir));
    return {
      events: eventEmitter,
      reload: reload.bind(null, server.connections),
      configure: watcher.add.bind(watcher),
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
    {% if stackbit_banner.create_url %}
    <a
      class="theme-bar-button theme-bar-button-primary"
      href="{{ stackbit_banner.create_url }}"
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
    var _this = this;

    _classCallCheck(this, Unibit);

    this.logger = _utils.default.createLogger(this.constructor.name);
    this.prettierOptions = _lodash.default.get(options, 'prettier');
    this.inputDir = _lodash.default.get(options, 'inputDir');
    this.outputDir = _lodash.default.get(options, 'outputDir', 'output');
    this.uglyUrls = _lodash.default.get(options, 'uglyUrls');
    this.inputConfig = _lodash.default.get(options, 'config', {});
    this.withBanner = _lodash.default.get(options, 'withBanner');
    this.watch = _lodash.default.get(options, 'watch', false);
    this.logger.log("Generating site into ".concat(_path.default.resolve(this.outputDir)));

    _lodash.default.forEach(options, function (value, key) {
      _this.logger.log("  ".concat(key, ": ").concat(value));
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
      var site = this.loader.loadSite();

      var configData = _lodash.default.merge({}, site.config.data, this.inputConfig);

      var uglyUrls = typeof this.uglyUrls === 'boolean' ? this.uglyUrls : _lodash.default.get(configData, 'ugly_urls', false);
      this.site = site.clone({
        config: _lodash.default.assign({}, site.config, {
          data: configData
        }),
        pages: uglyUrls ? site.pages : site.pages.map(this.processUrl),
        menuItems: uglyUrls ? site.menuItems : site.menuItems.map(this.processUrl)
      });
      this.pages = _lodash.default.cloneDeep(this.site.pages);
      this.siteData = this.mergeData(this.site.dataFiles);
      this.showBanner = typeof this.withBanner === 'boolean' ? this.withBanner : _lodash.default.get(this.site, 'stackbitYaml.stackbit_banner.show_banner', false);
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
    key: "mergeData",
    value: function mergeData(dataFiles) {
      var siteData = {};

      _lodash.default.forEach(dataFiles, function (dataFile) {
        var pathObject = _path.default.parse(dataFile.relPath);

        var props = _lodash.default.chain(pathObject.dir).split(_path.default.sep).concat(pathObject.name).compact().value();

        _lodash.default.set(siteData, props, dataFile.data);
      });

      return siteData;
    }
  }, {
    key: "generate",
    value: function generate() {
      var _this2 = this;

      if (this.isGenerating) {
        this.enqueue = true;
        return Promise.resolve();
      }

      this.isGenerating = true;
      return Promise.resolve().then(function () {
        return _this2.watch && !_this2.watcher && _this2.registerWatcher();
      }).then(function () {
        var outputDir = _path.default.resolve(_this2.outputDir);

        _fsExtra.default.emptyDirSync(outputDir);

        _this2.pageRenderQueue = [];
        _this2.renderingPage = null;

        _this2.loadSite();

        _this2.copyStaticFiles();

        _this2.copySupportingFiles();

        _this2.compileSass();

        return _this2.generatePages();
      }).then(function () {
        _this2.isGenerating = false;

        if (_this2.enqueue) {
          _this2.enqueue = false;
          return _this2.generate();
        } else if (_this2.watcher) {
          _this2.reloadWatcher();
        }
      }).catch(function (err) {
        _this2.isGenerating = false;
        _this2.enqueue = false;

        _this2.logger.error(err.message);
      });
    }
  }, {
    key: "registerWatcher",
    value: function registerWatcher() {
      var _this3 = this;

      var inputDir = this.inputDir,
          outputDir = this.outputDir;
      return (0, _liveReload.default)({
        inputDir: inputDir,
        outputDir: outputDir
      }).then(function (watcher) {
        _this3.watcher = watcher;

        _this3.watcher.events.on('change', _lodash.default.debounce(_this3.generate.bind(_this3), 200));
      });
    }
  }, {
    key: "reloadWatcher",
    value: function reloadWatcher() {
      var _this4 = this;

      if (!this.watcher) {
        return;
      }

      var dirs = [this.site.pagesDir, this.site.dataDir, this.site.staticDir, this.site.stackbitYamlFileName, this.site.config.absPath, this.loader.componentsDir, this.loader.layoutsDir, 'sass'].filter(function (d) {
        return d;
      }).map(function (dir) {
        return _path.default.resolve(_this4.site.absPath, dir);
      });
      this.watcher.configure(dirs);
      this.watcher.reload();
    }
  }, {
    key: "processUrl",
    value: function processUrl(currentItem) {
      var item = _lodash.default.cloneDeep(currentItem);

      var url = item.url;

      var pathComponents = _path.default.parse(item.url);

      if (!url.startsWith('http') && !url.startsWith('//')) {
        if (pathComponents.base.match(/^index\.html?$/)) {
          item.url = item.url.replace(/index\.html?$/, '');
        } else if (pathComponents.ext.match(/\.html?$/)) {
          item.url = [pathComponents.dir, pathComponents.name].filter(function (p) {
            return p;
          }).join(_path.default.sep) + _path.default.sep;
        }
      }

      return item;
    }
  }, {
    key: "copySupportingFiles",
    value: function copySupportingFiles() {
      if (this.showBanner) {
        _fsExtra.default.copySync(_path.default.join(__dirname, './supporting-files/stackbit-banner.css'), _path.default.join(this.outputDir, '/assets/css/stackbit-banner.css'));
      }

      if (this.watch) {
        _fsExtra.default.copySync(_path.default.join(__dirname, './supporting-files/live-reload.js'), _path.default.join(this.outputDir, '/assets/js/live-reload.js'));
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
      var config = this.site.config.data;

      var sassOptions = _lodash.default.get(config, 'sass', null);

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
          this.logger.log('Converting sass file with Nunjucks: ' + inputFile);
          inputData = _fsExtra.default.readFileSync(inputFile, 'utf8');
          inputData = this.env.renderString(inputData, {
            site: {
              params: config.params
            }
          });
          inputFile = null;
        }

        this.logger.log('Compiling sass');

        try {
          var res = _nodeSass.default.renderSync({
            file: inputFile,
            data: inputData,
            includePaths: includePaths,
            indentWidth: _lodash.default.get(sassOptions, 'indentWidth', 4),
            outputStyle: _lodash.default.get(sassOptions, 'outputStyle', 'nested'),
            precision: _lodash.default.get(sassOptions, 'precision', 10)
          });

          _fsExtra.default.outputFileSync(outputFile, res.css);
        } catch (err) {
          throw new Error(err.formatted || err.message);
        }
      }
    }
  }, {
    key: "generatePages",
    value: function generatePages() {
      var _this5 = this;

      this.pages.forEach(function (page) {
        page.content = _this5.markdownify(page.markdown); // backward compatibility with template field

        if (_lodash.default.has(page, 'params.layout')) {
          page.template = page.params.layout;
          page.params.template = page.params.layout;
          page.frontmatter.template = page.params.layout;
        }
      });
      var pages = this.pages.filter(function (page) {
        return _lodash.default.get(_this5.site.config.data.output, page.relDir, true);
      });
      this.logger.log('Generating ' + pages.length + ' pages...');
      return _utils.default.forEachPromise(pages, function (page) {
        var context = _this5.createPageContext(page);

        return _this5.renderAndSavePage(context, page.url).then(function () {
          var pageRenderQueue = _lodash.default.remove(_this5.pageRenderQueue);

          return _utils.default.forEachPromise(pageRenderQueue, function (renderItem) {
            return _this5.renderAndSavePage(renderItem.context, renderItem.outputUrl);
          });
        });
      });
    }
  }, {
    key: "createPageContext",
    value: function createPageContext(page) {
      // this.logger.log('Generating page for ' + page.relPath);
      var config = this.site.config.data;
      var stackbitYaml = this.site.stackbitYaml;
      var env = this.env;
      var context = {
        site: {
          title: config.title,
          baseurl: config.baseurl,
          pages: this.pages,
          data: this.siteData,
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
      context.classNames = this.classNames.bind(this); // this.logger.log("context:\n" + JSON.stringify(context, null, 4));

      return context;
    }
  }, {
    key: "getStackbitBannerContext",
    value: function getStackbitBannerContext(stackbitYaml) {
      var stackbitBanner = _lodash.default.get(stackbitYaml, 'stackbit_banner');

      return _lodash.default.assign({
        component: 'stackbit-banner.html',
        name: this.site.config.data.title,
        create_url: "http://app.stackbit.com/create",
        github_url: ""
      }, stackbitBanner, {
        show_banner: this.showBanner
      });
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
    value: function renderAndSavePage(context, url) {
      var _this6 = this;

      this.assert(this.renderingPage === null, "Trying to generate two pages in parallel");
      var outputUrl = url.match(/\w+\.\w+$/) ? url : _path.default.join(url, 'index.html');
      this.renderingPage = {
        context: context,
        outputUrl: outputUrl
      };
      return this.renderPage(context).then(function (res) {
        _this6.renderingPage = null;

        _this6.savePage(res, outputUrl);
      });
    }
  }, {
    key: "renderPage",
    value: function renderPage(context) {
      var _this7 = this;

      var layoutFile = _lodash.default.get(context.page, ['params', this.site.pageLayoutKey], 'body') + '.html';
      return new Promise(function (resolve, reject) {
        _this7.env.render(layoutFile, context, function (err, res) {
          if (err) {
            _this7.logger.error("err:", err);

            reject(err);
          } else {
            //this.logger.log("result:\n" + res);
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
      var fileSystemLoader = new _nunjucks.default.FileSystemLoader([this.loader.layoutsDir, this.loader.componentsDir]);
      this.env = new _nunjucks.default.Environment([fileSystemLoader, new _unibitNunjucksLoader.default()]);
      this.env.addFilter('relative_url', this.relativeUrl.bind(this));
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
      var _this8 = this;

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

        _this8.addPageToRenderQueue(pageContext, outputUrl);
      });

      return pages[0];
    }
  }, {
    key: "relativeUrl",
    value: function relativeUrl(url) {
      if (_lodash.default.startsWith(url, '#') || _lodash.default.startsWith(url, 'http')) {
        return url;
      }

      var urlsRelativeToBase = _lodash.default.get(this.site.config.data, 'urls_relative_to_base', true);

      if (!urlsRelativeToBase && !_lodash.default.startsWith(url, '/')) {
        var pageDir = _path.default.parse(this.renderingPage.outputUrl).dir;

        this.assert(!_lodash.default.startsWith(pageDir, '/'), "error in relativeUrl, page dir can not be absolute");
        return _path.default.relative(pageDir, url);
      } else {
        var baseUrl = _lodash.default.get(this.site.config.data, 'baseurl', '');

        return _path.default.join(baseUrl, '/', url);
      }
    }
  }, {
    key: "markdownify",
    value: function markdownify(str) {
      if (_lodash.default.isString(str)) {
        return this.env.filters.safe((0, _marked.default)(str, {
          baseUrl: this.site.config.data.baseurl
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

var _chalk = _interopRequireDefault(__webpack_require__(/*! chalk */ "chalk"));

var _figures = _interopRequireDefault(__webpack_require__(/*! figures */ "figures"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = {
  forEachPromise: forEachPromise,
  promiseAllMap: promiseAllMap,
  copyFilesRecursively: copyFilesRecursively,
  copy: copy,
  copyDefault: copyDefault,
  rename: rename,
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
  getFirst: getFirst,
  getFirstExistingFileSync: getFirstExistingFileSync,
  parseFirstExistingFileSync: parseFirstExistingFileSync,
  parseFileSync: parseFileSync,
  parseDataByFilePath: parseDataByFilePath,
  outputDataSync: outputDataSync,
  stringifyDataByFilePath: stringifyDataByFilePath,
  deepFreeze: deepFreeze,
  failFunctionWithTag: failFunctionWithTag,
  assertFunctionWithFail: assertFunctionWithFail,
  createLogger: createLogger,
  logObject: logObject
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

function rename(object, oldPath, newPath) {
  if (_lodash.default.has(object, oldPath)) {
    _lodash.default.set(object, newPath, _lodash.default.get(object, oldPath));

    oldPath = _lodash.default.toPath(oldPath);

    if (oldPath.length > 1) {
      object = _lodash.default.get(object, _lodash.default.initial(oldPath));
    }

    delete object[_lodash.default.last(oldPath)];
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
 * Gets the value at the first path of object having non undefined value.
 * If all paths resolve to undefined values, the defaultValue is returned.
 *
 * @param {Object} object The object to query.
 * @param {Array<String | Array<String>>} paths The property paths to search for.
 * @param {*} [defaultValue] The value returned if all paths resolve to undefined values
 * @returns {*}
 */


function getFirst(object, paths, defaultValue) {
  var result = (0, _lodash.default)(object).at(paths).reject(_lodash.default.isUndefined).first();
  return _lodash.default.isUndefined(result) ? defaultValue : result;
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
  return _lodash.default.chain(fileNames).map(function (fileName) {
    return _path.default.resolve(inputDir, fileName);
  }).find(function (filePath) {
    return _fs.default.existsSync(filePath);
  }).value();
}

function parseFirstExistingFileSync(fileNames, inputDir) {
  var filePath = getFirstExistingFileSync(fileNames, inputDir);

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

function createLogger(scope, transport) {
  var levels = ['log', 'info', 'debug', 'error'];
  var logger = transport || console;

  var noop = function noop() {};

  var obj = {};
  levels.forEach(function (level) {
    obj[level] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (logger[level] || noop).apply(void 0, ["[".concat(scope, "]")].concat(args));
    };
  });
  return obj;
}

function logObject(object, title) {
  var label = title ? title : "";
  console.group(label);

  _lodash.default.forEach(object, function (value, key) {
    console.log("  ".concat(key, ": ").concat(_chalk.default.green(value)));
  });

  console.groupEnd(label);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/utils/map-pages-to-models.js":
/*!*******************************************!*\
  !*** ./dist/utils/map-pages-to-models.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinPathAndGlob = joinPathAndGlob;
exports.getPageModelNameByPageFilePath = getPageModelNameByPageFilePath;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _micromatch = _interopRequireDefault(__webpack_require__(/*! micromatch */ "micromatch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinPathAndGlob(pathStr, glob) {
  var globParts = _lodash.default.chain(glob).trim('{}').split(',').compact().map(function (globPart) {
    return _lodash.default.compact([pathStr, globPart]).join('/');
  }) // should use forward slash even on windows for micromatch
  .value();

  return globParts.length > 1 ? "{".concat(globParts.join(','), "}") : _lodash.default.head(globParts);
}

function getPageModelNameByPageFilePath(site, pageModels, assert, fail) {
  var result = {};

  _lodash.default.forEach(site.pages, function (page) {
    var pageFilePath = page.relPath;
    var pageLayout = null;

    if (site.pageLayoutKey) {
      pageLayout = _lodash.default.get(page, ['params', site.pageLayoutKey], null);
    }

    var matchedModels = _lodash.default.filter(pageModels, function (model) {
      if (_lodash.default.has(model, 'file')) {
        return _micromatch.default.isMatch(pageFilePath, model.file);
      } else {
        var folder = _lodash.default.get(model, 'folder', '');

        var match = _lodash.default.get(model, 'match', '**/*');

        var exclude = _lodash.default.get(model, 'exclude', null);

        match = joinPathAndGlob(folder, match);
        exclude = joinPathAndGlob(folder, exclude);
        var layoutMatch = true;

        if (pageLayout) {
          var modelLayout = _lodash.default.get(model, 'layout');

          assert(modelLayout, "page model must define 'layout' field when 'pageLayoutKey' is specified in stackbit.yaml, model: ".concat(model.name));
          layoutMatch = pageLayout === modelLayout;
        }

        return layoutMatch && _micromatch.default.isMatch(pageFilePath, match) && (!exclude || !_micromatch.default.isMatch(pageFilePath, exclude));
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
//# sourceMappingURL=map-pages-to-models.js.map

/***/ }),

/***/ "./dist/utils/model-extender.js":
/*!**************************************!*\
  !*** ./dist/utils/model-extender.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extendModels;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./index */ "./dist/utils/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fail = _index.default.failFunctionWithTag('extendContentModels');

var assert = _index.default.assertFunctionWithFail(fail);

function extendModels(models) {
  var memorized = _lodash.default.memoize(extendModel, function (model) {
    return model.name;
  });

  var modelsByName = _lodash.default.keyBy(models, 'name');

  return _lodash.default.map(models, function (model) {
    return memorized(model, modelsByName);
  });
}

function extendModel(model, modelsByName) {
  var _extendPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  assert(!_lodash.default.includes(_extendPath, model.name), "cyclic dependency detected in model extend tree: ".concat(_extendPath.join(' -> '), " -> ").concat(model.name));

  var _extends = _lodash.default.get(model, 'extends');

  var fields = _lodash.default.get(model, 'fields');

  if (!_extends) {
    return model;
  }

  if (!_lodash.default.isArray(_extends)) {
    _extends = [_extends];
    model.extends = _extends;
  }

  if (!fields) {
    fields = [];
    model.fields = fields;
  }

  _extendPath.push(model.name);

  _lodash.default.forEach(_extends, function (superModelName) {
    var superModel = _lodash.default.get(modelsByName, superModelName);

    assert(superModel, "model '".concat(model.name, "' extends non defined model '").concat(superModelName, "'"));
    assert(superModel.type === 'object', "only object model types can be extended");
    superModel = extendModel(superModel, modelsByName, _extendPath);

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
//# sourceMappingURL=model-extender.js.map

/***/ }),

/***/ "./dist/utils/models-loader.js":
/*!*************************************!*\
  !*** ./dist/utils/models-loader.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadModels;

var _lodash = _interopRequireDefault(__webpack_require__(/*! lodash */ "lodash"));

var _index = __webpack_require__(/*! ./index */ "./dist/utils/index.js");

var _modelExtender = _interopRequireDefault(__webpack_require__(/*! ./model-extender */ "./dist/utils/model-extender.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadModels(modelMap) {
  modelMap = _lodash.default.cloneDeep(modelMap);

  var models = _lodash.default.map(modelMap, function (model, modelName) {
    model.name = modelName;
    renameTemplateToLayout(model);
    addFieldLabelsIfNeeded(model);
    return model;
  });

  models = (0, _modelExtender.default)(models);
  return models;
}

function renameTemplateToLayout(model) {
  if (_lodash.default.get(model, 'type') === 'page') {
    (0, _index.rename)(model, 'template', 'layout');
  }
}

function addFieldLabelsIfNeeded(model) {
  var fields = _lodash.default.get(model, 'fields', []);

  _lodash.default.forEach(fields, function (field) {
    if (!_lodash.default.has(field, 'label')) {
      field.label = _lodash.default.startCase(field.name);
    }

    if (field.type === 'object') {
      addFieldLabelsIfNeeded(field);
    } else if (isListOfObjectsField(field)) {
      addFieldLabelsIfNeeded(_lodash.default.get(field, 'items'));
    }
  });
}

function isListOfObjectsField(field) {
  return _lodash.default.includes(['list', 'array'], field.type) && _lodash.default.get(field, 'items.type', 'string') === 'object';
}
//# sourceMappingURL=models-loader.js.map

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

var modelNamePattern = /^[a-z]([a-z0-9_]*[a-z0-9])?$/;
var modelNameError = 'Invalid model name: must contain only lower case alphanumeric characters and underscores, must start with a lower case letter, and end with alphanumeric character.';
var fieldNamePattern = /^[a-zA-Z0-9]([a-zA-Z0-9_-]*[a-zA-Z0-9])?$/;
var fieldNameError = 'Invalid field name: must contain only alphanumeric characters, hyphens and underscores, and must start and end with an alphanumeric character.';

var joiModelName = _joi.default.string().regex(modelNamePattern).error(function (errors) {
  return errors.map(function (err) {
    return "[".concat(err.context.value, "] ").concat(modelNameError);
  }).join('\n');
}).required();

var StackbitYaml = _joi.default.object({
  stackbitVersion: _joi.default.string().required(),
  ssgName: _joi.default.string().valid('unibit', 'jekyll', 'hugo', 'gatsby', 'custom'),
  ssgVersion: _joi.default.string(),
  init_js: _joi.default.string(),
  page_load_js: _joi.default.string(),
  uploadDir: _joi.default.string().required(),
  buildCommand: _joi.default.string().required(),
  publishDir: _joi.default.string().required(),
  collections: _joi.default.any(),
  injectLocations: _joi.default.any(),
  models: _joi.default.any(),
  dataDir: _joi.default.string().allow(''),
  pagesDir: _joi.default.string().allow('').required(),
  staticDir: _joi.default.string().allow('').required(),
  pageLayoutKey: _joi.default.string(),
  layoutsDir: _joi.default.string(),
  componentsDir: _joi.default.string(),
  sourceMapping: _joi.default.any(),
  metadata: _joi.default.any(),
  stackbit_banner: _joi.default.any()
});

var PageModel = _joi.default.object({
  name: joiModelName,
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  description: _joi.default.string(),
  layout: _joi.default.string().when(_joi.default.ref('$hasPageLayoutKey'), {
    is: true,
    then: _joi.default.required()
  }),
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
  extends: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$objectModelNames'))),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ObjectModel = _joi.default.object({
  name: joiModelName,
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  description: _joi.default.string(),
  labelField: _joi.default.string(),
  extends: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$objectModelNames'))),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var DataModel = _joi.default.object({
  name: joiModelName,
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  description: _joi.default.string(),
  file: _joi.default.string().required(),
  extends: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$objectModelNames'))),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ConfigModel = _joi.default.object({
  name: _joi.default.string().allow('config'),
  type: _joi.default.string().required(),
  label: _joi.default.string().required(),
  description: _joi.default.string(),
  extends: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$objectModelNames'))),
  fields: _joi.default.array().items(_joi.default.lazy(function () {
    return ModelField;
  }))
});

var ModelField = _joi.default.object({
  type: _joi.default.string().required(),
  name: _joi.default.string().regex(fieldNamePattern).error(function (errors) {
    return errors.map(function (err) {
      return "[".concat(err.context.value, "] ").concat(fieldNameError);
    }).join('\n');
  }).required(),
  label: _joi.default.string(),
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
  models: _joi.default.array().items(_joi.default.valid(_joi.default.ref('$objectModelNames'))),
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
          var options = field.options.map(function (option) {
            return _lodash.default.has(option, 'value') ? option.value : option;
          });
          return _joi.default.valid(options);
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

var _modelsLoader = _interopRequireDefault(__webpack_require__(/*! ../utils/models-loader */ "./dist/utils/models-loader.js"));

var _utils = __webpack_require__(/*! ../utils */ "./dist/utils/index.js");

var _mapPagesToModels = __webpack_require__(/*! ../utils/map-pages-to-models */ "./dist/utils/map-pages-to-models.js");

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
        try {
          _this.site = (0, _loaders.loadSite)({
            inputDir: _this.dirPath
          });
        } catch (err) {
          _this.errors.push(err);
        }

        _this.assert(_this.site, "Error loading theme at ".concat(_this.dirPath));
      });

      if (this.site) {
        this.renderer.stage('Validating Model');
        this.models = (0, _modelsLoader.default)(this.site.stackbitYaml.models);
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

        if (!_lodash.default.isEmpty(configModels)) {
          if (_lodash.default.get(this.site, "config.relPath")) {
            this.step(this.site.config.relPath, function () {
              _this.validateConfig(configModels, _this.site.config);
            });
          }
        }

        _lodash.default.forEach(this.site.dataFiles, function (dataFile) {
          _this.step(dataFile.relPath, function () {
            _this.validateDataFile(dataModels, dataFile);
          });
        });

        this.renderer.stage('Validating Pages');
        var pageModelNameByPageFilePath = null;
        this.step('matching pages to models', function () {
          try {
            pageModelNameByPageFilePath = (0, _mapPagesToModels.getPageModelNameByPageFilePath)(_this.site, pageModels, function (value, message) {
              if (!value) {
                throw new Error(message);
              }
            }, function (message) {
              throw new Error(message);
            });
          } catch (e) {
            _this.errors.push(e.message);
          }
        });

        _lodash.default.forEach(this.site.pages, function (page) {
          var modelName = _lodash.default.get(pageModelNameByPageFilePath, page.relPath);

          if (modelName) {
            var model = _lodash.default.get(_this.modelsByName, modelName);

            _this.step(model.name + ' ⇔ ' + page.relPath, function () {
              _this.validatePage(model, page);
            });
          }
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
    key: "error",
    value: function error(message) {
      this.errors.push(message);
    }
  }, {
    key: "assert",
    value: function assert(condition, message) {
      if (!condition) {
        this.error(message);
      }

      return condition;
    }
  }, {
    key: "assertModelMap",
    value: function assertModelMap(obj, models) {
      if (_lodash.default.isEmpty(models)) {
        this.error("Couldn't find model for file '".concat(obj.relPath, "'"));
      } else if (_lodash.default.size(models) > 1) {
        this.error("Found multiple models [".concat(_lodash.default.map(models, function (model) {
          return model.name;
        }).join(', '), "] for file '").concat(obj.relPath, "'"));
      }
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
          objectModelNames: _lodash.default.chain(this.models).filter(['type', 'object']).map('name').value(),
          hasPageLayoutKey: Boolean(this.site.pageLayoutKey)
        }
      }));

      if (result.error) {
        var _this$errors;

        var messages = (result.error.details || []).map(function (err) {
          return "[".concat((0, _utils.fieldPathToString)(err.path), "] ").concat(err.message);
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

      this.step('stackbit.yaml', function () {
        _this2.validateSchema('stackbit.yaml', _this2.site.stackbitYaml, _modelSchema.default.StackbitYaml);
      });
      this.models.forEach(function (model) {
        var context = 'models.' + model.name;

        _this2.step(context, function () {
          _this2.validateModelSchema(context, model);

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
        var configData = config.data;

        if (this.site.ssgName === 'unibit') {
          // in Unibit, config model defines the model of the params
          configData = configData.params;
        } else {
          // in non Unibit site, config model can skip root fields
          schema = schema.unknown();
        }

        this.validateSchema(config.relPath, configData, schema);
      }
    }
  }, {
    key: "validatePage",
    value: function validatePage(model, page) {
      var _this6 = this;

      var schema = new _schemaBuilder.default(model, this.modelsByName, function (condition, message) {
        return _this6.assert(condition, message);
      }).build();
      this.validateSchema(page.relPath, _lodash.default.omit(page.params, _lodash.default.compact([this.site.pageLayoutKey, 'menus'])), schema);
      this.assert(!(model.hideContent && !_lodash.default.isEmpty(page.markdown)), "Unexpected content with \"hideContent: true\""); // pageLayoutKey is not required to be defined in front-matter.
      // But if it is, it must equal to model.layout

      if (this.site.pageLayoutKey && _lodash.default.has(page.params, this.site.pageLayoutKey)) {
        var pageLayout = _lodash.default.get(page.params, this.site.pageLayoutKey);

        var modelLayout = _lodash.default.get(model, 'layout');

        this.assert(modelLayout === pageLayout, "layout mismatch (models[".concat(model.name, "].layout === '").concat(modelLayout, "') !== ").concat(pageLayout, " === ").concat(page.relPath, "[").concat(this.site.pageLayoutKey, "]"));
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

/***/ "download-git-repo":
/*!************************************!*\
  !*** external "download-git-repo" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("download-git-repo");

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

/***/ "ora":
/*!**********************!*\
  !*** external "ora" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ora");

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