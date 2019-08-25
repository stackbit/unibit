module.exports.STACKBIT_YAML_NAMES = ['stackbit.yaml', 'stackbit.yml', 'content-model.yml'];
module.exports.UNIBIT = {
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
    publishDir: 'public',
    buildCommand: 'unibit build',
    menuItemFields: null,
    injectLocations: {
        htmlHead: {file: 'components/html_head.html'},
        htmlBody: {file: 'components/post_body.html'}
    }
};
