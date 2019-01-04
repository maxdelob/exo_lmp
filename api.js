const { Client } = require('pg');
const connectionString = "postgres://pzjvgqtwhvboia:475f1ac1fcf49d09c2f6a4ce3bc01743d9752483cad9eadd4f1f41f68f2b5397@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d6qbk7df6arkq9";
const client = new Client({connectionString: connectionString, ssl: true});
client.connect();
const fs = require('fs');
var Chance = require('chance');
const turf = require('turf');

fakeEntrepise = [];
fakeEntrepriseGeo = [];

generateFakeEntreprises();

module.exports = {
  getArrondissementsGeo: function (req, res) {
    const porperties = `'code_insee', c_arinsee, 'libelle', l_ar , 'nom', l_aroff`
    const queryGeoJSON = createSQLGeojson("arrondissements", 'id', 'geom', 'c_arinsee = ' + req.params.insee, porperties);
    query(queryGeoJSON, res);
  },

  getEntreprisesGeo: function(req, res){
    const properties = `'row_id', row_id, 'nom', nom_entreprise, 'categorie', categorie, 'ville', ville, 'taille', taille_entreprise, 'adresse', adresse, 'code_insee', code_insee, 'siren', siren`;
    const queryGeoJSON = createSQLGeojson("entreprises", 'row_id', 'latlng', `code_insee = '${req.params.insee}'`, properties);
    query(queryGeoJSON, res);
  },

  getOneEntreprisesGeo: function(req, res){
    const properties = `'id', row_id, 'nom', nom_entreprise, 'categorie', categorie, 'ville', ville, 'taille', taille_entreprise, 'adresse', adresse, 'code_insee', code_insee, 'siren', siren`;
    const queryGeoJSON = createSQLGeojson("entreprises", 'row_id', 'latlng', `code_insee = '${req.params.insee}' AND row_id = '${req.params.row_id.replace('e', '')}'`, properties);
    query(queryGeoJSON, res);
  },
  getListeTailleEntr: function(req, res){
    const query = "SELECT taille_entreprise FROM entreprises GROUP BY taille_entreprise ORDER BY taille_entreprise";
    client.query(query, (errQuery, resQuery)=> {
      if(errQuery){console.error(errQuery)}
      else {
        const arrTaile = [];
        resQuery.rows.forEach(row =>   arrTaile.push(row.taille_entreprise));
        res.send(arrTaile)
      }
    })
  },
  getListeArrondissements(req, res){
    const query = "SELECT l_ar AS name, l_aroff AS libelle, c_arinsee as insee FROM arrondissements  ORDER BY c_ar;";
    client.query(query, (errQuery, resQuery) => {
      if(errQuery){console.error(errQuery)}
      else {
        res.send(resQuery.rows);
      }
    })
  },

  getEntreprisesByInsee(req, res){
    const query = `SELECT CONCAT('e', row_id) as row_id, nom_entreprise as nom, taille_entreprise as taille, categorie, adresse,  CONCAT(ST_X(latlng), ' - ', ST_Y(latlng)) as coord FROM entreprises WHERE code_insee = '${req.params.insee}' ORDER BY nom ASC`
    client.query(query, (errQuery, resQuery) => {
      if(errQuery){console.error(errQuery)}
      else {
        res.send(resQuery.rows);
      }
    })
  
  },
  getFakeDataEntreprise(req, res){
    res.send(fakeEntrepise)
   },
   getFakeDataGeo(req, res){
    res.send(fakeEntrepriseGeo)
   },
   getFakeGeoOne(req, res) {
    let fakeOne;
     fakeEntrepriseGeo.features.forEach((entreprise)=> {       
       if(entreprise.properties.row_id == req.params.row_id) {
          fakeOne = entreprise
       }
     })
     res.send(turf.featureCollection([fakeOne]));
   },

};


function createSQLGeojson(table, id, geom, where, properties){
  return `
    SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         ${id},
        'geometry',   ST_AsGeoJSON(${geom})::jsonb,
        'properties', json_build_object(${properties})
      ) AS feature
      FROM (SELECT * FROM ${table} WHERE ${where}) inputs) features;`;
}

function query(queryGeoJSON, res){
  client.query(queryGeoJSON, (errQuery, resQuery)=> {
    if(errQuery){console.error(errQuery)}
    else {
      res.send(resQuery.rows[0].jsonb_build_object);
    }
 })
}

 function generateFakeEntreprises() {
  const listeTaille = ["00 - 0 salarié","01 - 1 ou 2 salariés","02 - 3 à 5 salariés","03 - 6 à 9 salariés","11 - 10 à 19 salariés","12 - 20 à 49 salariés","21 - 50 à 99 salariés","22 - 100 à 199 salariés","31 - 200 à 249 salariés","32 - 250 à 499 salariés","41 - 500 à 999 salariés","NN - Unités non employeuses"];
  var chance = new Chance();
  const arrPoints = [];
  for (let i = 0; i < 501; i++) {
    const FeatureCollectionRandom = turf.random('point', 1, {bbox: [-82, 42, -80, 40]});
    const entreprise = {
     row_id : 'e' + 10 + i,
     nom : chance.company(),
     taille : listeTaille[chance.integer({min:0, max: listeTaille.length - 1})],
     categorie : "Fake Data",
     adresse : chance.address(),
     coord: FeatureCollectionRandom.features[0].geometry.coordinates[0].toFixed(3)+ ' - ' + FeatureCollectionRandom.features[0].geometry.coordinates[1].toFixed(3)
    }   
    arrPoints.push(turf.point(FeatureCollectionRandom.features[0].geometry.coordinates, entreprise))
    fakeEntrepise.push(entreprise);
  }
  fakeEntrepriseGeo = turf.featureCollection(arrPoints)
} 