const strftime = require('strftime');
const moment = require('moment');
const sprintfJs = require('sprintf-js');
const _ = require('lodash');

module.exports = {
    dateFormat,
    sprintf,
    componentFile,
    sliceArray,
    sortArray,
    split,
    join,
    append,
    replaceRegexp,
    startsWith,
    endsWith,
    trim,
    trimStart,
    trimEnd,
    pathJoin,
    where
};

function dateFormat(date, format, type) {
    type = _.defaultTo(type, 'strftime');
    let res;
    if (type === 'strftime') {
        res = strftime(format, _.isString(date) ? new Date(date) : date);
    } else if (type === 'moment') {
        res = moment(date).format(format);
    } else {
        res = date.toString();
    }
    return res;
}

function sprintf(str, format) {
    return sprintfJs.sprintf(str, format);
}

function componentFile(componentName) {
    return componentName + '.html';
}

function sliceArray(arr, begin, end) {
    return arr.slice(begin, end);
}

function sortArray(arr, keyPath, order = 'asc') {
    return _.orderBy(arr, keyPath, order);
}

function split(str, separator) {
    return _.split(str, separator);
}

function join(str, separator) {
    return _.join(str, separator);
}

function append(str, appendStr) {
    return str + appendStr;
}

function replaceRegexp(str, pattern, replacement) {
    return str.replace(new RegExp(pattern), replacement);
}

function startsWith(str, prefix) {
    return _.startsWith(str, prefix);
}

function endsWith(str, prefix) {
    return _.endsWith(str, prefix);
}

function trim(str, chars) {
    return _.trim(str, chars);
}

function trimStart(str, chars) {
    return _.trimStart(str, chars);
}

function trimEnd(str, chars) {
    return _.trimEnd(str, chars);
}

function pathJoin(...pathParts) {
    const result = _.compact(pathParts).join('/').replace(/\/{2,}/g, '/');
    return result || '.';
}

function where(array, key, operator, match) {
    let predicate;
    let operatorMap = {
        '==': _.eq,
        '!=': (value, otherValue) => value !== otherValue,
        '>': _.gt,
        '>=': _.ge,
        '<': _.lt,
        '<=': _.le
    };
    if (!operator) {
        predicate = function(element) {
            return _.has(element, key);
        }
    } else {
        if (!match) {
            match = operator;
            operator = '==';
        }
        predicate = function(element) {
            let value = _.get(element, key);
            return operatorMap[operator](value, match);
        }
    }
    return _.filter(array, predicate);
}
