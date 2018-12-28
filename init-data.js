// run the following comand : node --max-old-space-size=3072 init-data.js
const request = require("request"); // for http request
const {
  Client
} = require('pg');
// const connectionString = 'postgres://postgres:f@localhost:5432/exo-lmp'; localhost
const connectionString = "postgres://pzjvgqtwhvboia:475f1ac1fcf49d09c2f6a4ce3bc01743d9752483cad9eadd4f1f41f68f2b5397@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d6qbk7df6arkq9";

const client = new Client({
  connectionString: connectionString,
  ssl: true
});
client.connect();

for (i = 1; i < 21; i++) {
  const cp = '751' + gestionCP(i);
  let opendatasoftUrl  = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene&q=depcomen="+ cp + "&rows=500";
  client.query('TRUNCATE TABLE entreprises;'); // clean db 
  getData(opendatasoftUrl, cp);
}

function getData(opendatasoftUrl, cp) {
  request.get(opendatasoftUrl, (error, response, body) => {
    if (body) {
      console.log("Debut enregistrement pour " + cp)
      JSON.parse(body).records.forEach((record) => {
          const siren = record.fields.siren;
          const nom = gestionApostrophe(record.fields.l1_normalisee);
          const categorie = gestionApostrophe(record.fields.categorie);
          const taille = gestionApostrophe(record.fields.libtefet);
          const adresse = gestionApostrophe(record.fields.l4_normalisee);
          const code_insee = record.fields.depcomen;
          const latlng = record.fields.coordonnees;
          const ville = gestionApostrophe(record.fields.nom_dept);
          // insert in local db
          if (isValidGeo(latlng) && isInCodePostal(cp, code_insee, ville)) {
            const queryInsert = `INSERT INTO entreprises (nom_entreprise, taille_entreprise, categorie, adresse, code_insee, ville, latlng, siren) VALUES ('${nom}', '${taille}', '${categorie}', '${adresse}', '${code_insee}', '${ville}',  ST_GeomFromText('POINT(${latlng[1]} ${latlng[0]})', 4326), '${siren}')`;
            client.query(queryInsert, (err, res) => {
              if (err) console.log(queryInsert)
              // else console.log('Insert successful with siren n° ' + siren);
            });
          }
      });
    }
  })
}


// function calcul code arrondissement (gestion des cas inferieur à 1)
function gestionCP(i) {
  if (i < 10) {
    return '0' + i
  } else {
    return i
  }
}
// function qui verifie s'il existe de la donnée geo. Si pas de données geo, pas d'insert dans la base de données
function isValidGeo(latlng) {
  try {
    latlng[0] && latlng[1]
    return true;
  } catch {
    return false;
  }
}

// function qui corrige l'erreur de données de l'API (certaines entreprises ne sont pas dans l'arrondissement)
function isInCodePostal(expectedCP, cp, ville) {
  if (ville == "PARIS" && cp == expectedCP) {
    return true
  } else {
    return false
  }
}

// function qui qui ajoute un ' aux valeurs ayant déja un ' pour l'insertion SQL
function gestionApostrophe(val) {
  try {
    val.replace("'", "''")
    return val.replace("'", "''");
  } catch {
    null
  }
}
