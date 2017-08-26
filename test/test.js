/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const fs = require('fs-extra');
const expect = require('chai').expect;

const doGulpTest = require('./helpers').doGulpTest;
const dos2nix = require('./helpers').dos2nix;

describe('Converts html files with formulas properly', function() {
    before(function() {
        fs.ensureDir('test/data/out');
    });
    after(function() {
        fs.removeSync('test/data/out');
    });

    it('svg', function(done) {
        doGulpTest('test.html', 'test-svg.html', {
            mjpageConfig: {
                format: ["MathML", "TeX", "AsciiMath"],
                singleDollars: true,
                output: "svg"
            }
        }, (output, expected) => {
            expect(dos2nix(output)).to.equal(dos2nix(expected));
            done();
        });
    });
    it('html', function(done) {
        doGulpTest('test.html', 'test-html.html', {
            mjpageConfig: {
                format: ["MathML", "TeX", "AsciiMath"],
                singleDollars: true,
                output: "html"
            }
        }, (output, expected) => {
            expect(dos2nix(output)).to.equal(dos2nix(expected));
            done();
        });
    });
    it('mml', function(done) {
        doGulpTest('test.html', 'test-mml.html', {
            mjpageConfig: {
                format: ["MathML", "TeX", "AsciiMath"],
                singleDollars: true,
                output: "mml"
            }
        }, (output, expected) => {
            expect(dos2nix(output)).to.equal(dos2nix(expected));
            done();
        });
    });
    it('mml - mjnodeConfig also works', function(done) {
        doGulpTest('test.html', 'test-mml.html', {
            mjpageConfig: {
                format: ["MathML", "TeX", "AsciiMath"],
                singleDollars: true
            },
            mjnodeConfig: {
                mml: true
            }
        }, (output, expected) => {
            expect(dos2nix(output)).to.equal(dos2nix(expected));
            done();
        });
    });
});
