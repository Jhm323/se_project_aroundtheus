import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

// array elements
const initialCards = [
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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Profile form const
const profileForm = document.forms["profile-form"];
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector(".profile__title");
const nameInput = profileForm.querySelector("#profile__title-input");
const profileDescription = document.querySelector(".profile__description");
const bioInput = profileForm.querySelector("#profile__description-input");
const formInputElement = document.querySelector(".modal__input");

// Preview modal const
const previewModal = document.querySelector("#preview-image-modal");
const previewModalImage = document.querySelector(".modal__image-preview");
const previewModalCaption = document.querySelector("#modal-title-preview");
const previewModalCloseButton = previewModal.querySelector(
  "#modal-close-button"
);

// Add Card modal const
const addNewCardButton = document.querySelector("#new-card-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardFrom = document.forms["add-card-form"];
const addNewCardModalCloseButton = addNewCardModal.querySelector(
  "#modal-close-button"
);
const cardsList = document.querySelector(".cards__list");
const cardTitle = document.querySelector(".card__title");
const addNewCardInputTitle = addNewCardFrom.querySelector(
  "#add-card-input-title"
);
const cardImage = document.querySelector(".card__image");
const addNewCardInputUrl = addNewCardFrom.querySelector("#add-card-input-url");

// functions
const closeButtons = document.querySelectorAll(".modal__close");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

function openModal(modal) {
  modal.addEventListener("mousedown", handleModalOverlay);
  document.addEventListener("keydown", handleEscKeyPress);
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.removeEventListener("mousedown", handleModalOverlay);
  document.removeEventListener("keydown", handleEscKeyPress);
  modal.classList.remove("modal_opened");
}

function handleEscKeyPress(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleModalOverlay(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

// Profile Edit Modal
profileEditButton.addEventListener("click", openProfileEditModal);

function openProfileEditModal() {
  openModal(profileEditModal);
  nameInput.value = profileTitle.textContent;
  bioInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = bioInput.value;
  closeModal(profileEditModal);
  event.target.reset();
}

profileForm.addEventListener("submit", handleProfileEditSubmit);

// Add New Card Modal
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
addNewCardFrom.addEventListener("submit", handleAddNewCardSubmit);

function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: addNewCardInputTitle.value,
    link: addNewCardInputUrl.value,
  };
  createCard(cardData);
  closeModal(addNewCardModal);
  event.target.reset();
  addFormValidator.toggleButtonState();
}

function generateCard(cardData) {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  return card.generateCard();
}

function createCard(cardData) {
  const cardElement = generateCard(cardData);
  cardsList.prepend(cardElement);
}

function renderCard(cardElement, method = "append") {
  cardsList[method](cardElement);
}

function handlePreviewModal(data) {
  previewModalImage.src = data._link;
  previewModalImage.alt = data._name;
  previewModalCaption.textContent = data._name;
  openModal(previewModal);
}

initialCards.forEach((cardData) => {
  createCard(cardData);
});

const config = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error-active",
};

const editFormValidator = new FormValidator(config, profileForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(config, addNewCardFrom);
addFormValidator.enableValidation();
