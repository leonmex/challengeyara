'strict'
/*
const express = require('express');
const app = express();

// Specify the directory where your static files are located.
// Replace 'public' with your actual directory name.
app.use(express.static('public'));

// Start the server on port 3000 (or your desired port).
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/
const http = require('http');

const hostname = 'node_app';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
