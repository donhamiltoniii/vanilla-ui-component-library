import Html from "../Html/Html";
import Api from "../Api/Api";

export default () => new Components()

class Components {
    getAppContext() {
        return Html("#app");
    }

    getWrapperDiv() {
        return Html()
            .create("div")
            .addClass("wrapper");
    }

    renderContentBlock() {
        const contentBlock = Html('section').addClass('content-block');
        const contentBlockTitle = Html('h3').addClass('content-block__title').text('Books');
        const contentBlockList = Html().create('ul').addClass('content-block__list');
        // This is how you dynamically render!!! YAY!!
        Api().getRequest('http://localhost:8080/api/books', (books) => {
            books.forEach((book) => {
                const contentBlockListItem = Html()
                    .create('li')
                    .addClass('content-block__list-item')
                    .addChild(Html()
                        .create('a')
                        .addAttribute('href', `/books/${book.id}`)
                        .text(book.title));
                contentBlockList.addChild(contentBlockListItem);
            });
        });
        contentBlock.addChild(contentBlockTitle);
        contentBlock.addChild(contentBlockList);
        return contentBlock;
    }

    renderMainContent() {
        const mainContent = Html('main').addClass('main-content');
        const containerDiv = Html().create('div').addClass('container');
        const contentBlock = this.renderContentBlock();
        containerDiv.addChild(contentBlock);
        mainContent.addChild(containerDiv);
        return mainContent;
    }

    renderMainFooter() {
        const mainFooter = Html('footer').addClass('main-footer');
        const mainFooterCopy = Html('small').addClass('main-footer__copy').html('&copy; 2019 ABC\'s');
        mainFooter.addChild(mainFooterCopy);
        return mainFooter;
    }

    renderMainHeader() {
        const mainHeader = Html("header").addClass("main-header");
        const mainHeaderTitle = Html("h1")
            .addClass("main-header__title")
            .text("ABC's");
        const nav = this.renderMainNav();
        mainHeader.addChild(mainHeaderTitle);
        mainHeader.addChild(nav);
        return mainHeader;
    }

    renderMainNav() {
        const nav = Html("nav").addClass("nav");
        const navList = Html("ul").addClass("nav__list");
        const navListItemOne = Html("li")
            .addClass("nav__list-item")
            .addChild(
                Html("a")
                    .addAttribute("href", "")
                    .text("Authors")
                    .click((event) => {
                        event.preventDefault()
                        this.renderPageAuthors()
                    })
            );
        const navListItemTwo = Html("li")
            .addClass("nav__list-item")
            .addChild(
                Html("a")
                    .addAttribute("href", "books.html")
                    .text("Books")
            );
        const navListItemThree = Html("li")
            .addClass("nav__list-item")
            .addChild(
                Html("a")
                    .addAttribute("href", "books.html")
                    .text("Campuses")
            );
        navList.addChild(navListItemOne);
        navList.addChild(navListItemTwo);
        navList.addChild(navListItemThree);
        nav.addChild(navList);
        return nav;
    }

    renderPageAuthors() {
        const app = this.getAppContext();
        // const wrapperDiv = this.getWrapperDiv();
        // // const mainHeader = this.renderMainHeader();
        // const mainContent = this.renderMainContent();
        // const mainFooter = this.renderMainFooter();
        // // wrapperDiv.addChild(mainHeader);
        // wrapperDiv.addChild(mainContent);
        // wrapperDiv.addChild(mainFooter);
        app.html('<h1>It work!</h1>');
    }

    renderPageHome() {
        const app = this.getAppContext();
        const wrapperDiv = this.getWrapperDiv();
        const mainHeader = this.renderMainHeader();
        const mainContent = this.renderMainContent();
        const mainFooter = this.renderMainFooter();
        wrapperDiv.addChild(mainHeader);
        wrapperDiv.addChild(mainContent);
        wrapperDiv.addChild(mainFooter);
        app.addChild(wrapperDiv);
    }

}