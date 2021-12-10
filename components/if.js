module.exports = {
    name: "If",
    FeatAttributesSupport: true,
    description: "If statement. will execute the code block if the condition is true.",
    selfClosing: false,
    attributes: [
        {
            name: "condition",
            type: "string",
            description: "The condition to check. If true, the code block will be executed.",
            required: true
        }
    ],
    code: (attributes, content, data, blb, registerComponent) => {
        /*
        Src: ""
        */

        let condition = attributes.condition;
        
        if (!condition) throw new Error("If statement requires a condition.");

        let pullData = require("./../lib/parseVars");
        let conditionResult = pullData(condition, data, blb);

        if (conditionResult == "true") { conditionResult = true; }
        else if (conditionResult == "false") { conditionResult = false; }
        if (conditionResult === true) {
            return content;
        } else {
            return undefined;
        }
        
    }
}   