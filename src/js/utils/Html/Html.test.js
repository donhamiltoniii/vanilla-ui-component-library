import Html from './Html.js'

describe('Html', () => {
  let html

  beforeEach(() => {
    html = new Html()
  })

  describe('selectExisting', () => {

    let appDiv

    beforeEach(() => {
      appDiv = document.createElement('div')
      appDiv.id = 'app'
      document.body.append(appDiv)
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('returns an object', () => {
      expect(typeof html.selectExisting('#app')).toBe('object')
    })

    test('throws error when improper parameter is passed', () => {
      expect(() => html.selectExisting(123)).toThrow('Method only accepts type string')
    })

    test('returns requested object', () => {
      expect(html.selectExisting('#app')).toStrictEqual(appDiv)
    })

    test(`throws error when element doesn't exist`, () => {
      expect(() => html.selectExisting('video')).toThrow(`Requested Element doesn't exist`)
    })
  })

  describe('create', () => {

    test('returns an object', () => {
      expect(typeof html.create('div')).toBe('object')
    })

    test('throws error when improper parameter is passed', () => {
      expect(() => html.create(123)).toThrow('Method only accepts type string')
    })

    test('creates requested object', () => {
      const underTest = html.create('div')
      document.body.append(underTest)

      const actual = html.selectExisting('div')

      expect(actual).toStrictEqual(underTest)
    })

    test(`throws error when element doesn't exist`, () => {
      expect(() => html.create('banana')).toThrow(`Must provide valid html element`)
    })
  })

})