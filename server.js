// server Node pour servir les fichiers du repertoire "dist" dans Heroku et pour gerer les routes de l'api
const express = require('express');
const path = require('path');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/dist/lmp'));
var api = require('./api');

app.get("/api/arrondissement/:insee", function(req, res){
    api.getArrondissementsGeo(req, res);
})

app.get("/api/entreprises/:insee", function(req, res){
    api.getEntreprisesGeo(req, res);
})


app.get("/api/entreprise/:insee/:row_id", function(req, res){
    api.getOneEntreprisesGeo(req, res);
})

app.get("/api/listeTailleEntr", function(req, res){
    api.getListeTailleEntr(req, res);
})

app.get("/api/listeArrondissements", function(req, res) {
    api.getListeArrondissements(req, res);
})

app.get("/api/getEntrepriseByInsee/:insee", function(req, res) {
    api.getEntreprisesByInsee(req, res);
})


app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/lmp/index.html'));
});
app.listen(process.env.PORT || 8080), function() {
    console.log("server is running");
};