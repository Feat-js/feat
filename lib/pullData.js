module.exports = function(name, opt, blob, additional = {}) {

    let data = opt;
    let fBlob = blob;

    delete data._locals;

    let fullBlob = [];

    //define the data
    Object.keys(data).forEach(function(key) {
        let name = key;
        let value = data[key];

        let toBe = JSON.stringify({ value: value });
        fullBlob.push(`let ${name} = JSON.parse(\`${toBe}\`).value;`);
    });

    //define the additional data
    Object.keys(additional).forEach(function(key) {
        let name = key;
        let value = additional[key];

        let toBe = JSON.stringify({ value: value });
        //if object is string
        fullBlob.push(`let ${name} = JSON.parse(\`${toBe}\`).value;`);

    });

    //define the functions
    Object.keys(fBlob).forEach(function(key) {
        let value = fBlob[key];

        fullBlob.push(`${value}`);
    });

    let val = undefined;

    //check if val is array
    try {
        let F = new Function(fullBlob.join('\n') + `\nreturn JSON.stringify({ value: ${name} });`); 
        val = F();
    } catch (e) {
        //ignore
    }
    
    if (!val) return undefined;
    return JSON.parse(val).value;
}