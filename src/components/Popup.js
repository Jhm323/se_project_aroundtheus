export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    // this._popupElement.reset();
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscKeyPress);
    document.removeEventListener("keydown", this._handleModalOverlay);
  }

  _handleEscKeyPress(event) {
    console.log(event);
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
    const closeButtons = this._popupElement.querySelectorAll(".modal__close");
    closeButtons.forEach((button) => {
      const modal = button.closest(".modal");
      button.addEventListener("click", () => {
        this.close();
      });
      modal.addEventListener("click", (event) => {
        this._handleEscKeyPress(event);
        // ...handleModalOverlay
      });
    });
  }
}
