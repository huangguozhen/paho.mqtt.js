// ---------------------------------------
// Test Environment Setup
// ---------------------------------------
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)

global.chai = chai
global.expect = chai.expect
global.should = chai.should()

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
// NOTE: `new Array()` is used rather than an array literal since
// for some reason an array literal without a trailing `;` causes
// some build environments to fail.
const __karmaWebpackManifest__ = new Array() // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path)

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)
