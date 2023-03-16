!(function(){
	LWDK.date = new function(){
		this.getFullDate = (date = new Date(), locale = "pt-BR") => {
			date = typeof date == "string" ? new Date(date + " 00:00:00"):date;
			let v = date.toLocaleString(locale).split(" ")[0].split("/");
			v[1] = date.toLocaleString(locale, { month: "long" });
			return v.join(locale == "pt-BR" ? " de ":" ");
		};
	};
})();
