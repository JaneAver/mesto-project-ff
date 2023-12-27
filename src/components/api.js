const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3/",
  headers: {
    authorization: "e8f59776-7e1b-41d3-bac8-0d9cc5f6d9da",
    "Content-type": "application/json",
  },
};

function checkResult(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function getProfileDetails() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => checkResult(res));
}

function updateProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => checkResult(res));
}

function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => checkResult(res));
}

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => checkResult(res));
}

function addCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkResult(res));
}

function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    checkResult(res);
  });
}

function addLikeForCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkResult(res));
}

function deleteLikeForCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkResult(res));
}

export {
  getProfileDetails,
  updateProfile,
  updateAvatar,
  getCards,
  addCard,
  deleteCard,
  addLikeForCard,
  deleteLikeForCard,
};
