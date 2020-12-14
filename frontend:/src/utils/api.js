class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialsCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  } 

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  setUserInfo(info) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(link)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  postCard(card) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  removeCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }

  changeLikeCardStatus(cardId, status) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: (status) ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    });
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15/',
  headers: {
    authorization: 'fa7c1664-18f3-41d8-b132-37b50e07ed81',
    'Content-Type': 'application/json'
  }
});

export default api;