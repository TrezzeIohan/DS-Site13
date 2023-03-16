(function(factory, constructor){
    LWDK.cart = new constructor;
    LWDK.cart.factory = factory;
    factory.load(["cookie","css", "data"], () => (LWDK.cart.loaded = true));
})(LWDK, function(){

    /* Factory Vars */

    this.factory = null;
    this.loaded = false;
    this.enabled = () => (this.factory != null && this.loaded);
    this.prefix = "_cart_";
    this.keysname = "keys_";
    this.primaryId = "id";

    let mySelf = this;

    /* Basic functions */

    this.write = (key, val = '') => this.enabled() ? (this.factory.cookie(this.prefix + key, val, 7),val):false;
    this.read = (key) => ((key, read_value=null) => this.enabled() ? (read_value=this.factory.cookie(this.prefix + key),read_value == 'null'?false:read_value):false)(key);
    this.key = (read=-1000) => (read==-1000
        ? (read = this.read(this.keysname),read == false ? []:JSON.parse(this.read(this.keysname)))
        : (read = [read,this.key()], read[1].push(read[0]), read = JSON.stringify(read[1]), this.write(this.keysname, read), this.key())
    );
    this.erase = (key) => (this.factory.cookie(this.prefix + key, null, -1),!this.read(key));

    /* Public functions */

    this.item = (item, overwrite = false) => {
        if(!this.enabled())return!1;
        if(!(typeof item !== "object" || typeof item.length == "number" || typeof item[this.primaryId] == "undefined")){
            let exists = false;

            for(let listKey of this.key()){
                let listItem;
                if((!!(listItem = this.read(listKey)))){
                    listItem = JSON.parse(listItem);
                    if(listItem[this.primaryId] == item[this.primaryId]){
                        exists = listKey;
                        if(!overwrite){
                            for(let i in item){
                                listItem[i] = item[i];
                            }
                            item = listItem;
                        }
                        break;
                    }
                }
            }

            let theKey = !!exists ? exists:this.factory.data.randomId();

            !exists && this.key(theKey);

            return!!this.write(theKey, JSON.stringify(item));
        } else {
            for(let listKey of this.key()){
                let listItem;
                if((!!(listItem = this.read(listKey)))){
                    listItem = JSON.parse(listItem);
                    if(listItem[this.primaryId] == item){
                        let parent = this;
                        return{
                            set: (key, val = null, overwrite = false) => {
                                let obj = {};

                                if(typeof key == "object"){
                                    obj = key;
                                } else {
                                    obj[key] = val;
                                }

                                obj[parent.primaryId] = item;


                                return parent.item(obj, overwrite) ? parent.item(item) : false;
                            },

                            get: (key=-1000) => key===-1000?listItem:listItem[key],

                            clear: () => {
                                let obj = {};
                                obj[parent.primaryId] = item;

                                return parent.item(obj) ? parent.item(item) : false;
                            },

                            create: () => {
                                parent.factory.debug.post("Cart System: O dado já existe.");
                                return parent.item(item);
                            },

                            delete: () => (parent.erase(listKey) && function(p,lk,n){
                                n = [];
                                for(let k of p.key()){
                                    if(k != lk){
                                        n.push(k);
                                    }
                                }

                                return!!p.write(p.keysname, JSON.stringify(n));
                            }(parent, listKey)),

                            exists: true
                        };
                    }
                }
            }

            let parent = this;

            return{
                create: () => {
                    let obj = {};
                    obj[parent.primaryId] = item;

                    return parent.item(obj) ? parent.item(item) : false;
                },

                exists: false
            };
        }
    };

    this.list = () => {
        if(!this.enabled())return!1;

        let data = [];

        for(let key of this.key()){
            key = this.read(key);
            key !== false && data.push(JSON.parse(key));
        }

        return data;
    };

    this.clearAll = () => {
        if(!this.enabled())return!1;

        let keys = this.key(), result = true;
        result = result && this.erase(this.keysname);
        for(let key of keys){
            result = result && this.erase(key);
        }
        return result;
    };

    this.__proto__.delete = (id) => this.item(id).delete();

    this.get = (id, key = -1000) => this.item(id).get(key);

    this.set = (id, key, val = null) => this.item(id).set(key, val);

    this.create = (id) => this.item(id).create();

    this.exists = (id) => this.item(id).exists;

    this.clear = (id) => this.item(id).clear();

    this.getInstance = (id) => this.item(id);

    // this.getInstanceBy

    this.getInstanceAll = () => {
        let itens = [];
        for(let item of this.list()){
            itens.push(this.item(item[this.primaryId]));
        }
        return itens;
    };

    let step;
    (step=function(){
        (mySelf.enabled())
            ? setInterval(()=>(mySelf.length=mySelf.list().length), mySelf.factory.sleepTime)
            : setTimeout(step, 1000);
    })();
});
