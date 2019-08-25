const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const yaml = require('js-yaml');
const toml = require('@iarna/toml');


module.exports = {
    forEachPromise,
    readDirRecSync,
    getFirstExistingFileSync,
    parseFileSync,
    parseDataByFilePath,
    parseMarkdownWithFrontMatter,
    createLogger
};

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
    return new Promise((resolve, reject) => {
        let results = [];

        function next(index) {
            if (index < array.length) {
                callback.call(thisArg, array[index], index, array).then(result => {
                    results[index] = result;
                    next(index + 1);
                }).catch(error => {
                    reject(error);
                });
            } else {
                resolve(results);
            }
        }

        next(0);
    });
}

function readDirRecSync(dir, options) {
    let list = [];
    const files = fs.readdirSync(dir);
    _.forEach(files, file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        if (_.has(options, 'filter') && !options.filter(filePath, stats)) {
            return;
        }
        if (stats.isDirectory()) {
            list = list.concat(readDirRecSync(filePath, options));
        } else if (stats.isFile()) {
            list.push(filePath);
        }
    });
    return list;
}

function getFirstExistingFileSync(fileNames, inputDir) {
    return _.chain(fileNames)
        .map(fileName => path.resolve(inputDir, fileName))
        .find(filePath => fs.existsSync(filePath)).value();
}

function parseFileSync(filePath) {
    let data = fs.readFileSync(filePath, 'utf8');
    return parseDataByFilePath(data, filePath);
}

function parseDataByFilePath(string, filePath) {
    const extension = path.extname(filePath).substring(1);
    let data;
    switch (extension) {
        case 'yml':
        case 'yaml':
            data = yaml.safeLoad(string, {schema: yaml.JSON_SCHEMA});
            break;
        case 'json':
            data = JSON.parse(string);
            break;
        case 'toml':
            data = toml.parse(string);
            break;
        case 'md':
            data = parseMarkdownWithFrontMatter(string);
            break;
        default:
            throw new Error(`parseDataByFilePath error, extension '${extension}' of file ${filePath} is not supported`);
    }
    return data;
}

function parseMarkdownWithFrontMatter(string) {
    let frontmatter = null;
    let markdown = string;
    let frontMatterTypes = [
        {
            type: 'yaml',
            startDelimiter: '---\n',
            endDelimiter: '\n---',
            parse: (string) => yaml.safeLoad(string, {schema: yaml.JSON_SCHEMA})
        },
        {
            type: 'toml',
            startDelimiter: '+++\n',
            endDelimiter: '\n+++',
            parse: (string) => toml.parse(string)
        },
        {
            type: 'json',
            startDelimiter: '{\n',
            endDelimiter: '\n}',
            parse: (string) => JSON.parse(string)
        }
    ];
    _.forEach(frontMatterTypes, fmType => {
        if (string.startsWith(fmType.startDelimiter)) {
            let index = string.indexOf(fmType.endDelimiter);
            if (index !== -1) {
                // The end delimiter must be followed by EOF or by a new line (possibly preceded with spaces)
                // For example ("." used for spaces):
                //   |---
                //   |title: Title
                //   |---...
                //   |
                //   |Markdown Content
                //   |
                // "index" points to the beginning of the second "---"
                // "endDelimEndIndex" points to the end of the second "---"
                // "afterEndDelim" is everything after the second "---"
                // "afterEndDelimMatch" is the matched "...\n" after the second "---"
                // frontmatter will be: {title: "Title"}
                // markdown will be "\nMarkdown Content\n" (the first \n after end delimiter is discarded)
                let endDelimEndIndex = index + fmType.endDelimiter.length;
                let afterEndDelim = string.substring(endDelimEndIndex);
                let afterEndDelimMatch = afterEndDelim.match(/^\s*?(\n|$)/);
                if (afterEndDelimMatch) {
                    let data = string.substring(fmType.startDelimiter.length, index);
                    frontmatter = fmType.parse(data);
                    markdown = afterEndDelim.substring(afterEndDelimMatch[0].length);
                }
            }
        }
    });
    return {
        frontmatter: frontmatter,
        markdown: markdown
    };
}

function createLogger(scope, transport) {
    const levels = ['log', 'info', 'debug', 'error'];
    const logger = transport || console;
    const noop = () => {};
    const obj = {};

    levels.forEach((level) => {
        obj[level] = (...args) => {
            (logger[level] || noop)(`[${scope}]`, ...args);
        }
    });

    return obj;
}
