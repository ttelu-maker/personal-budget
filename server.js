const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from ./public
app.use('/', express.static('public'));

// Test route
app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

// Load data from budget.json on demand
app.get('/budget', (req, res) => {
  const filePath = path.join(__dirname, 'budget.json');
  fs.readFile(filePath, 'utf8', (err, text) => {
    if (err) return res.status(500).json({ error: 'Unable to load budget data' });
    try {
      res.json(JSON.parse(text)); // returns an ARRAY
    } catch {
      res.status(500).json({ error: 'Invalid JSON in budget.json' });
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
