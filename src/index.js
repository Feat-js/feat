const { render } = require('express/lib/response');
let fs = require('fs');

let components = require("./../lib/exports");

class Feat {
    constructor(app, opts) {
        //set res.render function for express
        if (app) {
            app.render = this.render;
            process.Featjs = {};
            process.Featjs.class = this;
            process.Featjs.data = {};
            process.Featjs.app = app;
            process.Featjs.fBlob = [];

            let frontendImport = fs.readdirSync(__dirname + '/../frontend');
            let fullHtml = ``;
    
            frontendImport.forEach((file, i) => {
                let header = fs.readFileSync(__dirname + '/../frontend/' + file, 'utf8');
                fullHtml += header + "\n";
            });

            app.get("/featFwApi/frontend.js", (req, res) => {
                //send js code
                res.send(fullHtml);
            });
        }


    }
    render(view, options, callback) {
        //get view file path
        let maxIterations = 1; //100
        let startTime = new Date();

        function renderView(viewPath, options) {
            let html = fs.readFileSync(viewPath, 'utf8');

            let parseVars = require('./../lib/parseVars');
            let CustomComponent = require('./../lib/customTagParser');
            let FeatAtributes = require('./../lib/attributeParser');

            let result = html;
            let blb = [];

            let componentDiscovery = CustomComponent(result, components, options, blb);
            for (let i = 0; i < maxIterations; i++) {
                let ComponentsParsed = CustomComponent(result, componentDiscovery.components, options, blb);
                result = parseVars(ComponentsParsed.content, options, blb);
            }

            return result;
        }

        //remove html extension from view name
        let viewName = view.replace(/\.html$/, '');

        let viewPath = process.cwd() + '/' + viewName + '.html';

        //read header file

        let html = `<script src="/featFwApi/frontend.js"></script>`;
        html += renderView(viewPath, options);

        callback(null, html);




        let endTime = new Date();
        let time = endTime - startTime;
        console.log('render time: ' + time + 'ms');
    }
}

module.exports = Feat;