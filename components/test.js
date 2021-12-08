module.exports = {
    name: "Test", // name of the component
    FeatAttributesSupport: false, //Setting this to true will mean that the component will be able to have feat attribute types.
    description: "An awesome test component",
    selfClosing: true, //Setting this to true will mean that the component will be able to be self closing.
    attributes: [ //The attributes that the component will have.
        {
            name: "string", //Name of the attribute
            type: "string", //Type of the attribute (Types: string, number, boolean, array, object)
            description: "Some string", //Description of the attribute
            required: true //Setting this to true will mean that the attribute is required.
        }
    ],
    code: (attributes, content, data, blb) => { // The code that will be executed when the component is used.
        return `<p>${attributes.string ? attributes.string : "String undefined."}</p>`; //The html returned will render, setting this to undefined will not render anything.
    }
}   