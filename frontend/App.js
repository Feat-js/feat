class FeatApp extends FeatEvents {
    constructor(){
        super();
        this.log = (...contents) => console.log(`[FeatApp]`, contents.join(" "));
        this.log(`Feat attached!`);
        this.states = {};
        this.stateEvents = {};
        this.defaultStates = {};
    }
    
    /**
     * @param name {String} Name of the state.
     * @param data {Any} Set data into a page-based cache.
     * @returns data
     */
    setState(name, data){
        this.states[name] = data;

        this.emitState(name, data);
        return this.states[name];
    }

    /**
     * @param name {String} State name
     */
    getState(name){
        return this.states[name];
    }

    /**
     * @param name {String} State name
     * @param callback {Callback} Callback to retrieve data
     */
    getLiveState(name, callback){
        callback(this.states[name]);

        this.onStateChange(name, (data) => {
            callback(this.states[name]);
        });
    }

    //? Allow for reactiveness
    /**
     * @param selector {String} Selector of the element you want to change
     * @param stateName {String} The name of the state you want to auto-update
     * @param safe {Boolean} Setting this to false will escape HTML
     */
    useState(selector, stateName, defaultValue = "", safe = true){
        let end_default = defaultValue;
        let element = this.getElement(selector);
        let state = this.states[stateName];
        
        if(!state){ 
            console.log(element.innerText)
            let value = element.innerText;
            if(element.innerText && element.innerText !== ""){ 
                //if number convert to number
                if(!isNaN(value)){
                    value = parseInt(value);
                }
                //if boolean convert to boolean
                if(value === "true" || value === "false"){
                    value = value === "true";
                }
                //if string convert to string
                if(typeof value === "string"){
                    value = value.trim();
                }
                end_default = value;
            }
            this.states[stateName] = end_default;
        }

        this.defaultStates[stateName] = end_default;
        
        //? Set value & innerText or if unsafe innerHTML
        let updateStateVals = () => {
            element.value = this.states[stateName];
            if(safe){
                element.innerText = this.states[stateName];
            } else {
                element.innerHTML = this.states[stateName];
            }
            return this.states[stateName]
        };
        
        updateStateVals();

        this.onStateChange(stateName, updateStateVals);
    }

    /**
     * 
     * @param {String} selector Element selector. Ex: .className #elementID
     * @returns Element Object
     */
    getElement(selector){
        let el = document.querySelector(selector);
        return el;
    }

    /**
     * 
     * @param {String} selector Element selector. Ex: .className #elementID
     * @param {String} className Class to toggle
     * @returns Element Object
     */
    toggleClass(selector, className){
        let el = this.getElement(selector);
        el.classList.toggle(className);
        return el;
    }

}
// Initiate Feat.
const Feat = new FeatApp();