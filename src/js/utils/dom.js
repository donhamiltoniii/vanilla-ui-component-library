export default {
  createHtmlElement(tag = "div", attributes = {}, content = "default") {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attribute =>
      element.setAttribute(attribute, attributes[attribute])
    );
    element.innerHTML = content;

    return element.outerHTML;
  },

  render(parentElement, childElement) {
    parentElement.innerHTML = "";
    parentElement.innerHTML = childElement;
  }
};
