import { loadLevel } from './main.js';
import { Component } from './component.js';
import { Grid } from './grid.js';

class ListItem extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  get key() {
    return Number(this._element.getAttribute('key'));
  }

  get value() {
    return this._element.getAttribute('value');
  }

  get isSelected() {
    return this._element.classList.contains('selected');
  }

  _create(params) {
    const item = super._createElement({
      tag: 'li',
      name: 'item',
      parent: params.parent,
      innerText: params.label,
      attributes: { key: params.key, value: params.value },
      events: { click: () => params.onClick(this) },
    });

    return item;
  }

  select() {
    this._element.classList.add('selected');
  }

  unselect() {
    this._element.classList.remove('selected');
  }
}

class List extends Component {
  _element = null;
  _parentOnSelect = null;
  _items = [];

  constructor(params) {
    super(params);
    this._parentOnSelect = params.onSelect;
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  _create(params) {
    const list = super._createElement({
      tag: 'ul',
      name: 'options',
      parent: params.parent,
    });

    for (let i = 0; i < params.elements.length; i++) {
      const item = new ListItem({
        parent: list,
        key: i,
        label: params.elements[i].label,
        value: params.elements[i].value,
        onClick: this._onSelect.bind(this),
      });

      list.appendChild(item.element);
      this._items.push(item);
    }

    return list;
  }

  _unselectOthersModes(except) {
    this._items.forEach((item) => {
      if (item !== except) {
        item.unselect();
      }
    });
  }

  _onSelect(mode) {
    mode.select();
    this._unselectOthersModes(mode);

    if (this._parentOnSelect) {
      this._parentOnSelect(mode.value);
    }
  }
}

class Menu extends Component {
  _element = null;
  _mode = null;
  _wordLength = null;

  constructor(params) {
    super(params);
    this._mode = params.mode;
    this._wordLength = params.wordLength;
    this._element = this._create(params);
    this.hidden = params.hidden;
  }

  get element() {
    return this._element;
  }

  get hidden() {
    return this._element.classList.contains('hidden');
  }

  set hidden(value) {
    value ? this._element.classList.add('hidden') : this._element.classList.remove('hidden');
  }

  _create(params) {
    const menu = super._createElement({
      tag: 'div',
      name: 'menu',
      parent: params.parent,
      events: { click: () => this.toggle() },
    });

    const container = super._createElement({
      tag: 'div',
      name: 'container',
      parent: menu,
      events: { click: (event) => event.stopPropagation() },
    });

    const modes = new List({
      parent: container,
      elements: [
        { label: 'Uma palavra', value: 'Easy' },
        { label: 'Duas palavras', value: 'Normal' },
        { label: 'Quatro palavras', value: 'Hard' },
      ],
      onSelect: this._onModeSelect.bind(this),
    });

    const wordSizeGrid = new Grid({
      parent: container,
      rows: 1,
      columns: 5,
      onSelect: this._onWordSizeSelect.bind(this),
    });

    wordSizeGrid.replaceLine([4, 5, 6, 7, 8]);

    container.append(modes.element, wordSizeGrid.element);
    menu.appendChild(container);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.toggle();
      }
    });

    return menu;
  }

  toggle() {
    this._element.classList.toggle('hidden');
  }

  _onModeSelect(mode) {
    this._mode = mode;
    this.toggle();
    loadLevel(this._mode, this._wordLength);
  }

  _onWordSizeSelect(size) {
    this._wordLength = Number(size);
    this.toggle();
    loadLevel(this._mode, this._wordLength);
  }
}

export { Menu };
