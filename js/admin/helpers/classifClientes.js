LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "classifClientes"; // Banco de dados

		this.changeColor();
	}

	changeColor(){
		LWDK.wait(() => typeof Form != typeof void 0, () => LWDK.step(() => {
			document.querySelector("#cor-selecionada").style.filter = "hue-rotate(" + Form.field("cor").value + "deg) brightness(.9)";
		}));
	}
});
