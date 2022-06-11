import { onSubmit } from "./main.js";

class Key {
  _element = null;

  constructor(params) {
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  get value() {
    return this._element.innerText;
  }

  _create(params) {
    const key = document.createElement("div");

    key.innerText = params.value;
    key.addEventListener("click", () => params.onClick(this));

    key.classList.add(params.parent.classList[0] + "_key");

    if (params.value === "⌫") {
      key.classList.add("delete");
    }

    if (params.value === "Enter") {
      key.classList.add("enter");
    }

    return key;
  }
}

class Keyboard {
  _element = null;
  _grid = null;
  _keys = [];

  constructor(params) {
    this._grid = params.grid;

    this._element = this._create({
      parent: params.parent,
    });
  }

  get element() {
    return this._element;
  }

  get keys() {
    return this._keys;
  }

  _create(params) {
    const keyboard = document.createElement("div");
    keyboard.classList.add(params.parent.classList[0] + "_keyboard");

    const keys = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "⌫"],
      ["z", "x", "c", "v", "b", "n", "m", "Enter"],
    ];

    for (let i = 0; i < keys.length; i++) {
      const row = document.createElement("div");
      row.classList.add(keyboard.classList[0] + "_row");

      for (let j = 0; j < keys[i].length; j++) {
        const key = new Key({
          parent: row,
          value: keys[i][j],
          onClick: this._onKeyClick.bind(this),
        });

        row.appendChild(key.element);
        this._keys.push(key);
      }

      keyboard.appendChild(row);
    }

    window.addEventListener("keydown", (event) => {
      const isLetter = event.key.length === 1 && event.key.match(/[a-z]/i);
      const isDelete = event.key === "Backspace";
      const isEnter = event.key === "Enter";

      if (!this._grid.hasSelectedField && !isEnter) {
        this._grid.selectInitialField();
      }

      const field = this._grid.lastSelectedField;

      if (isLetter) {
        this._onKeyClick({ value: event.key });
      } else if (isDelete) {
        this._onKeyClick({ value: "⌫" });
      } else if (isEnter) {
        this._onKeyClick({ value: "Enter" });
      } else if (event.key === 'ArrowLeft') {
        this._grid.selectPreviousField(field);
      } else if (event.key === 'ArrowRight') {
        this._grid.selectNextField(field);
      }
    });

    return keyboard;
  }

  _onKeyClick(key) {
    const isDelete = key.value === "⌫";
    const isEnter = key.value === "Enter";

    if (isEnter) {
      return onSubmit();
    }

    this._grid.selectedFields.forEach((field) => {
      if (isDelete) {
        field.element.innerText = "";
      } else {
        field.element.innerText = key.value;
      }

      field.unselect();
    });

    const field = this.this._grid.lastSelectedField;

    if (isDelete) {
      this._grid.selectPreviousField(field);
    } else {
      this._grid.selectNextField(field);
    }
  }
}

export { Keyboard };
