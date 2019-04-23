export const createHtmlElement = (
  tag = "div",
  attributes = {},
  content = "default",
  events = {}
) => {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach(attribute =>
    element.setAttribute(attribute, attributes[attribute])
  );
  Object.keys(events).forEach(event =>
    element.addEventListener(event, events[event])
  );
  element.innerHTML = content;

  return element;
};

export const render = (parentElement, childElement) => {
  parentElement.innerHTML = "";
  if (!(typeof childElement.forEach === "undefined")) {
    return childElement.forEach(child => parentElement.appendChild(child));
  }
  parentElement.appendChild(childElement);
};
