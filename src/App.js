import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [people, setPeople] = useState([]);
  const [message, setMessage] = useState('');

  // Dodawanie osoby do bazy danych
  const addPerson = async () => {
    if (!firstName || !lastName) {
      setMessage('Uzupełnij imię i nazwisko!');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/add-person', {
        firstName,
        lastName,
      });
      setMessage(`Dodano: ${response.data.firstName} ${response.data.lastName}`);
      setFirstName('');
      setLastName('');
    } catch (error) {
      setMessage('Błąd podczas dodawania osoby');
    }
  };

  // Pobieranie listy osób z bazy danych
  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-people');
      setPeople(response.data);
      setMessage('');
    } catch (error) {
      setMessage('Błąd podczas pobierania danych');
    }
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Aplikacja: MongoDB z React</h1>
      
      {/* Formularz dodawania osoby */}
      <div>
        <h2>Dodaj osobę</h2>
        <input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={addPerson}>Dodaj</button>
      </div>

      {/* Wyświetlanie listy osób */}
      <div>
        <h2>Wyświetl osoby</h2>
        <button onClick={fetchPeople}>Wyświetl</button>
        <ul>
          {people.map((person) => (
            <li key={person._id}>
              {person.firstName} {person.lastName}
            </li>
          ))}
        </ul>
      </div>

      {/* Komunikat o błędach/sukcesie */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
