export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscKeyPress);
    document.addEventListener("mousedown", handleModalOverlay);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscKeyPress);
    document.removeEventListener("keydown", handleEscKeyPress);
  }

  _handleEscClose(event) {
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
    });
  }
}
