const path = require('path');
const fse = require('fs-extra');
const nunjucks = require('nunjucks');
const marked = require('marked');
const prettier = require('prettier');
const sass = require('node-sass');
const _ = require('lodash');

const liveReload = require('./live-reload');
const UnibitLoader = require('./unibit-loader');
const UnibitNunjucksLoader = require('./unibit-nunjucks-loader');
const filters = require('./filters');
const { forEachPromise, createLogger } = require('./utils');
const { UNIBIT } = require('./consts');


module.exports = class Unibit {

    constructor(options) {
        this.logger = createLogger(this.constructor.name);
        this.prettier = _.get(options, 'prettier');
        this.prettierOptions = _.get(options, 'prettierOptions');
        this.inputDir = _.get(options, 'inputDir');
        this.outputDir = _.get(options, 'outputDir', 'public');
        this.uglyUrls = _.get(options, 'uglyUrls');
        this.inputConfig = _.get(options, 'config', {});
        this.withBanner = _.get(options, 'withBanner');
        this.watch = _.get(options, 'watch', false);

        this.logger.log(`Generating site into ${path.resolve(this.outputDir)}`);
        _.forEach(options, (value, key) => {
            this.logger.log(`  ${key}: ${value}`);
        });

        this.watcher = null;
        this.isGenerating = false;
        this.enqueue = false;
        this.renderingPage = null;
        this.pageRenderQueue = [];
    }

    fail(message) {
        throw new Error(`[${this.constructor.name}] ${message}`);
    }

    assert(value, message) {
        if (!value) {
            this.fail(message);
        }
    }

    generate() {
        if (this.isGenerating) {
            this.enqueue = true;
            return Promise.resolve();
        }
        this.isGenerating = true;
        return Promise.resolve()
            .then(() => {
                if (this.watch && !this.watcher) {
                    return this.registerWatcher()
                }
            })
            .then(() => {
                const outputDir = path.resolve(this.outputDir);
                fse.emptyDirSync(outputDir);
                this.pageRenderQueue = [];
                this.renderingPage = null;
                const site = this.loadSite();
                this.copyStaticFiles();
                this.copySupportingFiles();
                this.compileSass(site);
                return this.generatePages(site).then(() => site);
            })
            .then((site) => {
                this.isGenerating = false;
                if (this.enqueue) {
                    this.enqueue = false;
                    return this.generate();
                } else if (this.watcher) {
                    this.reloadWatcher(site);
                }
            })
            .catch((err) => {
                this.isGenerating = false;
                this.enqueue = false;
                this.logger.error(err.message);
            })
    }

    registerWatcher() {
        return liveReload({
            inputDir: this.inputDir,
            outputDir: this.outputDir
        }).then((watcher) => {
            this.watcher = watcher;
            this.watcher.events.on('change', _.debounce(this.generate.bind(this), 200));
        });
    }

    reloadWatcher(site) {
        if (!this.watcher) {
            return;
        }

        const dirs = _.compact([
            site.stackbitYamlFileName,
            site.config.absPath,
            UNIBIT.pagesDir,
            UNIBIT.dataDir,
            UNIBIT.staticDir,
            UNIBIT.componentsDir,
            UNIBIT.layoutsDir,
            'templates', // for backward compatibility with newer "layouts"
            'sass'
        ]).map(dir => path.resolve(this.inputDir, dir));

        this.watcher.configure(dirs);
        this.watcher.reload();
    }

    loadSite() {
        const loader = new UnibitLoader({ inputDir: this.inputDir });
        const site = loader.loadSite({
            uglyUrls: this.uglyUrls,
            config: this.inputConfig
        });
        this.showBanner = typeof this.withBanner === 'boolean' ? this.withBanner : _.get(site, 'stackbitYaml.stackbit_banner.show_banner', false);
        this.loadNunjucksEnv(site);
        site.pages = site.pages.map(page => {
            return _.assign({}, page, {
                content: this.markdownify(site, page.markdown)
            })
        });
        return site;
    }

    copySupportingFiles() {
        if (this.showBanner) {
            fse.copySync(path.join(__dirname, './supporting-files/stackbit-banner.css'), path.join(this.outputDir, '/assets/css/stackbit-banner.css'));
        }
        if (this.watch) {
            fse.copySync(path.join(__dirname, './supporting-files/live-reload.js'), path.join(this.outputDir, '/assets/js/live-reload.js'));
        }
    }

    copyStaticFiles() {
        let src = path.resolve(this.inputDir, UNIBIT.staticDir);
        let dest = path.resolve(this.outputDir);
        fse.copySync(src, dest);
    }

    compileSass(site) {
        const config = site.config.data;
        let sassOptions = _.get(config, 'sass', null);
        if (sassOptions) {
            let inputFile = _.get(sassOptions, 'input_file', null);
            let outputFile = _.get(sassOptions, 'output_file', null);

            this.assert(inputFile, `if sass.input_file must be specified`);
            this.assert(inputFile, `if sass.output_file must be specified`);

            inputFile = path.resolve(this.inputDir, inputFile);
            outputFile = path.resolve(this.outputDir, outputFile);

            let inputData = null;
            let includePaths = [path.dirname(inputFile)];
            let ext = path.extname(inputFile);

            if (ext === '.njk') {
                this.logger.log('Converting sass file with Nunjucks: ' + inputFile);
                inputData = fse.readFileSync(inputFile, 'utf8');
                inputData = this.env.renderString(inputData, {site: {params: config.params}});
                inputFile = null;
            }

            this.logger.log('Compiling sass');

            try {
                let res = sass.renderSync({
                    file: inputFile,
                    data: inputData,
                    includePaths: includePaths,
                    indentWidth: _.get(sassOptions, 'indentWidth', 4),
                    outputStyle: _.get(sassOptions, 'outputStyle', 'nested'),
                    precision: _.get(sassOptions, 'precision', 10)
                });

                fse.outputFileSync(outputFile, res.css);
            } catch (err) {
                throw new Error(err.formatted || err.message);
            }
        }
    }

    generatePages(site) {
        const pages = site.pages.filter(page => _.get(site.config.data.output, page.relDir, true));
        this.logger.log('Generating ' + pages.length + ' pages...');
        return forEachPromise(pages, page => {
            let context = this.createPageContext(page, site);
            return this.renderAndSavePage(context, page.url).then(() => {
                let pageRenderQueue = _.remove(this.pageRenderQueue);
                return forEachPromise(pageRenderQueue, renderItem => {
                    return this.renderAndSavePage(renderItem.context, renderItem.outputUrl);
                });
            });
        });
    }

    createPageContext(page, site) {
        // this.logger.log('Generating page for ' + page.relPath);
        const config = site.config.data;
        const env = this.env;

        let context = {
            site: {
                title: config.title,
                baseurl: config.baseurl,
                pages: site.pages,
                data: site.siteData,
                menus: site.menus,
                params: config.params
            },
            templates: {
                title: null,
                body_class: null
            },
            stackbit_banner: this.getStackbitBannerContext(site),
            liveReload: this.watch,
            page: page
        };

        if (!_.isEmpty(_.get(config, 'templates.title'))) {
            context.templates.title = env.renderString(config.templates.title, context);
        }
        if (!_.isEmpty(_.get(config, 'templates.body_class'))) {
            context.templates.body_class = env.renderString(config.templates.body_class, context);
        }

        context.getPage = this.getPage.bind(this, context);
        context.getPages = this.getPages.bind(this, context);
        context.getData = this.getData.bind(this, context);
        context.paginate = this.paginate.bind(this, context);
        context.link = this.link.bind(this, context.site);
        context.classNames = this.classNames.bind(this);

        // this.logger.log("context:\n" + JSON.stringify(context, null, 4));
        return context;
    }

    getStackbitBannerContext(site) {
        let stackbitBanner = _.get(site, 'stackbitYaml.stackbit_banner');
        return _.assign({
            component: 'stackbit-banner.html',
            name: site.config.data.title,
            create_url: "http://app.stackbit.com/create",
            github_url: ""
        }, stackbitBanner, {
            show_banner: this.showBanner
        });
    }

    addPageToRenderQueue(context, outputUrl) {
        this.pageRenderQueue.push({
            context: context,
            outputUrl: outputUrl
        });
    }

    renderAndSavePage(context, url) {
        this.assert(this.renderingPage === null, `Trying to generate two pages in parallel`);
        const outputUrl = url.match(/\w+\.\w+$/) ? url : path.join(url, 'index.html');
        this.renderingPage = {
            context: context,
            outputUrl: outputUrl
        };
        return this.renderPage(context).then(res => {
            this.renderingPage = null;
            this.savePage(res, outputUrl);
        });
    }

    renderPage(context) {
        let layoutFile = _.get(context.page, ['params', UNIBIT.pageLayoutKey], 'body') + '.html';
        return new Promise((resolve, reject) => {
            this.env.render(layoutFile, context, (err, res) => {
                if (err) {
                    this.logger.error("err:", err);
                    reject(err);
                } else {
                    //this.logger.log("result:\n" + res);
                    resolve(res);
                }
            });
        });
    }

    savePage(pageResult, outputUrl) {
        if (this.prettier) {
            pageResult = prettier.format(pageResult, _.merge({
                parser: 'html',
                endOfLine: 'lf'
            }, this.prettierOptions)) + '\n';
        }
        let outputFile = path.resolve(this.outputDir, outputUrl);
        fse.outputFileSync(outputFile, pageResult);
    }

    loadNunjucksEnv(site) {
        let fileSystemLoader = new nunjucks.FileSystemLoader([
            path.resolve(this.inputDir, UNIBIT.layoutsDir),
            path.resolve(this.inputDir, 'templates'), // for backward compatibility with newer "layouts"
            path.resolve(this.inputDir, UNIBIT.componentsDir)
        ]);
        this.env = new nunjucks.Environment([fileSystemLoader, new UnibitNunjucksLoader()]);
        this.env.addFilter('relative_url', this.relativeUrl.bind(this, site));
        this.env.addFilter('date_format', filters.dateFormat);
        this.env.addFilter('sprintf', filters.sprintf);
        this.env.addFilter('component_file', filters.componentFile);
        this.env.addFilter('slice_array', filters.sliceArray);
        this.env.addFilter('sort_array', filters.sortArray);
        this.env.addFilter('split', filters.split);
        this.env.addFilter('markdownify', this.markdownify.bind(this, site));
        this.env.addFilter('append', filters.append);
        this.env.addFilter('replace_regexp', filters.replaceRegexp);
        this.env.addFilter('starts_with', filters.startsWith);
        this.env.addFilter('ends_with', filters.endsWith);
        this.env.addFilter('where', filters.where);
        this.env.addFilter('link', this.link.bind(this, site));
        this.env.addExtension('LinkExtension', new LinkExtension(this, site));
    }

    getPage(context, pagePath) {
        if (!_.startsWith(pagePath, '/')) {
            // if pagePath does not start with '/', join it to current's page
            // relDir and test against relPath of all pages. If no such page
            // exists, continue to regular flow.
            let fullPath = path.join(context.page.relDir, pagePath);
            let result = _.find(context.site.pages, page => page.relPath === fullPath);
            if (result) {
                return result;
            }
        } else {
            // if pagePath starts with '/', remove it
            pagePath = pagePath.substring(1);
        }
        return _.find(context.site.pages, page => page.relPath === pagePath) || null;
    }

    getPages(context, folderPath) {
        if (!_.startsWith(folderPath, '/')) {
            // if folderPath does not start with '/', join it to current's page
            // relDir and test against relDir of all pages. If no such pages
            // exists, continue to regular flow.
            let fullPath = path.join(context.page.relDir, folderPath);
            let result = _.filter(context.site.pages, page => page.relDir === fullPath);
            if (!_.isEmpty(result)) {
                return result;
            }
        }
        folderPath = _.trim(folderPath, '/');
        const folderPathParts = _.split(folderPath, '/');
        return _.filter(context.site.pages, page => {
            // find all pages that have same prefix as folder path, but not the root page of that folder, e.g.: {folderPath}/index.html
            const url = _.trim(page.url, '/');
            const urlParts = _.split(url, '/');
            return urlParts.length > folderPathParts.length && _.isEqual(urlParts.slice(0, folderPathParts.length), folderPathParts);
        });
    }

    getData(context, dataPath) {
        dataPath = _.trim(dataPath, '/');
        // remove extension
        dataPath = dataPath.replace(/\.\w+$/, '');
        const path = dataPath.split('/');
        if (_.head(path) === 'data') {
            path.shift();
        }
        return _.get(context.site.data, path, null);
    }

    paginate(context, items, itemsPerPage) {
        context = _.merge({}, context);
        let pagesCount = Math.max(1, Math.ceil(items.length / itemsPerPage));
        let pages = [];
        for (let i = 0; i < pagesCount; i++) {
            let pageNumber = i + 1;
            let url;
            if (i === 0) {
                url = context.page.url;
            } else {
                url = path.join(context.page.relDir, 'page' + pageNumber, 'index.html');
            }
            let startIdx = i * itemsPerPage;
            let endIdx = Math.min(startIdx + itemsPerPage, items.length);
            let pageItems = items.slice(startIdx, endIdx);
            let page = {
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
        pages.forEach((page, index) => {
            let hasPrev = index > 0;
            let hasNext = index < pagesCount - 1;
            Object.assign(page, {
                hasPrev: hasPrev,
                prev: hasPrev ? pages[index - 1] : null,
                hasNext: hasNext,
                next: hasNext ? pages[index + 1] : null,
                first: pages[0],
                last: pages[pagesCount - 1],
            });
        });
        _.tail(pages).forEach(page => {
            let outputUrl = page.url;
            // override the original paginate function to return current pagination page
            let pageContext = Object.assign({}, context, {paginate: () => page});
            this.addPageToRenderQueue(pageContext, outputUrl);
        });
        return pages[0];
    }

    relativeUrl(site, url) {
        if (_.startsWith(url, '#') || _.startsWith(url, 'http')) {
            return url;
        }
        let urlsRelativeToBase = _.get(site.config.data, 'urls_relative_to_base', true);
        if (!urlsRelativeToBase && !_.startsWith(url, '/')) {
            let pageDir = path.parse(this.renderingPage.outputUrl).dir;
            this.assert(!_.startsWith(pageDir, '/'), `error in relativeUrl, page dir can not be absolute`);
            return path.relative(pageDir, url);
        } else {
            let baseUrl = _.get(site.config.data, 'baseurl', '');
            return path.join(baseUrl, '/', url);
        }
    }

    markdownify(site, str) {
        if (_.isString(str)) {
            return this.env.filters.safe(marked(str, {
                baseUrl: site.config.data.baseurl
            }));
        } else {
            return str;
        }
    }

    link(site, link) {
        if (_.startsWith(link, '#')) {
            return link;
        }
        let index = link.indexOf('#');
        let hash = '';
        if (index !== -1) {
            hash = link.substring(index);
            link = link.substring(0, index);
        }
        let page = _.find(site.pages, page => {
            if (page.relPath === link) {
                return true;
            }
        });
        this.assert(page, `could not find page for link: ${link}`);
        return page.url + hash;
    }

    classNames(...args) {
        let classNames = [];
        _.forEach(args, arg => {
            if(_.isString(arg)) {
                classNames.push(arg);
            } else {
                _.forEach(arg, (value, key) => {
                    if (value) {
                        classNames.push(key);
                    }
                });
            }
        });
        if (_.isEmpty(classNames)) {
            return '';
        } else {
            return this.env.filters.safe(`class="${classNames.join(' ')}"`);
        }
    }

}

class LinkExtension {

    constructor(unibit, site) {
        this.tags = ['link'];
        this.unibit = unibit;
        this.site = site;
    }

    parse(parser, nodes, lexer) {
        // same implementation as nunjucks.Parser.parseExtends()
        const tagName = 'link';
        const tag = parser.peekToken();
        if (!parser.skipSymbol(tagName)) {
            parser.fail('parseTemplateRef: expected ' + tagName);
        }

        const expression = parser.parseExpression();
        const args = new nodes.NodeList(tag.lineno, tag.colno, [expression]);

        parser.advanceAfterBlockEnd(tag.value);

        return new nodes.CallExtension(this, 'generateLink', args);
    }

    generateLink(context, link) {
        let result = this.unibit.link(this.site, link);
        return new nunjucks.runtime.SafeString(result);
    }

}
