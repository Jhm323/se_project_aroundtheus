// errors & validation

function showInputError(
  { inputErrorClass, errorClass },
  formElement,
  inputElement
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  console.log(errorMessageElement);
  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

function hideInputError(
  { inputErrorClass, errorClass },
  formElement,
  inputElement
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

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

const setEventListeners = (config, formElement) => {
  const { inputSelector } = config;
  const inputElements = [...formElement.querySelectorAll(inputSelector)];
  const submitButton = formElement.querySelector(".modal__button");

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", (event) => {
      checkInputValidity(config, formElement, inputElement);
      toggleButtonState(inputElements, submitButton);
    });
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal__button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("modal__button_disabled");
    buttonElement.disabled = false;
  }
}

const enableValidation = (config) => {
  const formElements = [...document.querySelectorAll(config.formSelector)];
  resetValidation(formElements);
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      resetValidation(formElements);
    });

    setEventListeners(config, formElement);
  });
};

const resetValidation = (formElements) => {
  formElements.forEach((formElement) => {
    formElement.reset();
  });
};

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error-active",
};

enableValidation(config);
