import Html from './utils/Html/Html'

export default function main() {
    // get context of thing to add html to
    const app = Html('#app')

    // build header element to add
    const header = Html('header')
        .addClass('page-header')

    // build h1 element to add
    const h1 = Html('h1')
        .addClass('page-header__title')
        .text("Hello World")

    // add 'h1' to 'header'
    header.addChild(h1)

    // add 'header' to app 'div'
    app.addChild(header)
}