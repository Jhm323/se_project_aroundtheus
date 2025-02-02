export default class Card {
  constructor(cardData, cardSelector, handleImageClick, handleDeleteCard) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
  }

  _findCardElements() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._cardImage = this._element.querySelector(".card__image");
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._card = this._element.querySelector(".card");
    this._cardTitle = this._element.querySelector(".card__title");
  }

  _setEventListeners() {
    // this._likeButton.addEventListener("click", () => {
    //   this._handleLikeIcon(this);
    // });

    this._trashButton.addEventListener("click", () => {
      this._handleDeleteCard(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // updateLikes(likes) {
  //   this._likes = likes;
  //   this.renderLikes();
  // }

  // renderLikes() {
  //   this._cardLikes.textContent = this._likes.length;
  //   if (this.isLiked()) {
  //     this._likeButton.classList.add("card__like-button_active");
  //   } else {
  //     this._likeButton.classList.remove("card__like-button_active");
  //   }
  // }

  // isLiked() {
  //   return this._likes.some(like => like._id === this._userId);
  // }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return this._cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._findCardElements();
    this._setEventListeners();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }
}
