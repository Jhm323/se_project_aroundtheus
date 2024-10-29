import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._captionElement = this._popupElement.querySelector(
      ".modal__title-preview"
    );
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.title;
    this._captionElement.textcontent = data.title;
    super.open();
  }
}
