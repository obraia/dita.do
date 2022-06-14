import { Component } from './component.js';
import { onSubmit } from './main.js';

class Key extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  get value() {
    return this._element.innerText;
  }

  _create(params) {
    const key = super._createElement({
      tag: 'div',
      name: 'key',
      parent: params.parent,
      innerText: params.value,
      events: { click: () => params.onClick(this) },
    });

    if (params.value === '⌫') {
      key.classList.add('delete');
    }

    if (params.value === 'Enter') {
      key.classList.add('enter');
    }

    return key;
  }

  lock() {
    this._element.classList.add('locked');
  }

  unlock() {
    this._element.classList.remove('locked');
  }
}

class Keyboard extends Component {
  _element = null;
  _grids = null;
  _locked = false;
  _keys = [];

  static onKeyDown = null;

  constructor(params) {
    super(params);
    this._grids = params.grids;
    this._words = params.grids.length;
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  get keys() {
    return this._keys;
  }

  _create(params) {
    const keyboard = super._createElement({
      tag: 'div',
      name: 'keyboard',
      parent: params.parent,
    });

    const keys = [
      ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
      ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', '⌫'],
      ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'Enter'],
    ];

    for (let i = 0; i < keys.length; i++) {
      const row = super._createElement({
        tag: 'div',
        name: 'row',
        parent: keyboard,
      });

      for (let j = 0; j < keys[i].length; j++) {
        const key = new Key({
          parent: row,
          value: keys[i][j],
          onClick: () => this._grids.forEach((g) => this._onKeyClick.bind(this)(key, g)),
        });

        row.appendChild(key.element);
        this._keys.push(key);
      }

      keyboard.appendChild(row);
    }

    if (Keyboard.onKeyDown) {
      window.removeEventListener('keydown', Keyboard.onKeyDown);
    }

    Keyboard.onKeyDown = this._onKeyDown.bind(this);

    window.addEventListener('keydown', Keyboard.onKeyDown);

    return keyboard;
  }

  async _handleSubmit() {
    if (this._grids.length === 0) {
      return;
    }

    const { currentWord } = this._grids[0];

    if (!currentWord && !this._locked) {
      return;
    }

    this._lock();

    const results = await onSubmit({
      word: currentWord,
      words: this._words,
      keys: this._grids.map((g) => g.key),
    });

    for (let i = 0; i < results.length; i++) {
      this._grids[i].submit(results[i]);
    }

    this._removeFinishedGrids();

    this._unlock();
  }

  _onKeyDown({ key }) {
    const isLetter = Boolean(key.length === 1 && key.match(/[a-z]/i));

    if (isLetter) {
      return this._grids.forEach((g) => this._onKeyClick({ value: key }, g));
    }

    const comands = {
      Backspace: () => this._grids.forEach((g) => this._onKeyClick({ value: '⌫' }, g)),
      Delete: () => this._grids.forEach((g) => this._onKeyClick({ value: key }, g)),
      Enter: () => this._handleSubmit(),
      ArrowLeft: () => this._grids.forEach((g) => g.selectPreviousField()),
      ArrowRight: () => this._grids.forEach((g) => g.selectNextField()),
    };

    if (comands[key]) {
      comands[key]();
    }
  }

  _onKeyClick(key, grid) {
    const value = key.value.toUpperCase();
    const isBackspace = value === '⌫';
    const isDelete = value === 'DELETE';
    const isEnter = value === 'ENTER';
    let hadText = false;

    if (isEnter) {
      return this._handleSubmit();
    }

    if (!grid.hasSelectedField) {
      grid.selectInitialField();
    }

    grid.selectedFields.forEach((field) => {
      if (isBackspace || isDelete) {
        hadText = Boolean(field.value);
        field.value = '';
      } else {
        field.value = value;
      }
    });

    if (isBackspace) {
      if (!hadText) grid.selectPreviousField();
    } else {
      grid.selectNextField();
    }
  }

  _lock() {
    this._locked = true;
    this._keys.forEach((key) => key.lock());
  }

  _unlock() {
    this._locked = false;
    this._keys.forEach((key) => key.unlock());
  }

  _removeFinishedGrids() {
    this._grids = this._grids.filter((g) => !g.isFinished);
  }
}

export { Keyboard };
