class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        Promise.reject(`Unexpected Error: ${res.status}`);
      }
    });
  }

  // other methods for working with the API
}

// api.getInitialCards();

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8a34193b-7f1f-46cc-96d4-6480048f699e",
    "Content-Type": "application/json",
  },
});

// load app
// request data from server
// CreateReadUpdateDelete
// update the app to display from server
