class GridField {
  _element = null;

  constructor(params) {
    this._key = params.key;
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  get previousElement() {
    return this._element.previousElementSibling;
  }

  get nextElement() {
    return this._element.nextElementSibling;
  }

  get isSelected() {
    return this._element.classList.contains("selected")
  }

  get key() {
    return Number(this._element.getAttribute("key"));
  }

  _create(params) {
    const field = document.createElement("div");
    const [parentClass] = params.parent.classList;

    field.classList.add(parentClass + "_field");
    field.setAttribute("key", params.key);
    field.addEventListener("click", () => params.onClick(this));

    return field;
  }

  paint(color) {
    this._element.classList.add(color);
  }

  select() {
    this._element.classList.add("selected");
  }

  unselect() {
    this._element.classList.remove("selected");
  }

  toggle() {
    this._element.classList.toggle("selected");
  }

  disable() {
    this._element.classList.add("disable");
  }
}

class Grid {
  _rows = 0;
  _columns = 0;
  _currentRow = 0;
  _element = null;
  _fields = [];

  constructor(params) {
    this.rows = params.rows;
    this.columns = params.columns;

    this._element = this._createGrid({
      parent: params.parent,
      columns: params.columns,
      rows: params.rows,
    });
  }

  get element() {
    return this._element;
  }

  get fields() {
    return this._fields;
  }

  get selectedFields() {
    return this._fields.filter(field => field.isSelected);
  }

  get lastSelectedField() {
    return this.selectedFields[this.selectedFields.length - 1];
  }

  get currentRowFields() {

  }

  get hasSelectedField() {
    return this._fields.some(field => field.isSelected);
  }

  _createGrid(params) {
    const grid = document.createElement("div");

    grid.classList.add(params.parent.classList[0] + "_grid");
    grid.style.gridTemplateColumns = `repeat(${params.columns}, 1fr)`;

    for (let i = 0; i < params.rows * params.columns; i++) {
      const field = new GridField({
        parent: grid,
        key: i,
        onClick: this.onFieldSelect.bind(this),
      });

      this._fields.push(field);
      grid.appendChild(field.element);
    }

    return grid;
  }

  unselectAllFields() {
    this._fields.forEach(field => {
      field.unselect();
    });
  }

  unselectOthersFields(except) {
    this._fields.forEach(field => {
      if (field !== except) {
        field.unselect();
      }
    });
  }

  selectInitialField() {
    const field = this._fields.find(f => f.element.innerText === "");
    field.select();
  }

  selectPreviousField(field) {
    const previous = this._fields[field.key - 1];

    if (
      previous.key % this._columns !== this._columns - 1
    ) {
      this.unselectOthersFields(previous);
      previous.select();
    }
  }

  selectNextField(field) {
    const next = this._fields[field.key + 1];

    if (next.key % this._columns !== 0) {
      this.unselectOthersFields(next);
      next.select();
    }
  }

  onFieldSelect(field) {
    field.select();

    if (!window.event.shiftKey) {
      this.unselectOthersFields(field);
    }
  }

  nextLine() {
    this._currentRow++;

    const initialIndex = this._currentRow * this._columns;
    const finalIndex = initialIndex + this._columns;

    if (finalIndex > fields.length) return;

    for (let i = initialIndex; i < finalIndex; i++) {
      this._fields[i].element.disable();
    }

    this.selectInitialField();
  }

  paintLine(colors) {
    const initialIndex = this._currentRow * this._columns;
    const finalIndex = initialIndex + this._columns;

    for (let i = initialIndex; i < finalIndex; i++) {
      this._fields[i].paint(colors[i - initialIndex]);
    }
  }
}

export { Grid };
