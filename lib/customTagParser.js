module.exports = (html, cmo, options, blb) => {
    //go thru each space
    let content = html;
    let components = cmo;
    let bottomScript = `<script> `;

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
    if (html?.length > 0) {
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
                
                let tagName = tag.split(">")[0].toLowerCase();


                let tagAttrs = {};
                let spl = tag.split(" ");
                let abt = spl.join(" ").split("\"")

                let joinContent = () => {
                    content = sp.join("<");
                }

                let setAttribute = (attr, val) => {
                    tagAttrs[attr] = val;
                    //reparse tags
                    let attrString = "";
                    for (let attr in tagAttrs) {
                        attrString += ` ${attr}="${tagAttrs[attr]}"`;
                    }
                    
                    //make sure to include the tag contents
                    let tagContent = tag.split(">");
                    
                    //remove everything before index 1 from tagContent
                    tagContent.splice(0, tagContent.length - 1);

                    tag = `${tagName.split(" ")[0]}${attrString}>${tagContent[0]}`;

                    sp[i] = tag;
                }

                let deleteAttribute = (attr) => {
                    //remove attr from tagAttrs without delete
                    delete tagAttrs[attr];
                }
                let parseAttributes = () => {
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

                    let keys = Object.keys(tagAttrs);
                    for (let q = 0; q < keys.length; q++) {
                        let attr = keys[q];
                        let val = tagAttrs[attr];

                        //check if attr stats with feat:
                        if (attr.startsWith("feat:")) {

                            //split the attribute
                            let split = attr.split("feat:")[1];
                            

                            switch (split) {
                                case "onclick":
                                    deleteAttribute("feat:onclick");
                                    setAttribute("onclick", `Feat.emit('${val}', this)`);
                                    break;
                                case "increment":
                                    deleteAttribute("feat:increment");
                                    setAttribute("onclick", `if (!Feat.getState('${val}')) { Feat.setState('${val}', 0) } Feat.setState('${val}', Feat.getState('${val}') + 1)`);
                                    break;
                                case "decrement":
                                    deleteAttribute("feat:decrement");
                                    setAttribute("onclick", `if (!Feat.getState('${val}')) { Feat.setState('${val}', 0) } Feat.setState('${val}', Feat.getState('${val}') - 1)`);
                                    break;
                                case "toggle":
                                    deleteAttribute("feat:toggle");
                                    setAttribute("onclick", `Feat.setState('${val}', !Feat.getState('${val}'))`);
                                    break;
                                case "refresh":
                                    deleteAttribute("feat:refresh");
                                    setAttribute("onclick", `Feat.setState('${val}', Feat.getState('${val}'))`);
                                    break;
                                case "reset": 
                                    deleteAttribute("feat:reset");
                                    setAttribute("onclick", `Feat.setState('${val}', Feat.defaultStates['${val}'])`);
                                    break;
                                case "bind":
                                    deleteAttribute("feat:bind");
                                    if (tagAttrs["id"]) {
                                        bottomScript += `Feat.useState('${tagAttrs[id]}', '${val}');`;
                                    } else {
                                        // generate 16 char long id without numbers
                                        let id = Math.random().toString(36).substr(2, 16).replace(/[^a-z]+/g, '');

                                        //set id
                                        setAttribute("id", id);

                                        //use state
                                        bottomScript += `Feat.useState('#${id}', '${val}');`;

                                    }
                                    break;

                                }
                                        
    
                            


                        }
                    }

                    //reconstruct tag
                    joinContent();

                }

                if (config.enableCustomAttributes) parseAttributes();


                if (components[tagName.split(" ")[0].toLowerCase()]) {
                    let comp = components[tagName.split(" ")[0].toLowerCase()];
                    comp.name = comp.name.toLowerCase();
                    
                    //get html attributes from tagName  
                    if (!config.enableCustomAttributes) parseAttributes();



                    //remove first el
                    spl.shift();
        


                    let start = i;
                    let end = i;
                    let contentt = [];
                    let depth = 0;

                    let isset = false;

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
                    contentt[0] = contentt[0].split(">")
                    
                    //remove first el of contentt[0]
                    contentt[0].shift();
                    contentt[0][0] = "<a>" + contentt[0][0] + "</a>";

                    //join contentt[0]
                    contentt[0] = contentt[0].join(">");

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
                            joinContent();
                    } else {
                        //remove start to end from sp
                        sp.splice(start, end - start + 1, "Feat></Feat>");
                        joinContent();
                    }
                }


            }
        }

        return {
            content: content + bottomScript + "</script>",
            components: components
        };
    } else {    
        return `<p>Welcome to FeatJS, Please add html to your file to get started</p>`;
    }
}