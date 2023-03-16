LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "orcamentoContrato"; // Banco de Dados

		this.field("num_cliente").appendButton({
			style: "info",
			text: "<i class='la la-search'></i>"
		}, () => (
			LWDK.request("/vhsys/clientes/", {search: {value: Form.field("num_cliente").value}}, e => {
				if(e[0] && e[1].length){
					setFormData(e[1][0]);
				}
			})
		));
	}

    onDataLoad(data){
		if(this.action == "create"){
			data["controle"] = [new Date().getFullYear().toString().substr(2).split('').join("CT"),LWDK.date.getFullDate(new Date(), "%d%m")].join('-') + String(1);
		}
		return data;
	}

	onload(SELF){

	}

	validate(data, exec){
		return exec();
	}
});
