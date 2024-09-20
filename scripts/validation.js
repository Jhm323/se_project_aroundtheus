// errors & validation

const config = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: ".modal__button_disabled",
  inputErrorClass: ".form__input_type_error",
  errorClass: ".modal__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("inputErrorClass");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("inputErrorClass");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtenState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("form__submit_inactive");
  } else {
    buttonElement.classList.remove("form__submit_inactive");
  }
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll("inputSelector"));

  const buttonElement = formElement.querySelector("submitButtonSelector");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtenState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll("formSelector"));
  console.log(formList);
  formList.forEach((formElement) => {
    console.log(formElement);
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();

//   function setEventListeners(formElement) {
//     const inputList = array.form(formElement.querySelector("inputSelector"));

//     const buttonElement = formElement.querySelector(".form__submit");
//     toggleButtenState(inputList, buttonElement);

//     inputList.forEach(inputElement => {
//         inputElement.addEventListener('input', () => {
//             isValid(formElement, inputElement);
//         });
//     });
// }
