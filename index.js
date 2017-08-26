/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const mjpage = require('@romars/mathjax-node-page').mjpage;
const gulpPluginFabric = require('gulp-plugin-fabric');

module.exports = gulpPluginFabric('mathjax-page', mathjax);

// gulp-plugin-fabric supports only single options object, but mjpage has two
function mathjax(input, options, callback) {
    mjpage(input, options.mjpageConfig, options.mjnodeConfig, (output) => callback(null, output));
}
