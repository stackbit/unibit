const baseHtml = require('./supporting-files/base.html');
const bannerHtml = require('./supporting-files/stackbit-banner.html');

function UnibitNunjucksLoader(opts) {

}

UnibitNunjucksLoader.prototype.getSource = function(name) {
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
        }
    }
    if (name === 'stackbit-banner.html') {
        return {
            src: bannerHtml,
            path: name,
            noCache: false
        }
    }
    return null;
};

module.exports = UnibitNunjucksLoader;
