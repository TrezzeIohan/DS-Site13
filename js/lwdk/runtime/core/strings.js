(function(){
	String.prototype.capitalize = function(){
		return this.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
	};

	String.prototype.slug = function(){
		return LWDK.data.sanstr(this);
	};

    String.prototype.nl2br = function(){
        return this.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    };

    String.prototype.strip_tags = function(){
        return this.replace(/(<([^>]+)>)/gi, "").replace(/(\n|\t)/gi, " ").trim();
    };

    String.prototype.htmlentities = function(){
        return this.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
           return '&#'+i.charCodeAt(0)+';';
        });
    };
})();
