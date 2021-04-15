Minimal Vrac - Backend

Configuration ⚙️
Copier le fichier .envSample en le renomant .env 

Éditer le fichier .env avec les informations suivantes :

DB_HOST : Le port de l'application
DB_USER : l'utilisateur de la base de données
DB_PASSWORD : mot de passe de l'utilisateur
DB_NAME : le nom de la base de données

Commandes package.json 📜
Démarrage en mode production
$ npm start


dependencies: 
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.2.5"
    "bcryptjs": "^2.4.3",
