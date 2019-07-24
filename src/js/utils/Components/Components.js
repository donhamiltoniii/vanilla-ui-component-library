import Html from "../Html/Html";
import Api from "../Api/Api";

export default () => new Components()

class Components {
  getAppContext() {
    return Html().select("#app");
  }

  getWrapperDiv() {
    return Html()
      .create("div")
      .addClass("wrapper");
  }

  renderContentBlock(requestedData) {
    const contentBlock = Html().create('section').addClass('content-block');
    const contentBlockTitle = Html().create('h3').addClass('content-block__title').text(requestedData);
    const contentBlockList = Html().create('ul').addClass('content-block__list');
    // This is how you dynamically render!!! YAY!!
    Api().getRequest(`http://localhost:8080/api/${requestedData}`, (responseCollection) => {
      responseCollection.forEach((item) => {
        let name

        if (item.title) {
          name = item.title
        } else if (item.firstName) {
          name = `${item.firstName} ${item.lastName}`
        } else {
          name = item.location
        }

        const contentBlockListItem = Html()
          .create('li')
          .addClass('content-block__list-item')
          .addChild(Html()
            .create('a')
            .addAttribute('href', `/${requestedData}/${item.id}`)
            .text(name)
            .click((event) => {
              event.preventDefault()

              const endpoint = event.target.getAttribute('href')
              Api().getRequest(`http://localhost:8080/api${endpoint}`, (data) => {
                this.renderPageSingle(data, endpoint)
              })
            }));
        contentBlockList.addChild(contentBlockListItem);
      });
    });
    contentBlock.addChild(contentBlockTitle);
    contentBlock.addChild(contentBlockList);
    return contentBlock;
  }

  renderMainContent(requestedData) {
    const mainContent = Html().create('main').addClass('main-content');
    const containerDiv = Html().create('div').addClass('container');
    const contentBlock = this.renderContentBlock(requestedData);
    containerDiv.addChild(contentBlock);
    mainContent.addChild(containerDiv);
    return mainContent;
  }

  renderMainFooter() {
    const mainFooter = Html().create('footer').addClass('main-footer');
    const mainFooterCopy = Html().create('small').addClass('main-footer__copy').html('&copy; 2019 ABC\'s');
    mainFooter.addChild(mainFooterCopy);
    return mainFooter;
  }

  renderMainHeader() {
    const mainHeader = Html().create("header").addClass("main-header");
    const mainHeaderTitle = Html().create("h1")
      .addClass("main-header__title")
      .text("ABC's");
    const nav = this.renderMainNav();
    mainHeader.addChild(mainHeaderTitle);
    mainHeader.addChild(nav);
    return mainHeader;
  }

  renderMainNav() {
    const nav = Html().create("nav").addClass("nav");
    const navList = Html().create("ul").addClass("nav__list");
    const navListItemOne = Html().create("li")
      .addClass("nav__list-item")
      .addChild(
        Html().create("a")
          .addAttribute("href", "")
          .text("Authors")
          .click((event) => {
            event.preventDefault()
            this.renderPageAuthors()
          })
      );
    const navListItemTwo = Html().create("li")
      .addClass("nav__list-item")
      .addChild(
        Html().create("a")
          .addAttribute("href", "books.html")
          .text("Books")
          .click((event) => {
            event.preventDefault()
            this.renderPageBooks()
          })
      );
    const navListItemThree = Html().create("li")
      .addClass("nav__list-item")
      .addChild(
        Html().create("a")
          .addAttribute("href", "books.html")
          .text("Campuses")
          .click((event) => {
            event.preventDefault()
            this.renderPageCampuses()
          })
      );
    navList.addChild(navListItemOne);
    navList.addChild(navListItemTwo);
    navList.addChild(navListItemThree);
    nav.addChild(navList);
    return nav;
  }

  renderPageAuthor(data) {
    const currentMainContentContainerContentBlock = this.getWrapperDiv().select('.main-content').select('.container').select('.content-block');
    const authorName = Html().create('h3').addClass('content-block__title').text(data.firstName + ' ' + data.lastName);
    currentMainContentContainerContentBlock.replace(authorName);
  }

  renderPageAuthors() {
    const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
    currentMainContentContainer.replace(this.renderContentBlock('authors'))
  }

  renderPageBook(data) {
    const currentMainContentContainerContentBlock = this.getWrapperDiv().select('.main-content').select('.container').select('.content-block');
    const bookTitle = Html().create('h3').addClass('content-block__title').text(data.title);
    const bookAuthors = Html().create('ul').addClass('authors');
    data.authors.forEach(author => {
      const authorElement = Html()
        .create('li')
        .addChild(
          Html()
            .create('a')
            .addAttribute('href', `/authors/${author.id}`)
            .text(author.firstName + ' ' + author.lastName)
            .click((event) => {
              event.preventDefault()

              const endpoint = event.target.getAttribute('href')
              Api().getRequest(`http://localhost:8080/api${endpoint}`, (data) => {
                this.renderPageSingle(data, endpoint)
              })
            })
        );
      bookAuthors.addChild(authorElement);
    });
    const bookCampus = Html().create('h4').addChild(Html().create('a').addAttribute('href', `/campuses/${data.campus.id}`).text(data.campus.location).click((event) => {
      event.preventDefault()

      const endpoint = event.target.getAttribute('href')
      Api().getRequest(`http://localhost:8080/api${endpoint}`, (data) => {
        this.renderPageSingle(data, endpoint)
      })
    }));
    currentMainContentContainerContentBlock.replace(bookTitle);
    currentMainContentContainerContentBlock.addChild(bookAuthors);
    currentMainContentContainerContentBlock.addChild(bookCampus);
  }

  renderPageBooks() {
    const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
    currentMainContentContainer.replace(this.renderContentBlock('books'))
  }

  renderPageCampus(data) {
    const currentMainContentContainerContentBlock = this.getWrapperDiv().select('.main-content').select('.container').select('.content-block');
    const campusLocation = Html().create('h3').addClass('content-block__title').text(data.location);
    const campusAdd = Html().create('section').addClass('add-campus')
    const campusAddLocation = Html().create('input').addAttribute('type', 'text').addClass('add-campus__input')
    const campusAddButton = Html().create('button').addClass('add-campus__button').text('submit new campus').click((event) => {
      const newLocation = campusAddLocation.value

      Api.postRequest('http://localhost:8080/campuses', {
        location: newLocation
      }, (newCampus) => {
        console.log(newCampus)
      })
    })

    campusAdd.addChild(campusAddLocation).addChild(campusAddButton)
    currentMainContentContainerContentBlock.replace(campusLocation);
    currentMainContentContainerContentBlock.addChild(campusAdd)
  }

  renderPageCampuses() {
    const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
    const campusAdd = Html().create('section').addClass('add-campus')
    const campusAddLocation = Html().create('input').addAttribute('type', 'text').addClass('add-campus__input')
    const campusAddButton = Html().create('button').addClass('add-campus__button').text('submit new campus')

    campusAdd.addChild(campusAddLocation)
    campusAdd.addChild(campusAddButton)
    campusAddButton.click((event) => {
      const newLocation = campusAddLocation.render().value

      Api().postRequest('http://localhost:8080/api/campuses', {
        location: newLocation
      }, (campuses) => {
        this.renderPageCampuses()
      })
    })
    currentMainContentContainer.replace(this.renderContentBlock('campuses'))
    currentMainContentContainer.addChild(campusAdd)
  }

  renderPageSingle(data, endpoint) {
    console.log(endpoint)
    const typeOfObject = endpoint.split('/')[1]
    console.log(typeOfObject)
    if (typeOfObject === 'authors') {
      this.renderPageAuthor(data);
    }
    if (typeOfObject === 'books') {
      this.renderPageBook(data);
    }
    if (typeOfObject === 'campuses') {
      this.renderPageCampus(data);
    }
  }

  renderPageHome() {
    const app = this.getAppContext();
    const wrapperDiv = this.getWrapperDiv();
    const mainHeader = this.renderMainHeader();
    const mainContent = this.renderMainContent('books');
    const mainFooter = this.renderMainFooter();
    wrapperDiv.addChild(mainHeader);
    wrapperDiv.addChild(mainContent);
    wrapperDiv.addChild(mainFooter);
    app.replace(wrapperDiv);
  }

}