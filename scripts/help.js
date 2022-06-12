import { Component } from './component.js';
import { Grid } from './grid.js';

class HelpIntructions extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  _create(params) {
    const list = super._createElement({
      tag: 'ol',
      name: 'instructions',
      parent: params.parent,
    });

    const instructions = [
      'Use o teclado para inserir as letras.',
      "Pressione a tecla 'Backspace' para apagar as letras.",
      "Pressione as teclas 'Shift' para selecionar mais que um campo.",
      'Presione as teclas de seta para selecionar o campo anterior ou próximo.',
      "Pressione a tecla 'Enter' para enviar a palavra.",
    ];

    for (const instruction of instructions) {
      const item = super._createElement({
        tag: 'li',
        name: 'item',
        parent: list,
        innerText: instruction,
      });

      list.appendChild(item);
    }

    return list;
  }
}

class HelpLegend extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
  }

  get element() {
    return this._element;
  }

  _create(params) {
    const list = super._createElement({
      tag: 'ul',
      name: 'legend',
      parent: params.parent,
    });

    const legends = [
      'Verde - A letra está na posição correta.',
      'Amarelo - A letra está na posição errada.',
      'Preto - A letra não existe na palavra.',
    ];

    for (const legend of legends) {
      const item = super._createElement({
        tag: 'li',
        name: 'item',
        parent: list,
        innerText: legend,
      });

      list.appendChild(item);
    }

    return list;
  }
}

class Help extends Component {
  _element = null;

  constructor(params) {
    super(params);

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
    const help = super._createElement({
      tag: 'div',
      name: 'help',
      parent: params.parent,
      events: { click: () => this.toggle() },
    });

    const helpInfo = super._createElement({
      tag: 'div',
      name: 'info',
      parent: help,
      events: { click: (event) => event.stopPropagation() },
    });

    const grid = new Grid({
      parent: helpInfo,
      rows: 1,
      columns: 3,
    });

    grid.paintLine(['green', 'yellow', 'black']);

    const legend = new HelpLegend({
      parent: helpInfo,
    });

    const instructions = new HelpIntructions({
      parent: helpInfo,
    });

    helpInfo.append(grid.element, legend.element, instructions.element);
    help.appendChild(helpInfo);

    return help;
  }

  toggle() {
    this._element.classList.toggle('hidden');
  }
}

export { Help };
