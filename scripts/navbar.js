import { Component } from './component.js';

class Action extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  _create(params) {
    const action = super._createElement({
      tag: 'button',
      name: 'action',
      parent: params.parent,
      innerText: params.content,
      events: { click: params.onClick },
    });

    return action;
  }
}

class Navbar extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  _create(params) {
    const navbar = super._createElement({
      tag: 'nav',
      name: 'navbar',
      parent: params.parent,
    });

    for (const a of params.actions) {
      const action = new Action({
        parent: navbar,
        content: a.content,
        onClick: a.onClick,
      });

      navbar.appendChild(action.element);
    }

    return navbar;
  }
}

export { Navbar };
