LWDK.onDoc(function(){
	return new class {
		constructor(){
			this.Apply();
			this.Functions();
			this.Main();
		}

		Main(){
			LWDK.__loading = null;LWDK.load(["showMessage"], () => (
				LWDK.__loading=loadingRequest(),
				LWDK.preventErrorLoading=setTimeout(() => top.location.reload(), 5e3)
			));
		}

		Functions(){
			const SELF = this;
			LWDK.theme = function(set = -1){
				if(set == -1){
					return SELF.Get();
				} else {
					SELF.Set(set);
					top.location.reload();
				}
			};
		}

		Default(){
			return "light";
		}

		Get(){
			let theme = LWDK.cookie("theme");
		    return theme == 'null' ? this.Default() : theme;
		}

		Set(theme){
			return LWDK.cookie("theme", theme, 365);
		}

		Apply(){
			LWDK.include(["/css/admin/themes/" + this.Get() + ".min.css"]);
		}
	}
});
