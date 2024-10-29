import "../pages/index.css";
import "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  addNewCardFrom,
  initialCards,
  profileEditButton,
  addNewCardButton,
  cardsList,
  config,
  profileForm,
  addNewCardInputTitle,
  addNewCardInputUrl,
  nameInput,
  bioInput,
} from "../utils/constants.js";

// Classes

const ediProfilePopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileEditSubmit
);
ediProfilePopup.setEventListeners();

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

profileEditButton.addEventListener("click", openProfileEditModal);

function openProfileEditModal() {
  ediProfilePopup.open();
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  bioInput.value = currentUserInfo.description;
  editFormValidator.resetValidation();
}

function handleProfileEditSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    description: inputValues.description,
  });
  ediProfilePopup.close();
  event.target.reset();
}

// profileForm.addEventListener("submit", handleProfileEditSubmit);

// Add New Card Modal
addNewCardButton.addEventListener("click", () => newCardPopup.open());
// addNewCardFrom.addEventListener("submit", handleAddNewCardSubmit);

cardList.renderItems();

function handleAddNewCardSubmit(event) {
  const cardData = {
    name: addNewCardInputTitle.value,
    link: addNewCardInputUrl.value,
  };
  createCard(cardData);
  newCardPopup.close();
  // event.target.reset();
  addFormValidator.toggleButtonState();
}

function generateCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  return card.generateCard();
}

function createCard(cardData) {
  const cardElement = generateCard(cardData);
  renderCard(cardElement);
  return cardElement;
}

function renderCard(cardElement, method = "append") {
  cardsList[method](cardElement);
}

function handlePreviewModal(data) {
  imagePreviewPopup.open({
    link: data.link,
    name: data.name,
    // previewModalImage.src = data.link;
    // previewModalImage.alt = data.name;
    // previewModalCaption.textContent = data.name;
  });
}

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFrom);
addFormValidator.enableValidation();
