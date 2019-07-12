import Html from './utils/Html/Html'

// get context of thing to add html to
const app = Html('#app').getElement()

// build header element to add
const header = Html('header').getElement()
header.classList.add('page-header')

// build h1 element to add
const h1 = document.createElement('h1')
h1.classList.add('page-header__title')
h1.textContent = "Hello World"

// add 'h1' to 'header'
header.append(h1)

// add 'header' to app 'div'
app.append(header)