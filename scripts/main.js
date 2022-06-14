import { Help } from './help.js';
import { Navbar } from './navbar.js';
import { Grid } from './grid.js';
import { Keyboard } from './keyboard.js';
import { Menu } from './menu.js';
import * as api from './api.js';
import * as words from './words.js';

const levels = (wordLength) => ({
  Easy: {
    rows: 6,
    columns: wordLength,
    words: 1,
  },
  Normal: {
    rows: 7,
    columns: wordLength,
    words: 2,
  },
  Hard: {
    rows: 9,
    columns: wordLength,
    words: 4,
  },
});

const get = (id) => document.getElementById(id);

async function onSubmit(params) {
  const correctWord = await words.checkWord(params.word);

  if (!correctWord) {
    return Array.from(Array(params.keys.length).keys()).map(() => null);
  }

  const response = await api.checkWord(params);

  return response.map((r) => ({ colors: r.colors, word: correctWord }));
}

function loadLevel(level, wordLength) {
  const mainRow = get('main_row');
  const grids = [];

  const { rows, columns, words } = levels(wordLength)[level];

  for (let i = 0; i < words; i++) {
    const grid = new Grid({
      parent: mainRow,
      key: i,
      rows,
      columns,
    });

    grids.push(grid);
  }

  const keyboard = new Keyboard({
    parent: main,
    grids: grids,
  });

  get('main_row').replaceChildren(...grids.map((g) => g.element));
  get('main_keyboard').replaceWith(keyboard.element);
}

function onLoad(level, wordLength = 5) {
  const help = new Help({
    parent: null,
    hidden: true,
  });

  const menu = new Menu({
    parent: null,
    hidden: true,
    mode: level,
    wordLength: wordLength,
  });

  const navbar = new Navbar({
    parent: null,
    actions: [
      { content: 'help', onClick: help.toggle.bind(help) },
      { content: 'grid_on', onClick: menu.toggle.bind(menu) },
    ],
  });

  get('help').replaceWith(help.element);
  get('menu').replaceWith(menu.element);
  get('navbar').replaceWith(navbar.element);
  loadLevel(level, wordLength);
}

window.addEventListener('load', () => onLoad('Easy', 5));

export { onSubmit, loadLevel };
