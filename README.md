# Exercice DEV Fullstack (Majeure Front) - usecase 50+1

Ceci est le repèrtorie GIT pour le test de dev Full stack de Maxime Delobelle pour liegeymullerpons.

Une demo est disponible à l'adresse suivante : 
[DEMO](https://liegeymullerpons.herokuapp.com).

# Stack Front

Le front étant en Angular 7, j'ai fait le choix d'y intégrer Angular Material comme librairie graphique afin de garantir une certaine cohérence (stack 100% Google). J'y ai également ajouté Boostrap 4 pour le responsive design. 

# Stack Back 

Node.js avec  Express.js et TypeScript -> un seul language back et front. Rapide a mettre en place. 

# Base de données

Instance Base de données Postregres 10 créer sur Heroku. 

Accessible ici : ?

# DevOps 

Afin de deployer l'application, j'ai choisi d'utiliser [Heroku](http://heroku.com/). car il permet de deployer gratuitement, et simplement, des applications node.js et Angular. 







# Initalisation de la base de données
Un script nodejs recupère les données de l'api avec un filtre de 500 pour aller les inserer dans une base de données préalablement créer en SQL. Le script est consulatable à la racine du porjet init-data.js

On utilise Qgis pour importer le shapefile des arrondissements dans la base de données (conversion shapefile > St_Geom automatique). 

Puisque certaines données importées dans l'api ne sont pas localisés dans le perimètre de l'arrondissement, on lance un script SQL pour supprimer les points en dehors des frontières de l'arrondisssement correspondant. 

