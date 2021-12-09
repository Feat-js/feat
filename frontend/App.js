class FateApp {
    constructor(){
        this.log = (...contents) => console.log(`[FateApp]`, contents.join(" "));
        this.log(`Working...`);
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
}
const FateInstance = new FateApp();