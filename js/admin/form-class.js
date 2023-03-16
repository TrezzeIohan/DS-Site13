const formModel = (class formModel {
	isForm = true;
	isAnimating = false;

	redraw(){
		const SELF = this;

		SELF.detectRepeaters();
		SELF.detectUploaders();

		$(function(){
			for(const b of [...LWDK.el("label > b")]){
				if(/\*/g.test(b.textContent)){
					SELF.applyRequired(b);
				}
			}
		});

		LWDK.wait(() => typeof $().popup == "function", () => $("[data-toggle=\"help_block\"]").each(function(){
			SELF.applyHelp(this, $(this).attr("title"));
			$(this).remove();
		}));

		SELF.detectSwitchers();

		summernote_config();

		selectPickerUpdate();
	}

	startup(SELF){ // Inicialização
		window.Form = SELF;
		LWDK.step(() => {
			for(let i of Object.keys(SELF.OTR)){
				SELF.repeaters && SELF.repeaters[i] && SELF.repeaters[i].data && (typeof SELF.OVR[i] == typeof void 0 || SELF.OVR[i] != -1) && (SELF.OVR[i] = structuredClone ? structuredClone(SELF.repeaters[i].data):SELF.repeaters[i].data);
			}
		});
		LWDK.step(() => {
			for(let i of Object.keys(SELF.OTI)){
				SELF.uploaders && SELF.uploaders[i] && SELF.uploaders[i].contents && (typeof SELF.OVI[i] == typeof void 0 || SELF.OVI[i] != -1) && (SELF.OVI[i] = structuredClone ? structuredClone(SELF.uploaders[i].contents()):SELF.uploaders[i].contents());
			}
		});
		if(SELF.isForm){
			SELF.detectRepeaters();
			SELF.detectUploaders();
			SELF.loadFormData();
			SELF.formSubmit();
			LWDK.step(SELF.detectSwitchers);

			clearTimeout(LWDK.preventErrorLoading);
			setTimeout(() => SELF.onload(SELF), LWDK.sleepTime * 2);
		} else {
			SELF.noLoading();
		}
	}

	alternateData(SELF){
		SELF.stopLoading();
		return false;
	}

	alternateSave(SELF, DATA){
		SELF.stopLoading();
		console.log(DATA);
		return false;
	}

	executeAfterSave(fn){
		return this.submitEvent(this, true, fn);
	}

	modUrlIfModify(){ // Modifica a URL caso necessário para configurar o menu corretamente
		const SELF = this;
		if(SELF.action == "modify"){
			let p, originalDir = ((p=new URL(location.href))).pathname + p.search, m;
			m = originalDir.split("/").filter(e => typeof e == "string" && e.length > 0);
			m.pop();
			m.push("listar");
			LWDK.modUrl(`/${m.join('/')}/`);
		    LWDK.wait(()=>$("#m_ver_menu .m-menu__item--active").length, ()=>LWDK.modUrl(originalDir));
		}
	}

	field(field){
		let fields;
		if(typeof field == "string" && document.querySelector(`[data-id="${field}"]`) != null){
			fields = document.querySelector(`[data-id="${field}"]`);
		} else if(typeof field == "string" && this.uploaders[field]){
			fields = this.uploaders[field];
		} else {
			fields = isNode(field) ? [field] : (isJQuery(field) ? [...field] : [...document.querySelectorAll(`[data-name="${field}"]`)]);

			/* Additional Functions */
			fields.attr = (a,v=-100) => {
				let ret = [];
				for(let field of fields){
					if(v == -100){
						ret.push(field.getAttribute(a));
					} else {
						ret.push(field.setAttribute(a,v));
					}
				}
				return ret;
			};

			fields.appendButton = (btn, action) => {
				if(typeof btn != "object" || btn == null){
					btn = {};
				}

				if(typeof btn.text == typeof void 0){
					return false;
				}

				if(typeof btn.style == typeof void 0){
					btn.estilo = "info";
				}

				for(let field of fields){
					const newId = LWDK.data.randomId();
					$(field).parent().append("<div class='input-group-append'><button class='btn m-btn btn-" + btn.style + "' id='" + newId + "'>" + btn.text + "</button></div>");
					$(field).css({"max-width": String($(field).parent().width() - $(field).parent().find(".input-group-prepend").width() - $(field).parent().find(".input-group-append").width()) + "px","padding-right": "0px","text-align": "center"});
					$("#" + newId).click(() => action(field, fields));
				}

				return fields;
			};

			fields.setOptions = (data, config, _default = null) => {
				for(let field of fields){
					let origValue = $(field).val();
					let html = "";
					for(let i of data){
						let selected;
						if(i[config.value] == _default){
							selected = " selected";
						} else {
							selected = "";
						}
						html += `<option${selected} value="${i[config.value]}">${i[config.text]}</option>`;
					}
					field.innerHTML = html;
					_default == null && $(field).val(origValue);
					if(field.classList.contains("m_selectpicker")){
						selectPickerUpdate(field.parentElement);
					}
				}
			};

			Object.defineProperty(fields, 'value', {
	            get() {
					let values = [];
					for(let field of fields){
						values.push(field.value);
					}
					return values.length == 0 ? false : (values.length < 2 ? values[0]:values);
	            },
	            set (value) {
					let selects = [];
					for(let field of fields){
						if(field instanceof HTMLInputElement){
							switch(field.getAttribute("type")){
								default: field.value = value; break;
								case "radio": case "checkbox":
									if(field.getAttribute("data-switch") == 'true'){
										$(field).bootstrapSwitch('state', value);
									} else {
										field.checked = value == 'true' || (!!value && value != 'false');
									}
								break;
							}
						} else if(field instanceof HTMLSelectElement){
							selects.push(field.getAttribute("data-name"));
						} else if(field instanceof HTMLTextAreaElement){
							if($(field).hasClass("summernote")){
								$(field).summernote('code', value);
							} else {
								$(field).val(value);
							}
						}
					}

					for(let e of selects.filter((a, b) => selects.indexOf(a) === b)){
						let set = {};
						set[e] = value;
						setFormData(set);
					}
	            }
	        });
		}

		return fields;
	}

	filterData(data){
		return data;
	}

	mask(selector, mask, onComplete = new Function){
		if(typeof IMask == typeof void 0){
			setTimeout(() => this.mask(selector, mask, onComplete), LWDK.sleepTime);
		} else {
			let mount = (v=[]) => ({"mask": v}),
				mounted;

			if(LWDK.check.isArray(mask)){
				mounted = mount();
				for( let i of mask ){
					mounted.mask.push(mount(i));
				}
			} else {
				mounted = mount(mask);
			}

			(e => {
				'use strict';
				let q;

				if(/[\.\#]/.test(e)){
					return $(e);
				} else {
					return $(`[data-name="${e}"]`);
				}
			})(selector).each(function(){
				const element = this;
				element.addEventListener("keyup", () => {
					if(typeof mask == "string" && element.value.length == mask.length){
						if(element.oldValue != element.value){
							element.oldValue = element.value;
							onComplete(element.value);
						}
					} else if(LWDK.check.isArray(mask)){
						for(let i of mask){
							if(element.value.length == i.length){
								if(element.oldValue != element.value){
									element.oldValue = element.value;
									onComplete(element.value);
								}
								break;
							}
						}
					}
				});

				element.mask = IMask(element, mounted);
			});
		}
	}

	onsubmit(result, data, instance){

	}

	onload(instance){

	}

	onDataLoad(data){
		return data;
	}

	constructor(){ // Variáveis de Inicialização
		const SELF = this;

			SELF.OTR = {};
			SELF.OVR = {};
			SELF.OTI = {};
			SELF.OVI = {};

		SELF.results = {
			success: {
				message: "Alterações Salvas!",
				action: function(){
					if(SELF.action=="create"){
						let newurl = (new URL(location.href)).pathname;
						newurl = newurl.split("/").filter(e => typeof e == "string" && e.length > 0);
						newurl.push(GetFormData().id);
						top.location.href = (`/${newurl.join('/')}/`);
					} else if(SELF.action=="modify"){
						/* Do action here */
					}
				}
			},
			fail: {
				message: "Falha ao gravar as informações",
				action: null
			},
			loading: "Salvando, aguarde..."
		};
		SELF.uploaders = new Object;
		SELF.database = false;
		SELF.idKey = "id";

		SELF.modUrlIfModify();

		SELF.init();
	}

	noLoading(){
		const SELF = this;
		SELF.stopLoading();
	}

	formData(){ // Retorno do formulário
		const SELF = this;

		let Data = new Object;

		Data = GetFormData();

		if(SELF.action == "modify"){
			Data[SELF.idKey] = SELF.ID;
		} else {
			// delete Data[SELF.idKey];
		}

		for(let i in Data){
			for(let j of Object.keys(SELF.repeaters)){
				if(i.split(j).length > 1){
					delete Data[i];
				}
			}

			for(let j in SELF.repeaters){
				Data[j] = SELF.repeaters[j].data;
			}

			if(typeof Data[i] == "string" && /true|false/i.test(Data[i])){
				Data[i] = /true/.test(Data[i]);
			}
		}

		console.log(Data);

		if(typeof SELF.filterData == typeof new Function){
			Data = SELF.filterData(Data);
			// if(typeof SELF.dbConfig !== typeof void 0){
			// 	Data.dbConfig = SELF.dbConfig;
			// }
		}

		// console.log(SELF.idKey);

		return Data;
	}

	submitEvent(SELF, quiet = false, fn = new Function){ // Ação ao submeter o formuário
		const FormData = SELF.formData();
		if(SELF.database !== !1 && SELF.isForm){
			SELF.validate(FormData, () => {
				loadingRequest(SELF.results.loading);
				return DB.Insert(SELF.database, FormData, r => (fn(), SELF.onsubmit(r, FormData, SELF), !quiet && (r!=0
					? successRequest(SELF.results.success.action, SELF.results.success.message)
					: errorRequest(SELF.results.fail.action, SELF.results.fail.message)))
				);
			});
		} else {
			SELF.validate(FormData, () => (
				!quiet && loadingRequest(SELF.results.loading),
				SELF.alternateSave(SELF, FormData)
			));
		}
	}

	validate(data, exec){
		return data !== false && exec();
	}

	wrong(field, message = "", type="danger", position = 'top right'){
		const iconList = {
			danger: 'user-times',
			info: 'info-circle',
			success: 'check-circle',
			warning: 'user-shield'
		};
		const element = document.querySelector(`[data-name="${field}"]`);
		$(element.closest("label")).transition('bounce');
		if(!element.parentElement.classList.contains('tooltip-' + type) && message.length){
			for(let i of Object.keys(iconList)){
				element.parentElement.classList.remove("tooltip-" + i);
			}
			$(element.parentElement).popup({
				position : position,
				html  : "<div class='d-flex justify-content-between align-items-center text-center align-content-center' style='width:" + String(~~(message.length * (message.length < 25 ? 8.65 : message.length < 40 ? 8.25 : message.length < 70 ? 7.98 : 7.75))) + "px'><i class='la la-" + iconList[type] + " ml-2'></i><span class='mr-2'>" + message + "</span></div>",
				on: "manual",
				variation: type
			});

			element.parentElement.classList.add('tooltip-' + type);
		}

		if(!this.isAnimating){

			this.isAnimating = true;

			setTimeout(() => {
				if(message.length){
					$(element.parentElement).popup("show");
				}

				hide();
			}, 400);

			element.focus();

			setTimeout(() => $(element.closest("label")).popup("hide all"), LWDK.sleepTime / 3);

			const title = element.closest("label").getElementsByTagName("b")[0];
			const igt = element.closest("label").getElementsByClassName("input-group-text")[0];
			const span = title.getElementsByTagName("i");
			const icon = element.closest("label").getElementsByClassName("la")[span.length];
			const hide = () => setTimeout(() => (element.classList.remove("is-invalid"), title.classList.remove("text-danger"), igt.classList.remove("bg-danger"), icon.classList.remove("text-white"), span.length && span[0].classList.remove("text-danger"), setTimeout(() => (this.isAnimating = false), LWDK.sleepTime), $(element).popup("show")), LWDK.sleepTime * 4);

			element.classList.add("is-invalid");
			title.classList.add("text-danger");
			igt.classList.add("bg-danger");
			icon.classList.add("text-white");
			span.length && span[0].classList.add("text-danger");
		}
	}

	formSubmit(){ // Atribuição da funcionalidade de salvar o que foi realizado
		const SELF = this;

		document.addEventListener('keydown', e => {
			if (e.ctrlKey && e.key === 's') {
				e.preventDefault();
				SELF.submitEvent(SELF);
			}
		});

		One(".submit").click(() => SELF.submitEvent(SELF));
	}

	stopLoading(){ // Parar o carregamento
		for(let i = 1; i < 10; i++){
			setTimeout(()=>LWDK.stopLoading instanceof Function && LWDK.stopLoading(),LWDK.sleepTime * i);
		}
	}

	loadFormData(){ // Carregamento de informações gravadas anteriormente
		const SELF = this;
		if(SELF.database === !1){
			return SELF.alternateData(SELF);
		}
		DB.Select(SELF.database, SELF.ID,  db => { // Path Example: db.key = db => key dir
			if(typeof SELF.onDataLoad == typeof new Function){
				db = SELF.onDataLoad(db);
			}

			for(let i in db){
				if(typeof SELF.uploaders[i] != typeof void 0){
					// console.log([db[i], SELF.uploaders[i]]);
					db[i] !== "false"
						? SELF.uploaders[i].contents(db[i], true)
						: SELF.uploaders[i].contents([], true);
				}

				if(typeof SELF.repeaters[i] != typeof void 0){
					SELF.repeaters[i].data = db[i];
					setTimeout(() => SELF.repeaters[i].jQueryElement.find(".visibility").trigger("click"), LWDK.sleepTime);
				}
			}

			setFormData(db);
			SELF.stopLoading();
		});
	}

	detectUploaders(){ // Sistema para detectar uploaders presentes na página
		const SELF = this;
		// for(let i of Object.keys(SELF.uploaders)){
		// 	if(SELF.OTI[i]){
		// 		if($(SELF.uploaders[i].element).length == 0){
		// 			delete SELF.OTI[i];
		// 			delete SELF.uploaders[i];
		// 		} else {
		// 			let tpl = SELF.OTI[i];
		// 			$(SELF.uploaders[i].element).replaceWith(tpl);
		// 			delete SELF.uploaders[i];
		// 		}
		// 	}
		// }
		$(":not(template) > .__uploader").each(function(){
			const originalTemplate = this.outerHTML;
			const $form = $(this).parent();
			const config = $(this).data();
			let originalValues = -1;
			if(config.id && SELF.OVI[config.id]){
				originalValues = SELF.OVI[config.id];
				SELF.OVI[config.id] = -1;
			}
			$(this).removeClass("__uploader");
			const myId = LWDK.data.randomId();
			$(this).attr("id", myId);
			const controller = new img_uploader_control("#" + myId, config.maxFiles, config.type, (first = false) => LWDK.step(() => {
				let contents = controller.contents();
				typeof contents == "string" && (contents = [contents]);
				for(let i = 0; i < contents.length; i++){
					if(!$("." + myId).eq(i).length){
						$form.append(`<input class="${myId}" type="hidden" data-name="${config.id}" value="${contents[i]}" />`);
					} else {
						$("." + myId).eq(i).val(contents[i]);
					}
				}
			}));

			SELF.uploaders[config.id] = controller;

			if(originalValues != -1){
				SELF.uploaders[config.id].contents(originalValues, true);
				delete SELF.OVI[config.id];
			}

			if(!SELF.OTI[config.id]){
				SELF.OTI[config.id] = originalTemplate;
			}
		});
	}

	detectRepeaters(){ // Sistema para detectar repeaters presentes nas páginas
		const SELF = this;
		if(!SELF.repeaters){
			SELF.repeaters = new Object;
		} else {
			// $("[data-repeater]").each(function(){
			// 	let cfg = $(this).data();
			// 	if(SELF.OTR[cfg.id] && SELF.repeaters[cfg.id]){
			// 		let tpl = SELF.OTR[cfg.id];
			// 		SELF.repeaters[cfg.id].data;
			// 		$(this).replaceWith(tpl);
			// 	}
			// });
		}
		const $form = $("#page_content > form.m-content");
		$(":not(template) > ._repeater_").each(function(){
			const instance = this;
			const originalTemplate = this.outerHTML;
			const configRepeater = $(instance).data();
			let originalValues = -1;
			if(SELF.OVR[configRepeater.id]){
				originalValues = SELF.OVR[configRepeater.id];
				SELF.OVR[configRepeater.id] = -1;
			}

			$(instance).find("._repeater_").removeClass("_repeater_").addClass("_subrepeater_");


			$(this).find("._subrepeater_ [data-name]").each(function(){
				let configRepeater = $(this).closest("._subrepeater_").data();
				let oName = $(this).data("name");
				$(this).attr("data-name", configRepeater.id + "-" + oName);
				$(this).data("name", configRepeater.id + "-" + oName);
			});

			$(this).find("._subrepeater_ .__uploader[data-id]").each(function(){
				let configRepeater = $(this).closest("._subrepeater_").data();
				let oName = $(this).data("id");
				$(this).attr("data-id", configRepeater.id + "-" + oName);
				$(this).attr("id", configRepeater.id + "-" + oName);
				$(this).data("id", configRepeater.id + "-" + oName);
			});

			$(this).find("[data-name]").each(function(){
				let oName = $(this).data("name");
				$(this).attr("data-name", configRepeater.id + "-" + oName);
				$(this).data("name", configRepeater.id + "-" + oName);
			});

			$(this).find(".__uploader[data-id]").each(function(){
				let oName = $(this).data("id");
				$(this).attr("data-id", configRepeater.id + "-" + oName);
				$(this).attr("id", configRepeater.id + "-" + oName);
				$(this).data("id", configRepeater.id + "-" + oName);
			});

			SELF.repeaters[$(instance).data("id")] = (new class {
				empty(){
					return!!$(instance).find(" > [data-repeater-list] > [data-repeater-item]").remove();
				}

				get data(){
					let returnData = [];
					let c = 0;

					$(instance).find("> [data-repeater-list] > [data-repeater-item]").each(function(){
						let data = GetFormData(this);

						const Parent = this;

						if(typeof returnData[c] == typeof void 0){
							returnData[c] = {};
						}

						const id = $(Parent).closest("[data-repeater]").data("id");

						if($(this).find("._subrepeater_").length){
							$(Parent).find("._subrepeater_").each(function(){
								let di = 0;
								$(this).find(" > [data-repeater-list] > [data-repeater-item]").each(function(){
									let data2 = GetFormData(this);
									let returnData2 = [];
									const subId = $(this).closest("._subrepeater_").data("id");

									if(typeof returnData[c][subId] == typeof void 0){
										returnData[c][subId] = [];
									}

									if(typeof returnData[c][subId][di] == typeof void 0){
										returnData[c][subId][di] = {};
									}

									for( let j in data2 ){
										if(typeof data[j] != typeof void 0){
											delete data[j];
										}

										if(typeof data[id + "-" + j] != typeof void 0){
											delete data[id + "-" + j];
										}
										returnData[c][subId][di][j.split(subId + "-")[1].split("-nro-")[0]] = data2[j];
									}

									di++;
								});
							});
						}

						for( let j in data ){
							returnData[c][j.split(id + "-")[1].split("-nro-")[0]] = data[j];
						}
						c++;
					});

					return returnData instanceof Object ? Object.values(returnData):returnData;
				}

				set data(values){
					for(let i of values){
						$(instance).find(" > div > [data-repeater-create]").trigger("click");

						const repeaterItem = $(instance).find("> [data-repeater-list] > [data-repeater-item]:last-child");

						const k = repeaterItem.closest("[data-repeater]").find("> [data-repeater-list] > [data-repeater-item]").length;

						for( let j in i ){
							if(i[j] instanceof Array && !!repeaterItem.find("._subrepeater_").length){
								for(let l of i[j]){
									repeaterItem.find("._subrepeater_[data-id=\"" + j + "\"] > div > [data-repeater-create]").trigger("click");

									const repeaterSubItem = repeaterItem.find("._subrepeater_[data-id=\"" + j + "\"] > [data-repeater-list] > [data-repeater-item]:last-child");

									for( let m in l ){
										l[`${$(instance).data("id")}-${j}-${m}`] = l[m];
										delete l[j];
									}
									for(let m in l){
										let o = m + "-nro-" + String(k);
										if(typeof SELF.uploaders[o] != typeof void 0){
											l[o] = l[m];
											delete l[m];
											m = o;

											// console.log(SELF.uploaders[m]);

											l[m] !== "false"
												? SELF.uploaders[m].contents(l[m], true)
												: SELF.uploaders[m].contents([], true);
										}
									}
									setFormData(l, repeaterSubItem);
								}
							} else {
								i[`${$(instance).data("id")}-${j}`] = i[j];
							}
							delete i[j];
						}

						for(let j in i){
							let l = j + "-nro-" + String(k);
							if(typeof SELF.uploaders[l] != typeof void 0){
								i[l] = i[j];
								delete i[j];
								j = l;

								i[j] !== "false"
									? SELF.uploaders[j].contents(i[j], true)
									: SELF.uploaders[j].contents([], true);
							}
						}
						setFormData(i, repeaterItem);
					}
				}

				get element(){
					return instance;
				}

				get jQueryElement(){
					return $(instance);
				}

				get $(){
					return $(instance);
				}
			});

			const _previousConfigSub = $(this).find("._subrepeater_").data();
			const _previousOrigData = $(this).find("._subrepeater_").data();

			if(_previousConfigSub){
				for(let k of Object.keys(_previousConfigSub)){
					_previousConfigSub["data-" + k.replaceAll(/(?=[A-Z])/g, "-").toLowerCase()] = _previousConfigSub[k];
					delete _previousConfigSub[k];
				}
			}

			function showFn () {
				const configRepeater = $(this).closest("[data-repeater-list]").closest("[data-id]").data();

				$(this).slideDown();

				if(_previousConfigSub){

					$(this).find("._subrepeater_").data(_previousOrigData);

					for(let k of Object.keys(_previousConfigSub)){
						$(this).find("._subrepeater_").attr(k, _previousConfigSub[k]);
					}

				}

				$(this).closest("[data-repeater-list]")[0].sortable = new Sortable($(this).closest("[data-repeater-list]")[0], {
					handle: '.moveElement',
					swapThreshold: .95,
					animation: 350,
					easing: 'cubic-bezier(0.83, 0, 0.17, 1)',
					ghostClass: 'blue-background-class',
					group: $(this).closest("[data-id]").data("id")
				});

				$(this).find("[data-toggle=\"m-tooltip\"]").tooltip({ trigger: "hover" });
				summernote_config(this);
				selectPickerUpdate(this);
				buttonSwitchInit();

				$(this).find(".visibility > .la-eye").hide();
				$(this).find(".visibility").data("visible", true);
				$(this).find(".visibility .la, [data-repeater-delete], .moveElement").tooltip({ trigger: "hover" });

				$(this).find(".caption").parent().dblclick(function(){
					$(this).closest("[data-repeater-item]").find(".visibility").trigger("click");
				}).popup({
					position: "top center",
					html: "<div class='d-flex justify-content-between align-items-center' style='width: 310px;'><i class='la la-info-circle'></i>Dê um duplo clique para expandir ou retrair.</div>"
				});

				$(this).find(".visibility").click(function(){
					if($(this).data("visible")){
						$(this).data("visible", false);
						$(this).find(" > .la-eye-slash").slideUp();
						$(this).find(" > .la-eye").fadeIn();

						let title, el = $(this)
							.closest("[data-repeater-item]")
							.find("input:not(:hidden), select, textarea")
							.eq(configRepeater.legendTitle);

						if(el[0] instanceof HTMLSelectElement){
							title = el.find("option:selected").text();
						} else {
							title = el.val();
						}

						$(this).parent().parent().find(".caption").html(typeof title == "string" ? title.capitalize():"");
						$(this).parent().parent().find(".caption").fadeIn();
						$(this).closest("[data-repeater-item]").find(" > .row").slideUp();
					} else {
						$(this).data("visible", true);
						$(this).find(" > .la-eye-slash").fadeIn();
						$(this).find(" > .la-eye").slideUp();
						$(this).parent().parent().find(".caption").hide();
						$(this).closest("[data-repeater-item]").find(" > .row").slideDown();
					}
				});

				$(this).find(".__uploader").each(function(){
					let count = $(this).closest("[data-repeater]").find("> [data-repeater-list] > [data-repeater-item]").length;
					$(this).data("id", $(this).data("id") + "-nro-" +  String(count));
					$(this).attr("id", $(this).data("id"));
				});

				SELF.detectUploaders();
			}

			function hideFn(deleteElement){
				confirm_msg(configRepeater.onTrashQuestion, () => ($(this).slideUp(deleteElement), errorRequest(null, configRepeater.onTrashMessage)));
			}

			$(this).removeClass("_repeater_").attr("data-repeater","").repeater({
				initEmpty: true,
				show: showFn,
				hide: hideFn,
				isFirstItemUndeletable: false,
				repeaters: [{
					selector: "._subrepeater_",
					initEmpty: true,
					show: showFn,
					hide: hideFn,
					isFirstItemUndeletable: false
				}]
			});

			Object.defineProperty(this, "data", {
				get(){ return SELF.repeaters[$(instance).data("id")].data; },
				set(value){ this.reset(); SELF.repeaters[$(instance).data("id")].data = value; }
			});

			this.reset = () => SELF.repeaters[$(instance).data("id")].empty();

			this.push = (p) => (SELF.repeaters[$(instance).data("id")].data = !p.length ? [p]:p);

			this.repeater = SELF.repeaters[$(instance).data("id")];

			if(originalValues != -1){
				this.data = originalValues;
				delete SELF.OVR[configRepeater.id];
			}

			if(!SELF.OTR[configRepeater.id]){
				SELF.OTR[configRepeater.id] = originalTemplate;
			}
		});
	}

	detectSwitchers(){
		$('label .bootstrap-switch-container .bootstrap-switch-container').each(function(){
			let $input = $(this).find("input[data-switch]").clone();
			let $value = $(this).find("input[data-switch]").bootstrapSwitch('state');
			let $parent = $(this).find("input[data-switch]").closest(".bootstrap-switch").closest(".bootstrap-switch").parent().parent().parent();
			$(this).find("input[data-switch]").closest(".bootstrap-switch").closest(".bootstrap-switch").parent().parent().remove();
            $parent.append($input);
            $input.bootstrapSwitch("state", $value);
		});
	}

	applyHelp(context, help){
		if(typeof context === "string"){
			context = this.field(context);
		}

		const lamp = help.split("#").length > 1
			? `<i class="la la-${help.split("#")[1]} mx-2"></i>`
			: `<i class="la la-lightbulb mr-1"></i>`;
		let msg = lamp + help.split("#")[0];
		context = (LWDK.check.isJQuery(context)?context:$(context));
		msg = "<div class='d-flex justify-content-start align-items-center align-content-center' style='width: " + String(Math.min($("<div>" + help.split("#")[0] + "</div>").text().length * 8.45, ~~Math.max(context.closest("label").find("select[data-name], textarea[data-name], input[data-name]").eq(0).width() * .65, 150))) + "px'>" + msg + "</div>";
		context.closest("label").find("input[data-name]").popup({
			position   : 'top right',
			html	   : msg,
			on		   : "focus",
			transition : "fade up",
			exclusive  : true
		});
		context.closest("label").find("select[data-name]").parent().popup({
			position   : 'top right',
			html	   : msg,
			on		   : "hover",
			transition : "fade up",
			exclusive  : true
		});
		context.closest("label").find("textarea[data-name]").popup({
			position   : 'top right',
			html	   : msg,
			on		   : "focus",
			transition : "fade up",
			exclusive  : true
		});
	}

	applyRequired(b){
		if(typeof b === "string"){
			b = this.field(b);
		}
		b = b.closest("label").querySelector("b"); // HACK
		const m = "<div data-tooltip='Campo obrigatório!'><i class='mx-2 la la-exclamation-circle text-info' style='font-size: .91em; cursor: help'></i></div>";
		if(/\*/g.test(b.textContent)){
			b.innerHTML = b.innerHTML.replace(/\*/g, m);
		} else {
			b.innerHTML += m;
		}

		b.classList.add("d-flex");
		b.classList.add("justify-content-start");
		b.classList.add("align-items-start");
		b.classList.add("align-content-start");
	}

	init(){ // Loader da Classe
		const SELF = this;

		LWDK.sleepTime = 1e3;

		$(document).ready(function() {
		  $(window).keydown(function(event){
		    if(event.keyCode == 13) {
		      event.preventDefault();
		      return false;
		    }
		  });
		});

		function init(){
			LWDK.__onmain__.push(() => SELF.startup(SELF));
		}

		$(function(){
			for(const b of [...LWDK.el("label > b")]){
				if(/\*/g.test(b.textContent)){
					SELF.applyRequired(b);
				}
			}
		});

		LWDK.wait(() => typeof $().popup == "function", () => $("[data-toggle=\"help_block\"]").each(function(){
			SELF.applyHelp(this, $(this).attr("title"));
			$(this).remove();
		}));

		for(const b of [...LWDK.el("input")]){
			b.setAttribute("autocomplete", "no");
			b.setAttribute("spellcheck", "false");
			b.removeAttribute("name");
		}

		for(const b of [...LWDK.el("form")]){
			b.autocomplete = "off";
		}

		function check(i = 0){
			if(LWDK && LWDK.__onmain__ && LWDK.__onmain__ instanceof Array){
				init();
			} else {
				i++;

				if(i > 10){
					SELF.startup(SELF);
				} else {
					setTimeout(() => check(i), 10);
				}
			}
		}

		LWDK.step(() => {
			$("[LWDKUploadElement]").each(function(){
				if(!$(this).hasClass("attached-event")){
					$(this).change(function(){
						const input = this;

						const uploadFile = ($field, $done = new Function) => {
							loadingRequest("Carregando arquivo, aguarde...");

							let myFormData = new FormData();

							myFormData.append('uploadFileExtension::File', $field.files[0]);

							fetch(`/admin/uploadFile/?path=${top.location.href.split("/admin/")[1].split("/")[0]}`, {
							  method: "POST",
							  body: myFormData,
						  }).then(r => r.json()).then(r => $done(r));
						};

						uploadFile(input, data => {
							if(data){
								$(input).closest(".input-group").find("[data-name]").val(data);
								successRequest(() => $('.m-content').find('.submit:first')[0].click(), "Arquivo carregado com sucesso!");
							} else {
								errorRequest(null, "Houve um erro... tente novamente!");
							}
						});
					});
				}

				const $parent = $(this.closest(".input-group"));
				const value = Object.values(GetFormData($parent)).pop();

				if(value.length < 1){
					$parent.find("[LWDKUploadElement]").show();
					$parent.find("[LWDKUploadElement]").prop("disabled", false);
					$parent.find("div.form-control.m-input.position-relative").hide().find(".p-2").text("");
				} else {
					$parent.find("[LWDKUploadElement]").val("");
					$parent.find("[LWDKUploadElement]").hide();
					$parent.find("[LWDKUploadElement]").prop("disabled", true);
					$parent.find("div.form-control.m-input.position-relative").show().find(".p-2").text(value.split("/").pop());
				}

				if(!$parent.find(".btn.btn-dark").hasClass("attached-event")){
					$parent.find(".btn.btn-dark").addClass("attached-event")
						.click(() => {
							confirm_msg("Deseja mesmo apagar este arquivo?", () => {
								LWDK.request(location.href, {act: "erase", file: Object.values(GetFormData($parent)).pop()});
								$parent.find("[data-name]").val('');
								$('.m-content').find('.submit:first')[0].click();
							});
						});
				}
			})
		});

		check();
	}

	/* Setters and Getters */

	get action(){
		return LWDK.cookie("frm-act");
	}

	set ifNotExists(value){ // Checar se ID existe | {{value}} = Fallback {title: "", html: ""}
		const SELF = this;
		DB.Select(SELF.database, {id: SELF.ID}, db => {
			if(db instanceof Array && db.length == 0 && SELF.action == "modify"){
				$("#page_content")[0].innerHTML = `<div class="m-grid__item m-grid__item--fluid m-wrapper"><div class="m-subheader"><div class="d-flex align-items-center"><div class="mr-auto"><h3 class="m-subheader__title">${value.title} </h3></div><div></div><div class="col text-right"></div></div></div></div><form class="m-content p-4"><div class="m-portlet p-4 text-center">${value.html}</div></form>`;
				SELF.ID = -1;
				SELF.stopLoading();
				if(typeof value.refresh !== typeof void 0){
					setTimeout(() => Go(value.refresh), 5e3);
				}
			}
		});

	}

	set DB(value){ // Banco de Dados do form
		const SELF = this;
		SELF.database = value;
	}

	get ID(){ // Valor do ID do form
		const SELF = this;
		let key = GetFormData()[SELF.idKey];
		if(typeof key == typeof void 0){
			throw new Error("ID de formulário não definida!");
		} else {
			return key;
		}
	}

	set ID(value){ // Definir valor de ID
		const SELF = this;
		if($("input[data-name=\"" + SELF.idKey + "\"]").length < 1){
			$("form.m-content").append("<input data-name=\"" + SELF.idKey + "\" name=\"" + SELF.idKey + "\" value=\"" + value + "\"type=hidden />");
		} else {
			let setter = new Object;
			setter[SELF.idKey] = value;

			setFormData(setter);
		}
	}

	set successText(value) { // Definir texto da mensagem de sucesso.
		const SELF = this;
		SELF.results.success.message = value;
	}

	get successText() { // Pegar texto da mensagem de sucesso.
		const SELF = this;
		return SELF.results.success.message;
	}

	set successFn(value) { // Definir a função de sucesso.
		const SELF = this;
		SELF.results.success.action = value;
	}

	get successFn() { // Pegar a função de sucesso.
		const SELF = this;
		return SELF.results.success.action;
	}

	set failText(value) { // Definir texto da mensagem de erro.
		const SELF = this;
		SELF.results.fail.message = value;
	}

	get failText() { // Pegar texto da mensagem de erro.
		const SELF = this;
		return SELF.results.fail.message;
	}

	set failFn(value) { // Definir a função de erro.
		const SELF = this;
		SELF.results.fail.action = value;
	}

	get failFn() { // Pegar a função de erro.
		const SELF = this;
		return SELF.results.fail.action;
	}

	set loadingText(value) { // Definir texto de carregamento (loading).
		const SELF = this;
		SELF.results.loading = value;
	}

	get loadingText() {  // Pegar texto de carregamento (loading).
		const SELF = this;
		return SELF.results.loading;
	}

	// set data(data){
	// 	data = typeof data == "string" ? LWDK.data.jsonParse(data) : (typeof data == "object" && data != null ? data : new Object);
	//
	//     for( let i in data ){
    //         this.field(i).value = data[i];
	//     }
	// }
	//
	// get data(){
	// 	let result = {};
	//
	// 	[...$(":not[data-form-id] [data-name]")].map(e => {
	// 		let set, el = $(e).data("name");
	//
	// 		if(e.type == "checkbox"){
	// 			set = e.checked;
	// 		} else {
	// 			set = $(e).val();
	// 		}
	//
	// 		if(typeof result[el] != typeof void 0 && typeof result[el] != 'object'){
	// 			result[el] = [result[el]];
	// 		}
	// 		if(typeof result[el] == 'object'){
	// 			result[el].push(set);
	// 		} else {
	// 			result[el] = (set);
	// 		}
	// 	});
	//
	//     return result;
	// }
});
