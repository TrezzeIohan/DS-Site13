(function(){
	function step(fn, time){
		this.time = time;
		this.func = fn;

		let r = () => (this.func(), setTimeout(r, this.time));
		setTimeout(r, this.time);
	}

	LWDK.step = (fn, time = LWDK.sleepTime) => new step(fn, time);

	function wait(what, exec){
		if(!what()){
			return setTimeout(() => wait(what, exec), LWDK.sleepTime);
		} else {
			exec();
		}
	}

	LWDK.wait = (condition_function, execute_function) => wait(condition_function, execute_function);
})();
