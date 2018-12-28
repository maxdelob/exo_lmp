const request = require("request"); // for http request
const {Client} = require('pg');
const connectionString = "postgres://pzjvgqtwhvboia:475f1ac1fcf49d09c2f6a4ce3bc01743d9752483cad9eadd4f1f41f68f2b5397@ec2-54-247-74-131.eu-west-1.compute.amazonaws.com:5432/d6qbk7df6arkq9";
const client = new Client({
    connectionString: connectionString,
    ssl: true,
  });

const fs = require('fs');
var sql = fs.readFileSync('dump.sql').toString();


const test = `

CREATE EXTENSION   IF NOT EXISTS postgis;

CREATE TABLE IF NOT EXISTS public.entreprises (
        row_id integer NOT NULL,
        nom_entreprise character varying(100),
        categorie character varying(50),
        ville character varying(50),
        latlng public.geometry(Point,4326),
        taille_entreprise character varying(50),
        adresse character varying(150),
        siren character varying(9),
        code_postal integer
    );
    
CREATE SEQUENCE   IF NOT EXISTS public.entreprises_row_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.entreprises ALTER COLUMN row_id SET DEFAULT nextval('public.entreprises_row_id_seq'::regclass);

`

client.connect();
client.query("SELECT * FROM arrondissements", (err, res)=>{
    if(err) throw(err);
    else{
        console.log(res);
    }
});
