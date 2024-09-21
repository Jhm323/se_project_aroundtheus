// errors & validation
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

function checkInputValidity(config, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    return showInputError(config, formElement, inputElement);
  }
  hideInputError(config, formElement, inputElement);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputElement) => inputElement.validity.valid);
}

// function disableButton(submitButton) {
//   return !inputList.every((inputElement) => inputElement.validity.valid);
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
// }

// function enableButton(submitButton) {
// return inputList.every((inputElement) => inputElement.validity.valid)
// submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

const setEventListeners = (config, formElement) => {
  const { inputSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtenState(config, inputElements, submitButton);
    });
  });
};

const enableValidation = (config) => {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  console.log(formElements);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(config, formElement);
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".modal__input_type_error",
  errorClass: ".modal__error_visible",
};

enableValidation(config);

// escape button modal exit>>>>>>>>>>>>>>>>>>>

// const modalButtonClose = document.querySelector(".modal__close");
// modalButtonClose.addEventListener("keydown", function(event)) = { (evt.keyCode = 27);
