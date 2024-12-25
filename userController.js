const { readDb, writeDb } = require('./utils');

// Function to get the next available ID
const getNextId = () => {
  const data = readDb(); // Get the data from db.json
  const users = data.users; // Get the array of users
  
  // If there are users, find the max id, otherwise return 1
  const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
  return maxId + 1;
};

// Function to add a new user
const createUser = (name, email) => {
  const nextId = getNextId(); // Get the next available ID

  // Create a new user object
  const newUser = {
    id: nextId, // Use the generated ID
    name,
    email
  };

  // Read the current data
  const data = readDb();
  data.users.push(newUser); // Add the new user to the users array

  // Write the updated data back to the db.json file
  writeDb(data);

  return newUser; // Return the newly created user object
};

module.exports = { createUser };
