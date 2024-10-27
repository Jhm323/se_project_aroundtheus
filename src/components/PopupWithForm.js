import Popup from "./Popup.js";

export default class PopupWithForm {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.queryselector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popupForm.queryselectorAll("modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  //   open() {
  //     super.open();
  //     this._button.textContent = "save";
  //   }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  //   close() {
  //     this._popupForm.reset();
  //     super.close();
  //   }
}
