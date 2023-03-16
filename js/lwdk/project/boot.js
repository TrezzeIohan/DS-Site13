/* 	LWDK JS Engine With Vanilla
	Version:  1.3
*/
'use strict';

const LWDK = window.LWDK = new function LWDK(){
	let Self = this;
	this.args = function args(c){
		return typeof document.currentScript == "object" && document.currentScript !== null && typeof document.currentScript.src == "string" ? (new URL(document.currentScript.src)).searchParams.get(c):"";
	};

	this.modUrl = (url) => history.pushState(null, null, url);

	this.debug = new function Debug(){
		this.active = !!parseInt(Self.args("debug"));
		function Post(m,c){
			if(c.active){
				console.info(m);
			}
		}
		function Error(m,c){
			if(c.active){
				console.error(m);
			}
		}
		this.post = (m) => new Post(m, this);
		this.error = (m) => new Error(m, this);
	};

	this.sleepTime = 750;

	this.path = (() => {
		let dir = document.currentScript.src.split("/");
		dir.pop();
		return dir.join("/") + "/";
	})();

	this.onDocument = this.onDoc = (f, a = false) => document.addEventListener('DOMContentLoaded', () => f(), a);

	this.onWindow = this.onWin = (f, a = false) => window.addEventListener('load', () => f(), a);

	this.documentLoaded = false;

	this.windowLoaded = false;

	this.init = (f, a = true) => (this.documentLoaded ? ( this.windowLoaded ? f() : this.onWin(f, a) ) : this.onDoc(f, a));

	this.reset = new function Reset(){
		this.list = [];
		this.add = function(f){
			this.list.push(f);
		}
		this.now = function(){
			this.parent.debug.post("LWDK Reset");
			for(f of this.list){
				f();
			}
		}
	};

	this.reset.parent = this;

	this.include = (list) => {
		let t, w;
		for(let item of list){
			w = (typeof item == "object") ? (w=item[1],item=item[0],w):0;
			switch(item.split('.').pop()){
				case "js":
					setTimeout(()=>(t = document.createElement("script"), t.src = item, t.type = "application/javascript", t.async="true", document.body.appendChild(t)), w);
				break;
				case "css":
					setTimeout(()=>(t = document.createElement("link"), t.href = item, t.type = "text/css", t.rel = "stylesheet", document.head.appendChild(t)), w);
				break;
			}
			this.debug.post("Added to website: " + item)
		}
	};

	function loader( w, f ){
		function fn(w, f, c){
			let o = true;
			for(let r of w){
				o = o && typeof c[r] !== "undefined";
				if(!o){
					c.debug.post("LWDK wait for: " + r);
					break;
				}
			}
			o ? f() : (setTimeout(() => fn(w, f, c), c.sleepTime));
		}

		setTimeout(() => fn(w, f, this), this.sleepTime)
	}

	this.load = loader;
};

/* Basic Setup */

LWDK.onDoc(() => (LWDK.documentLoaded = true));
LWDK.onWin(() => (LWDK.windowLoaded = true));
LWDK.init(()=>LWDK.reset.now());
