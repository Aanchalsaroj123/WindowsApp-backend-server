This server provides endpoints to handle form submissions and store them in a database.

## Installation

1. Clone this repository:

2. Navigate to the project directory:
   cd submission-form-server

3. Install dependencies:
   npm install


### Starting the Server

Start the server using the following command:
npm start

The server will start running on `http://localhost:3000`.

### Endpoints

- `GET /ping`: Check if the server is running.
- `POST /submit`: Submit a form with the following JSON payload:
- `GET /read?index=<submission-index>`: Read a specific submission by its index.
- `GET /submissions`: Retrieve all submissions.

## Database

Submission data is stored in a JSON file named `db.json` in the `src` directory.

## Dependencies

- [Express](https://expressjs.com/): Web framework for Node.js.
- [body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse JSON request bodies.
- [fs](https://nodejs.org/api/fs.html): File system module for Node.js.
