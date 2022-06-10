import {
  moveSelection,
  moveSelectionRight,
  moveSelectionLeft,
  selectInitialFieldOfCurrentRow,
} from "./grid.js";
import { onSubmit } from "./main.js";

function onKeyClick(text) {
  const isDelete = text === "⌫";
  const isEnter = text === "Enter";

  if (isEnter) {
    return onSubmit();
  }

  data.selectedFields.forEach(function (field) {
    if (isDelete) {
      field.innerText = "";
    } else {
      field.innerText = text;
    }

    field.classList.toggle("selected");
  });

  const field = data.selectedFields.pop();

  if (isDelete) {
    moveSelectionLeft(field);
  } else {
    moveSelectionRight(field);
  }
}

function createKey(text) {
  const key = document.createElement("div");

  key.innerText = text;
  key.classList.add("main_keyboard_row_key");

  key.addEventListener("click", () => {
    if (data.selectedFields.length === 0) {
      selectInitialFieldOfCurrentRow();
    }

    onKeyClick(text);
  });

  if (text === "⌫") {
    key.classList.add("delete");
  }

  if (text === "Enter") {
    key.classList.add("enter");
  }

  return key;
}

function loadKeyboard(params) {
  const keys = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "⌫"],
    ["z", "x", "c", "v", "b", "n", "m", "Enter"],
  ];

  for (let i = 0; i < keys.length; i++) {
    const row = document.createElement("div");
    row.classList.add("main_keyboard_row");

    for (let j = 0; j < keys[i].length; j++) {
      const key = createKey(keys[i][j]);

      row.appendChild(key);
    }

    params.keyboard.appendChild(row);
  }

  window.addEventListener("keydown", function (event) {
    const isLetter = event.key.length === 1 && event.key.match(/[a-z]/i);
    const isDelete = event.key === "Backspace";
    const isEnter = event.key === "Enter";

    if (data.selectedFields.length === 0 && !isEnter) {
      selectInitialFieldOfCurrentRow();
    }

    if (isLetter) {
      onKeyClick(event.key);
    } else if (isDelete) {
      onKeyClick("⌫");
    } else if (isEnter) {
      onKeyClick("Enter");
    } else if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      moveSelection(event.key);
    }
  });
}

export { loadKeyboard };
