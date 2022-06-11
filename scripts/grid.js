class Field {
  _element = null;

  constructor(params) {
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
    return this._element.classList.contains('selected');
  }

  get isDisabled() {
    return this._element.classList.contains('disabled');
  }

  get key() {
    return Number(this._element.getAttribute('key'));
  }

  get value() {
    return this._element.innerText;
  }

  set value(text) {
    this._element.innerText = text;
  }

  _create(params) {
    const field = document.createElement('div');
    const [parentClass] = params.parent.classList;

    field.classList.add(parentClass + '_field');
    field.setAttribute('key', params.key);
    field.addEventListener('click', () => params.onClick(this));

    return field;
  }

  paint(color) {
    this._element.classList.add(color);
  }

  select() {
    this._element.classList.add('selected');
  }

  unselect() {
    this._element.classList.remove('selected');
  }

  toggle() {
    this._element.classList.toggle('selected');
  }

  disable() {
    this._element.classList.add('disabled');
  }

  enable() {
    this._element.classList.remove('disabled');
  }
}

class Grid {
  _rows = 0;
  _columns = 0;
  _currentRow = 0;
  _element = null;
  _fields = [];
  _onSubmit = null;

  constructor(params) {
    this._rows = params.rows;
    this._columns = params.columns;
    this._onSubmit = params.onSubmit;

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
    return this._fields.filter((field) => field.isSelected);
  }

  get lastSelectedField() {
    return this.selectedFields[this.selectedFields.length - 1];
  }

  get currentRowFields() {
    const fields = [];
    const initialIndex = this._currentRow * this._columns;
    const finalIndex = initialIndex + this._columns;

    for (let i = initialIndex; i < finalIndex; i++) {
      fields.push(this._fields[i]);
    }

    return fields;
  }

  get currentWord() {
    return this.currentRowFields.map((field) => field.value).join('');
  }

  get hasSelectedField() {
    return this._fields.some((field) => field.isSelected);
  }

  _createGrid(params) {
    const grid = document.createElement('div');

    grid.classList.add(params.parent.classList[0] + '_grid');
    grid.style.gridTemplateColumns = `repeat(${params.columns}, 1fr)`;

    for (let i = 0; i < params.rows * params.columns; i++) {
      const field = new Field({
        parent: grid,
        key: i,
        onClick: this.onFieldSelect.bind(this),
      });

      if (i > params.columns - 1) field.disable();

      this._fields.push(field);
      grid.appendChild(field.element);
    }

    return grid;
  }

  handleSubmit() {
    if (!this._onSubmit) return;
    if (this.currentWord.length !== this._columns) return;

    const { colors } = this._onSubmit(this.currentWord);

    this.paintLine(colors);

    if (this._currentRow < this._rows - 1) {
      this.nextLine();
      this.selectInitialField();
    }
  }

  unselectAllFields() {
    this._fields.forEach((field) => {
      field.unselect();
    });
  }

  unselectOthersFields(except) {
    this._fields.forEach((field) => {
      if (field !== except) {
        field.unselect();
      }
    });
  }

  selectInitialField() {
    const field = this.currentRowFields.find((f) => !f.value && !f.isDisabled);

    if (field) {
      field.select();

      return field;
    }
  }

  selectPreviousField() {
    const current = this.lastSelectedField || this.selectInitialField();
    const previous = this._fields[current.key - 1];

    if (!previous) return;

    if (previous.key % this._columns !== this._columns - 1) {
      this.unselectOthersFields(previous);
      previous.select();
    }
  }

  selectNextField() {
    const current = this.lastSelectedField || this.selectInitialField();
    const next = this._fields[current.key + 1];

    if (!next) return;

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

  disableLine() {
    this.currentRowFields.forEach((field) => {
      field.unselect();
      field.disable();
    });
  }

  enableLine() {
    this.currentRowFields.forEach((field) => {
      field.enable();
    });
  }

  nextLine() {
    this.disableLine();
    this._currentRow++;
    this.enableLine();
  }

  paintLine(colors) {
    this.currentRowFields.forEach((field, index) => field.paint(colors[index]));
  }
}

export { Grid };
