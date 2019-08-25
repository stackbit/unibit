const { Server: WebSocketServer } = require('ws');
const _ = require('lodash');
const EventEmitter = require('events');
const chokidar = require('chokidar');
const http = require('http');
const fse = require('fs-extra');
const path = require('path');
const url = require('url');

const {createLogger} = require('./utils');


const startingPort = 5000;
const portTryPool = 10;
const logger = createLogger('LiveReload');

const mimeType = {
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
const serve = (filesDir, req, res) => {
    const parsedUrl = url.parse(req.url);

    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(path.resolve(filesDir), sanitizePath);

    fse.stat(pathname)
        .then((stat) => {
            if (stat.isDirectory()) {
                pathname = path.join(pathname, 'index.html');
            }
            return fse.readFile(pathname);
        })
        .then((data) => {
            const ext = path.parse(pathname).ext;
            res.setHeader('Content-type', mimeType[ext] || 'text/plain');
            res.end(data);
        })
        .catch((err) => {
            if (err && err.code === 'ENOENT') {
                res.statusCode = 404;
                res.end(`File ${pathname} not found!`);
                return;
            }

            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
        });
};

/**
 * Start server on port, serving files from filesDir
 * @param {Number} port
 * @param {String} filesDir
 * @returns {Promise<Object>} resolves with object containing server, port and
 * websocket active connections. Rejects in case if port is occupied.
 */
const startServer = (port, filesDir) => new Promise((resolve, reject) => {
    const connections = [];

    const server = http.createServer((...args) => serve(filesDir, ...args));

    server.listen(port, () => {
        const socket = new WebSocketServer({ server });

        socket.on('connection', (connection) => {
            connections.push(connection);
            connection.on('close', () => connections.splice(connections.indexOf(connection), 1));
        });

        resolve({
            server,
            connections,
            port
        });
    });

    server.on('error', (error) => {
        if (error.toString().match(/EADDRINUSE/)) {
            reject();
        }
    })
});

/**
 * Get server running on first of available port from ports array, serve files
 * from filesDir
 * @param {Number[]} ports
 * @param {String} filesDir
 * @returns {null|Promise<Object>}
 */
const getServer = (ports, filesDir) => {
    if (!ports.length) {
        return null;
    }

    return startServer(ports[0], filesDir)
        .catch(() => getServer(ports.slice(1), filesDir));
};

/**
 * Send reload message to all passed connections
 * @param {Object[]} connections
 */
const reload = (connections) => {
    logger.log('Reload page');
    connections
        .filter(connection => connection.readyState === 1)
        .forEach(connection => connection.send());
};

/**
 * Emits change event for file at path
 * @param {String} event
 * @param {String} filePath
 * @param {Object} emitter
 */
const fileDidChange = (event, filePath, emitter) => {
    logger.log(`${_.capitalize(event)} ${filePath}`);
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
const watcher = (options) => {
    const inputDir = _.get(options, 'inputDir');
    const outputDir = _.get(options, 'outputDir');
    const port = _.get(options, 'port', startingPort);

    if (!inputDir) {
        throw new Error('Should provide inputDir');
    }
    if (!outputDir) {
        throw new Error('Should provide outputDir');
    }

    return getServer(_.range(port, port + portTryPool), outputDir)
        .then((server) => {
            if (!server) {
                throw new Error(`All ports from ${port} to ${port + portTryPool} are occupied`);
            }

            logger.log(`Started server at http://localhost:${server.port}`);

            const eventEmitter = new EventEmitter();
            const watcher = chokidar.watch([], {
                ignoreInitial: true
            });

            watcher
                .on('change', filePath => fileDidChange('change', filePath, eventEmitter))
                .on('add', filePath => fileDidChange('add', filePath, eventEmitter))
                .on('unlink', filePath => fileDidChange('remove', filePath, eventEmitter));

            logger.log(`Start watching files at ${inputDir}`);

            return {
                events: eventEmitter,
                reload: reload.bind(null, server.connections),
                configure: watcher.add.bind(watcher),
                port: server.port,
            };
        });
};

module.exports = watcher;
