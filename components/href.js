module.exports = {
    name: "href",
    FeatAttributesSupport: false,
    description: "Redirect a user",
    selfClosing: true,
    attributes: [
        {
            name: "target",
            type: "string",
            description: "Target String", 
            required: false
        },   
        {
            name: "url",
            type: "string",
            description: "Url where user is redirected to", 
            required: true
        },        
        {
            name: "text",
            type: "string",
            description: "Placeholder text", 
            required: true
        },
    ],
    code: (attributes, content, data, blb) => {
        return `<a ${attributes.target ? "target=\"" + attributes.target + "\"" : ""} href="${attributes.href ? attributes.href : "#"}">${attributes.text ? attributes.text : "Text undefined."}</a>`;
    }
}   