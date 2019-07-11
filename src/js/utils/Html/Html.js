export default class {

  create(elementString) {
    if (typeof elementString !== 'string') throw new Error('Method only accepts type string')

    const created = document.createElement(elementString)
    if (created instanceof HTMLUnknownElement) throw new Error(`Must provide valid html element`)

    return created
  }

  _isPresentElement(element) {
    return element === null;
  }

  selectExisting(elementString) {
    if (typeof elementString !== 'string') throw new Error('Method only accepts type string')

    const element = document.querySelector(elementString);

    if (this._isPresentElement(element)) throw new Error(`Requested Element doesn't exist`)

    return element
  }

}