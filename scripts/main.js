import { Help } from './help.js';
import { Navbar } from './navbar.js';
import { Grid } from './grid.js';
import { Keyboard } from './keyboard.js';
import { Menu } from './menu.js';

const LEVELS = {
  Easy: {
    rows: 6,
    columns: 5,
    grids: 1,
  },
  Normal: {
    rows: 6,
    columns: 5,
    grids: 2,
  },
  Hard: {
    rows: 6,
    columns: 5,
    grids: 4,
  },
};

const get = (id) => document.getElementById(id);

function onSubmit(word) {
  console.log(word);

  return {
    colors: ['green', 'black', 'yellow', 'yellow', 'black'],
  };
}

function loadLevel(level) {
  const mainRow = get('main_row');
  const grids = [];

  for (let i = 0; i < LEVELS[level].grids; i++) {
    const grid = new Grid({
      parent: mainRow,
      rows: LEVELS[level].rows,
      columns: LEVELS[level].columns,
      onSubmit: onSubmit,
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

function onLoad(level) {
  const help = new Help({
    parent: null,
    hidden: true,
  });

  const menu = new Menu({
    parent: null,
    hidden: true,
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
  loadLevel(level);
}

window.addEventListener('load', () => onLoad('Easy'));

export { onSubmit, loadLevel };
