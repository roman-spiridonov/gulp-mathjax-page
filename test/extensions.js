/**
 * Created by Roman Spiridonov <romars@phystech.edu> on 8/26/2017.
 */
const fs = require('fs-extra');
const expect = require('chai').expect;

const doGulpTest = require('./helpers').doGulpTest;
const dos2nix = require('./helpers').dos2nix;
const mathjax = require('../index');
const mjpage = mathjax.mjpage;
const mjnode = require('mathjax-node-svg2png');

describe('User can modify mjpage behavior', function() {
    before(function() {
        fs.ensureDir('test/data/out');
    });
    after(function() {
        fs.removeSync('test/data/out');
    });

    it('png through options', function(done) {
        doGulpTest('extensions.html', 'extensions-png.html', {
            mjpageConfig: {
                format: ["TeX"],
                output: "png"
            },
            mjnode: require('mathjax-node-svg2png'),  // pass custom mathjax-node
            outputHandlers: {  // map of new output handlers
                'png': (wrapper, data) => {
                    wrapper.innerHTML = `<img src="${data}">`;
                }
            }
        }, (output) => {
            expect(dos2nix(output)).to.match(/<span class="mjpage mjpage__block"><img src="data:image\/png;base64,/);
            done();
        })
    });

    it('DOM manipulation', function(done) {
        doGulpTest('extensions.html', 'extensions-changed.html', {
            mjpageConfig: {
                format: ["TeX"]
            },
            eventHandlers: {
                'afterConversion': (parsedFormula) => {
                    parsedFormula.node.innerHTML = 'changed';
                }
            }
        }, (output, expected) => {
            expect(dos2nix(output)).to.equal(dos2nix(expected));
            done();
        })
    });

    it('png through mjpage export', function(done) {
        mjpage.init(mjnode);
        mjpage.addOutput('png', (wrapper, data) => {
            wrapper.innerHTML = `<img src="${data}">`;
        });

        doGulpTest('extensions.html', 'extensions-png.html', {
            mjpageConfig: {
                format: ["TeX"],
                output: "png"
            }
        }, (output) => {
            expect(dos2nix(output)).to.match(/<span class="mjpage mjpage__block"><img src="data:image\/png;base64,/);
            mjpage.init();  // reset to default mathjax-node
            done();
        })
    });
});
