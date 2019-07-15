export default function (query) {
  return new Html(query)
}

class Html {
  constructor(query) {
    if (typeof query !== 'string') throw new Error('Argument must be a string')

    const selection = document.querySelectorAll(query)

    if (selection.length === 0) {
      if (this._isClassQuery(query) || this._isIdQuery(query)) throw new Error('Element must be a valid HTML tag')
      this.element = document.createElement(query)
    } else if (selection.length === 1) {
      this.element = selection[0]
    } else {
      this.element = selection
    }
  }

  addChild(elementToAdd) {
    if (elementToAdd.render() instanceof HTMLUnknownElement) {
      throw new Error('Invalid HTML tag')
    }

    this.element.append(elementToAdd.render())

    return this
  }

  addClass(classToAdd) {
    if (this.element.classList.contains(classToAdd)) {
      throw new Error('Class already exists on element.')
    }
    this.element.classList.add(classToAdd)
    return this
  }

  _isClassQuery(query) {
    return query.startsWith('.');
  }

  _isIdQuery(query) {
    return query.startsWith('#');
  }

  render() {
    return this.element
  }

  text(textToAdd) {
    if (textToAdd === undefined) {
      return this.element.textContent
    }
    this.element.textContent = textToAdd
    return this
  }
}