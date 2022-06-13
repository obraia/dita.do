const functions = require('firebase-functions');
const express = require('express');
const { currentWord, getColors } = require('./utils');

const app = express();
const routes = express.Router();

routes.get('/verify', (req, res) => {
  const { word, grids } = req.query;

  if (!word || word.length < 5 || word.length > 10) {
    res.status(400).send('Word is invalid');
  }

  const response = [];

  for (let i = 0; i < grids; i++) {
    const correctWord = currentWord(word.length, i);
    const colors = getColors(word, correctWord);

    response.push({ colors, word });
  }

  res.set('Access-Control-Allow-Origin', '*');
  res.send(response);
});

app.use('/', routes);

exports.api = functions.https.onRequest(app);
