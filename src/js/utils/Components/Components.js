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
                        .text(name));
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

    renderPageAuthors() {
        const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
        currentMainContentContainer.replace(this.renderContentBlock('authors'))
    }

    renderPageBooks() {
        const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
        currentMainContentContainer.replace(this.renderContentBlock('books'))
    }

    renderPageCampuses() {
        const currentMainContentContainer = this.getWrapperDiv().select('.main-content').select('.container')
        currentMainContentContainer.replace(this.renderContentBlock('campuses'))
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