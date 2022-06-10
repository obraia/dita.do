window.data = {
  rows: 6,
  columns: 5,
  currentRow: 0,
  selectedFields: [],
};

import { loadNavbar } from "./navbar.js";
import { nextLine, loadGrid } from "./grid.js";
import { loadKeyboard } from "./keyboard.js";
import { loadHelp } from "./help.js";

function onSubmit() {
  const grid = document.getElementById("grid");
  const gridText = grid.innerText.replace(/\s/g, "");

  const word = gridText.substring(
    data.currentRow * data.columns,
    (data.currentRow + 1) * data.columns
  );

  nextLine();
}

function onLoad() {
  const navbar = document.getElementById("navbar");
  const grid = document.getElementById("grid");
  const keyboard = document.getElementById("keyboard");
  const help = document.getElementById("help");

  loadNavbar({
    navbar,
  });

  loadGrid({
    rows: data.rows,
    columns: data.columns,
    grid,
  });

  loadKeyboard({
    keyboard,
  });

  loadHelp({
    help,
  });
}

window.onSubmit = onSubmit;
window.addEventListener("load", onLoad);
