DELETE FROM entreprises	WHERE row_id IN (SELECT row_id FROM entreprises
INNER JOIN arrondissements ON c_arinsee::varchar like code_insee
WHERE code_insee  =  '75120' AND NOT ST_WITHIN( latlng, geom));
      
