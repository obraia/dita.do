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
    }
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
  const fields = document.getElementsByClassName("main_grid_field");

  const initialIndex = data.currentRow * data.columns;
  const finalIndex = initialIndex + data.columns;

  if (finalIndex > fields.length) return;

  for (let i = initialIndex; i < finalIndex; i++) {
    fields[i].classList.remove("disabled");
  }

  data.currentRow++;
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
  for (let i = 0; i < params.rows * params.columns; i++) {
    const field = createField(i);
    params.grid.appendChild(field);
  }

  return grid;
}

export { loadGrid, nextLine };
