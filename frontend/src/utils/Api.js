class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._checkResponse(res))
  }
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res))
  }
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._checkResponse(res))
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }
  like(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }
  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return this.removeLike(cardId);
    } else {
      return this.like(cardId);
    }
  }
  updateAvatar(image) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: image
      })
    })
      .then(res => this._checkResponse(res))
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
  get(res) {
    return this._checkResponse(res)
  }
}

const jwt = localStorage.getItem('jwt');

export const api = new Api({
  baseUrl: 'https://api.thaerealme.nomoredomains.xyz',
  headers: {
    authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json'
  }
});
