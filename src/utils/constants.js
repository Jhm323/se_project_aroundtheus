// array elements
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Profile form const

export const profileForm = document.forms["profile-form"];
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
export const profileTitle = document.querySelector(".profile__title");
export const nameInput = profileForm.querySelector("#profile__title-input");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const bioInput = profileForm.querySelector(
  "#profile__description-input"
);
export const formInputElement = document.querySelector(".modal__input");

// Preview modal const

export const previewModal = document.querySelector("#preview-image-modal");
export const previewModalImage = document.querySelector(
  ".modal__image-preview"
);
export const previewModalCaption = document.querySelector(
  "#modal-title-preview"
);
export const previewModalCloseButton = previewModal.querySelector(
  "#modal-close-button"
);

// Add Card modal const

export const addNewCardButton = document.querySelector("#new-card-button");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const addNewCardFrom = document.forms["add-card-form"];
export const addNewCardModalCloseButton = addNewCardModal.querySelector(
  "#modal-close-button"
);
export const cardsList = document.querySelector(".cards__list");
export const cardTitle = document.querySelector(".card__title");
export const addNewCardInputTitle = addNewCardFrom.querySelector(
  "#add-card-input-title"
);
export const cardImage = document.querySelector(".card__image");
export const addNewCardInputUrl = addNewCardFrom.querySelector(
  "#add-card-input-url"
);

export const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error-active",
};
