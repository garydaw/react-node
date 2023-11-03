// src/AllyCodeForm.js
import React, { useState } from 'react';

function AllyCodeForm() {
  const [ally_code, setAllyCode] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      fetch('http://localhost:5000/api/players/'+ally_code)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

      //const data = await response.json();

     // setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ally Code:
          <input
            type="text"
            value={ally_code}
            onChange={(e) => setAllyCode(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        <pre>{JSON.stringify(response, null, 2)}</pre>
      </div>
    </div>
  );
}

export default AllyCodeForm;
