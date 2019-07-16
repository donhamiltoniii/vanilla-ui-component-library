import Html from './utils/Html/Html'

export default class Main {
  main() {
    this.renderHeaderToAppContext()
  }

  renderHeaderToAppContext() {
    this.getAppContext()
      .addChild(this.renderHeader())
      .render()
  }

  renderHeader() {
    const header = Html('header').addClass('page-header')
    const h1 = Html('h1')
      .addClass('page-header__title')
      .text('Hello World')
      .render()
    header.addChild(h1)
    return header.render()
  }

  getAppContext() {
    return Html('#app')
  }
}
