module.exports = {
    name: "Foreach",
    FeatAttributesSupport: false,
    description: "Foreach is a looping construct that iterates over an array or object and executes a block of code for each iteration.",
    selfClosing: false,
    attributes: [
        {
            name: "in",
            type: "array",
            description: "The array or object to iterate over.",
            required: true
        },
        {
            name: "as",
            type: "string",
            description: "The name of the variable to use for each iteration.",
            required: true
        },
    ],
    code: (attributes, content, data, blb, registerComponent) => {
        /*
        Src: ""
        */

        let output = ``;
        let VariableParser = require("./../lib/parseVars")
        let PullData = require("./../lib/pullData");

        if (!attributes.in) throw new Error("Foreach requires an 'in' attribute.");
        if (!attributes.as) throw new Error("Foreach requires an 'as' attribute.");
         
        let arr = PullData(attributes.in, data, blb)
        
        //check if arr is an array
        if (!Array.isArray(arr)) throw new Error("Foreach requires an array as the 'in' attribute.");

        for (item of arr) {
            
            output += VariableParser(content, data, blb, { [attributes.as]: item });

        }

        return output;

        
    }
}   