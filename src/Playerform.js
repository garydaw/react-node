// src/AllyCodeForm.js
import React, { useState } from 'react';

function AllyCodeForm() {
  const [ally_code, setAllyCode] = useState('');
  const [player, setPlayer] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const result = await (await fetch('http://localhost:5000/api/players/'+ally_code)).json()
      setPlayer(result);

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
        {player.map((unit, index) => {
          return (
              <div>{unit.NAME}, {unit.ally_code}</div>
          );
        })}
      </div>
    </div>
  );
}

export default AllyCodeForm;
