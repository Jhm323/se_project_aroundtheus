import "../blocks/index.css";
import "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "./UserInfo.js";

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
PopupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: "profile__title",
  jobSelector: "profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData); // Use CreateCard
      cardSection.addItem(cardElement); // Add to Dom
    },
  },
  ".cards__list" // Call Container Selector
);

// Profile Edit Modal

profileEditButton.addEventListener("click", openProfileEditModal);

function openProfileEditModal() {
  // openModal(profileEditModal);\
  ediProfilePopup.open();
  nameInput.value = profileTitle.textContent;
  bioInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = bioInput.value;
  // closeModal(profileEditModal);
  ediProfilePopup.close();
  event.target.reset();
}

// profileForm.addEventListener("submit", handleProfileEditSubmit);

// Add New Card Modal
addNewCardButton.addEventListener("click", () => newCardPopup.open());
addNewCardFrom.addEventListener("submit", handleAddNewCardSubmit);

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cardList.addItem(card);
    },
  },
  ".cards__list"
);

cardList.renderItems();

const UserInfoClass = function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: addNewCardInputTitle.value,
    link: addNewCardInputUrl.value,
  };
  createCard(cardData);
  closeModal(addNewCardModal);
  event.target.reset();
  addFormValidator.toggleButtonState();
};

function generateCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  return card.generateCard();
}

function createCard(cardData) {
  const cardElement = generateCard(cardData);
  cardList.prepend(cardElement);
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

// initialCards.forEach((cardData) => {
//   createCard(cardData);
// });

// const config = {
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: "modal__button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error-active",
// };

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFrom);
addFormValidator.enableValidation();
