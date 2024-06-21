import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(bodyParser.json());

interface Submission {
  Name: string;
  Email: string;
  Phone: string;
  GitHubLink: string;
  StopwatchTime: number;
}

let db = { submissions: [] as Submission[] };

const loadDatabase = () => {
  if (fs.existsSync('src/db.json')) {
    const data = fs.readFileSync('src/db.json', 'utf-8');
    db = JSON.parse(data);
  }
};

const saveDatabase = () => {
  fs.writeFileSync('src/db.json', JSON.stringify(db, null, 2));
};

app.get('/ping', (req, res) => {
  res.json(true);
});

app.post('/submit', (req, res) => {
  const { Name, Email, Phone, GitHubLink, StopwatchTime} = req.body;
  const newSubmission: Submission = { Name, Email, Phone, GitHubLink, StopwatchTime};
  console.log(req.body,5878495);
  db.submissions.push(newSubmission);
  saveDatabase();
  res.status(201).send('Submission saved');
});

app.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  if (index >= 0 && index < db.submissions.length) {
    res.json(db.submissions[index]);
  } else {
    res.status(404).send('Submission not found');
  }
});

app.get('/submissions', (req, res) => {
  res.json(db.submissions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  loadDatabase();
});
