[![Build Status](https://travis-ci.org/roman-spiridonov/gulp-mathjax-page.svg?branch=master)](https://travis-ci.org/roman-spiridonov/gulp-mathjax-page)

This is gulp plug-in wrapper around [mathjax-node-page](https://github.com/roman-spiridonov/mathjax-node-page).
The plug-in is generated by [gulp-plugin-fabric](https://github.com/roman-spiridonov/gulp-plugin-fabric).

# Why fork?
The @romars/mathjax-node-page fork of mathjax-node-page is used in this plug-in, which got ahead of initial project and addressed some of the known issues.
See this [pull-request](https://github.com/pkra/mathjax-node-page/pull/50) for more detail.
You can always create your own plug-in with a different verison using [gulp-plugin-fabric](https://github.com/roman-spiridonov/gulp-plugin-fabric) if you prefer.

# Basic usage
Pass config options `mjpageConfig` and `mjnodeConfig` to the plug-in function (`mathjax` in example below).
The options are documented in [Usage](https://github.com/roman-spiridonov/mathjax-node-page#usage) section on the source project page.

```javascript
const mathjax = require('gulp-mathjax-page');

// pass settings to mathjax-node-page
// leave empty for defaults
const options = {
    mjpageConfig: {},
    mjnodeConfig: {}
}

gulp.src('.')
    .pipe(mathjax(options))
    .pipe(gulp.dest('out'));
```

# Advanced usage

## More options
The plug-in's `options` object has additional options for advanced usage.
See [Advanced usage](https://github.com/roman-spiridonov/mathjax-node-page#advanced-usage) section of source project for more detail.

```javascript
const options = {
    mjpageConfig: {},
    mjnodeConfig: {},
    eventHandlers: {  // map of handlers for mjpage events (optional)
        'afterConversion': (parsedFormula) => {
            console.log(parsedFormula.sourceFormula);
        }
    },
    mjnode: require('mathjax-node-svg2png'),  // pass custom mathjax-node (optional)
    outputHandlers: {  // map of output handlers (optional)
        'png': (wrapper, data) => {
            wrapper.innerHTML = `<img src="${data}">`;
        }
    }
};
```

## Customization
The plug-in exposes `mjpage` object in case you need any other customizations.

```javascript
const mathjax = require('gulp-mathjax-page');

// use mathjax.mjpage to modify underlying mathjax-node-page behavior
const mjpage = mathjax.mjpage;
// ...
// use in gulp as before
```
