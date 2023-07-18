class Auth {
  constructor (options) {
    this.baseUrl = options.baseUrl;
  }
  register ({password, email}) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }).then((res) => {
      return this._checkResponse(res);
    })
  }

  login ({password, email}) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }).then((res) => {
      return this._checkResponse(res);
    })
  }
  checkToken (jwt) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      }
    }).then((res) => {
      return this._checkResponse(res);
    })
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}

export const auth = new Auth({
  baseUrl: 'https://auth.nomoreparties.co',
});

