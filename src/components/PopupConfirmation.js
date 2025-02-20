import Popup from "./Popup";

export default class PopupConfirmation extends Popup {
  setHandleDelete(handleDelete, cardId) {
    this._popupElement
      .querySelector(".modal__form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        handleDelete(cardId);
      });
  }
}
