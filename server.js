// Budget API
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());

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
  console.log(`API served at  listening at http://localhost:${port}`);
});
