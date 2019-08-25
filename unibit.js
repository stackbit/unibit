#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const Unibit = require('./src/unibit');
const Downloader = require('./src/downloader');

const inputDirOption = {
    alias: 'i',
    describe: 'Unibit site source directory.',
    default: function cws() { return process.cwd(); },
    defaultDescription: 'current working directory'
};

const buildOptions = yargs => yargs.options({
    'input-dir': inputDirOption,
    'output-dir': {
        alias: 'o',
        describe: 'Target directory for the generated site.',
        default: function cwsPublic() { return path.join(process.cwd(), 'public'); },
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

let argv = yargs
    .usage('Usage: $0 <command> [options]')
    .command('build', 'Build site', buildOptions)
    .command('develop', 'Develop site', buildOptions)
    .command('init [path]', 'Initialize new site', yargs => {
        yargs.positional('path', {
            describe: 'Initializes new starter site in the provided directory',
            default: 'unibit-universal'
        });
    })
    .alias('v', 'version')
    .demandCommand(1, 'You need to specify at least one command')
    .example('$0 build -i path/to/source -o path/to/target', 'Build site from Unibit site located in the "path/to/source" folder and save it in the "path/to/target" folder.')
    .wrap(null)
    .help()
    .argv;

const command = argv._[0];

if (command === 'build' || command === 'develop') {
    const unibit = new Unibit({
        inputDir: argv.inputDir,
        outputDir: argv.outputDir,
        withBanner: argv.withBanner,
        uglyUrls: argv.uglyUrls,
        watch: command === 'develop'
    });
    unibit.generate();
} else if (command === 'init') {
    new Downloader(
        'github:stackbithq/stackbit-theme-universal',
        argv.path
    );
}
