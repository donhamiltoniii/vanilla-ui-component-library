import * as Dom from "./js/utils/dom";

Dom.render(
  document.querySelector("#app"),
  Dom.createHtmlElement(
    "h1",
    {
      class: "title title--light title--red"
    },
    "ComponentUI",
    {
      click: () => {
        const list = Dom.createHtmlElement("ul", {});
        Dom.render(
          list,
          [
            { tag: "li", attributes: {}, content: "list item 1" },
            { tag: "li", attributes: {}, content: "list item 2" },
            { tag: "li", attributes: {}, content: "list item 3" }
          ].map(({ tag, attributes, content }) =>
            Dom.createHtmlElement(tag, attributes, content)
          )
        );
        Dom.render(document.querySelector("#app"), list);
      }
    }
  )
);
