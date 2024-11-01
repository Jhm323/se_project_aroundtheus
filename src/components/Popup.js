export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
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
    const closeButton = this._popupElement.querySelector(".modal__close");
    if (closeButton) {
      const modal = closeButton.closest(".modal");
      closeButton.addEventListener("click", () => {
        this.close();
      });
      document.addEventListener("keydown", (event) => {
        this._handleEscKeyPress(event);
      });
      modal.addEventListener("click", (event) => {
        this._handleModalOverlay(event);
      });
    }
  }
}
