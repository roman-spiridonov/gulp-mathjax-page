/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const fs = require('fs-extra');
const gulp = require('gulp');
const debug = require('gulp-debug');

const mathjax = require('../index');

exports.dos2nix = function(fileStr) {
    return fileStr.replace(/\r\n/g, "\n");
};

function checkFileStrEql(fileStr1, fileStr2) {
    return ( dos2nix(fileStr1) === dos2nix(fileStr2) );
}

exports.doGulpTest = function doGulpTest(sourceFile, expectedFile, options, cb) {
    return gulp.src(`test/data/${sourceFile}`)
    // .pipe(debug())
    .pipe(mathjax(options))
    .pipe(gulp.dest('test/data/out'))
    .on('end', () => {
        let output = fs.readFileSync(`test/data/out/${sourceFile}`, {encoding: 'utf-8'});
        let expected = fs.readFileSync(`test/data/expected/${expectedFile}`, {encoding: 'utf-8'});
        cb(output, expected);
    });
};
