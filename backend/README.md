# Project Live Chat

## Comment bien démarrer

```
npm install
```

Créer vos identifiants et base de donnée Admin avec Mongosh :
```
mongosh

use admin

db.createUser( { user: "userName", pwd: passwordPrompt(), roles: [ { role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" } ] } )

```
Lancer la base de donnée via Robot3T ou Mongosh (Mongo Shell)
```
mongosh "mongodb://localhost:27017/admin" --username userName

```

### Lancer le serveur

Positionez-vous a la racine du projet puis taper la commande : 
```
npm start
```

### Express

C'est un module permettant de créer un serveur web et gérer les différentes routes facilement

### Mongoose

C'est un "ODM" `Object Data Modeling` permettant de créer des `Schemas` et `Models` de donnée

### Dotenv

Une librairie permettant de créer des fichiers d'environnement facilement `.env`

## Architecture du projet

- /web
Ce dossier contiendra les fichiers relatifs au serveur web.

- /public
Ce dossier contiendra des fichiers servis statiquement par le serveur Web Express

- /modules
