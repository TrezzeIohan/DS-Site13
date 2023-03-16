(function(factory){
	function legacy_ajax(url, action, fail){
		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {
		  if (request.status >= 200 && request.status < 400) {
		    // Success!
		    try{
				var data = JSON.parse(request.responseText);
				action(data);
			} catch(e) { fail(); }
		  } else {
		    fail();
		  }
		};

		request.onerror = fail;

		request.send();
	}

	function cepQueryAddress(a, f, u){

		if(typeof f !== "function"){
			f = (r) => (factory.cep.result = r||false);
		}

		this.result = {};

		if(typeof a == "string"){
			a = a.split(/[^0-9]/).join('');

			if(a.length != 8){
				return f(false);
			}
		}

		const m = [
			[(a) => "https://viacep.com.br/ws/" + a + "/json/", {}],
			[a => "https://apps.widenet.com.br/busca-cep/api/cep/" + a + ".json", {
				"code" : "cep",
				"state" : "uf",
				"city" : "localidade",
				"district" : "bairro",
				"address" : "logradouro"
			}],
			[(a) => "https://ws.apicep.com/cep/" + a + ".json", {
				"code" : "cep",
				"state" : "uf",
				"city" : "localidade",
				"district" : "bairro",
				"address" : "logradouro"
			}]
		]

		return legacy_ajax(m[u][0](a), v => {
			for(let i in m[u][1]){
				let n = m[u][1][i];
				v[n] = v[i];
				delete v[i];
			}
			f(v);
		}, fail => (u++ < m.length && cepQueryAddress(a, f, u)));
	}

	factory.cep = (a = -1, f = -1) => new cepQueryAddress(a, f, 0);

	factory.cep.result = false;
})(LWDK);
