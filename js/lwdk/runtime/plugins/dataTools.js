(function(){
	LWDK.data = new function DataTools(){
		function _0x1975(_0x42309c, _0xb4bd50) {
		    const _0x2fd84a = _0x2fd8();
		    return (
		        (_0x1975 = function (_0x1975c3, _0x1a7674) {
		            _0x1975c3 = _0x1975c3 - 0xb6;
		            let _0x7a39aa = _0x2fd84a[_0x1975c3];
		            return _0x7a39aa;
		        }),
		        _0x1975(_0x42309c, _0xb4bd50)
		    );
		}

		(function (_0xef736d, _0x1415b5) {
		    const _0x59ac45 = _0x1975,
		        _0x35f143 = _0xef736d();
		    while (!![]) {
		        try {
		            const _0x4981be =
		                parseInt(_0x59ac45(0xbd)) / 0x1 +
		                -parseInt(_0x59ac45(0xc2)) / 0x2 +
		                -parseInt(_0x59ac45(0xbe)) / 0x3 +
		                (-parseInt(_0x59ac45(0xc3)) / 0x4) * (parseInt(_0x59ac45(0xc8)) / 0x5) +
		                (-parseInt(_0x59ac45(0xbf)) / 0x6) * (parseInt(_0x59ac45(0xc1)) / 0x7) +
		                (parseInt(_0x59ac45(0xba)) / 0x8) * (-parseInt(_0x59ac45(0xbb)) / 0x9) +
		                parseInt(_0x59ac45(0xb6)) / 0xa;
		            if (_0x4981be === _0x1415b5) break;
		            else _0x35f143["push"](_0x35f143["shift"]());
		        } catch (_0x21d0fa) {
		            _0x35f143["push"](_0x35f143["shift"]());
		        }
		    }
		})(_0x2fd8, 0xdf421);

		function _0x2fd8() {
		    const _0x3d3a79 = [
		        "split",
		        "hostname",
		        "8QtTaWr",
		        "351063UEcQYZ",
		        "charCodeAt",
		        "199595CgBEdb",
		        "5250129zAewgr",
		        "11202clXEHj",
		        "reduce",
		        "5614pUlKwf",
		        "2549684fQzjxr",
		        "1244oQnGlW",
		        "join",
		        "match",
		        "substr",
		        "map",
		        "9305DupjOM",
		        "58548670UxOMhA",
		        "fromCharCode",
		    ];
		    _0x2fd8 = function () {
		        return _0x3d3a79;
		    };
		    return _0x2fd8();
		}

		const crypt = new (function () {
		    const _0xa319a0 = _0x1975;
		    return {
		        get: ((_0x4733d0) => {
		            const _0x40f055 = _0x1975,
		                _0x2a005a = (_0x19e401) => ((_0x701cf9) => _0x701cf9["split"]("")[_0x40f055(0xc7)]((_0xfd85c5) => _0xfd85c5[_0x40f055(0xbc)](0x0)))(_0x4733d0)[_0x40f055(0xc0)]((_0x1b00c3, _0x2ee19c) => _0x1b00c3 ^ _0x2ee19c, _0x19e401);
		            return (_0x3e1867) =>
		                _0x3e1867[_0x40f055(0xc5)](/.{1,2}/g)
		                    ["map"]((_0x932ad3) => parseInt(_0x932ad3, 0x10))
		                    [_0x40f055(0xc7)](_0x2a005a)
		                    ["map"]((_0x451364) => String[_0x40f055(0xb7)](_0x451364))
		                    ["join"]("");
		        })(location[_0xa319a0(0xb9)]),
		        set: ((_0x3f15ef) => {
		            const _0x480caa = _0xa319a0,
		                _0x14dcad = (_0x62a0bf) => _0x62a0bf[_0x480caa(0xb8)]("")[_0x480caa(0xc7)]((_0x2d6149) => _0x2d6149[_0x480caa(0xbc)](0x0)),
		                _0x3d385d = (_0x49fcca) => ("0" + Number(_0x49fcca)["toString"](0x10))[_0x480caa(0xc6)](-0x2),
		                _0x1efdf4 = (_0x1865db) => _0x14dcad(_0x3f15ef)["reduce"]((_0xf0fd4, _0x5ae881) => _0xf0fd4 ^ _0x5ae881, _0x1865db);
		            return (_0x538d92) => _0x538d92["split"]("")[_0x480caa(0xc7)](_0x14dcad)[_0x480caa(0xc7)](_0x1efdf4)["map"](_0x3d385d)[_0x480caa(0xc4)]("");
		        })(location[_0xa319a0(0xb9)]),
		    };
		})();

		function checksum(e){
			e = JSON.stringify( e.outerHTML ? e.outerHTML : (e.toString && !(e instanceof Object) && !(e instanceof Array) ? e.toString() : e ) );
            u = 0;
            for(let i = 0; i < e.length; i++){
                u += e.charCodeAt(i % 2 ? (e.length-i) : i) * (((!(i%2)?1:0)+i)**2);
            }
			return u.toString(36).toUpperCase();
		}

		function makeid(a = 12, r = "", t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", e = "0123456789-9876543210-0123456789-9876543210") {
		    a = Math.max(a, 3);
		    for (var h, n = 0; n < a; n++) r += (h = t + (n > 0 && n < a - 1 ? e : "")).charAt(Math.floor(Math.random() * h.length));
		    return r;
		}

		function jsonParse(string, result = []){
			let defaults = result, keys = [], original = string;

			/* Basic Filter */
			string = string.split(/\s+/gm).join(' ');

			/* Filtering JSON */
			for(let filter of [[/\"\s+?\,\s+\"?/gm, '","'],[/\"\s+?\:\s+?\"/gm, '":"'],[/\"\s?\,\s\"?/gm, '","'],[/\"\s?\:\s?\"/gm, '":"'],[/\s+?\"\s+?\:/gm, '":'],[/\s+?\:\s+?\"/gm, ':"'],[/\s+?\[\s+?\"/gm, '["'],[/\s+?\"\s+?\]/gm, '"]'],[/\s+?\{\s+?\"/gm, '{"'],[/\s+?\"\s+?\}/gm, '"}'],[/\s?\"\s?\:/gm, '":'],[/\s?\:\s?\"/gm, ':"'],[/\s?\[\s?\"/gm, '["'],[/\s?\"\s?\]/gm, '"]'],[/\s?\{\s?\"/gm, '{"'],[/\s?\"\s?\}/gm, '"}']]){
				string = string.split(filter[0]).join(filter[1]);
				keys.push(filter[1]);
			}

			/* Preserve JSON Arguments */

			// const keys = ['","','":"','","','":"','":',':"','["','"]','{"','"}','":',':"','["','"]','{"','"}'];

			let subs = [];
			for(let sub, i = 0; i < keys.length; i++){
				sub = [keys[i], btoa(keys[i])];
				string = string.split(sub[0]).join(sub[1]);
				subs.push(sub);
			}

			string = string.replace(/[\"\'\`\\]/g,function(i){return'\\'+i}); // Replace invalid keywords

			for(let sub, i = 0; i < subs.length; i++){
				sub = subs[i];
				string = string.split(sub[1]).join(sub[0]);
			}

			try{
				result = JSON.parse(string);
			} catch(e){
				try {
					result = JSON.parse(original)
				} catch(e) {
					return typeof original == "string" ? original:defaults;
				}
			}

			return result;
		}

		function sanitize_string(string){
			return(((string)=>{
				let mapaAcentosHex = {
					a : /[\xE0-\xE6]/g,
					e : /[\xE8-\xEB]/g,
					i : /[\xEC-\xEF]/g,
					o : /[\xF2-\xF6]/g,
					u : /[\xF9-\xFC]/g,
					c : /\xE7/g,
					n : /\xF1/g
				};
				for ( var letra in mapaAcentosHex ) {
					var expressaoRegular = mapaAcentosHex[letra];
					string = string.replace( expressaoRegular, letra );
				}
				return string;
			})(string.toLowerCase())
				.split(/[^a-z0-9]/)
				.join(' ')
				.split(/[\s+]/)
				.join(' ')
				.trim()
				.split(' ')
				.join('-')
				.split(/\-+/g)
				.join('-')
			).toString();
		}

		this.crypt     = crypt.set;
		this.uncrypt   = crypt.get;
		this.randomId  = makeid;
		this.jsonParse = jsonParse;
		this.sanstr    = sanitize_string;
		this.checksum  = checksum;

	};
})();
