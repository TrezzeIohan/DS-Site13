LWDK.onDocument(() =>
	LWDK.wait(() => typeof DB != typeof void 0, () =>
	DB.Select("precosLocacao", precosLocacao =>
	new class extends formModel {
		constructor(){
			super();

			this.specialFields = ["tbl_preco", "observacoes"];

			this.DB = false; // Banco de dados
			this.field("estoque_produto").appendButton({
				style: "info",
				text: "Gerir Estoque"
			}, () => (
				self.location.href = "/admin/estoqueEquipamentos/listar/",
				LWDK.cookie("estoque",Form.field("id").value)
			)).attr("readonly", true);

			this.field("tbl_preco").setOptions(precosLocacao, {text: "titulo", value: "id"});
		}

		loadExtraData(data){
			if(data.obs_produto !== null){
				try {
					let applyData = JSON.parse(data.obs_produto);
					for(let i in applyData){
						data[i] = applyData[i];
					}
				} catch(err) {
					LWDK.debug.post("JSON: " + String(data.obs_produto));
				}
			}

			return data;
		}

		loadData(data){
			data = this.loadExtraData(data);
			let applyData = GetFormData();
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
					data[1].desc_produto = data[1].desc_produto.split("- ");
					data[1].cod_produto = data[1].desc_produto.shift().trim();
					data[1].desc_produto = data[1].desc_produto.join('- ').trim();
					DB.Select(
						"estoqueEquipamentos",
						{equipamento: data[1].id_produto},
						"quantidade,operacao",
						qtds => {
							data[1].estoque_produto = 0;
							for(let qtd of qtds){
								data[1].estoque_produto += qtd.quantidade * (qtd.operacao ? 1:-1);
							}
							this.loadData(data[1]);
						}
					);
				}
				ctx.stopLoading();
				ctx.MaskInputs();
				setFormData({uid: LWDK.cookie("uid")});
			};

			if(presetData != null)setData(presetData);
			else LWDK.request("/vhsys/produtos/", {id: GetFormData().id}, setData);
		}

		alternateSave(ctx, data){
			delete data.uid;

			let preserveCode = i => `${data.cod_produto} - ${data.desc_produto}` !== this.originalData.desc_produto && /(cod\_produto|desc\_produto)/g.test(i);

			for(let i in data){
				let a = this.originalData && this.originalData[i] ? this.originalData[i]:'',
					b = data[i];

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

			data.desc_produto = `${data.cod_produto} - ${data.desc_produto}`;

			delete data.cod_produto;

			let jsonData = {};
			for(let i of this.specialFields){
				jsonData[i] = data[i];
				delete data[i];
			}

			data.obs_produto = JSON.stringify(jsonData);

			LWDK.request(`/vhsys/produtos/${method}/`, data, r => {
				r[0]
					? successRequest(() => this.alternateData(ctx, r[1]), "Equipamento salvo com sucesso!")
					: errorRequest(() => console.log(r[2]), r[1])
			});
			return false;
		}

		validate(data, exec){
			const SELF = this;
			if(data.desc_produto.length < 3){
				SELF.wrong("desc_produto", "Mínimo 3 caracteres.");
			} else {
				return exec();
			}
		}
	})
));
