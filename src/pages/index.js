// Imports //////////////////////////////////////////////////
import "../pages/index.css";
import "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8a34193b-7f1f-46cc-96d4-6480048f699e",
    "Content-Type": "application/json",
  },
});

// Constants /////////////////////////////////////////////

export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Profile form const /////////////////////////////////////
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

// Preview modal const ///////////////////////////////////////
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

// Add Card modal const ///////////////////////////////////////////
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
// New Classes /////////////////////////////////////////////////

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
    renderer: (cardData) => {
      const card = generateCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list"
);

const confirmDeleteModal = new Popup({
  popupSelector: "#confirm-delete-modal",
});

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFrom);
addFormValidator.enableValidation();

function generateCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handlePreviewModal,
    handleDeleteClick
  );
  return card.generateCard();
}

// const editProfilePicPopup = new PopupWithForm(
//   { popupSelector: "#edit-profile-pic-modal" },
//   handleEditProfilePicSubmit
// );
// editProfilePicPopup.setEventListeners();

// Edit Avatar Modal///////////////////////////////////////////
export const avatarEditModal = document.querySelector(
  "#profile-image-edit-modal"
);
export const profileAvatar = document.querySelector(".profile__image");
export const avatarButton = document.querySelector(".profile__image-edit");
avatarButton.addEventListener("click", () => avatarPopup.open());

// const avatarPopup = new PopupWithForm("#profile-image-edit-modal", (value) => {
//   avatarPopup.renderLoading(true);
//   api
//     .updateProfileAvatar(value.avatar)
//     .then((value) => {
//       userInfo.setAvatar(value.avatar);
//       avatarPopup.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       avatarPopup.renderLoading(false, "Save");
//     });
// });

// avatarPopup.setEventListeners();
// avatarFormValidator.disableButton();

// Profile Edit Modal /////////////////////////////////////////

function openProfileEditModal() {
  editProfilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  bioInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
}

function handleProfileEditSubmit(inputs) {
  const name = inputs.title;
  const description = inputs.description;
  userInfo.setUserInfo(name, description);
  editProfilePopup.close();
}

profileEditButton.addEventListener("click", openProfileEditModal);

// Edit Profile Picture Modal//////////////////////////////////////

// profilePicture.addEventListener("click", () => editProfilePicPopup.open());

// Export const profilePicture = document.querySelector();

// Add New Card Modal /////////////////////////////////////////////

addNewCardButton.addEventListener("click", () => newCardPopup.open());

function handleAddNewCardSubmit(cardData) {
  api
    .addNewCard(cardData)
    .then((card) => {
      createCard(card);
      newCardPopup.close();
      addFormValidator.disableButton();
    })
    .catch((error) => {
      console.log(error);
    });
}

function createCard(cardData) {
  const cardElement = generateCard(cardData);
  cardList.addItem(cardElement);
}

function handlePreviewModal(data) {
  imagePreviewPopup.open({
    link: data.link,
    name: data.name,
  });
}

function handleDeleteClick(card) {
  confirmDeleteModal.setHandleDelete(openConfirmDeleteModal, card);
  confirmDeleteModal.open();
}

function openConfirmDeleteModal(card) {
  api.deleteCard(card._id).then((result) => {
    card.handleDeleteCard();
  });
}

api.getInitialCards().then((result) => {
  console.log("Cards on server: ", result.length);
  cardList.renderItems(result);
});
