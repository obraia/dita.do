function onKeyClick(text) {
  let nextField = null;
  let previousField = null;

  const isDelete = text === "⌫";
  const isEnter = text === "Enter";

  if (isEnter) {
    return onSubmit();
  }

  data.selectedFields.forEach(function (field) {
    if (isDelete) {
      field.innerText = "";
      previousField = field.previousSibling;
    } else {
      field.innerText = text;
      nextField = field.nextSibling;
    }

    field.classList.toggle("selected");
  });

  data.selectedFields.splice(0, data.selectedFields.length);

  if (nextField && nextField.getAttribute("key") % data.columns !== 0) {
    nextField.classList.add("selected");
    data.selectedFields.push(nextField);
  }

  if (previousField && previousField.getAttribute("key")) {
    previousField.classList.add("selected");
    data.selectedFields.push(previousField);
  }
}

function createKey(text) {
  const key = document.createElement("div");

  key.innerText = text;
  key.classList.add("main_keyboard_row_key");
  key.addEventListener("click", () => onKeyClick(text));

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
}

export { loadKeyboard };
