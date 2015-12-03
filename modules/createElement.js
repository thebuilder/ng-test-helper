var elements, $rootScope, $compile, $document;

/**
 * Compile HTML using $compile.
 *
 * @param elementHtml {string} The HTML string to compile
 * @param scope {Object} Target scope
 * @returns {IAugmentedJQuery}
 */
function createElement(elementHtml, scope) {
	if (!scope) scope = null;
	inject(($injector) => {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		$document = $injector.get('$document');
	});

	scope = scope || $rootScope.$new();
	elements = elements || [];
	var $element = $compile(angular.element(elementHtml))($rootScope);

	//Append to body
	$document.find('body').append($element);
	elements.push($element);

	//Digest to apply bindings.
	scope.$digest();

	return $element;
}

//Cleanup after each run
afterEach(()=> {
	if (elements) {
		elements.map((e) => e.remove());
	}
	elements = null;
});

module.exports = createElement;