import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onUserAdded={(newUser) => setUsers([...users, newUser])} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
};

export default App;
