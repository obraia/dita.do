const filesNames = {
  5: './data/palavras_05.json',
  6: './data/palavras_06.json',
  7: './data/palavras_07.json',
  8: './data/palavras_08.json',
  9: './data/palavras_09.json',
  10: './data/palavras_10.json',
};

const msDay = 1000 * 60 * 60 * 24;
const initialDate = new Date('2022-06-13');

const utc1 = Date.UTC(initialDate.getFullYear(), initialDate.getMonth(), initialDate.getDate());

function currentCount() {
  const date = new Date();
  const utc2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((utc2 - utc1) / msDay);
}

function random(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomIntInclusive(min, max, seed) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(random(seed) * (max - min + 1)) + min;
}

function currentWord(size, seed) {
  const count = currentCount();
  const file = filesNames[size];
  const words = require(file);
  const index = getRandomIntInclusive(0, words.length, count + seed);
  return words[index];
}

function getColors(word, correctWord) {
  const colors = [];

  for (let i = 0; i < word.length; i++) {
    if (word[i] === correctWord[i]) {
      colors.push('green');
    } else if (correctWord.includes(word[i])) {
      colors.push('yellow');
    } else {
      colors.push('black');
    }
  }

  return colors;
}

module.exports = { currentWord, getColors };
