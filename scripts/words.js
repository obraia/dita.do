const files = {
  5: './data/palavras_05.json',
  6: './data/palavras_06.json',
  7: './data/palavras_07.json',
  8: './data/palavras_08.json',
  9: './data/palavras_09.json',
  10: './data/palavras_10.json',
};

function replaceSpecialChars(str) {
  str = str.replace(/[ÀÁÂÃÄÅ]/, 'A');
  str = str.replace(/[àáâãäå]/, 'a');
  str = str.replace(/[ÈÉÊË]/, 'E');
  str = str.replace(/[èéêë]/, 'e');
  str = str.replace(/[ÌÍÎÏ]/, 'I');
  str = str.replace(/[ìíîï]/, 'i');
  str = str.replace(/[ÒÓÔÕÖ]/, 'O');
  str = str.replace(/[òóôõö]/, 'o');
  str = str.replace(/[ÙÚÛÜ]/, 'U');
  str = str.replace(/[ùúûü]/, 'u');
  str = str.replace(/[Ç]/, 'C');
  str = str.replace(/[ç]/, 'c');
  return str.replace(/[^a-z0-9]/gi, '');
}

async function checkWord(word) {
  const words = await (await fetch(files[word.length])).json();
  return words.find((w) => replaceSpecialChars(w) === word);
}

export { checkWord };
