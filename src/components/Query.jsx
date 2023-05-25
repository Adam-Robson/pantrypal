import React, { useState } from 'react';

export default function Query() {
  const [query, setQuery] = useState('');

  function sendQuery() {
    fetch(`https://api.example.com/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
        const res = data.json();
        return res;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search"
        value={ query }
        onChange={ e => setQuery(e.target.value) }
      />
      <button onClick={ sendQuery }>Send Query</button>
    </div>
  );
}

