// The UserInfo class is responsible for rendering information about the user on the page. This class should:

// Take an object with the selectors of two elements into the constructor: one for the profile’s name element and one for its job element.
// Have a public method named getUserInfo(), which returns an object containing information about the user. This method will be handy for cases when it's necessary to display the user data in the open form.
// Have a public method named setUserInfo(), which takes new user data and adds it to the page. This method should be used after successful submission of the profile form.

export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameElement = docuement.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textcontent,
      description: this._jobElement.textcontent,
    };
  }

  setUserInfo({ name, description }) {
    this._nameElement = name;
    this._jobElement = description;
  }
}

// in index.js
// Create an instance of the UserInfo class in index.js and use its methods as described.
