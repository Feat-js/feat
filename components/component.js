module.exports = {
    name: "Component", // name of the component
    FeatAttributesSupport: false, //Setting this to true will mean that the component will be able to have feat attribute types.
    description: "A component to import, The component is a javascript file that contains a set of functions that can be used in the component's template.",
    selfClosing: true, //Setting this to true will mean that the component will be able to be self closing.
    attributes: [ //The attributes that the component will have.
        {
            name: "src", //Name of the attribute
            type: "string", //Type of the attribute (Types: string, number, boolean, array, object)
            description: "The path to the component's javascript file.", //Description of the attribute
            required: true //Setting this to true will mean that the attribute is required.
        }
    ],
    code: (attributes, content, data, blb, registerComponent) => { // The code that will be executed when the component is used.
        /*
        Src: ""


        CODE Arguments:
        attributes: The attributes of the component.
        content: The content that is inside the tag (will only work if selfClosing is true)
        data: The data that is passed to the component (e.g variables).
        blb: The blob of functions that got defined by plugins or unsafe functions.
        registerComponent: A function that can be used to register new components.
        */

        let importFile = {}; //Defining var to a global scope

        try {
            importFile = require(attributes.src); //Import the component.
        } catch (e) {
            throw new Error("" + attributes.src + " is not a valid component path."); //Throw an error if the path is not valid.
        }
        
        if (!importFile.name) throw new Error("The component " + attributes.src + " does not have a name."); // Error if the component does not have a name.
        if (!importFile.code) throw new Error("The component " + attributes.src + " does not have a code."); //Error if the component does not have a code.
        
        registerComponent(importFile, attributes.src); //Register the component.

        return undefined; //The html returned will render, setting this to undefined will not render anything.

        
    }
}   