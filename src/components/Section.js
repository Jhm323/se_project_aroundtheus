export default class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = document.querySelector(selector);
  }

  renderItems() {
    this._items.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(item) {
    this._selector.prepend(item);
  }
}
