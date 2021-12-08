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

        let fs = require("fs");
        let condition = attributes.condition;
        
        if (!condition) throw new Error("If statement requires a condition.");

        let pullData = require("./../lib/pullData");
        let conditionResult = pullData(condition, data, blb);

        if (conditionResult) {
            return content;
        } else {
            return undefined;
        }
        
    }
}   