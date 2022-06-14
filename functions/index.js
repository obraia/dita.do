const functions = require('firebase-functions');
const express = require('express');
const { currentWord, getColors } = require('./utils');

const app = express();
const routes = express.Router();

routes.get('/verify', (req, res) => {
  let { word, words, keys } = req.query;

  if (!word || word.length < 5 || word.length > 10) {
    res.status(400).send('Word is invalid');
  }

  const response = [];
  keys = keys.split(',').map((k) => parseInt(k));

  for (let i = 0; i < keys.length; i++) {
    const correctWord = currentWord(word.length, words + keys[i]);
    const colors = getColors(word, correctWord);
    response.push({ colors, key: keys[i] });
  }

  res.set('Access-Control-Allow-Origin', '*');
  res.send(response);
});

app.use('/', routes);

exports.api = functions.https.onRequest(app);
