require('angular');
require('angular-mocks');

var helpers = require('../index.js');

describe('Validate helper methods', function() {
	it ('should create HTML element', function() {
		var element = helpers.createElement('<div></div>');
		expect(element[0].outerHTML).toBe('<div class="ng-scope"></div>');
		expect(element.scope()).toBeDefined();
		//Should be added to BODY
		expect(element.parent()[0].tagName).toBe('BODY');
	});
});