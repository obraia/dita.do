import { Component } from './component.js';

class Results extends Component {
  _element = null;

  constructor(params) {
    super(params);
    this._element = this._create(params);
    this.hidden = params.hidden;

    this.setResult({
      word: 'Denegrir',
      score: '100',
      time: '3.5 min',
      isWinner: true,
    });
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
    const results = super._createElement({
      tag: 'div',
      name: 'results',
      parent: params.parent,
      events: { click: () => this.toggle() },
    });

    const container = super._createElement({
      tag: 'div',
      name: 'container',
      parent: results,
      events: { click: (event) => event.stopPropagation() },
    });

    const title = super._createElement({
      tag: 'h1',
      name: 'title',
      parent: container,
      innerText: 'Resultado',
    });

    container.appendChild(title);
    results.appendChild(container);

    return results;
  }

  toggle() {
    this._element.classList.toggle('hidden');
  }

  setResult(params) {
    const result = super._createElement({
      tag: 'div',
      name: 'result',
      parent: this._element.firstElementChild,
      classes: params.isWinner ? ['winner'] : ['loser'],
      innerText: params.isWinner ? 'Você venceu :)' : 'Você perdeu :(',
    });

    const word = super._createElement({
      tag: 'div',
      name: 'word',
      parent: this._element.firstElementChild,
      innerText: 'A palavra era: ' + params.word,
    });

    const score = super._createElement({
      tag: 'div',
      name: 'score',
      parent: this._element.firstElementChild,
      innerText: 'Sua pontuação foi: ' + params.score,
    });

    const time = super._createElement({
      tag: 'div',
      name: 'time',
      parent: this._element.firstElementChild,
      innerText: 'O tempo total foi: ' + params.time,
    });

    const playAgain = super._createElement({
      tag: 'button',
      name: 'again',
      parent: this._element.firstElementChild,
      innerText: 'Jogar novamente',
      events: { click: () => window.location.reload() },
    });

    this._element.firstElementChild.append(result, word, score, time, playAgain);
  }
}

export { Results };
