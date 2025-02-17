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
import { info } from "autoprefixer";

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

// Profile Form Const /////////////////////////////////////
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

// Preview Modal Const ///////////////////////////////////////
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

// Add Card Modal Const ///////////////////////////////////////////
export const addNewCardButton = document.querySelector("#new-card-button");
export const addNewCardModal = document.querySelector("#add-card-modal");
export const addNewCardForm = document.forms["add-card-form"];
export const addNewCardModalCloseButton = addNewCardModal.querySelector(
  "#modal-close-button"
);
export const cardsList = document.querySelector(".cards__list");
export const cardTitle = document.querySelector(".card__title");
export const addNewCardInputTitle = addNewCardForm.querySelector(
  "#add-card-input-title"
);
export const cardImage = document.querySelector(".card__image");
export const addNewCardInputUrl = addNewCardForm.querySelector(
  "#add-card-input-url"
);
// Avatar Edit Modal Const ///////////////////////////////////////////
export const avatarButton = document.querySelector(".profile__image-button");
export const editAvatarForm = document.querySelector(
  "#edit-profile-picture-form"
);

// New Classes /////////////////////////////////////////////////

// New Class Edit Profile Popup
const editProfilePopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

// New class New Card Popup

const newCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  handleAddNewCardSubmit
);
newCardPopup.setEventListeners();

// New Class Image Preview Popup

const imagePreviewPopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});
imagePreviewPopup.setEventListeners();

// New Class User Info

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// New Class Section

const cardList = new Section(
  {
    renderer: (cardData) => {
      const card = generateCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list"
);

// New Class Confirm Delete Popup

const confirmDeleteModal = new PopupWithForm({
  popupSelector: "#confirm-delete-modal",
});
confirmDeleteModal.setEventListeners();

// New class New Form Validator

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardForm);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(config, editAvatarForm);
avatarFormValidator.enableValidation();

// New Class New Card

function generateCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handlePreviewModal,
    handleDeleteClick,
    handleLikeIcon
  );
  return card.generateCard();
}

// Edit Avatar Modal///////////////////////////////////////////
function handleAvatarSubmit(value) {
  console.log(value);
  //        Shows a loading indicator while updating the avatar.
  avatarPopup.renderLoading(true);
  //        Sends the new avatar to the backend via an API call.
  api
    //       Updates the UI if the request is successful.
    .updateProfileAvatar(value.avatar)
    .then((value) => {
      userInfo.setAvatar(value.avatar);
      //       Closes the popup upon success.
      avatarPopup.close();
    })
    //      Logs errors if the request fails.
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      //      Always stops the loading animation at the end.
      avatarPopup.renderLoading(false, "Save");
    });
}

const avatarPopup = new PopupWithForm(
  { popupSelector: "#profile-image-edit-modal" },
  handleAvatarSubmit
);
avatarPopup.setEventListeners();

avatarButton.addEventListener("click", () => avatarPopup.open());
avatarFormValidator.disableButton();

// Profile Edit Modal /////////////////////////////////////////

function openProfileEditModal() {
  editProfilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  bioInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
}
profileEditButton.addEventListener("click", openProfileEditModal);

function handleProfileEditSubmit(inputs) {
  const name = inputs.title;
  const about = inputs.description;
  editProfilePopup.renderLoading(true);
  api
    .setUserInfo({ name, about })
    .then((info) => {
      userInfo.setUserInfo(info);
      editProfilePopup.close();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

// Add New Card Modal /////////////////////////////////////////////

addNewCardButton.addEventListener("click", () => newCardPopup.open());

function handleAddNewCardSubmit(cardData) {
  newCardPopup.renderLoading(true);
  api
    .addNewCard(cardData)
    .then((card) => {
      createCard(card);
      newCardPopup.close();
      addFormValidator.disableButton();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      newCardPopup.renderLoading(false, "Save");
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
  confirmDeleteModal.onSubmit(() => {
    deleteCard(card);
  });
  confirmDeleteModal.open();
}
addNewCardButton.addEventListener("click", () => newCardPopup.open());

function deleteCard(card) {
  api.deleteCard(card._id).then((result) => {
    card.handleDeleteCard();
  });
  confirmDeleteModal.close();
}

function handleLikeIcon(card) {
  api
    .updateLike(card)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) => {
      card.reverseIsLiked(); //change false to true or vice versa
      card.renderLikes();
    })
    .catch((error) => {
      console.error("like error", error);
    });
}

api.getInitialCards().then((result) => {
  console.log("Cards on server: ", result.length);
  cardList.renderItems(result);
});

api.getUserInfo().then((userData) => {
  console.log("userData", userData);
  userInfo.setUserInfo(userData);
  userInfo.setAvatar(userData.avatar);
});
