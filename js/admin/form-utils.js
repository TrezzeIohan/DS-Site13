/* Loader: Form Control */
	LWDK.init(LWDK.check.export);
	LWDK.stopLoading = () => LWDK.__loading && (LWDK.__loading.hide(),LWDK.stopLoading = LWDK.__loading = void 0, clearTimeout(LWDK.preventErrorLoading));
	LWDK.init(() => LWDK.load(["css"], () => {
		function menuResponsive(){
	        let fixMenu = LWDK.css(`div.m-subheader { transition: all 250ms ease; } @media screen and (min-width: 1400px){ div.m-subheader { position: fixed; width: 75%; top: -12px; left: 50%; margin-left: calc( -35% + 64px ); z-index: 1000; } .m-content {margin-top: 77px;} }`)[$(window).scrollTop() > 84 ? "on":"off"](),
	            fixMenuFn = function(){
	                fixMenu[$(window).scrollTop() > 84 ? "on":"off"]();
	            };

	        $(window).scroll(fixMenuFn);
	        $(window).resize(fixMenuFn);
		}

		function modifyBackButton(){
			function modify_back_button(p,e){
		        LWDK.modUrl(location.pathname);
		        return p !== null && ((e=document.querySelector("button.btn-outline-danger")).onclick = (p="location.href='" + p + "'"), e.setAttribute("onclick", p));
		    }

		    setTimeout(() => modify_back_button((new URL(location.href)).searchParams.get("origem")), LWDK.sleepTime * 3);
		}

		menuResponsive();
		selectPickerInit();
		buttonSwitchInit();
		summernote_config();
	}));

/* Function List */

	const img_uploader_control = (function img_uploader_control($element, $maxfiles, $model, $updateFn, $padding = 2){
	    typeof $updateFn === "undefined" && ($updateFn = ()=>{});

	    $padding = [$padding, 12 - ($padding * 2)];

	    let models = {}, Self = this;
		let checkFull = () => (LWDK.debug.post([$maxfiles, Self.contents()]),Self.contents().length >= $maxfiles || $maxfiles === 1);

	    models.banner = [`<div class="form-group m-form__group text-center" id="__myid__">
	        <div class="row start gallery" style="align-items: center;align-self: center;justify-content: center;">
	            <h3 class="col-form-label text-center d-block w-100 ml-4">__texto__</h3>
	        </div>
	        <div class="w-100 row p-0 m-0 d-inline-block">
	            <form action="__LOCATION__" method="post" class="col-12 m-0 p-0 drop_zone" style="border: 0;">
	                <div class="m-dropzone" style="border: 0;">
		                <div class="m-dropzone__msg dz-message needsclick">
		                    <h3 class="m-dropzone__msg-title m-btn m-btn--pill btn-outline-info btn" style="padding: 16px;">Clique aqui para o upload</h3>
		                </div>
	                </div>
	            </form>
	        </div>
	    </div>`.split("__texto__").join($($element).text()),`<div class='col-10 text-center d-block position-relative img-element' style="height: 350px; z-index: 0;">
	        <input type=hidden class=img value='__img__' />
	        <div class='img w-100' style='background-image:url(/__img__);background-size: cover!important;height: 300px;box-shadow: 2px 2px 4px #000;border-radius: 0.25rem;'></div>
	        <div class='text-center w-100 my-4'>
	            <button class='apagar m-btn text-center m-btn--pill btn-outline-danger btn'>
	                <i class='la las la-trash'></i> Apagar
	            </button>
	        </div>
	    </div>`];

	    models.image = [`<div class="form-group m-form__group text-center" id="__myid__">
	        <div class="row start gallery" style="align-items: center;align-self: center;justify-content: center;">
	            <h3 class="col-form-label text-center d-block w-100 ml-4">__texto__</h3>
	        </div>
	        <div class="row p-0 m-0 inline-block">
	            <form action="__LOCATION__" method="post" class="col-12 m-0 p-0 drop_zone" style="border: 0;">
	                <div class="m-dropzone" style="border: 0;">
	                <div class="m-dropzone__msg dz-message needsclick">
	                    <h3 class="m-dropzone__msg-title m-btn m-btn--pill btn-outline-info btn" style="padding: 16px;">Clique aqui para o upload</h3>
	                </div>
	                </div>
	            </form>
	        </div>
	    </div>`.split("__texto__").join($($element).text()),`<div class='col-10 text-center d-block position-relative img-element'>
	        <input type=hidden class=img value='__img__' />
	        <div class='img w-100'><img src="/__img__" class="img-fluid" style="max-height: 350px;box-shadow: 2px 2px 4px #000;border-radius: 0.25rem;" /></div>
	        <div class='text-center w-100 my-4'>
	            <button  class='apagar m-btn text-center m-btn--pill btn-outline-danger btn'>
	                <i class='la las la-trash'></i> Apagar
	            </button>
	        </div>
	    </div>`];

	    models.gallery = [`
	        <div class="form-group m-form__group row text-center" id="__myid__"  style="align-items: center;align-self: center;justify-content: center!important;">
	            <div class="w-100 row p-0 m-0 d-inline-block">
	                <form action="__LOCATION__" method="post" class="col-12 m-0 p-0 drop_zone" style="border: 0;">
	                    <div class="m-dropzone" style="border: 0;">
	                    <div class="m-dropzone__msg dz-message needsclick">
	                        <h3 class="m-dropzone__msg-title m-btn m-btn--pill btn-outline-info btn" style="padding: 16px;">Clique aqui para o upload</h3>
	                    </div>
	                    </div>
	                </form>
	            </div>
	            <div class="row start gallery fotos-produto sortable col-10">
	                <h3 class="col-form-label text-center d-block w-100 ml-4">__texto__<br></h3>
	            </div>
	        </div>`.split("__texto__").join($($element).text()), `<div style="margin: 48px 0px;" class="col-lg-4 col-sm-6 col-xs-12 img-element">
	        <input type=hidden class=img value='__img__' />
	         <div class="w-100">
			 	<img src="__img__" class="img-fluid img pt-0 mb-4" style="box-shadow: 2px 2px 4px #000;border-radius: 0.25rem;height: auto!important;" />
			</div>
	        <div class="col-12 text-center">
	            <button class="apagar m-btn text-center m-btn--pill btn-outline-danger btn"><i class="la las la-trash"></i> Apagar</button>
	        </div>
	    </div>`];

	    $($element).replaceWith(models[$model][0].split("__LOCATION__").join(top.location.href).split("__myid__").join(((e) => (e=e.split(''),e.shift(),e.join('')))($element)));

	    let updateDeleteButtons = () => $($element).find(".apagar").each(function () {
	        One(this).click(function () {
	            let the = $(this).closest(".img-element");
				let settingID = $(this).data("img");
	            confirm_msg((typeof $(this).data("message") == "string" ? $(this).data("message"):"Deseja mesmo remover esta imagem?"), function () {
	                the.slideUp("slow", function () {
	                    checkFull()&&($($element).find(".drop_zone")[0].dropzone.enable(),LWDK.load(["anim"],()=>$($element).find(".drop_zone").show()));
	                    $.post(LWDKLocal, { act: "erase", file: (f = typeof settingID === "string" ? settingID:$(this).find("input.img").val()) }, () => ($(this).remove(), $updateFn()));
	                });
	            });
	        });
	    });

	    let generateHTML = (data, first = false) => {
	        $($element).find(".gallery.start").removeClass("start").html("");
	        for(let img of data){
	            $($element).find(".gallery").append(models[$model][1].split("__img__").join(img));
	        }

	        checkFull() && (
	            $($element).find(".drop_zone")[0].dropzone.disable(),
	            $($element).find(".drop_zone").hide()
	        );

	        updateDeleteButtons();
	        $updateFn(first);
	    };

	    One($element)
	        .find(".drop_zone")
	        .addClass("dropzone")
	        .dropzone({
	            autoProcessQueue: true,
	            uploadMultiple: true,
	            parallelUploads: $maxfiles,
	            maxFiles: $maxfiles,
	            acceptedFiles: "image/*",
	            init: function () {
	                var myDropzone = this;

	                myDropzone.on("successmultiple", function (file, data) {
	                    // console.log(data);
	                    generateHTML(data);
	                });
	            },
	            complete: function (file) {
	                this.removeFile(file);
	            },
	        });

	    let getImageList = (r) => (
	        (
	            r = [!(typeof r == "undefined"), $(r = typeof r == "undefined" ? $element : r).find("input.img").length
	                ? JSON.parse(JSON.stringify(MapEl(r + " input.img", function(){return this.value}, false, false)))
	                : []]
	        ),
	        // LWDK.debug.post(r),
	        r[1].length == 0
	            ? r[0] == true ? [] : ""
	            : r[1].length == 1 && !r[0]
	                ? r[1][0]
	                : r[1]
	        );

	    let setImageList = (data, first = false) => {
			// console.log(data);
	        if (data === null || (typeof data !== "object" && typeof data !== "string") || typeof data.length !== "number" || data.length === 0) return;
	        typeof data == "string" && (data = [data]);
	        generateHTML(data, first);
	    };

	    if($maxfiles > 1){
	        let sort;
	        (sort = document.querySelector($element).querySelector(".sortable")) !== null &&
	        (Self.sortableInstance = new Sortable(sort, {
	            animation: 150,
	            ghostClass: 'blue-background-class',
	            handle: '.img'
	        }));
	    }


	    Self.contents = (apply = -1, first = false) => apply === -1 ? typeof getImageList() == "string" && $maxfiles > 1 ? [getImageList()]:getImageList():setImageList(apply, first);
	    Self.getgroup = (r) => getImageList(r);
	    Self.imageTemplate = (code) => (models[$model][1] = code);
	    Self.off = () => $($element).find(".drop_zone")[0].dropzone.disable();
	    Self.on = () => $($element).find(".drop_zone")[0].dropzone.enable();
	    Self.disableNativeSortable = () => Self.sortableInstance.destroy();
		Self.element = $element;

	    return Self;
	});

	const repeater_control = (function repeater_control($element){
	    /* Setup */

	    function setup(){
	        instance = $($element).repeater({
	            initEmpty: initEmpty,
	            defaultValues: {

	            },

	            show: function () {
	                if(SELF.limit > -1 && SELF.length > SELF.limit){
	                    return $(this).remove();
	                }
	                $($element).find("[data-repeater-create]").prop("disabled", false);
	                $(this).slideDown();
	                summernote_config(this);
	                sortableIt();
	                setTimeout(()=>helpIcon.update(), LWDK.sleepTime);
	                if(SELF.limit > -1 && SELF.length > SELF.limit){
	                    $($element).find("[data-repeater-create]").prop("disabled", true);
	                }
	            },

	            hide: function (deleteElement) {
	                confirm_msg("Deseja mesmo apagar?", () => ($(this).slideUp(deleteElement),$($element).find("[data-repeater-create]").prop("disabled", false)));
	            },

	            ready: function (i) {
	                sortableIt();
	            },

	            isFirstItemUndeletable: isFirstItemUndeletable
	        });
	    }

	    function sortableIt(){
	        if(!sortable)return false;
	        return new Sortable($($element).find('[data-repeater-list]')[0], {
	            animation: SELF.animationSpeed,
	            ghostClass: 'blue-background-class',
	            handle: '.moveIt-Sortable-plugin > button',
	            onStart: helpIcon.reload,
	            onEnd: helpIcon.tooltip,
	            onMove: helpIcon.tooltipHide
	        });
	    }

	    function applyData(obj,state=0){

	        switch(state){
	            case 0:

	                initEmptyBackup = initEmpty;
	                SELF.initEmpty(true);

	                let length = 0;

	                for(let values of Object.values(obj)){
	                    length = Math.max(length, values.length);
	                }

	                let i = length + 1;

	                while(--i){
	                    setTimeout(()=>SELF.addItem(), LWDK.sleepTime * ((length - i) * .25));
	                }

	                function wait(){
	                    SELF.length < length ? (setTimeout(wait, LWDK.sleepTime)) : applyData(obj, 1);
	                }

	                setTimeout(wait, LWDK.sleepTime);
	            break;

	            case 1:
	                for(let key in obj){
	                    let i = 0;
	                    for(let value of obj[key]){
	                        let find = `[data-repeater-list] [data-repeater-item] [data-name="${key}"]`;
	                        let element = $($element).find(find).eq(i)[0];

	                        element.classList.add("modified");

	                        if(element.classList.contains("summernote")){
	                            $(element).summernote('code',value);
	                        } else if(element.type == "radio" || element.type == "checkbox") {
	                            element.checked = !!value;
	                        } else {
	                            element.value = value;
	                        }

	                        i++;
	                    }
	                }

	                SELF.length == 0 && !initEmptyBackup && (setTimeout(()=>SELF.addItem(), LWDK.sleepTime));
	            break;
	        }
	    }

	    function helpIcon(){
	        function init(){
	            let title = !helpSortText.length ? "":`title="${helpSortText}"`;
	            $($element).find('[data-repeater-list] [data-repeater-item] .moveIt-Sortable-plugin').remove();
	            $("<div class='moveIt-Sortable-plugin p-2' " + title + "><button class='btn btn-light rounded p-1'><i class='la la-arrows'></i></button></div>").appendTo('[data-repeater-list] [data-repeater-item]');
	            preventTooltip();
	        }

	        function _tooltip(){
	            if(!helpSortText.length)return;
	            $($element).find('[data-repeater-list] [data-repeater-item] .moveIt-Sortable-plugin').tooltip({ trigger: "hover" });
	            $($element).find('[data-repeater-list] [data-repeater-item] .moveIt-Sortable-plugin > button')[0].click(preventTooltip);
	        }

	        function preventTooltip(){
	            if(!helpSortText.length)return;
	            $("body > ui-tooltip").hide();
	        }

	        this.tooltipHide = () => preventTooltip();
	        this.reload = () => init();
	        this.tooltip = () => _tooltip();
	        this.update = () => (init(),_tooltip(),preventTooltip());

	        this.update();

	        return this;
	    }

	    let moveItCSS = LWDK.css(`
	        ${$element} .moveIt-Sortable-plugin {
	            position: absolute;
	            right: 32px;
	            top: 0;
	            z-index: 1;
	        }

	        ${$element} .moveIt-Sortable-plugin > button, ${$element} .moveIt-Sortable-plugin > button > i {
	            cursor: grabbing;
	        }
	    `, false);

	    LWDK.css(`
	        ${$element} .delete-Repeater-Button {
	            position: absolute;
	            right: 0px;
	            top: 0;
	            z-index: 1;
	        }

	        ${$element} .delete-Repeater-Button > button, ${$element} .delete-Repeater-Button > button > i {
	            cursor: pointer;
	        }

	        ${$element} .delete-Repeater-Button > button > i {
	            transform: scale(1.15);
	        }

	        ${$element} [data-repeater-list] [data-repeater-item] {
	            position: relative;
	        }

	        ${$element} [data-repeater-create][disabled] {
	            cursor: not-allowed!important;
	        }
	    `);

	    $($element).find("[data-repeater-list] [data-repeater-item]").append("<div class='delete-Repeater-Button p-2'><button data-repeater-delete class='btn btn-light m-btn--hover-danger rounded p-1'><i class='la la-trash'></i></button></div>");

	    const SELF = this;
	    let helpSortText = "",
	        initEmpty = false,
	        initEmptyBackup,
	        isFirstItemUndeletable = true,
	        instance = null,
	        copy = $($element)[0].outerHTML,
	        sortable = false;
	        helpIcon = new helpIcon();

	    LWDK.step(()=>(SELF.length = $($element).find("[data-repeater-list] [data-repeater-item]").length));

	    this.sortable = (help_text="") => ((!sortable && (sortable = true, moveItCSS.on(), sortableIt())), helpSortText = help_text, setTimeout(()=>helpIcon.update(), LWDK.sleepTime));
	    this.addItem = () => $($element).find("[data-repeater-item]").length <= SELF.limit && $($element).find("[data-repeater-create]")[0].click();
	    this.initEmpty = (b) => (initEmpty = !!b, this.reload());
	    this.firstFixed = (b) => (isFirstItemUndeletable = !!b, this.reload());
	    this.reload = () => ($($element).replaceWith(copy), setup());
	    this.getInstance = () => instance;
	    this.limit = -1;
	    this.data = (obj) => (typeof obj === "undefined" || typeof obj !== "object" || obj === null ? GetFormData($element):(applyData(obj),setTimeout(()=>applyData(obj), 750)));
		this.animationSpeed = LWDK.sleepTime;

	    setup();

	    return this;
	});

	function selectPickerInit(context=":not(template)"){
		if(!($().selectpicker instanceof Function)){
			return!setTimeout(() => selectPickerInit(context), LWDK.sleepTime);
		}

		for(let el of Array.from(document.querySelectorAll("select[data-value]"))){
			el.value = el.getAttribute("data-value");
		}

		$(context).find("select.m_selectpicker:not(.disabled-selectpicker)").selectpicker();

		$(context).find(".bootstrap-select .btn.dropdown-toggle").focus(function(){this.blur();});

		LWDK.step(() => One(".dropdown-menu li:not(.disabled)", "checkEmpty")
			.each(function(){
				"" == this.innerText && $(this).remove();
			})
		);

		$(context).find(".disabled-selectpicker.ui.dropdown").each(function(){
			let config = $(this).data();
			config && config.allowAdditions && (config.allowAdditions = true);
			$(this).dropdown(config);
		});

		LWDK.step(function(){
			if($(context).find("div.dropdown.bootstrap-select.m_.form-control > .dropdown.bootstrap-select").length){
				$(context).find("div.dropdown.bootstrap-select.m_.form-control > select").each(function(){
					const preservedValue = $(this).val();
					const root = $(this).parent().parent().parent();
					$(this).removeAttr("tabindex");
					$(this).selectpicker("destroy");
					const select = $(this).clone()[0];
					select.value = preservedValue;
					$.each($(this).data('events'), function() {
						$.each(this, function() {
							$(select).bind(this.type, this.handler);
						});
					});
					$(this).closest("div.dropdown.bootstrap-select.m_.form-control").replaceWith(select);
					root.find("select").selectpicker();
				});
			}
		});

		LWDK.step(function(){
			$(context).find("div.dropdown.bootstrap-select.m_.form-control:not(.show) > button:focus").trigger("blur");
		});
	}

	function buttonSwitchInit(){
		if(!($().bootstrapSwitch instanceof Function)){
			return!setTimeout(buttonSwitchInit, LWDK.sleepTime);
		}
		typeof $(':not(template) > [data-switch=true]').bootstrapSwitch == "function" && $(':not(template) > [data-switch=true]').bootstrapSwitch();
		LWDK.step(()=>$("[data-switch]").each(function(){
			!$(this).parent().hasClass('bootstrap-switch-container') && $(this).bootstrapSwitch("state", $(this).data("value"), false);
		}));
	}

	const summernote_config = (function summernote_config($in=":not(template)"){
	    $($in).find('.summernote').each(function(){
	        $(this).summernote('destroy');
	        let e = this.nextElementSibling;
	        e !== null
	            && e.classList.contains("note-editor")
	            && e.parentElement.removeChild(e);
	    });

	    $($in).find('.summernote').each(function(){
			let myheight = (typeof $(this).data("height") !== typeof 0 ? 250:$(this).data("height"));
	        $(this).summernote({lang: "pt-BR", toolbar: [
	            ['style', ['bold', 'italic', 'clear']],
	            ['fontsize', ['fontsize']],
	            ['color', ['color']],
	            ['para', ['paragraph']],
	            ['insert', ['codeview']]
	        ], height: myheight, disableDragAndDrop: true});
			$(this).parent().find('div.note-editable, textarea.note-codable').height(myheight);
	    });

	});

	const setFormData = (function setFormData(data, context = "body", keyword = "data-name"){
	    data = typeof data == "string" ? LWDK.data.jsonParse(data):typeof data == "object" && data != null ? data : new Object;

		if(typeof isJQuery == typeof void 0){
			return LWDK.load(["check"], () => setFormData(data, context));
		}

		if(isJQuery(context)){
			if(context.length < 2){
				context = context[0] || false;
			} else {
				let result = new Array;
				context.each(function(){return result.push(setFormData(this));});
				return result;
			}
		}

		if(isNode(context)){
			let element = $(context);

			context = element.attr("id");

			if(typeof context == 'undefined'){
				element.attr("id", (context = "form-data-identifier-" + LWDK.data.randomId()));
			}

			context = "#" + context;

		}

		if(!isString(context) && isEmpty(context))return new Object;

	    function set_input(name, val, index, keyword){
	        for(let e of LWDK.el(`${context} [${keyword}="${name}"]`)){
				$e = $(e);
		       	(
		            !e.classList.contains("summernote")
		                ? (e.classList.contains("m_selectpicker") || e.parentElement.classList.contains("m_selectpicker")
		                    ? ((e.classList.contains("ui") && e.classList.contains("dropdown"))||
							   (e.parentElement.classList.contains("ui") && e.parentElement.classList.contains("dropdown")))
								? ((
									$e.prop("multiple")
										? ($.each(
											typeof val == "string" ? val.split(",") : val,
											(i,e) => {
												$e.find("option[value='" + e + "']").attr("selected", "selected");
											}
										))
										: (
											$e.find("option[value='" + val + "']").length
												? $e.find("option[value='" + val + "']").prop("selected", true)
												: (
													$e.append(`<option value='${val}'>${val}</option>`),
													$e.find("option:last").prop("selected", true)
												)
										)
									), $e.parent().dropdown($e.data())
								) : (e.value = val, $e.selectpicker('refresh'))
		                    : ($e.data("switch")
		                        ? (typeof val == "string" && (val = val.toLowerCase().trim() === "true"), $e.bootstrapSwitch('state', val))
		                        : (e.type !== "file" ? (e.value = val) : $(e).data("value", val))))
		                : $e.summernote("code", val)
				);
			}
	    }

	    function set_array_values(name, vals){
	        for(let i = 0; i < vals.length; i++){
	            set_input(name, vals[i], i, keyword);
	        }
	    }

	    for( let i in data ){
            try{
               set_input(i, data[i], 0, keyword);
            } catch(e) {
                LWDK.debug.error({
                    Message: e,
                    Index: i,
                    Value: data[i]
                });
            }
	    }

		return true;
	});

	const GetFormData = (function GetFormData(context="html"){
		if(typeof isJQuery == typeof void 0){
			return LWDK.load(["check"], () => GetFormData(context));
		}

		if(isJQuery(context)){
			if(context.length < 2){
				context = context[0] || false;
			} else {
				let result = new Array;
				context.each(function(){return result.push(GetFormData(this));});
				return result;
			}
		}

		if(isNode(context)){
			let element = $(context);

			context = element.attr("id");

			if(typeof context == 'undefined'){
				element.attr("id", (context = "form-data-identifier-" + LWDK.data.randomId()));
			}

			context = "#" + context;

		}

		if(!isString(context) && isEmpty(context))return new Object;

		let result = {};

		[...$(context + " [data-name]")].map(e => {
			let set, el = $(e).data("name");

			if(e.type == "checkbox"){
				set = e.checked;
			} else {
				set = $(e).val();
			}

			if(typeof result[el] != typeof void 0 && typeof result[el] != 'object'){
				result[el] = [result[el]];
			}
			if(typeof result[el] == 'object'){
				result[el].push(set);
			} else {
				result[el] = (set);
			}

			// console.log([el, set, result[el]]);
		});

	    return result;
	});

	const loadingRequest = (function(text="Carregando, aguarde...", icon=true, pos="bottom right", css = {
		color: "#434343",
		backgroundColor: "#fafafa"
	}){
		return LWDK.showMessage(
			text + (icon?' <i class="la la-refresh la-spin"></i>':''),
			css,
			pos,
			0,
			false
		);
	});

	const successRequest = (function(action=null, text='Opera&ccedil;&atilde;o realizada com sucesso!', pos="bottom right"){
		LWDK.showMessage(
			text,
			{
				color: "#fff",
				backgroundColor: "#1b9440"
			},
			pos,
			-1,
			true
		).onClose(action);
	});

	const errorRequest = (function(action=null, text='N&atilde;o foi poss&iacute;vel completar sua solicita&ccedil;&atilde;o...<br><strong>Tente novamente</strong>.', pos="bottom right"){
		LWDK.showMessage(
			text,
			{
				color: "#fff",
				backgroundColor: "#a22222"
			},
			pos,
			-1,
			true
		).onClose(action);
	});

	const setOptionalGroup = (function(id){
	    LWDK.el("#" + id)[0].classList.add("bloco-opcional");
	    LWDK.step(() => LWDK.el("#" + id)[0].classList[GetFormData()[id]?"add":"remove"]("ativo"));
	});

	const sortableThe = function sortableThe(element, _class="move", shared=false){
		$(element).find(" > *").each(function(){
			if(!$(this).find("." + _class).length){
				$(this).addClass("position-relative");
				$("<div class='" + _class + " p-2 position-absolute' style='top: 4px; right: 4px;'><button class='btn btn-light rounded p-1'><i class='la la-arrows'></i></button></div>").appendTo(this);
			}
		});

		const params = {
			animation: LWDK.sleepTime / 4,
			ghostClass: 'blue-background-class',
			handle: "." + _class
		};

		shared && (params.group=shared);

		return new Sortable($(element)[0], params);
	};

	const refresh = (function(a) {
	        LWDKLoadPage(LWDKLocal, void 0 === a ? function() {} : a);
	        setTimeout(function() {
	            return LWDKInitFunction.exec()
	        }, 600)
	    });

    const FormCreateAction = (function(a, b) {
        One("#" + a + " .submit:first").click(function() {
            return b(GetFormData("#" + a))
        })
    });

    const confirm_msg = (function(a, b, c, d, f, e, h) {
        Swal.fire({
            title: "",
            html: a,
            icon: void 0 === c ? "warning" : c,
            showCancelButton: !0,
            confirmButtonColor: void 0 === d ? "{cor-tema}" : d,
            cancelButtonColor: void 0 === f ? "#d33" : f,
            confirmButtonText: void 0 ===
                e ? "Sim" : e,
            cancelButtonText: void 0 === h ? "Não" : h
        }).then(function(a) {
            a.isConfirmed && b()
        })
    });

    const One = (function(a, b) {
        b = void 0 === b ? "mod" : b;
        return $($(a).not(".__" + b + "__").addClass("__" + b + "__")[0])
    });

    const MapEl = (function(a, b, c, d, f){
        b = void 0 === b ? "error" : b;
        c = void 0 === c ? !0 : c;
        d = void 0 === d ? !0 : d;
        f = void 0 === f ? /(string|number)/ : f;
        var e = "string" == typeof c ? c : "array";
        b = "string" === typeof b ? function(a) {
            switch (a) {
                case "abstract-basic-form":
                    return function() {
                        return [$(this).data("name"), $(this).val()]
                    };
                case "error":
                    return console.warn('A função requer um "callback" válido.'),
                        function() {};
                default:
                    return function() {
                        return this
                    }
            }
        }(b) : b;
        a = $(a).map(b);
        switch (e) {
            case "array":
                e = [];
                for (b = 0; b < a.length; b++) e.push(a[b]);
                c && (e =
                    e.filter(function(a) {
                        return null != a && "" != a
                    }));
                d && (e = function(a, b) {
                    $.each(a, function(a, c) {
                        -1 === $.inArray(c, b) && b.push(c)
                    });
                    return b
                }(e, []));
                return e.filter(function(a) {
                    return f.test(typeof a)
                });
            case "object":
                e = {};
                c = d;
                for (d = 0; d < a.length; d += 2) f.test(typeof a[d + 1]) && (!c || c && 0 < String(a[d + 1]).length) && ("string" == typeof e[a[d]] && (e[a[d]] = [e[a[d]]]), "object" == typeof e[a[d]] && "undefined" !== typeof e[a[d]].length ? e[a[d]].push(a[d + 1]) : e[a[d]] = a[d + 1]);
                return c && 0 == Object.keys(e).length ? !1 : e;
            default:
                e = [];
                for (c =
                    0; c < a.length; c++) e.push(a[c]);
                return JSON.stringify(e)
        }
    });

    const MapTranslate = (function(a, b, c){
        c = void 0 === c ? "|" : c;
        for (var d = 0; d < a.length; d++) {
            var f = a[d].split(c);
            a[d] = {};
            for (var e = 0; e < b.length; e++) a[d][b[e]] = f[e]
        }
        return a
    });

    const MapKeyAssign = (function(a) {
        if (!a.length % 2) return !1;
        newmap = {};
        for (var b = 0; b < a.length; b += 2) newmap[a[b]] = a[b + 1];
        return newmap
    });

	const database = (function database(url, set, callback){
		if(set instanceof Function){
			callback = set;
			set = {gets: true};
		} else if(set instanceof Array){
			set["gets"] = false;
		} else if(set instanceof Object){
			set.gets = false;
		} else {
			set = {gets: false};
		}
		url = url.split(".").join("/");
		return LWDK.request(`/admin/database/${url}/`, set, callback);
	});

	const fieldCheck = (function(to, condition, msg){
		if(condition){
	        to = /(#)/.test(to)?$(to)[0]:$("[data-name=\"" + to + "\"]")[0];
			to.closest("label").classList.add("has-error");
	        setTimeout(()=>($(to).focus()[0].click(), errorApply()), LWDK.sleepTime);
			function errorApply(){
				to.addEventListener("keydown", removeError, true);
				to.addEventListener("change", removeError, true);
				to.addEventListener("click", removeError, true);
			}
			function removeError(){
				to.closest("label").classList.remove("has-error");
				to.removeEventListener("keydown", removeError, true);
				to.removeEventListener("change", removeError, true);
				to.removeEventListener("click", removeError, true);
			}
	        $([document.documentElement, document.body]).animate({
	            scrollTop: $(to).offset().top - 150
	        }, LWDK.sleepTime);

			LWDK.showMessage(
				msg,
				{
					color: "#fff",
					backgroundColor: "#a22222"
				},
				"bottom right",
				-1,
				true
			).onClose(() => setTimeout(removeError, LWDK.sleepTime * 2));
		}

		return condition;
	});

	const selectPickerUpdate = (function selectPickerUpdate(root="html"){
		$(root).find(".disabled-selectpicker.ui.dropdown").each(function(){
			let config = $(this).find("select").data();
			config && config.allowAdditions && (config.allowAdditions = true);
			$(this).dropdown(config);
		});

		let oldselect = $(root).find("select.m_selectpicker:not(.disabled-selectpicker)");
		if(oldselect.length){
			const preservedValue = oldselect.val();
			oldselect.removeAttr("tabindex");
			oldselect.selectpicker("destroy");
			const select = oldselect.clone()[0];
			if(!select)return void 0;
			select.value = preservedValue;
			$.each(oldselect.data('events'), function() {
				$.each(this, function() {
					$(select).bind(this.type, this.handler);
				});
			});
			oldselect.replaceWith(select);
			$(root).find("select").selectpicker();
		}
	});
