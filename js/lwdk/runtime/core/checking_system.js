!(function(){
	function isNode(element) {
    	return element instanceof Element || element instanceof HTMLDocument;
	}

	function isArray(check){
	    return check instanceof Array;
	}

	function isObject(check){
	    return check instanceof Object;
	}

	function isString(check){
	    return typeof check == "string";
	}

	function isNumber(check){
	    return typeof check == "number";
	}

	function isBoolean(check){
	    return typeof check == "boolean";
	}

	function isEmpty(check){
	    return!check;
	}

	function isJQuery(check){
		return!!jQuery && check instanceof jQuery;
	}

	LWDK.check = new Object;

	LWDK.check.isNode = isNode;
	LWDK.check.isObj = isObject;
	LWDK.check.isEmpty = isEmpty;
	LWDK.check.isArray = isArray;
	LWDK.check.isElement = isNode;
	LWDK.check.isObject = isObject;
	LWDK.check.isString = isString;
	LWDK.check.isNumber = isNumber;
	LWDK.check.isBool = isBoolean;
	LWDK.check.isBoolean = isBoolean;
	LWDK.check.isJQuery = isJQuery;

	LWDK.check.export = () => {
		for( let i in LWDK.check ){
			window[i] = LWDK.check[i];
		}
	}



})();

const devtools = {
	isOpen: false,
	orientation: undefined,
};

const threshold = 160;

const emitEvent = (isOpen, orientation) => {
	globalThis.dispatchEvent(new globalThis.CustomEvent('devtoolschange', {
		detail: {
			isOpen,
			orientation,
		},
	}));
};

const main = ({emitEvents = true} = {}) => {
	const widthThreshold = globalThis.outerWidth - globalThis.innerWidth > threshold;
	const heightThreshold = globalThis.outerHeight - globalThis.innerHeight > threshold;
	const orientation = widthThreshold ? 'vertical' : 'horizontal';

	if (
		!(heightThreshold && widthThreshold)
		&& ((globalThis.Firebug && globalThis.Firebug.chrome && globalThis.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
	) {
		if ((!devtools.isOpen || devtools.orientation !== orientation) && emitEvents) {
			emitEvent(true, orientation);
		}

		devtools.isOpen = true;
		devtools.orientation = orientation;
	} else {
		if (devtools.isOpen && emitEvents) {
			emitEvent(false, undefined);
		}

		devtools.isOpen = false;
		devtools.orientation = undefined;
	}
};

main({emitEvents: false});
setInterval(main, 500);
