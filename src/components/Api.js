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

  addNewCard() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: "Big Cat",
        link: "https://ids.si.edu/ids/deliveryService?max_w=550&id=NZP-20140817-6602RG-000003",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response from the server
      })
      .then((data) => {
        console.log("Card created successfully:", data);
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
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

  updateProfilePic() {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      avatar: newAvatarUrl,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Failed to update profile picture. Status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Profile picture updated successfully!", data);
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
      });
  }
}
// other methods for working with the API
//    load app
//      request data from server
//        update the app to display from server
//  "Create-Read-Update-Delete"
