import { loadNavbar } from './navbar.js';
import { Grid } from './grid.js';
import { Keyboard } from './keyboard.js';
import { loadHelp } from './help.js';

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

function onSubmit(word) {
  console.log(word);

  return {
    colors: ['green', 'black', 'yellow', 'yellow', 'black'],
  };
}

function onLoad() {
  const get = (id) => document.getElementById(id);

  const navbar = get('navbar');
  const mainRow = get('main_row');
  const help = get('help');

  loadNavbar({
    navbar,
  });

  const level = 'Hard';
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

  get('main_row').append(...grids.map((g) => g.element));
  get('keyboard').replaceWith(keyboard.element);

  loadHelp({
    help,
  });
}

window.addEventListener('load', onLoad);

export { onSubmit };
