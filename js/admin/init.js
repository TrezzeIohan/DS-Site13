LWDK.onDoc(() => {
    const sizeScale = String((window.screen.availWidth+window.screen.height) / 3000)
    document.body.style = "zoom: " + sizeScale + "!important;";

    LWDK.TableSettings = (config) => {
        const __fn = (config) => {
            if(typeof LWDK.TableConfig === typeof void 0){
                return setTimeout(() => __fn(config), 0xff);
            }
            for(const i in config){
                LWDK.TableConfig[i] = config[i];
            }
        };

        __fn(config);
    };
    LWDK.include([["js/admin/plugins.js", "js/admin/i18n.js"]]);

    LWDK.init(()=>{
        for(let fn of LWDK.__onmain__){
            setTimeout(()=>fn(),LWDK.sleepTime);
        }

        delete LWDK.__onmain__;
    });

    setTimeout(()=>LWDK.init(()=>{
        let o = document.querySelector("a[href$=\"" + location.pathname + "\"]");
        if(o === null){
            o = document.querySelector("a[href$=\"" + location.pathname + "listar/" + "\"]");
        }
        try {
            while(o!==null){
                o.classList.add('m-menu__item--active');
                o.classList.add('m-menu__item--open');
                o = o.parentElement;
                if(o.classList.contains('m-menu__nav--dropdown-submenu-arrow'))break;
            }
        } catch(e) {
			LWDK.debug.error("Error during proccess links");
        }

        if(LWDK.TableSettings != false){
            LWDK.TableLoad();
            delete LWDK.TableLoad;
        }

    }),LWDK.sleepTime);
});
