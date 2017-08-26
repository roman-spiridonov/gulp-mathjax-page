/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const mjpage = require('@romars/mathjax-node-page');
const gulpPluginFabric = require('gulp-plugin-fabric');

// gulp-plugin-fabric supports only single options object, but mjpage has two
function mathjax(input, options, callback) {
    // set custom mjnode
    if(options.mjnode) {
        mjpage.init(options.mjnode);
    }

    // set output handlers
    if(options.outputHandlers && typeof options.outputHandlers === 'object') {
        for(let output in options.outputHandlers) {
            let handler = options.outputHandlers[output];
            mjpage.addOutput(output, handler);
        }
    }

    // run
    let job = mjpage.mjpage(input, options.mjpageConfig || {}, options.mjnodeConfig || {}, (output) => {
        if(options.mjnode) {
            mjpage.init();  // reset to default mathjax-node after job run
        }
        callback(null, output)
    });

    // add event handlers to mjpage job
    if(options.eventHandlers && typeof options.eventHandlers === 'object') {
        for(let event in options.eventHandlers) {
            let handler = options.eventHandlers[event];
            job.on(event, handler);
        }
    }
}


module.exports = gulpPluginFabric('mathjax-page', mathjax);

// expose mjpage for customization
module.exports.mjpage = mjpage;
