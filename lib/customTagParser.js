module.exports = (html, cmo, options, blb) => {
    //go thru each space
    let content = html;
    let components = cmo;

    //Config   
    let config = {
        enableCustomAttributes: true, //Disabling this wil disable custom attributes, but make your website blazin' fast
        // Custom attributes are the ones like feat:onclick, feat:increment, etc. We suggest keeping it on for a better expierience.
        // However, if you want to disable it, just set this to false. (do this if you don't use custom attributes)
        // With the SBAdmin 2 theme we tested the parser on the index html file (This test was done with 5 iterations and no logic)
        // Enabled: 127ms -> Disabled: 20ms
        // Anyway default is true, so you don't need to change this, but if you want that juicy performance, just set it to false.
    }

    //get amount of elements in components
    if (html.length > 0) {
        let cpy = Object.keys(components)
        for (let m = 0; m < cpy.length; m++) {
            let key = cpy[m];

            let obj = components[key];
            
            //replace self-closing tags with open and close tags
            if (obj.selfClosing) {
                content = content.replace(new RegExp(`<${obj.name}/>`, 'g'), `<${obj.name}></${obj.name}>`);
                content = content.replace(new RegExp(`<${obj.name} />`, 'g'), `<${obj.name}></${obj.name}>`);
            }
            
            //find all tags with obj.name
            let tags = content.match(new RegExp(`<${obj.tag}[^>]*>`, 'g'));
            let sp = content.split("<");

            for (let i = 0; i < sp.length; i++) {
                let tag = sp[i];
                
                let tagName = tag.split(">")[0];


                let tagAttrs = {};
                let spl = tag.split(" ");
                let abt = spl.join(" ").split("\"")
                if (config.enableCustomAttributes){
                    for (let o = 0; o < abt.length; o++) {
                        let attr = abt[o];
                        if (o % 2 === 0) {
                            //remove equals sign
                            let split = attr.split(" ");
                            latest = split[split.length - 1].replace("=", "").trim();
                        } else {
                            //remove quotes
                            tagAttrs[latest] = attr;
                        }
                    }
                }


                if (components[tagName.split(" ")[0].toLowerCase()]) {
                    let comp = components[tagName.split(" ")[0].toLowerCase()];
                    
                    //get html attributes from tagName
                    if (!config.enableCustomAttributes){
                        for (let o = 0; o < abt.length; o++) {
                            let attr = abt[o];
                            if (o % 2 === 0) {
                                //remove equals sign
                                let split = attr.split(" ");
                                latest = split[split.length - 1].replace("=", "").trim();
                            } else {
                                //remove quotes
                                tagAttrs[latest] = attr;
                            }
                        }
                    }



                    //remove first el
                    spl.shift();
        


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


            }
        }

        return {
            content: content,
            components: components
        };
    } else {    
        return `<p>Welcome to FeatJS, Please add html to your file to get started</p>`;
    }
}