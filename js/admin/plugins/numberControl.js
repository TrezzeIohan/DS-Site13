LWDK.controlNumber = (id, db, callback) => {
	const genId = () => [new Date().getFullYear().toString().substr(2).split('').join(id),LWDK.date.getFullDate(new Date(), "%d%m")].join('-') + String(n);

	let n = 0;

	const setId = () => (n++, DB.Select(db, {controle: genId()}, e => e.length ? setId() : callback(genId())));
}
