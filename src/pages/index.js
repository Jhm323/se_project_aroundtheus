// Imports

import "../pages/index.css";
import "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";

// Constants

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

// New Classes

const editProfilePopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  handleAddNewCardSubmit
);
newCardPopup.setEventListeners();

const imagePreviewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
imagePreviewPopup.setEventListeners();

const userInfo = new UserInfo(".profile__title", ".profile__description");

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = generateCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list"
);

// Profile Edit Modal

function openProfileEditModal() {
  editProfilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  bioInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
}
// **********************************
function handleProfileEditSubmit(inputs) {
  const name = inputs.title;
  const description = inputs.description;
  console.log(inputs, name, description);
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}
// **********************************

profileEditButton.addEventListener("click", openProfileEditModal);
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleProfileEditSubmit;
});

// Add New Card Modal

addNewCardButton.addEventListener("click", () => newCardPopup.open());
cardList.renderItems();

// **********************************

function handleAddNewCardSubmit(inputs) {
  const cardData = {
    name: inputs.title,
    link: inputs.description,
  };

  createCard(cardData);
  newCardPopup.close();
  // addFormValidator.toggleButtonState();
  addFormValidator.disableButton();
}
// **********************************

function generateCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  return card.generateCard();
}

function createCard(cardData) {
  const cardElement = generateCard(cardData);
  renderCard(cardElement);
  return cardElement;
}

function renderCard(cardElement, method = "prepend") {
  cardsList[method](cardElement);
}

function handlePreviewModal(data) {
  imagePreviewPopup.open({
    link: data.link,
    name: data.name,
  });
}

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFrom);
addFormValidator.enableValidation();
