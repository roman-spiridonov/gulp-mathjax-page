/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const mathjax = require('../index');
const expect = require('chai').expect;
const gulp = require('gulp');
const debug = require('gulp-debug');
const fs = require('fs-extra');

function dos2nix(fileStr) {
    return fileStr.replace(/\r\n/g, "\n");
}

function checkFileStrEql(fileStr1, fileStr2) {
    return ( dos2nix(fileStr1) === dos2nix(fileStr2) );
}

function doGulpTest(mjpageConfig, expectedFile, cb) {
    gulp.src('test/data/test.html')
    // .pipe(debug())
    .pipe(mathjax({mjpageConfig}))
    .pipe(gulp.dest('test/data/out'))
    .on('end', () => {
        let output = fs.readFileSync('test/data/out/test.html', {encoding: 'utf-8'});
        let expected = fs.readFileSync(`test/data/expected/${expectedFile}`, {encoding: 'utf-8'});
        expect(checkFileStrEql(output, expected)).to.be.true;
        cb();
    });
}

describe('Converts html files with formulas properly', function() {
    before(function() {
        fs.ensureDir('test/data/out');
    });
    after(function() {
        fs.removeSync('test/data/out');
    });

    it('svg', function(done) {
        doGulpTest({
            format: ["MathML", "TeX", "AsciiMath"],
            singleDollars: true,
            output: "svg"
        }, 'test-svg.html', done);
    });
    it('html', function(done) {
        doGulpTest({
            format: ["MathML", "TeX", "AsciiMath"],
            singleDollars: true,
            output: "html"
        }, 'test-html.html', done);
    });
    it('mml', function(done) {
        doGulpTest({
            format: ["MathML", "TeX", "AsciiMath"],
            singleDollars: true,
            output: "mml"
        }, 'test-mml.html', done);
    });
});
