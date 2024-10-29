export default class Section {
  constructor({ items, renderer }, selector) {
    // selector is for the container
    // items is the initial cards array
    // renderer needs to be a function that adds a
    // completed card to the DOM (try using createCard function)
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    // iterate through items
    //   call renderer(item) on each item
    this._items.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(item) {
    // add item to the DOM
    this._selector.prepend(item);
  }
}
