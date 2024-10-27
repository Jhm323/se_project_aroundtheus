import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._captionElement = this._popupElement.querySelector(
      ".modal-title-preview"
    );
  }

  open(data) {
    this._imageElement.src = data.link;
    this._imageElement.alt = data.name;
    this._captionElement.textcontent = data.name;
    // set the image's src and alt
    // set the caption's textContent
    //  previewModalImage.src = data.link;
    //   previewModalImage.alt = data.name;
    //   previewModalCaption.textContent = data.name;
    super.open();
  }
}

// in index.js
// Create one instance of this class in index.js and call its parent’s setEventListeners() method.

// function handlePreviewModal(data) {
//   previewModalImage.src = data.link;
//   previewModalImage.alt = data.name;
//   previewModalCaption.textContent = data.name;
//   openModal(previewModal);
// }
