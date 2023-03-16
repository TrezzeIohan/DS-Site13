LWDK.init(() => {
	$("#actions").prepend('<a type="button" class="btn m-btn btn-info mx-4" href="/admin/equipamentos/' + LWDK.cookie("estoque") + '/"><i class="la la-arrow-left me-2 mr-2"></i>Voltar</a>');
});
