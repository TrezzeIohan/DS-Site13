!(function(){
	const Maker = new class {
		CSS(){
			return`
				.bs-popup-message, .bs-popup-message .alert, .bs-popup-message .alert div {
				     -webkit-touch-callout: none; /* iOS Safari */
				       -webkit-user-select: none; /* Safari */
				        -khtml-user-select: none; /* Konqueror HTML */
				          -moz-user-select: none; /* Old versions of Firefox */
				           -ms-user-select: none; /* Internet Explorer/Edge */
				               user-select: none; /* Non-prefixed version, currently
				                                     supported by Chrome, Edge, Opera and Firefox */
				}

				.bs-popup-message {
				    display: flex;
				    text-align: center;
				    min-height: 100vh;
				    min-width: 100vw;
				    position: fixed;
				    top: 0;
				    left: 0;
				    right: 0;
				    bottom: 0;
				    padding: 16px 24px;
				    overflow: hidden;
				    background-color: rgba(0,0,0,0);
				    filter: grayscale(100%);
				    transition: all 600ms ease-in-out;
				    z-index: 10000000;
				}

				.bs-popup-message.show {
				    filter: grayscale(0%);
				    background-color: rgba(0,0,0,.2);
				}
				.bs-popup-message .alert {
				    opacity: 0;
				    transition: all 500ms ease;
				}

				.bs-popup-message .alert div {
				    padding: 5px 9px;
				}

				.bs-popup-message.show .alert {
				    opacity: 1;
				}

				.bs-popup-message.top-left .alert,
				.bs-popup-message.left-top .alert,
				.bs-popup-message.center-left .alert,
				.bs-popup-message.left-center .alert,
				.bs-popup-message.bottom-left .alert,
				.bs-popup-message.left-bottom .alert {
				    margin-left: -100%;
				}

				.bs-popup-message.top-left.show .alert,
				.bs-popup-message.left-top.show .alert,
				.bs-popup-message.center-left.show .alert,
				.bs-popup-message.left-center.show .alert,
				.bs-popup-message.bottom-left.show .alert,
				.bs-popup-message.left-bottom.show .alert {
				    margin-left: 0%;
				}

				.bs-popup-message.top-center .alert,
				.bs-popup-message.center-top .alert,
				.bs-popup-message.center-center .alert,
				.bs-popup-message.center .alert,
				.bs-popup-message.bottom-center .alert,
				.bs-popup-message.center-bottom .alert {
				    margin-top: -100%;
				}

				.bs-popup-message.top-center.show .alert,
				.bs-popup-message.center-top.show .alert,
				.bs-popup-message.center-center.show .alert,
				.bs-popup-message.center.show .alert,
				.bs-popup-message.bottom-center.show .alert,
				.bs-popup-message.center-bottom.show .alert {
				    margin-top: 0%;
				}

				.bs-popup-message.top-right .alert,
				.bs-popup-message.right-top .alert,
				.bs-popup-message.center-right .alert,
				.bs-popup-message.right-center .alert,
				.bs-popup-message.bottom-right .alert,
				.bs-popup-message.right-bottom .alert {
				    margin-right: -100%;
				}

				.bs-popup-message.top-right.show .alert,
				.bs-popup-message.right-top.show .alert,
				.bs-popup-message.center-right.show .alert,
				.bs-popup-message.right-center.show .alert,
				.bs-popup-message.bottom-right.show .alert,
				.bs-popup-message.right-bottom.show .alert {
				    margin-right: 0%;
				}
			`;
		}

        Template(type, content){
            if(LWDK.check.isObject(type)){
                let node = document.createElement("div");
                node.innerHTML = `<div class="alert alert-dismissible"><div>${content}</div></div>`;
                node = node.childNodes[0];
                for(let i in type){
                    node.style[i] = type[i];
                }
                return node.outerHTML;
            } else return `<div class="alert alert-${type} alert-dismissible"><div>${content}</div></div>`;
        }

        Positions(position){
            switch(position){
                case "top left":
                case "left top":
                default:
                    return`
                        justify-content: start;
                        align-items: start;
					`;
                break;
                case "top center":
                case "center top":
                    return`
                        justify-content: center;
                        align-items: start;
					`;
                break;
                case "top right":
                case "right top":
                    return`
                        justify-content: end;
                        align-items: start;
					`;
                break;
                case "center left":
                case "left center":
                    return`
                        justify-content: start;
                        align-items: center;
                    `;
                break;
                case "center center":
                case "center":
                    return`
                        justify-content: center;
                        align-items: center;
                    `;
                break;
                case "center right":
                case "right center":
                    return`
                        justify-content: end;
                        align-items: center;
					`;
                break;
                case "bottom left":
                case "left bottom":
                    return`
                        justify-content: start;
                        align-items: end;
					`;
                break;
                case "bottom center":
                case "center bottom":
                    return`
                        justify-content: center;
                        align-items: end;
					`;
                break;
                case "bottom right":
                case "right bottom":
                    return`
                        justify-content: end;
                        align-items: end;
					`;
                break;
            }
        }

        Make(content, type, position){
            const element = document.createElement("div");
            element.classList.add("bs-popup-message");
            element.classList.add(position.split(" ").join("-"));
            element.setAttribute("style", this.Positions(position));
            element.innerHTML = this.Template(type, content);
            return element;
        }

        Insert(content, type, position, timeOut, closeOnClick){
            for(let i of Array.from(document.getElementsByClassName("bs-popup-message"))){
                i.remove();
            }
            const element = this.Make(content, type, position);
			let ev_body = function(e){
				e.key == "Enter" && !!$(".alert").length && element.hide();
				document.removeEventListener("keydown", ev_body, true);
			};
			let evCloseOnClick = function(){
                this.hide();
				(element||this).removeEventListener("click", evCloseOnClick, true);
            };
			const onMainAppl = (LWDK.stopLoading instanceof Function);
			let _fn = function(){
                let act;
                document.getElementsByClassName("bs-popup-message").length && document.getElementsByClassName("bs-popup-message")[0].classList.remove("show");
                setTimeout(() => LWDK.anim.fadeOut(document.getElementsByClassName("bs-popup-message").length && document.getElementsByClassName("bs-popup-message")[0]), 250);
                setTimeout(() => (act = document.getElementsByClassName("bs-popup-message").length && document.getElementsByClassName("bs-popup-message")[0].closeAction, document.getElementsByClassName("bs-popup-message").length && document.getElementsByClassName("bs-popup-message")[0].remove()), 620);
                setTimeout(() => act instanceof Function && act(), 1e3);
            };

            closeOnClick && (element.addEventListener("click", evCloseOnClick, true), document.addEventListener("keydown", ev_body, true));

			if(!onMainAppl){
				element.hide = new Function;
				element.closeAction = function(){};
	            element.onClose = function(f){
	                f instanceof Function && (document.getElementsByClassName("bs-popup-message").length && (document.getElementsByClassName("bs-popup-message")[0].closeAction = () => f()));
	            };
	            setTimeout(() => element.classList.add("show"), 250);
	            setTimeout(() => (document.getElementsByClassName("bs-popup-message").length && (document.getElementsByClassName("bs-popup-message")[0].hide = element.hide = _fn)), 750);
	            timeOut < 0 && (timeOut = Math.max(3e3, content.length * 75));
	            setTimeout(() => document.getElementsByClassName("bs-popup-message").length && document.getElementsByClassName("bs-popup-message")[0].hide(), timeOut);
			} else {
				element.hide = (() => setTimeout(() => _fn(), LWDK.sleepTime / 4));
				element.closeAction = function(){};
				element.onClose = function(){};
				setTimeout(() => element.classList.add("show"), 50);
			}

            document.body.appendChild(element);
            document.getElementsByClassName("bs-popup-message").length && (document.getElementsByClassName("bs-popup-message")[0].hide = element.hide);
            document.getElementsByClassName("bs-popup-message").length && (document.getElementsByClassName("bs-popup-message")[0].closeAction = element.closeAction);
            document.getElementsByClassName("bs-popup-message").length && (document.getElementsByClassName("bs-popup-message")[0].onClose = element.onClose);

            return document.getElementsByClassName("bs-popup-message").length ? document.getElementsByClassName("bs-popup-message")[0]:document.createElement("div");
        }
    };

    LWDK.showMessage = (content, type="info", position = "center", timeOut = 3e3, closeOnClick = true) => Maker.Insert(content, type, position, timeOut, closeOnClick);

	LWDK.load(["css"], () => LWDK.css(Maker.CSS()));
})();
