import Html from "./utils/Html/Html";
import Api from "./utils/Api/Api";

{
  /* <header class="main-header">
        <h1 class="main-header__title">Users and Books!</h1>
        <nav class="nav">
          <ul class="nav__list">
            <li class="nav__list-item"><a href="users.html">Users</a></li>
            <li class="nav__list-item"><a href="books.html">Books</a></li>
          </ul>
        </nav>
      </header> */
}

export default function main() {
  // get context of thing to add html to
  const app = getAppContext();
  const wrapperDiv = getWrapperDiv();
  const mainHeader = renderMainHeaderAndContents();

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

function renderMainHeaderAndContents() {
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
  return Html("body")
    .create("div")
    .addClass("wrapper");
}

function getAppContext() {
  return Html("#app");
}
