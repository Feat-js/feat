let express = require('express');
let app = express();

let Feat = require('../src/index.js');
let feat = new Feat(app);

let posts = require('./posts.json');
let email = "support@skyswift.eu";

app.get('/', function (req, res) {
    res.render('/test/pages/index', { email, posts });
});

app.get('/about', function (req, res) {
    res.render('/test/pages/about', { email });
});

app.get('/post/:title', function (req, res) {

    let post = posts.find(x => x.title === req.params.title);
    if (!post) res.render("/test/pages/post", { post: { title: "Error 404", body: "Post not found" }, email });

    res.render('/test/pages/post', { post, email });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});