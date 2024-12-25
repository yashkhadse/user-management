const fs = require('fs');
const path = require('path');

// Path to the db.json file
const dbPath = path.resolve(__dirname, 'db.json');

// Read the db.json file and parse the data
const readDb = () => {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
};

// Write data back to the db.json file
const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readDb, writeDb };
