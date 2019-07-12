import Html from './utils/Html/Html'

// get context of thing to add html to
// const app = document.querySelector('#app')
const app = Html('#app').render() // replaces previous

// build header element to add
// const header = document.createElement('header')
// header.classList.add('page-header')
const header = Html('header').addClass('page-header').render() // replaces previous

// build h1 element to add
// h1.textContent = "Hello World"
const h1 = Html('h1').addClass('page-header__title').text('Hello World').render()

// add 'h1' to 'header'
header.append(h1)

// add 'header' to app 'div'
app.append(header)