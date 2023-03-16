Array.prototype.select = function(a,b=null){
	if(b===null){b = a; a = "id";}
	for(let i of this){
		if(typeof i == typeof {} && typeof i[a] != typeof void 0 && String(i[a]) == String(b))return i;
	}
};
