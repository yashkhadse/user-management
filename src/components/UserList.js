import React from "react";
import UserItem from "./UserItem";

const UserList = ({ users, setUsers }) => {
  const handleDelete = (id) => {
    fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Error deleting user:", error));
  };

  return (
    <ul>
      {users.map((user) => (
        <UserItem key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </ul>
  );
};

export default UserList;
