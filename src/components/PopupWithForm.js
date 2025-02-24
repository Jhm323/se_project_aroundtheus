import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupForm.querySelectorAll(".modal__input");
    this._saveButton = this._popupForm.querySelector(".modal__button");
    this._submitBtnText = this._saveButton.textContent;
  }

  onSubmit(handler) {
    this._handleFormSubmit = handler;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._saveButton.textContent = loadingText;
    } else {
      //return back the initial text.
      this._saveButton.textContent = this._submitBtnText;
    }
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
