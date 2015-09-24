let elements;
let $rootScope, $compile, $document;

/**
 * Compile HTML using $compile.
 *
 * @param elementHtml {string} The HTML string to compile
 * @options {{scope}}
 * @returns {IAugmentedJQuery}
 */
export default function createElement(elementHtml, {scope=null}={}) {
	inject(($injector) => {
		$rootScope = $injector.get('$rootScope');
		$compile = $injector.get('$compile');
		$document = $injector.get('$document');
	});

	scope = scope || $rootScope.$new();
	elements = elements || [];
	let $element = $compile(angular.element(elementHtml))($rootScope);

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