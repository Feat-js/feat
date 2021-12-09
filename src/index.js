const { render } = require('express/lib/response');
let fs = require('fs');

let components = require("./../lib/exports");

//? Maybe make a option to allow custom error handler (Feat)

class Feat {
    /**
     * @param {Express App} app The express application
     * @param {Object} opts Options for Feat
     */
    constructor(app, opts) {
        //set res.render function for express
        if (app) {
            app.render = this.render;
            app.useErrorHandler = this.useErrorHandler;
            process.Featjs = {};
            process.Featjs.class = this;
            process.Featjs.data = {};
            process.Featjs.app = app;
            process.Featjs.fBlob = [];
            this.useErrorHandler = opts?.useErrorHandler;

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

    useErrorHandler(){
        process.Featjs.app.use((error, req, res, next) => {
            res.status(500);
            return res.send(`
                Feat.js Error - 500
                <hr/>
                An internal Server error occured.
                <br/><br/>
                ${error.toString()}
            `)
        })
    }

    /**
     * 
     * @param {String} view Path to view
     * @param {Object} options Render options
     * @param {Callback} callback Callback
     */
    render(view, options, callback) {
        //get view file path
        let maxIterations = 5; //100
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