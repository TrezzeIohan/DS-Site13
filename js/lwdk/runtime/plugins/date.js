!(function(){
	LWDK.date = new function(){
		this.getFullDate = (date = new Date(), format = "%d de %M de %Y às %H:%i", locale = "pt-BR") => {
			date = typeof date == "string" ? new Date(date + " 00:00:00"):date;
			let v = date.toLocaleString(locale).split(" ")[0].split("/");
			v[0] = parseInt(v[0]);
			v[0] = v[0] < 10 ? ("0" + String(v[0])) : String(v[0]);
			v[1] = parseInt(v[1]);
			v[1] = v[1] < 10 ? ("0" + String(v[1])) : String(v[1]);
			v[3] = date.toLocaleString(locale, { month: "long" });
			v[3] = v[3].charAt(0).toUpperCase() + v[3].slice(1);
			v[4] = date.getHours();
			v[4] = v[4] < 10 ? ("0" + String(v[4])) : String(v[4]);
			v[5] = date.getMinutes();
			v[5] = v[5] < 10 ? ("0" + String(v[5])) : String(v[5]);
			v[6] = date.getSeconds();
			v[6] = v[6] < 10 ? ("0" + String(v[6])) : String(v[6]);
			return format
				.split("%d").join(v[0])

				.split("%m").join(v[1])
				.split("%M").join(v[3])

				.split("%Y").join(v[2])

				.split("%H").join(v[4])
				.split("%i").join(v[5])
				.split("%s").join(v[6]);
		};

		this.timeDiff = (t) => (
			t = parseInt(t),
			((((new Date(t)).getTime()).toString().length - String(t).length) == 3 && (t *= 1e3)),
			~~(~~(((new Date()).getTime() - (new Date(t)).getTime()) / 1000))
		);
	};
})();
