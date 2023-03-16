(() => {
	LWDK.request = (url, body = {}, success = function(){}, fail = function(){}) => function request(url, body, success, fail){
		switch(typeof url){
			case "object":
				typeof body == "function" && (fail = success, success = body);
				body = url;
				url = top.location.href;
			break;

			case "function":
				typeof body == "function" && (fail = body);
				success = url;
				url = top.location.href;
			break;

			case "string":
				typeof body == "function" && (fail = success, success = body, body = {});
			break;

			default:
				url = top.location.href;
			break;
		}

		if(typeof body != "object"){
			body = {content: body};
		}

		typeof body.dataType == "undefined" && (body.dataType = "json");

		let dataType = body.dataType;

		delete body.dataType;

		let compiledBody;

		const options = {
	      method: body.method||'POST',
		  origin: location.origin,
		  headers: {'Content-Type':body.type||'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
	      body: (compiledBody = Object.keys(body)
	        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
	        .join('&'))
	    };

		(body.cors||false) && (options.mode = 'no-cors');

		LWDK.debug.post(`${url} => ${compiledBody}`);

	    return fetch(url, options)
			.then(T => (LWDK.debug.post(T),T[dataType]()))
			.catch(E => fail(`LWDK Request Error (STEP I) | ${E}`))
			.then(S => success(S))
			.catch(E => fail(`LWDK Request Error  (STEP II) | ${E}`));
	}(url, body, success, fail);
})();
