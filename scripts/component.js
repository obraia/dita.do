class Component {
  _createElement(params) {
    const element = document.createElement(params.tag);

    if (params.name) {
      element.classList.add(this._getClass(params.parent, params.name));
      element.id = this._getId(params.parent, params.name);
    }

    if (params.classes) {
      element.classList.add(...params.classes);
    }

    if (params.style) {
      for (const key in params.style) {
        element.style[key] = params.style[key];
      }
    }

    if (params.attributes) {
      for (const key in params.attributes) {
        element.setAttribute(key, params.attributes[key]);
      }
    }

    if (params.events) {
      for (const key in params.events) {
        element.addEventListener(key, params.events[key]);
      }
    }

    if (params.children) {
      element.appendC(...children);
    }

    if (params.innerText) {
      element.innerText = params.innerText;
    }

    return element;
  }

  _getClass(parent, name) {
    return parent ? `${parent.classList[0]}_${name}` : name;
  }

  _getId(parent, name) {
    return parent && parent.id ? `${parent.id}_${name}` : name;
  }
}

export { Component };
