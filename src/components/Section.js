export default class Section {
  constructor({ items, renderer }, container) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(items) {
    items.forEach((items) => {
      this._renderer(items);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
