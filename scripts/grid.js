function unselectAll() {
  const fields = document.getElementsByClassName("main_grid_field");

  for (let i = 0; i < fields.length; i++) {
    fields[i].classList.remove("selected");
  }
}

function unselectOthers(except) {
  const fields = document.getElementsByClassName("main_grid_field");

  for (let i = 0; i < fields.length; i++) {
    if (fields[i] !== except) {
      fields[i].classList.remove("selected");

      const fieldIndex = data.selectedFields.indexOf(fields[i]);

      if (fieldIndex !== -1) {
        data.selectedFields.splice(fieldIndex, 1);
      }
    }
  }
}

function selectInitialFieldOfCurrentRow() {
  const fields = document.getElementsByClassName("main_grid_field");
  const initialIndex = data.currentRow * data.columns;
  const finalIndex = initialIndex + data.columns;
  let index = finalIndex - 1;

  for (let i = initialIndex; i < finalIndex; i++) {
    if (fields[i].innerText === "") {
      index = i;
      break;
    }
  }

  fields[index].classList.add("selected");
  data.selectedFields.push(fields[index]);
}

function moveSelectionLeft(field) {
  const previousField = field.previousElementSibling;

  if (
    previousField &&
    previousField.getAttribute("key") % data.columns !== data.columns - 1
  ) {
    unselectOthers(previousField);
    previousField.classList.add("selected");
    data.selectedFields.push(previousField);
  }
}

function moveSelectionRight(field) {
  const nextField = field.nextElementSibling;

  if (nextField && nextField.getAttribute("key") % data.columns !== 0) {
    unselectOthers(nextField);
    nextField.classList.add("selected");
    data.selectedFields.push(nextField);
  }
}

function moveSelection(key) {
  if (data.selectedFields.length === 0) return;

  const selectedField = data.selectedFields[data.selectedFields.length - 1];

  if (key === "ArrowLeft") {
    moveSelectionLeft(selectedField);
  } else if (key === "ArrowRight") {
    moveSelectionRight(selectedField);
  }
}

function onFieldSelect(field) {
  field.classList.toggle("selected");

  if (field.classList.contains("selected")) {
    if (window.event.shiftKey) {
      data.selectedFields.push(field);
    } else {
      data.selectedFields = [field];
      unselectOthers(field);
    }
  } else {
    data.selectedFields.splice(data.selectedFields.indexOf(field), 1);
  }
}

function nextLine() {
  data.currentRow++;

  const fields = document.getElementsByClassName("main_grid_field");

  const initialIndex = data.currentRow * data.columns;
  const finalIndex = initialIndex + data.columns;

  if (finalIndex > fields.length) return;

  for (let i = initialIndex; i < finalIndex; i++) {
    fields[i].classList.remove("disabled");
  }

  selectInitialFieldOfCurrentRow();
}

function paintLine(colors) {
  const fields = document.getElementsByClassName("main_grid_field");

  const initialIndex = data.currentRow * data.columns;
  const finalIndex = initialIndex + data.columns;

  for (let i = initialIndex; i < finalIndex; i++) {
    fields[i].classList.add(colors[i - initialIndex]);
  }
}

function createField(id) {
  const field = document.createElement("div");

  field.classList.add("main_grid_field");
  field.setAttribute("key", id);
  field.addEventListener("click", () => onFieldSelect(field));

  if (id > (data.currentRow + 1) * data.columns - 1) {
    field.classList.add("disabled");
  }

  return field;
}

function loadGrid(params) {
  params.grid.style.gridTemplateColumns = `repeat(${params.columns}, 1fr)`;

  for (let i = 0; i < params.rows * params.columns; i++) {
    const field = createField(i);
    params.grid.appendChild(field);
  }

  return grid;
}

export {
  loadGrid,
  paintLine,
  nextLine,
  moveSelection,
  moveSelectionRight,
  moveSelectionLeft,
  selectInitialFieldOfCurrentRow,
  unselectAll,
};
