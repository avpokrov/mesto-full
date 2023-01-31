class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    this.getToken();
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserAvatar(newAvatar) {
    this.getToken();
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(newAvatar),
    }).then(this._checkResponse);
  }

  setUserInfo(nameUser, descriptionUser) {
    this.getToken();
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: nameUser,
        about: descriptionUser,
      }),
    }).then(this._checkResponse);
  }

  getCards() {
    this.getToken();
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  createCard({ name, link }) {
    this.getToken();
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  likeCard(like, cardId) {
    this.getToken();
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers
    }).then(this._checkResponse);
  }

  removeCard(cardId) {
    this.getToken();
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getToken() {
    const token = localStorage.getItem("token");
    if(token){
      this._headers = {...this._headers, 
        "Authorization": token } 
    }
  }
}

const api = new Api({
  baseUrl: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
