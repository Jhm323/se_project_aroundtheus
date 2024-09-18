// array elements=================

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

// Buttons and Modals================

// profile
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

// Preview
const previewModal = document.querySelector("#preview-image-modal");
const previewModalImage = document.querySelector(".modal__image-preview");
const previewModalCaption = document.querySelector("#modal-title-preview");
const previewModalCloseButton = previewModal.querySelector(
  "#modal-close-button"
);

// card
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

// funks=====================

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}
// Profile Edit Modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  openProfileEditModal();
});
function openProfileEditModal() {
  nameInput.value = profileTitle.textContent;
  bioInput.value = profileDescription.textContent;
}
function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = bioInput.value;
  closeModal(profileEditModal);
}
profileForm.addEventListener("submit", handleProfileEditSubmit);
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

// Preview Modal
previewModalCloseButton.addEventListener("click", () =>
  closeModal(previewModal)
);

// Add New Card Modal
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));
addNewCardFrom.addEventListener("submit", handleAddNewCardSubmit);
function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const cardData = {
    name: addNewCardInputTitle.value,
    link: addNewCardInputUrl.value,
  };

  const newCard = getCardElement(cardData);
  cardsList.prepend(newCard);
  closeModal(addNewCardModal);
  event.target.reset();
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.addEventListener("click", () => {
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    previewModalCaption.textContent = data.name;
    openModal(previewModal);
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}
addNewCardModalCloseButton.addEventListener("click", () =>
  closeModal(addNewCardModal)
);

initialCards.forEach((cardData) => {
  const newCard = getCardElement(cardData);
  cardsList.prepend(newCard);
});
// // The function accepts a card object and a method of adding to the section
// // The method is initially `prepend`, but you can pass `append`
// function renderCard(item, method = "prepend") {

//   const cardElement = getCardElement(item);
//   // Add the card into the section using the method
//   cardsList[ method ](cardElement);
// }
