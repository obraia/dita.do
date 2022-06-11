import { loadNavbar } from "./navbar.js";
import { Grid } from "./grid.js";
import { Keyboard } from "./keyboard.js";
import { loadHelp } from "./help.js";

function onSubmit() {
  const grid = document.getElementById("grid");
  const gridText = grid.innerText.replace(/\s/g, "");

  const word = gridText.substring(
    data.currentRow * data.columns,
    (data.currentRow + 1) * data.columns
  );

  unselectAll({
    fields: grid.children,
  });

  paintLine({
    currentRow: data.currentRow,
    columns: data.columns,
    fields: grid.children,
    colors: ["green", "yellow", "black", "black", "yellow"],
  });

  nextLine();
}

function onLoad() {
  const get = (id) => document.getElementById(id);

  const navbar = get("navbar");
  const main = get("main");
  const help = get("help");

  loadNavbar({
    navbar,
  });

  const grid = new Grid({
    rows: 6,
    columns: 5,
    parent: main
  });

  const keyboard = new Keyboard({
    parent: main,
    onSubmit: onSubmit,
    grid: grid,
  });

  get("grid").replaceWith(grid.element);
  get("keyboard").replaceWith(keyboard.element);

  loadHelp({
    help,
  });
}

window.addEventListener("load", onLoad);

export { onSubmit };
