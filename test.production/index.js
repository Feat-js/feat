let express = require('express');
let app = express();

let Feat = require('feat.js');
let feat = new Feat(app);

app.get("/", (req, res) => {
    let startTime = new Date();
    res.render("pages/index.html");
    let endTime = new Date();
    console.log("Time: " + (endTime - startTime) + "ms");
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
})