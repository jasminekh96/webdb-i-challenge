const express = require('express');

const db = require('./data/dbConfig.js');

const accountRouter = require('./data/seeds/accountRouter');

const server = express();

function logger(req, res, next) {
	console.log(`${req.method} to ${req.originalUrl} at ${new Date()}`);
	next();
}
server.use(logger);
server.use(express.json());

server.use('/api/budget', accountRouter);

server.get('/', (req, res) => {
	res.send(`<h1>She works!</h2>`);
});

module.exports = server;
