const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicjalizacja aplikacji
const app = express();
app.use(cors());
app.use(express.json());

// Połączenie z MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/peopleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Połączono z MongoDB'))
  .catch((err) => console.error('Błąd połączenia z MongoDB:', err));

// Model danych
const PersonSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const Person = mongoose.model('Person', PersonSchema);

// Endpointy
// 1. Dodawanie osoby
app.post('/add-person', async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const newPerson = new Person({ firstName, lastName });
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    res.status(500).send('Błąd podczas dodawania osoby');
  }
});

// 2. Pobieranie wszystkich osób
app.get('/get-people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).send('Błąd podczas pobierania danych');
  }
});

// Start serwera
const PORT = 5000;
app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
