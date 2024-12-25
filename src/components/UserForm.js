import React, { useState } from 'react';

function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the current list of users
    const response = await fetch('http://localhost:3001/users');
    const users = await response.json();

    // Calculate the new user's ID
    const maxId = Math.max(...users.map(user => parseInt(user.id, 10)));
    const newUser = {
      id: maxId + 1,
      name,
      email
    };

    // Send the new user to the backend
    await fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });

    alert('User added successfully!');
    setName(''); // Clear the form
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
