LWDK.onDocument(() =>
	LWDK.wait(() => typeof DB != typeof void 0, () =>
	DB.Select("classifClientes", classifClientes =>
	new class extends formModel {
	constructor(){
		super();
		this.specialFields = ["tag", "observacoes"];
		this.DB = false; // Banco de dados

		this.field("tag").setOptions(classifClientes, {text: "titulo", value: "id"});

		this.field("tag").appendButton({
			style: "dark",
			text: "Gerir Classificações"
		}, () => (
			self.location.href = "/admin/classifClientes/listar/"
		));
	}

	loadExtraData(data){
		if(data.observacoes_cliente !== null){
			// obs = data.observacoes_cliente;
			try {
				let applyData = JSON.parse(data.observacoes_cliente);
				for(let i in applyData){
					data[i] = applyData[i];
				}
			} catch(err) {
				console.log("JSON: " + String(data.observacoes_cliente));
				data["observacoes"] = data.observacoes_cliente;
			}
		}

		return data;
	}

	loadData(data){
		let applyData = GetFormData();
		data = this.loadExtraData(data);
		console.log(structuredClone(data));
		for(let i in applyData){
			if(typeof data[i] !== typeof void 0 && data[i] !== null){
				applyData[i] = data[i];
			}
		}

		this.originalData = structuredClone(applyData);

		setFormData(applyData);
	}

	alternateData(ctx, presetData = null){
		const setData = data => {
			if(data[0]){
				if(data[1].tipo_pessoa.length === 0){
					data[1].tipo_pessoa =
						data[1].cnpj_cliente.replace(/[^\d]/g,"").length > 11 //Exp
						? "PJ" //cnpj
						: "PF"; //pf
				}

				if(data[1].fone_cliente.replace(/[^\d]/g,"").length > 0 && data[1].fone_cliente.replace(/[^\d]/g,"").length < 10){
					data[1].fone_cliente = '31'+data[1].fone_cliente.replace(/[^\d]/g,"");
				}

				if(data[1].celular_cliente.replace(/[^\d]/g,"").length > 0 && data[1].celular_cliente.replace(/[^\d]/g,"").length < 11){
					data[1].celular_cliente = '31'+data[1].celular_cliente.replace(/[^\d]/g,"");
				}
				data[1].razao_cliente = data[1].razao_cliente.split("- ");
				data[1].codigo = data[1].razao_cliente.shift().trim();
				data[1].razao_cliente = data[1].razao_cliente.join('- ').trim();
				this.loadData(data[1]);
			}
			ctx.stopLoading();
			ctx.MaskInputs();
			setFormData({uid: LWDK.cookie("uid")});
		};

		if(presetData != null)setData(presetData);
		else LWDK.request("/vhsys/clientes/", {id: GetFormData().id}, setData);
	}

	alternateSave(ctx, data){
		delete data.uid;

		let preserveCode = i => `${data.codigo} - ${data.razao_cliente}` !== this.originalData.razao_cliente && /(codigo|razao\_cliente)/g.test(i);

		for(let i in data){
			let a = this.originalData && this.originalData[i] ? this.originalData[i]:'',
				b = data[i];

			if(/cnpj_cliente/.test(i)){
				a = a.replace(/[^0-9]/g, a);
				b = b.replace(/[^0-9]/g, b);
			}

			if(i != "id" && a == b && !preserveCode(i) && this.specialFields.indexOf(i) == -1){
				delete data[i];
			}
		}

		let method;

		if(this.action == 'create'){
			delete data["id"];
			method = "post";
		} else {
			method = "put";
		}

		data.razao_cliente = `${data.codigo} - ${data.razao_cliente}`;

		delete data.codigo;

		let jsonData = {};
		for(let i of this.specialFields){
			jsonData[i] = data[i];
			delete data[i];
		}

		data.observacoes_cliente = JSON.stringify(jsonData);

		LWDK.request(`/vhsys/clientes/${method}/`, data, r => {
			r[0]
				? successRequest(() => this.alternateData(ctx, r[1]), "Cliente salvo com sucesso!")
				: errorRequest(() => console.log(r[2]), r[1])
		});
		return false;
	}

	MaskInputs(){
		this.mask("cep_cliente", '00.000-000', e => {
			e = e.replace(/[^\d]/g, '');
			LWDK.request(`/cep/${e}/`, e => {
				if(typeof e.erro != typeof void 0 && e.erro == 'true'){
					this.wrong("cep_cliente", "O CEP inserido não pôde ser encontrado!")
				} else {
					confirm_msg("Gostaria de buscar o endereço a partir deste CEP?", () => setFormData({
						"endereco_cliente": e.logradouro,
						"cidade_cliente": e.localidade,
						"complemento_cliente": e.complemento,
						"bairro_cliente": e.bairro,
						"uf_cliente": e.uf
					}), "question");
				}
			});
		});
		this.mask("cnpj_cliente", ['000.000.000-00', '00.000.000/0000-00']);
		this.mask("fone_cliente", '(00) 0000-0000');
		this.mask("celular_cliente", ['(00) 0000-0000', '(00) 0 0000-0000']);
	}

	validaCpfCnpj(val) {
		const fn = {
	 		cpf: function(cpf) {
	 		    if ( !cpf || cpf.length != 11
	 					|| cpf == "00000000000"
	 					|| cpf == "11111111111"
	 					|| cpf == "22222222222"
	 					|| cpf == "33333333333"
	 					|| cpf == "44444444444"
	 					|| cpf == "55555555555"
	 					|| cpf == "66666666666"
	 					|| cpf == "77777777777"
	 					|| cpf == "88888888888"
	 					|| cpf == "99999999999" )
	 				return false
	 			var soma = 0
	 		    var resto
	 			for (var i = 1; i <= 9; i++)
	 				soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i)
	 			resto = (soma * 10) % 11
	 		    if ((resto == 10) || (resto == 11))  resto = 0
	 		    if (resto != parseInt(cpf.substring(9, 10)) ) return false
	 			soma = 0
	 		    for (var i = 1; i <= 10; i++)
	 		    	soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i)
	 		    resto = (soma * 10) % 11
	 		    if ((resto == 10) || (resto == 11))  resto = 0
	 		    if (resto != parseInt(cpf.substring(10, 11) ) ) return false
	 		    return true
	 		},
	 		cnpj: function(cnpj) {
	 		    if ( !cnpj || cnpj.length != 14
	 	    			|| cnpj == "00000000000000"
	 	    			|| cnpj == "11111111111111"
	 	    			|| cnpj == "22222222222222"
	 	    			|| cnpj == "33333333333333"
	 	    			|| cnpj == "44444444444444"
	 	    			|| cnpj == "55555555555555"
	 	    			|| cnpj == "66666666666666"
	 	    			|| cnpj == "77777777777777"
	 	    			|| cnpj == "88888888888888"
	 	    			|| cnpj == "99999999999999")
	 		        return false
	 		    var tamanho = cnpj.length - 2
	 		    var numeros = cnpj.substring(0,tamanho)
	 		    var digitos = cnpj.substring(tamanho)
	 		    var soma = 0
	 		    var pos = tamanho - 7
	 		    for (var i = tamanho; i >= 1; i--) {
	 		      soma += numeros.charAt(tamanho - i) * pos--
	 		      if (pos < 2) pos = 9
	 		    }
	 		    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
	 		    if (resultado != digitos.charAt(0)) return false;
	 		    tamanho = tamanho + 1
	 		    numeros = cnpj.substring(0,tamanho)
	 		    soma = 0
	 		    pos = tamanho - 7
	 		    for (var i = tamanho; i >= 1; i--) {
	 		      soma += numeros.charAt(tamanho - i) * pos--
	 		      if (pos < 2) pos = 9
	 		    }
	 		    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
	 		    if (resultado != digitos.charAt(1)) return false
	 		    return true;
	 		}
	 	};

		val = val.replace(/[^\d]/g, '');

		return fn.cnpj(val) != fn.cpf(val) && (fn.cpf(val) || fn.cnpj(val));
	}

	validate(data, exec){
		const SELF = this;
		if(data.razao_cliente.length < 3){
			SELF.wrong("razao_cliente", "Preencha um nome com no mínimo 3 caracteres.");
		} else if(!this.validaCpfCnpj(data.cnpj_cliente)){
			SELF.wrong("cnpj_cliente", "Preencha um CPF ou CNPJ válido!");
		} else if(data.celular_cliente.length < 14 && data.fone_cliente.length < 14){
			SELF.wrong("fone_cliente", "Preencha algum telefone de contato válido!");
		} else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email_cliente)){
			SELF.wrong("email_cliente", "Preencha um email de contato válido.");
		} else {
			return exec();
		}
	}
})));
