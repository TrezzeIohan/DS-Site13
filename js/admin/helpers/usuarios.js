LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();

		this.DB = "usuarios"; // Banco de dados
	}

	onDataLoad(data){
		if(this.action == "modify"){
			delete data.senha;
			return data;
		} else {
			return new Object;
		}
	}

	onload(SELF){
		if(this.action == "create"){
			this.field("senha").attr("placeholder", "Escolha uma senha segura.");
			this.applyHelp("senha", "Digite sua senha, contendo letras e números.#key");
			this.applyRequired("senha");
			this.field("senha").attr("placeholder", "Escolha uma senha segura.");
			this.field("nome").attr("placeholder", "Nome e sobrenome");
			this.field("email").attr("placeholder", "Email que será utilizado para acesso");
		} else {
			this.field("senha").attr("placeholder", "Deixe em branco caso não queira alterar.");
			this.applyHelp(this.field("senha"), "Só modifique se realmente quiser mudar a senha.#exclamation-triangle");
			this.field("nome").attr("placeholder", "Anterior: " + this.field("nome").value);
			this.field("email").attr("placeholder", "Anterior: " + this.field("email").value);
		}
	}

	validate(data, exec){
		if(data.senha.length == 0 && this.action == "modify"){
			delete data.senha;
		} else if(data.senha.length < 5){
			this.wrong("senha", "Use uma senha que contenha ao menos 5 digitos.", this.action == "modify" ? "warning":"danger");
			return false;
		} else if(!/^(?=.*[0-9])(?=.*[a-z]).{5,}$/g.test(data.senha)){
			this.wrong("senha", "Sua senha deve conter letras e numeros.", this.action == "modify" ? "info":"warning");
			return false;
		} else {
			let field = this.field("senha");
			let oldPlaceHolder = $(field).attr("placeholder");
			$(field).attr("placeholder", "Sua senha foi modificada.");
			setTimeout(() => $(field).attr("placeholder", oldPlaceHolder), LWDK.sleepTime * 3);
		}
		if(data.nome.length < 3){
			this.wrong("nome", "Insira um nome válido!");
			return false;
		}

		if(!/\S+@\S+\.\S+/.test(data.email) || data.email.length < 5){
			this.wrong("email", "Insira um email válido!");
			return false;
		}

		if(this.action == "modify"){
			setTimeout(() => setFormData({"senha": ""}), LWDK.sleepTime);
		}

		return exec();
	}
});
