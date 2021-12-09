class FeatApp {
    constructor(){
        this.log = (...contents) => console.log(`[FeatApp]`, contents.join(" "));
        this.log(`Feat attached!`);
        this.states = {};
    }

    /**
     * @param name {String} Name of the state.
     * @param data {Any} set data into a page-based cache.
     * @returns data
     */
    setState(name, data){
        this.states[name] = data;
        return this.states[name];
    }

    /**
     * @param name {String} 
     */
    getState(name){
        return this.states[name];
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