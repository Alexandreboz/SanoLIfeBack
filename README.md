SanoLife API
Description
L'API de SanoLife est un backend développé avec Node.js et Express.js qui gère les fonctionnalités de gestion de documents (upload de fichiers), la manipulation de données médicales ainsi que l'interface avec la base de données MySQL. L'API permet notamment de gérer les utilisateurs et leurs documents de santé.

Prérequis
Node.js (version >= 12)
MySQL (version >= 5.7)
Multer pour la gestion des fichiers
fs et path pour la gestion des chemins de fichiers
Installation
Clonez ce dépôt :

bash
Copier le code
git clone https://github.com/username/sanolife-api.git
Installez les dépendances : Dans le répertoire de l'API, exécutez :

bash
Copier le code
npm install
Configurez la base de données MySQL :

Créez une base de données SanoLife.
Importez le schéma de la base de données (fichier .sql fourni).
Modifiez la configuration de la base de données : Dans index.js, configurez vos informations de base de données :

javascript
Copier le code
const db = mysql.createConnection({
   host: '127.0.0.1',
   user: 'root',
   password: '',
   database: 'SanoLife',
});
Lancez le serveur :

bash
Copier le code
npm start
Le serveur est démarré sur http://localhost:3000.

Endpoints principaux
1. Upload de fichier
Route : /upload
Méthode : POST
Description : Télécharge un fichier et l'enregistre dans la base de données.
Corps de la requête :
file (fichier à uploader)
user_id (id de l'utilisateur)
document_type (facultatif, par défaut JPG)
2. Liste des fichiers uploadés
Route : /uploads
Méthode : GET
Description : Renvoie la liste des fichiers uploadés.
3. Autres routes
Vous pouvez ajouter d'autres routes spécifiques pour la gestion des utilisateurs, des documents ou des permissions en fonction de vos besoins.

Technologies utilisées
Node.js et Express.js pour le backend
MySQL pour la base de données
Multer pour la gestion des fichiers
fs et path pour la gestion des fichiers
