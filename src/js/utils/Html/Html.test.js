import Html from './Html.js'

describe('Html', () => {

  describe('constructor', () => {

    describe('should return new instance if none exists', () => {
      test("should be an 'object'", () => {
        expect(typeof Html('div')).toBe('object')
      })
    })

    describe('select an element', () => {

      let elementToSelect

      beforeEach(() => {
        elementToSelect = document.createElement('div')
        document.body.append(elementToSelect)
      })

      afterEach(() => {
        document.body.innerHTML = ''
      })

      test('should contain instance of element', () => {
        expect(Html('div').getElement()).toStrictEqual(elementToSelect)
      })

      test('should return error when invalid parameter passed', () => {
        expect(() => Html(123)).toThrow('Argument must be a string')
      })

    })

    describe('select multiple elements when available', () => {

      let divOne
      let divTwo

      beforeEach(() => {
        divOne = document.createElement('div')
        divTwo = document.createElement('div')

        document.body.append(divOne)
        document.body.append(divTwo)
      })

      afterEach(() => {
        document.body.innerHTML = ''
      })

      test('returns array of elements', () => {
        expect(Html('div').getElement()).toContain(divOne)
        expect(Html('div').getElement()).toContain(divTwo)
      })

    })

    describe('should return a new instance of an element when none exists', () => {
      test('makes new element', () => {
        expect(Html('div').getElement() instanceof HTMLDivElement).toBeTruthy()
      })

      test('throw error when trying to make a new element if given a class or id', () => {
        expect(() => Html('.thing')).toThrow('Element must be a valid HTML tag')
        expect(() => Html('#thing')).toThrow('Element must be a valid HTML tag')
      })
    })

  })

})