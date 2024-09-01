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

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editProfilemodal = document.querySelector("#profile-edit-modal");
const profileForm = document.querySelector("#profile-form");
const addNewCardFrom = document.querySelector("#add-card-form");

// Buttons and other Dom nodes
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector("#new-card-button");

const profileEditModal = document.querySelector("#profile-edit-modal");
const addNewCardModal = document.querySelector("#add-card-modal");

const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const addNewCardModalCloseButton = addNewCardModal.querySelector(
  "#modal-close-button"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const cardTitle = document.querySelector(".card__title");
const cardImage = document.querySelector(".card__image");

// Form data
const nameInput = profileForm.querySelector("#profile__title-input");
const jobInput = profileForm.querySelector("#profile__description-input");

const newCardTitleInput = addNewCardFrom.querySelector("#add-card-input-title");
const newCardUrlInput = addNewCardFrom.querySelector("#add-card-input-url");

const addNewCardInputTitle = addNewCardFrom.querySelector(
  "#add-card-input-title"
);
const addNewCardInputUrl = addNewCardFrom.querySelector("#add-card-input-url");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  // nameInput.value = profileTitle.textContent;
  // jobInput.value = profileDescription.textContent;
  modal.classList.add("modal_opened");
}

function handleProfileEditSubmit(Event) {
  Event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profileEditModal);
}

function handleAddNewCardSubmit(Event) {
  Event.preventDefault();
  const cardData = {
    name: addNewCardInputTitle.value,
    link: addNewCardInputUrl.value,
  };

  const newCard = getCardElement(cardData);
  cardsWrap.prepend(newCard);
  closeModal(addNewCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

profileForm.addEventListener("submit", handleProfileEditSubmit);
addNewCardFrom.addEventListener("submit", handleAddNewCardSubmit);

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditButton.addEventListener("click", () => openModal(profileEditModal));

addNewCardModalCloseButton.addEventListener("click", () =>
  closeModal(addNewCardModal)
);
addNewCardButton.addEventListener("click", () => openModal(addNewCardModal));

initialCards.forEach((cardData) => {
  const newCard = getCardElement(cardData);
  cardsWrap.prepend(newCard);
});
