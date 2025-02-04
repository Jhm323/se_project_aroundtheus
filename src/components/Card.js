export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeIcon
  ) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._id = cardData._id;
    this._isLiked = cardData.isLiked;
    this.handleLikeIcon = handleLikeIcon;
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

  getCardID() {
    return this._id;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this.handleLikeIcon(this);
    });

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

  updateLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // updateLikes(likes) {
  //   this._likes = likes;
  //   this.renderLikes();
  // }

  renderLikes() {
    if (this.isLiked()) {
      console.log("isLiked add");
      this._likeButton.classList.add("card__like-button_active");
    } else {
      console.log("isLiked remove");

      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._isLiked;
  }

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
    this.renderLikes();
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    // if(this.isLiked)
    //   this._likeButton.classList.add("active")

    return this._element;
  }
}
