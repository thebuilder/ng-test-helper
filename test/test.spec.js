import 'angular';
import 'angular-mocks';

import helpers from '../index.js'

describe('Validate helper methods', ()=> {
	it ('should create HTML element', ()=> {
		let element = helpers.createElement('<div></div>');
		expect(element[0].outerHTML).toBe('<div class="ng-scope"></div>');
		expect(element.scope()).toBeDefined();
		//Should be added to BODY
		expect(element.parent()[0].tagName).toBe('BODY');
	});
});