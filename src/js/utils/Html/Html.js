export default function (query) {
  return new Html(query)
}

class Html {
  constructor(query) {
    if (typeof query !== 'string') throw new Error('Argument must be a string')

    const selection = document.querySelectorAll(query)

    if (selection.length === 0) {
      if (this.isClassQuery(query) || this.isIdQuery(query)) throw new Error('Element must be a valid HTML tag')
      this.element = document.createElement(query)
    } else if (selection.length === 1) {
      this.element = selection[0]
    } else {
      this.element = selection
    }
  }

  addClass(classToAdd) {
    this.element.classList.add(classToAdd)
    return this
  }

  isClassQuery(query) {
    return query.startsWith('.');
  }

  isIdQuery(query) {
    return query.startsWith('#');
  }

  render() {
    return this.element
  }

  text(message) {
    if (message === undefined) {
      return this.element.textContent
    }
    this.element.textContent = message
    return this
  }
}