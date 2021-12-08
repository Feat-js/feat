module.exports = (html, cmo, options, blb) => {
    //go thru each space
    let content = html;
    let components = cmo;

    //get amount of elements in components
    if (html.length > 0) {
        Object.keys(components).forEach((key, i) => {

            let obj = components[key];
            
            //replace self-closing tags with open and close tags
            if (obj.selfClosing) {
                content = content.replace(new RegExp(`<${obj.name}/>`, 'g'), `<${obj.name}></${obj.name}>`);
                content = content.replace(new RegExp(`<${obj.name} />`, 'g'), `<${obj.name}></${obj.name}>`);
            }
            
            //find all tags with obj.name
            let tags = content.match(new RegExp(`<${obj.tag}[^>]*>`, 'g'));
            let sp = content.split("<");

            sp.forEach((tag, i) => {
                let tagName = tag.split(">")[0];
                if (components[tagName.split(" ")[0].toLowerCase()]) {
                    let comp = components[tagName.split(" ")[0].toLowerCase()];
                    
                    //get html attributes from tagName
                    let tagAttrs = {};
                    let latest = "";

                    let spl = tag.split(" ");

                    //remove first el
                    spl.shift();


                    spl.join(" ").split("\"").forEach((attr, i) => {
                        if (i % 2 === 0) {
                            //remove equals sign
                            latest = attr.replace("=", "").trim();
                        } else {
                            //remove quotes
                            tagAttrs[latest] = attr;
                        }
                        
                    });
        


                    let start = i;
                    let end = i;
                    let contentt = [];
                    let depth = 0;

                    for (let x = start; x < sp.length; x++) {
                        let t = sp[x];
                        let tagName = t.split(" ")[0];

                        if (tagName.startsWith(comp.name)) {
                            depth++;
                        }
                        if (tagName.startsWith(`/${comp.name}>`)) {
                            depth--;
                        }

                        let improved = t;
                        // remove \r and \n
                        improved = improved.replace(/\r/g, "");
                        improved = improved.replace(/\n/g, "");

                        improved = improved.trim();
                        contentt.push("<" + improved);
                        if (depth === 0) {
                            end = x;
                            break;
                        }

                    }
                    //remove first and last el
                    contentt.shift();
                    contentt.pop();

                    function registerComponent(data, src) {
                        components[data.name.toLowerCase()] = data;
                    }

                    let returnVal = comp.code(tagAttrs, contentt.join("\n"), options, blb, registerComponent);


                    if (returnVal) {
                            //remove first char from returnVal
                            returnVal = returnVal.trim();
                            returnVal = returnVal.substring(1);

                            //remove start to end from sp
                            sp.splice(start, end - start + 1, returnVal);
                            content = sp.join("<");
                    } else {
                        //remove start to end from sp
                        sp.splice(start, end - start + 1, "Feat></Feat>");
                        content = sp.join("<");
                    }
                }
            })
        })

        return {
            content: content,
            components: components
        };
    } else {    
        return `<p>Welcome to FeatJS, Please add html to your file to get started</p>`;
    }
}