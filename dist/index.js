"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
let db = { submissions: [] };
const loadDatabase = () => {
    if (fs_1.default.existsSync('src/db.json')) {
        const data = fs_1.default.readFileSync('src/db.json', 'utf-8');
        db = JSON.parse(data);
    }
};
const saveDatabase = () => {
    fs_1.default.writeFileSync('src/db.json', JSON.stringify(db, null, 2));
};
app.get('/ping', (req, res) => {
    res.json(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const newSubmission = { name, email, phone, github_link, stopwatch_time };
    db.submissions.push(newSubmission);
    saveDatabase();
    res.status(201).send('Submission saved');
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (index >= 0 && index < db.submissions.length) {
        res.json(db.submissions[index]);
    }
    else {
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
