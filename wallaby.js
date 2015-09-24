var wallabify = require('wallabify');
var babel = require('babel');

/**
 * IDE Test runner: https://github.com/wallabyjs/public
 * Runs your Jasmine tests inline
 **/
module.exports = function () {
	return {
		// set `load: false` to all of the browserified source files and tests,
		// as they should not be loaded in browser,
		// their browserified versions will be loaded instead
		files: [
			{pattern: 'test/**/*.spec.js', ignore: true},
			{pattern: 'modules/**/*.js', load: false},
			{pattern: 'index.js', load: false},
			{pattern: 'bundle.js', load: false}
		],

		tests: [
			{pattern: 'test/**/*.spec.js', load: false}
		],

		//preprocessors: {
		//	//Use preprocessor to parse Babel
		//	'**/*.js': file => babel.transform(file.content, {sourceMap: true})
		//},

		postprocessor: wallabify({
				// browserify options
				extensions: [".js"],
				fullPaths: false
			}, function(browserify) {
				browserify.transform('babelify')
			}
		),

		bootstrap: function () {
			// required to trigger tests loading
			window.__moduleBundler.loadTests();
		}
	};
};