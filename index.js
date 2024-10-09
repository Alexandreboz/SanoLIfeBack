const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer'); // Importer multer pour gérer les fichiers
const path = require('path'); // Pour gérer les chemins de fichiers
const fs = require('fs'); // Pour lire les fichiers dans le dossier

const app = express();
app.use(bodyParser.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'SanoLife',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données SanoLife.');
  }
});

// Configurer multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nom unique pour chaque fichier
  },
});

const upload = multer({ storage: storage });

// Route pour gérer l'upload des fichiers
app.post('/uploads', upload.single('file'), (req, res) => {
  const file = req.file;
  let { user_id, document_type } = req.body;

  // Définir le type de document par défaut sur 'JPG' si non précisé
  if (!document_type) {
    document_type = 'JPG';
  }

  // Vérifier si le fichier est bien reçu
  if (!file) {
    return res.status(400).send({ message: 'Aucun fichier reçu.' });
  }

  const scanUrl = path.join('uploads', file.filename);
  const createdAt = new Date();

  // Enregistrer les données dans la table scan
  const query = 'INSERT INTO scans (user_id, document_type, scan_url, created_at) VALUES (?, ?, ?, ?)';
  db.query(query, [user_id, document_type, scanUrl, createdAt], (err, result) => {
    if (err) {
      console.error('Erreur lors de l\'insertion dans la base de données:', err);
      return res.status(500).send({ message: 'Erreur lors de l\'enregistrement dans la base de données.' });
    }
    res.status(200).send({ message: 'Fichier téléchargé et enregistré avec succès.' });
  });
});

// Route pour récupérer la liste des fichiers dans le dossier uploads
app.get('/uploads', (req, res) => {
  const directoryPath = path.join(__dirname, 'uploads');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send({
        message: "Impossible de lire le répertoire des fichiers.",
      });
    }

    // Créer une liste de fichiers avec leurs URL pour l'accès
    const fileList = files.map(file => {
      return {
        name: file,
        url: `http://192.168.151.244:3000/uploads/${file}` // URL pour accéder au fichier
      };
    });

    res.status(200).json(fileList);
  });
});

// Servir les fichiers statiques dans le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Démarrer le serveur
const port = 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});

