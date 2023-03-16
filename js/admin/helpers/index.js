LWDK.onDocument(() => new class extends formModel {
	constructor(){
		super();
		this.noLoading();
		this.isForm = false;

		$(".m-portlet__foot--fit").html("");

		LWDK.init(() => {
			if(LWDK.cookie("home-order") != 'null'){
				let $final = "";

				for(let i of LWDK.cookie("home-order").split(" ")){
					$final += $("[data-name=\"" + i + "\"]").parent()[0].outerHTML;
				}

				$("#menu-start").html($final);
			}

			$(".menu-block").mouseenter(function(){
				$(this).find(".la").transition('pulse');
			})
		});

		LWDK.wait(()=>typeof Sortable != typeof void 0, () => new Sortable($("#menu-start")[0], {animation: LWDK.sleepTime * .5, onEnd: function(){
			LWDK.cookie("home-order", Object.keys(GetFormData()).join(" "));
		}}));

		jQuery(".m-portlet__foot").replaceWith('<div><div class="p-3"></div></div>');

		LWDK.step(() => {
			let data = (new Date).toLocaleDateString().split("/");
			let hora = (new Date).toLocaleTimeString();
			let meses = new Array("Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro");
			let dias = new Array("Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado");
			let dianum = (new Date).getDay();
			let mes = meses[parseInt(data[1])-1];
			jQuery("#day").html(`${dias[dianum]}, ${data[0]} de ${mes} de ${data[2]}`);
			jQuery("#now").html(`${hora}`);
		}, 1e3);

		jQuery(".m-subheader__title").text("Seja bem vindo(a)! Escolha por onde começar:");
	}
});
