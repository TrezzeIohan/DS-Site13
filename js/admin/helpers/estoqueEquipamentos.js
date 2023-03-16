LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "estoqueEquipamentos"; // Banco de dados
		this.field("equipamento").value = LWDK.cookie("estoque");
	}

    onDataLoad(data){
		return data;
	}

	validate(data, exec){
		return exec();
	}
});
