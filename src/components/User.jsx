import { useState, useEffect } from 'react';

export default function User() {
  const [username, setUsername] = useState('default');

  useEffect(() => {
    setUsername('new');
  }, []);

  return (
    <div>
      <h1>{username}</h1>
    </div>
  );
}
