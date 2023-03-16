const DB = window["DB"] = new class {
	debug = LWDK.cookie("sqldbg") == "1";

	SecureExec(
		table,
		exec
	){
		this.Exists(
			table,
			e => (e || this.debug)
				? exec()
				: console.error("Crie a estrutura da tabela primeiro!")
		);
	}

	Request(
		data,
		callback
	){
		LWDK.request("/admin/db/", data, callback);
	}

	Exists(
		table,
		callback
	){
		this.Request({
			"exec": "Exists",
			"table": table
		}, callback);

		return this;
	}

	Insert(
		table,
		data,
		callback = new Function
	){
		this.SecureExec(table, () => {
			this.Request({
				"exec": "Insert",
				"table": table,
				"data": data
			}, callback);
		});

		return this;
	}

	Select(
		table,
		query = "1=1",
		columns = "*",
		order = ["id", "DESC"],
		callback = new Function
	){
		this.SecureExec(table, () => {
			if(typeof query == "function"){
				callback = query;
				query = "1=1";
				columns = "*";
				order = ["id", "DESC"];
			}

			if(typeof columns == "function"){
				callback = columns;
				columns = "*";
				order = ["id", "DESC"];
			}

			if(typeof order == "function"){
				callback = order;
				order = ["id", "DESC"];
			}

			if(typeof order == "string"){
				if(/asc|desc/i.test(order)){
					order = ["id", order.toUpperCase()];
				} else {
					order = [order, "ASC"];
				}
			}

			this.Request({
				"exec": "Select",
				"table": table,
				"query": query,
				"columns": columns,
				"order": order
			}, callback);
		});

		return this;
	}

	Update(
		table,
		data,
		query = "1",
		callback = new Function
	){
		this.SecureExec(table, () => {
			if(typeof query == "function"){
				callback = query;
				query = "1";
			}

			this.Request({
				"exec": "Update",
				"table": table,
				"data": data,
				"query": query
			}, callback);
		});

		return this;
	}

	Delete(
		table,
		query = "1",
		callback = new Function
	){
		this.SecureExec(table, () => {
			if(typeof query == "function"){
				callback = query;
				query = "1";
			}

			this.Request({
				"exec": "Delete",
				"table": table,
				"query": query
			}, callback);
		});

		return this;
	}

	Drop(
		table,
		callback
	){
		this.SecureExec(table, () => {
			this.Request({
				"exec": "Drop",
				"table": table
			}, callback);
		});

		return this;
	}

	Max(
		table,
		column,
		callback
	){
		if(table.split(".").length > 1 && typeof callback == typeof void 0){
			let divide = table.split(".");
			table = divide[0];
			callback = column;
			column = divide[1];
		}

		this.SecureExec(table, () => {
			this.Request({
				"exec": "MaxOf",
				"table": table,
				"column": column
			}, callback);
		});

		return this;
	}
};
