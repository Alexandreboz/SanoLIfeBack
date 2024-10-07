const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',  // ou l'adresse de ton serveur de base de données
  user: 'root',       // Ton nom d'utilisateur MySQL
  password: 'password', // Ton mot de passe
  database: 'SanoLife', // Nom de la base de données
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
  } else {
    console.log('Connecté à la base de données SanoLife.');
  }
});

// Route pour récupérer la liste des utilisateurs par exemple
app.get('/users', (req, res) => {
  db.query('SELECT * FROM Users', (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// Route pour ajouter un nouvel utilisateur
app.post('/users', (req, res) => {
  const { name, email, age, gender, medical_condition } = req.body;
  const query = 'INSERT INTO Users (name, email, age, gender, medical_condition) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, age, gender, medical_condition], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Utilisateur ajouté avec succès.' });
    }
  });
});

// Démarrer le serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
