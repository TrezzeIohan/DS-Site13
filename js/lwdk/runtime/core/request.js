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

		function serializeQuery(a,c=""){let b=Object.keys(a).map((b,e)=>{let d=a[b];return(a.constructor===Array?b=`${c}[${e}]`:a.constructor===Object&&(b=c?`${c}[${b}]`:b),/\[[0-9]\]/.test(b)&&b.length<5&&(b="data"+b),"object"==typeof d)?serializeQuery(d,b):`${b}=${encodeURIComponent(d)}`});return[].concat.apply([],b).join("&")}

		const options = {
	      method: body.method||'POST',
		  origin: location.origin,
		  headers: {'Content-Type':body.type||'application/x-www-form-urlencoded'},
	      body: (compiledBody = serializeQuery(body))
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
