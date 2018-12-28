// server Node pour servir les fichiers du repertoire "dist" dans Heroku
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/lmp'));
var api = require('./api');

app.get("/api/arnds", function(req, res){
    api.getArrondissements(req, res)
})

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/lmp/index.html'));
});
app.listen(process.env.PORT || 8080), function() {
    console.log("server is running");
};