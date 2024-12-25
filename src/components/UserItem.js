import React, { useState } from "react";

const UserItem = ({ user, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleUpdate = () => {
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then(() => setIsEditing(false))
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <li>
      {isEditing ? (
        <React.Fragment>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {user.name} ({user.email})
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </React.Fragment>
      )}
    </li>
  );
};

export default UserItem;
