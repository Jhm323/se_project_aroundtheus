export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // const cardId =  ${cardId} //cardId input

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Unexpected Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.error(err); // log the error to the console
      });
  }

  // function () promise.all();

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((response) => response.json()); // Parse the response as JSON
  }

  editProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,

      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    }).then((response) => response.json()); // Parse the response as JSON
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse the JSON response from the server
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the card");
        }
        console.log("Card deleted successfully:");
        return response.json(); // Parse the JSON response from the server
      })

      .catch((error) => {
        console.error("There was an error with the DELETE request:", error);
      });
  }

  updateLike(card) {
    const cardId = card.getCardID();
    const method = card.isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    });
  }

  addLike() {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to like the card");
        }
        return response.json(); // Parse the JSON response from the server
      })
      .then((data) => {
        console.log("Card liked successfully:", data);
      })
      .catch((error) => {
        console.error("There was an error with the PUT request:", error);
      });
  }

  removeLike() {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to like the card");
        }
        return response.json(); // Parse the JSON response from the server
      })
      .then((data) => {
        console.log("Card liked successfully:", data);
      })
      .catch((error) => {
        console.error("There was an error with the PUT request:", error);
      });
  }

  updateProfileAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: avatar }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(
          `Failed to update profile picture. Status: ${response.status}`
        );
      }

      return response.json();
    });
  }
}
// other methods for working with the API
//    load app
//      request data from server
//        update the app to display from server
//  "Create-Read-Update-Delete"
