export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscKeyPress = this._handleEscKeyPress.bind(this);
    this._modalButton = this._popupElement.querySelector(".modal__button");
    this._modalClose = this._popupElement.querySelector(".modal__close");
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscKeyPress);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKeyPress);
  }

  _handleEscKeyPress(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleModalOverlay(event) {
    if (event.target.classList.contains("modal")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".modal__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupElement.addEventListener("click", (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
    this._popupElement.addEventListener("keydown", (event) => {
      this._handleEscKeyPress(event);
    });

    this._popupElement.addEventListener("click", (event) => {
      this._handleModalOverlay(event);
    });
  }
}
