LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "precosLocacao"; // Banco de dados
	}

	validate(data, exec){
		return exec();
	}
});
