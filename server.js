const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;

const dbFilePath = path.join(__dirname, 'db.json');

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to read data from db.json file
function readDataFromDB() {
  const data = fs.readFileSync(dbFilePath);
  return JSON.parse(data);
}

// Function to write data back to db.json file
function writeDataToDB(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// POST /users - Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).send('Name and email are required.');
  }

  const users = readDataFromDB().users;

  // Find the highest ID and increment it for the new user
  const highestId = users.reduce((max, user) => {
    return Math.max(max, parseInt(user.id, 10));
  }, 0);

  const newId = (highestId + 1).toString(); // Ensure new ID is numeric and sequential

  // Create the new user object
  const newUser = { id: newId, name, email };

  // Add the new user to the users array
  users.push(newUser);

  // Write the updated users array back to db.json
  writeDataToDB({ users });

  // Return the newly created user
  res.status(201).json(newUser);
});

// GET /users - Get all users
app.get('/users', (req, res) => {
  const users = readDataFromDB().users;
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
