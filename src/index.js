import Dom from "./js/utils/dom";

const listItems = ["Donny", "Alan", "Lacey", "Kendra"]
  .map(item => Dom.createHtmlElement("li", { class: "name-list__item" }, item))
  .join("");
const list = Dom.createHtmlElement("ul", { class: "name-list" }, listItems);
const title = Dom.createHtmlElement("h1", { class: "title" }, "Names");

const listContent = title + list;

Dom.render(
  document.querySelector("#app"),
  Dom.createHtmlElement("div", { class: "container" }, listContent)
);
