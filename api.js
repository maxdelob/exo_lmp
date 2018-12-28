const { Client } = require('pg');
const connectionString = "postgres://pzjvgqtwhvboia:475f1ac1fcf49d09c2f6a4ce3bc01743d9752483cad9eadd4f1f41f68f2b5397@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d6qbk7df6arkq9";
const client = new Client({connectionString: connectionString, ssl: true});
client.connect();

module.exports = {
  getArrondissements: function (req, res) {
    const queryGeoJSON = `
    SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         id,
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', json_build_object('code_insee', c_arinsee, 'libelle', l_ar , 'nom', l_aroff)
      ) AS feature
      FROM (SELECT * FROM arrondissements) inputs) features;`;

    client.query(queryGeoJSON, (errQuery, resQuery)=> {
       if(errQuery){throw(errQuery)}
       else {res.send(resQuery.rows[0].jsonb_build_object);}
    })
  },
  bar: function () {
    // whatever
  }
};
