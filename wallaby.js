var wallabify = require('wallabify');
var babel = require('babel-core');

/**
 * IDE Test runner: https://github.com/wallabyjs/public
 * Runs your Jasmine tests inline
 **/
module.exports = function (wallaby) {
	return {
		// set `load: false` to all of the browserified source files and tests,
		// as they should not be loaded in browser,
		// their browserified versions will be loaded instead
		files: [
			{pattern: 'test/**/*.spec.js', ignore: true},
			{pattern: 'modules/**/*.js', load: false},
			{pattern: 'index.js', load: false}
		],

		tests: [
			{pattern: 'test/**/*.spec.js', load: false}
		],

		compilers: {
			'**/*.js*': wallaby.compilers.babel({
				babel: babel,
				sourceMap: true,
				presets: ["es2015"]
			})
		},

		postprocessor: wallabify({
				// browserify options
				extensions: [".js"],
				fullPaths: false
			}, function(browserify) {
			}
		),

		bootstrap: function () {
			// required to trigger tests loading
			window.__moduleBundler.loadTests();
		}
	};
};