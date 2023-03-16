LWDK.load(["TableSettings"], () => LWDK.TableSettings({
	serverSide: true,
	processing: true,
	ajax: '/vhsys/clientes/',
	pageLength: 10,
	order: [[0, 'desc']],
	ordering: false
}));
