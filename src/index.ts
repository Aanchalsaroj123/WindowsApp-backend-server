import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: number;
}

// Initialize the database object
let db: { submissions: Submission[] } = { submissions: [] };

// Function to load database from file
const loadDatabase = () => {
  try {
    // Read database file if it exists
    const data = fs.readFileSync('src/db.json', 'utf-8');
    db = JSON.parse(data);
    console.log('Database loaded successfully');
  } catch (err) {
    // Handle file read errors or if file doesn't exist
    console.error('Error loading database:', err);
    db = { submissions: [] }; // Initialize with an empty array if file doesn't exist
  }
};

// Function to save database to file
const saveDatabase = () => {
  try {
    // Write database object to file
    fs.writeFileSync('src/db.json', JSON.stringify(db, null, 2)); // Use null, 2 for pretty formatting
    console.log('Database saved successfully');
  } catch (err) {
    // Handle file write errors
    console.error('Error saving database:', err);
  }
};

// Endpoint to check if server is running
app.get('/ping', (req, res) => {
  res.json(true);
});

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
  console.log('Received submission:', req.body); // Log the submission received

  // Extract submission data from request body
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Validate submission data
  if (!name || !email || !phone || !github_link || stopwatch_time === undefined) {
    res.status(400).send('Invalid submission data');
    return;
  }

  // Create new submission object
  const newSubmission: Submission = { name, email, phone, github_link, stopwatch_time };

  // Add new submission to database
  db.submissions.push(newSubmission);

  // Save database to file
  saveDatabase();

  // Respond with success message
  res.status(201).send('Submission saved');
});

// Endpoint to read a specific submission by index
app.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  if (index >= 0 && index < db.submissions.length) {
    res.json(db.submissions[index]);
  } else {
    res.status(404).send('Submission not found');
  }
});

// Endpoint to retrieve all submissions
app.get('/submissions', (req, res) => {
  res.json(db.submissions);
});

// Start server and load database on startup
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  loadDatabase();
});
