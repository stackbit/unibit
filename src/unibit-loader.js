const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const moment = require('moment');
const micromatch = require('micromatch');

const {
    getFirstExistingFileSync,
    parseFileSync,
    readDirRecSync,
    parseMarkdownWithFrontMatter
} = require('./utils');
const { STACKBIT_YAML_NAMES, UNIBIT } = require('./consts');


module.exports = class UnibitLoader {

    /**
     * @param {Object} options
     * @param {string} options.inputDir
     */
    constructor(options) {
        this.inputDir = _.get(options, 'inputDir');
        this.assert(this.inputDir, `options.inputDir must be specified`);

        this.inputDir = path.resolve(this.inputDir);
        this.assert(fs.existsSync(this.inputDir), `input directory '${this.inputDir}' does not exist`);
    }

    fail(message) {
        throw new Error(`[${this.constructor.name}] ${message}`);
    }

    assert(value, message) {
        if (!value) {
            this.fail(message);
        }
    }

    loadSite(options) {
        console.log(`[${this.constructor.name}] loading site from ${this.inputDir}`);

        let stackbitYamlFileName = null;
        let stackbitYaml = {};
        const stackbitYamlPath = getFirstExistingFileSync(STACKBIT_YAML_NAMES, this.inputDir);
        if (stackbitYamlPath) {
            stackbitYamlFileName = path.basename(stackbitYamlPath);
            stackbitYaml = parseFileSync(stackbitYamlPath)
        }
        const config = this.loadConfig(_.get(options, 'config'));
        const uglyUrls = typeof _.get(options, 'uglyUrls') === 'boolean' ? _.get(options, 'uglyUrls') : _.get(config, 'ugly_urls', false);
        const dataFiles = this.loadData();
        const siteData = this.mergeData(dataFiles);
        const pages = this.loadPages({uglyUrls});
        const menuItems = this.createMenuItems({config, pages, uglyUrls});
        const menuData = this.createMenusFromMenuItems(menuItems);
        return {
            stackbitYamlFileName: stackbitYamlFileName,
            stackbitYaml: stackbitYaml,
            config: config,
            dataFiles: dataFiles,
            siteData: siteData,
            pages: pages,
            menuItems: menuItems,
            menus: menuData.menus,
            menusByName: menuData.menusByName,
            menuNames: menuData.menuNames
        };
    }

    loadConfig(config) {
        let absPath = getFirstExistingFileSync(UNIBIT.configFilePaths, this.inputDir);
        this.assert(absPath, `could not find configuration file ${UNIBIT.configFilePaths.join(', ')}`);
        console.log(`[${this.constructor.name}] loading config from: ${absPath}`);
        let data = _.merge(parseFileSync(absPath), config);
        return {
            absPath: absPath,
            relPath: path.relative(this.inputDir, absPath),
            data: data
        };
    }

    loadData() {
        let absDataDir = path.resolve(this.inputDir, UNIBIT.dataDir);
        if (!fs.existsSync(absDataDir)) {
            return [];
        }
        console.log(`[${this.constructor.name}] loading data from: ${absDataDir}`);
        let allowedExtensions = ['yaml', 'yml', 'toml', 'json'];
        let files = readDirRecSync(absDataDir);
        return _.chain(files)
            .filter(filePath => _.includes(allowedExtensions, path.extname(filePath).substring(1)))
            .map(filePath => {
                let relFilePath = path.relative(absDataDir, filePath);
                let pathObject = path.parse(relFilePath);
                let data = parseFileSync(filePath);
                return {
                    absPath: filePath,
                    relPath: relFilePath,
                    basename: pathObject.base,
                    filename: pathObject.name,
                    data: data
                };
            })
            .value();
    }

    mergeData(dataFiles) {
        let siteData = {};
        _.forEach(dataFiles, dataFile => {
            let pathObject = path.parse(dataFile.relPath);
            let props = _.chain(pathObject.dir).split(path.sep).concat(pathObject.name).compact().value();
            _.set(siteData, props, dataFile.data);
        });
        return siteData;
    }

    loadPages({uglyUrls}) {
        let absPagesDir = path.resolve(this.inputDir, UNIBIT.pagesDir);
        let excludePages = ['node_modules', '.git', '.DS_Store', UNIBIT.publishDir];
        console.log(`[${this.constructor.name}] loading pages from: ${absPagesDir}`);
        return this.processPageDir(absPagesDir, excludePages, uglyUrls);
    }

    processPageDir(pageDir, excludePages, uglyUrls) {
        const absPagesDir = path.resolve(this.inputDir, UNIBIT.pagesDir);
        let pages = [];
        fs.readdirSync(pageDir).forEach(fileName => {
            let filePath = path.resolve(pageDir, fileName);
            let relFilePath = path.relative(absPagesDir, filePath);
            if (_.some(excludePages, (exclude) => micromatch.isMatch(relFilePath, exclude))) {
                return;
            }
            let fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                pages = pages.concat(this.processPageDir(filePath, excludePages, uglyUrls));
            } else if (fileStat.isFile()) {
                let page = this.parsePageForFilePath(filePath, uglyUrls);
                if (page) {
                    pages.push(page);
                }
            } else {
                this.fail(`page file type is not supported: ${filePath}`);
            }
        });
        return pages;
    }

    parsePageForFilePath(filePath, uglyUrls) {
        const ext = path.extname(filePath);
        if (ext !== '.md') {
            return null;
        }
        let data = fs.readFileSync(filePath, 'utf8');
        let {frontmatter, markdown} = parseMarkdownWithFrontMatter(data);
        if (!frontmatter) {
            return null;
        }
        let absPagesDir = path.resolve(this.inputDir, UNIBIT.pagesDir);
        let pathObject = path.parse(filePath);
        let relDir = path.relative(absPagesDir, pathObject.dir);
        let url = path.join(relDir, pathObject.name + '.html');
        let date;
        if (frontmatter.date) {
            date = new Date(moment(frontmatter.date).toISOString());
        } else {
            date = new Date(fs.statSync(filePath).birthtimeMs);
        }

        // Backward compatibility of page.params.template with new page.params.layout
        if (_.has(frontmatter, 'layout')) {
            frontmatter.template = frontmatter.layout;
        } else if (_.has(frontmatter, 'template')) {
            frontmatter.layout = frontmatter.template;
        }

        // TODO: deprecate referencing frontmatter variables from page object
        //  frontmatter variables must be referenced from "params" or "frontmatter" fields
        return Object.assign({}, frontmatter, {
            absPath: filePath,
            relPath: path.relative(absPagesDir, filePath),
            absDir: pathObject.dir,
            relDir: relDir,
            url: this.prettyUrl(url, uglyUrls),
            basename: pathObject.base,
            filename: pathObject.name,
            date: date,
            params: frontmatter,
            frontmatter: frontmatter,
            markdown: markdown
        });
    }

    prettyUrl(url, uglyUrls) {
        if (uglyUrls) {
            return url;
        }
        const pathComponents = path.parse(url);
        if (!url.startsWith('http') && !url.startsWith('//')) {
            if (pathComponents.base.match(/^index\.html?$/)) {
                url = url.replace(/index\.html?$/, '');
            } else if (pathComponents.ext.match(/\.html?$/)) {
                url = _.compact([pathComponents.dir, pathComponents.name]).join(path.sep) + path.sep;
            }
        }
        return url;
    }

    createMenuItems({config, pages, uglyUrls}) {
        let siteMenuItems = this.getSiteMenus(config, uglyUrls);
        let pageMenuItems = this.getPageMenus(pages);
        return _.chain(siteMenuItems).concat(pageMenuItems).compact().value();
    }

    getSiteMenus(config, uglyUrls) {
        let menus = _.get(config.data, 'menus', null);

        if (!menus || !_.isPlainObject(menus)) {
            return null;
        }

        return _.flatMap(menus, (menu, menuName) => {
            return _.map(menu, (item, index) => {
                let url = _.get(item, 'url');
                let title = _.get(item, 'title');
                let identifier = _.get(item, 'identifier', `${menuName}_${index + 1}`);
                let weight = _.get(item, 'weight', null);

                this.assert(url, `menu item defined in config file must have "url" field`);
                this.assert(title, `menu item defined in config file must have "title" field`);
                this.assert(identifier, `menu item defined in config file must have "identifier" field`);

                let menuItem = {
                    menu: menuName,
                    title: title,
                    url: this.prettyUrl(url, uglyUrls),
                    identifier: identifier
                };

                if (weight !== null) {
                    menuItem.weight = _.toNumber(weight);
                }

                return menuItem;
            });
        });
    }

    getPageMenus(pages) {
        let pageMenuItems = [];
        _.forEach(pages, page => {
            pageMenuItems = pageMenuItems.concat(this.getPageMenuItems(page));
        });
        return pageMenuItems;
    }

    getPageMenuItems(page) {
        let menus = _.get(page, UNIBIT.pageMenusKey, null);

        if (!menus || !_.isPlainObject(menus)) {
            return [];
        }

        return _.map(menus, (menu, menuName) => {
            return {
                menu: menuName,
                title: _.get(menu, 'title', page.title),
                url: page.url,
                weight: _.toNumber(_.get(menu, 'weight', page.date.getTime())),
                identifier: _.get(menu, 'identifier', page.url),
                page: page
            };
        });
    }

    createMenusFromMenuItems(menuItems) {
        let rootMenus = {};
        let menusByName = {};
        let menuNames = [];

        _.forEach(menuItems, menuItem => {
            let menuName = menuItem.menu;
            let identifier = _.get(menuItem, 'identifier');
            let menu;

            if (!_.includes(menuNames, menuName)) {
                menuNames.push(menuName);
            }

            if (!_.has(menusByName, menuName)) {
                menu = [];
                rootMenus[menuName] = menu;
                menusByName[menuName] = menu;
            } else {
                menu = menusByName[menuName];
            }

            menuItem.children = [];

            // If child menu items of a parent menu were defined before the
            // parent menu itself, copy set children to the parent menu.
            if (_.has(menusByName, identifier)) {
                if (_.has(rootMenus, identifier)) {
                    menuItem.children = rootMenus[identifier];
                    delete rootMenus[identifier];
                } else {
                    this.fail(`A menu item identifier must be unique`);
                }
            }

            menusByName[identifier] = menuItem.children;

            if (_.has(menuItem, 'weight')) {
                let index = _.sortedLastIndexBy(menu, menuItem, 'weight');
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

}
