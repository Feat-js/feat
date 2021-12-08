let pullData = require('./pullData.js');

module.exports = function(str, opt = {}, blb = [], add = {}) {
    //match {{ and }}
    let blob = blb;

    var vars = str.match(/{{[^}]*}}/g);
    if (vars) {
        vars.forEach(function(v) {
            //remove brackets
            var varName = v.replace(/[{}]/g, '');

            //remove begin and ending spaces
            varName = varName.replace(/^\s+|\s+$/g, '');

            str = str.replace(v, pullData(varName, opt, blob, add));
        });
    }

    return str;
};