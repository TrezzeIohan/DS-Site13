LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "orcamento"; // Banco de dados

		// this.ID = ; // ID determinado (caso seja fixo)
		// this.successText = ; // Mensagem em caso de sucesso
		// this.failText =  ; // Mensagem em caso de falha

		// this.ifNotExists = { // Caso não exista e seja um item administrável
		// 	title: "",			// por tabela, então ele exibirá erro caso não exista.
		// 	html: "",
		// 	refresh: "orcamento/listar"
		// };
	}

    onDataLoad(data){
		return data;
	}

	onload(SELF){
		/* On loaded action */
	}

	validate(data, exec){
		/* Usage:
		   	this.wrong([field-name], [text], [type]) -> Send error message in input
		   	this.field([field-name]) -> Get HTML element of field
		   	this.action -> Getter (don't modify), return's "create" or "modify"

		   	IMPORTANT NOTE: At end, execute "exec()" to next step of form system. 

			MODEL EXAMPLE:
				if(data.cidades.length < 3){
					this.wrong("nome", "Insira um nome válido!");
					return false;
				}

				if(!/S+@S+.S+/.test(data.email) || data.email.length < 5){
					this.wrong("email", "Insira um email válido!");
					return false;
				}

				return exec();
		*/

		/* DEFAULT */
		return exec();
	}
});