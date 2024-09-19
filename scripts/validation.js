// errors & validation

// const formError = formElement.querySelector(".$(formInputElement.id}-error");

// enabling validation by calling enableValidation()
// pass all the settings on call

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(inputElement);
  inputElement.classList.add(".modal__input_type-error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("modal__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(".modal__input_type-error");
  errorElement.classList.remove("modal__input-error_active");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  console.log("Is this firing");
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
  const inputList = Array.from(formElement.querySelectorAll(".modal__input"));

  const buttonElement = formElement.querySelector(".modal__button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtenState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal__form"));
  console.log("Is this firing");
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
//     const inputList = array.form(formElement.querySelector(".modal__input"));

//     const buttonElement = formElement.querySelector(".form__submit");
//     toggleButtenState(inputList, buttonElement);

//     inputList.forEach(inputElement => {
//         inputElement.addEventListener('input', () => {
//             isValid(formElement, inputElement);
//         });
//     });
// }
