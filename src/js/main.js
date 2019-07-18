import Html from "./utils/Html/Html";
import Api from "./utils/Api/Api";

export default function main() {
  // get context of thing to add html to
  const app = getAppContext();
  const wrapperDiv = getWrapperDiv();
  const mainHeader = renderMainHeader();

  wrapperDiv.addChild(mainHeader);
  app.addChild(wrapperDiv);

  // This will be replaced by a proper API call
  // Api().getRequest("https://swapi.co/api/people/22", bobaFettData => {
  //   // console.log(bobaFettData);
  //   app.addChild(
  //     Html("p")
  //       .text(bobaFettData.birth_year)
  //       .addClass("birthYearComponent")
  //   );
  // });
}

function renderMainHeader() {
  const mainHeader = Html("header").addClass("main-header");
  const mainHeaderTitle = Html("h1")
    .addClass("main-header__title")
    .text("Users and Books!");
  const nav = renderMainNav();
  mainHeader.addChild(mainHeaderTitle);
  mainHeader.addChild(nav);
  return mainHeader;
}

function renderMainNav() {
  const nav = Html("nav").addClass("nav");
  const navList = Html("ul").addClass("nav__list");
  const navListItemOne = Html("li")
    .addClass("nav__list-item")
    .addChild(
      Html("a")
        .addAttribute("href", "users.html")
        .text("Users")
    );
  const navListItemTwo = Html("li")
    .addClass("nav__list-item")
    .addChild(
      Html("a")
        .addAttribute("href", "books.html")
        .text("Books")
    );
  navList.addChild(navListItemOne);
  navList.addChild(navListItemTwo);
  nav.addChild(navList);
  return nav;
}

function getWrapperDiv() {
  return Html()
    .create("div")
    .addClass("wrapper");
}

function getAppContext() {
  return Html("#app");
}
