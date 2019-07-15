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
        expect(Html('div').render()).toStrictEqual(elementToSelect)
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
        expect(Html('div').render()).toContain(divOne)
        expect(Html('div').render()).toContain(divTwo)
      })

    })

    describe('should return a new instance of an element when none exists', () => {
      test('makes new element', () => {
        expect(Html('div').render() instanceof HTMLDivElement).toBeTruthy()
      })

      test('throw error when trying to make a new element if given a class or id', () => {
        expect(() => Html('.thing')).toThrow('Element must be a valid HTML tag')
        expect(() => Html('#thing')).toThrow('Element must be a valid HTML tag')
      })
    })

  })

  describe('addClass', () => {
    test('Throws an error when class already exists', () => {
      const underTest = Html('div')
      underTest.render().classList.add('test')

      expect(() => { underTest.addClass('test') }).toThrow('Class already exists on element.')
    })

    test('should add a class to an element', () => {
      const underTest = Html('div')
      underTest.addClass('test')

      expect(underTest.render().classList.contains('test')).toBeTruthy()
    })
  })

  describe('text', () => {
    test('Return current value', () => {
      const underTest = Html('div')
      underTest.render().textContent = 'test content'

      expect(underTest.text()).toBe('test content')
    })

    test('Sets value when given a parameter', () => {
      const underTest = Html('div')
      underTest.text('test content')

      expect(underTest.text()).toBe('test content')
    })
  })

  describe('addChild', () => {
    test('Throws error if given an improper HTML element', () => {
      const underTest = Html('div')
      const elementToAdd = Html('Donny')
      console.log(elementToAdd)

      expect(() => underTest.addChild(elementToAdd)).toThrow('Invalid HTML tag')
    })

    test('Adds valid HTML element', () => {
      const underTest = Html('div')
      const elementToAdd = Html('span')
      underTest.addChild(elementToAdd)

      expect(underTest.render().querySelector('span')).toStrictEqual(elementToAdd.render())
    })

  })

})