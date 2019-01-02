const { Client } = require('pg');
const connectionString = "postgres://pzjvgqtwhvboia:475f1ac1fcf49d09c2f6a4ce3bc01743d9752483cad9eadd4f1f41f68f2b5397@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d6qbk7df6arkq9";
const client = new Client({connectionString: connectionString, ssl: true});
client.connect();

module.exports = {
  getArrondissementsGeo: function (req, res) {
    const porperties = `'code_insee', c_arinsee, 'libelle', l_ar , 'nom', l_aroff`
    const queryGeoJSON = createSQLGeojson("arrondissements", 'id', 'geom', 'c_arinsee = ' + req.params.insee, porperties);
    query(queryGeoJSON, res);
  },

  getEntreprisesGeo: function(req, res){
    const properties = `'id', row_id, 'nom', nom_entreprise, 'categorie', categorie, 'ville', ville, 'taille', taille_entreprise, 'adresse', adresse, 'code_insee', code_insee, 'siren', siren`;
    const queryGeoJSON = createSQLGeojson("entreprises", 'row_id', 'latlng', `code_insee = '${req.params.insee}'`, properties);
    query(queryGeoJSON, res);
  },

  getOneEntreprisesGeo: function(req, res){
    const properties = `'id', row_id, 'nom', nom_entreprise, 'categorie', categorie, 'ville', ville, 'taille', taille_entreprise, 'adresse', adresse, 'code_insee', code_insee, 'siren', siren`;
    const queryGeoJSON = createSQLGeojson("entreprises", 'row_id', 'latlng', `code_insee = '${req.params.insee}' AND row_id = '${req.params.row_id}'`, properties);
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
    const query = `SELECT row_id, nom_entreprise as nom, taille_entreprise as taille, categorie, adresse,  CONCAT(ST_X(latlng), ' - ', ST_Y(latlng)) as coord FROM entreprises WHERE code_insee = '${req.params.insee}' ORDER BY nom ASC`
    client.query(query, (errQuery, resQuery) => {
      if(errQuery){console.error(errQuery)}
      else {
        res.send(resQuery.rows);
      }
    })
  
  }
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
