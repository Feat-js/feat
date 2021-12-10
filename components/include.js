module.exports = {
    name: "Include",
    FeatAttributesSupport: false,
    description: "Include a file in the current file",
    selfClosing: true,
    attributes: [
        {
            name: "src",
            type: "string",
            description: "The path to the file to include",
            required: true
        }
    ],
    code: (attributes, content, data, blb, registerComponent) => {
        /*
        Src: ""
        */

        let fs = require("fs");
        let parseVars = require("./../lib/parseVars")
        
        let src = parseVars(attributes.src, data, blb);
        
        //remove html extention from src
        if (src.endsWith(".html")) {
            src = src.substring(0, src.length - 5);
        }

        let viewPath = process.cwd() + '/' + src + '.html';
        
        let html = fs.readFileSync(viewPath, "utf8");
        if (!html) throw new Error("The path for include is not valid.")

        return html;
    }
}   