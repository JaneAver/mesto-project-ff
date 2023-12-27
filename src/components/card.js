import { cardTemplate } from "../index.js";
import * as api from "./api.js";

function createCard(
  card,
  handleDeleteCard,
  handleLikeCard,
  showCardInModal,
  profileId
) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.alt = card.name;
  cardImage.src = card.link;

  const cardTitle = cardItem.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");

  if (card.owner._id === profileId) {
    cardDeleteButton.id = card._id;
    cardDeleteButton.addEventListener("click", handleDeleteCard);
  } else {
    cardDeleteButton.classList.add("card__delete-button-inactive");
  }

  const isLiked = card.likes.some((item) => item._id === profileId);

  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const cardLikeCounter = cardItem.querySelector(".card__like-counter");

  if (isLiked) {
    cardLikeButton.classList.add("card__like-button_is-active");
  } else {
    cardLikeButton.classList.remove("card__like-button_is-active");
  }

  cardLikeCounter.textContent = card.likes.length;

  cardLikeButton.addEventListener("click", (evt) => handleLikeCard(evt, card));

  cardImage.addEventListener("click", () => showCardInModal(card));

  return cardItem;
}

function handleDeleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  api
    .deleteCard(evt.target.id)
    .then(() => {
      cardDelete.remove();
    })
    .catch((err) => console.error(`Не удалось удалить карту ${err}`));
}

function handleLikeCard(evt, card) {
  const cardItem = evt.target.closest(".card");
  const cardLikeButton = cardItem.querySelector(".card__like-button");
  const cardLikeCounter = cardItem.querySelector(".card__like-counter");

  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    api
      .deleteLikeForCard(card._id)
      .then((res) => {
        cardLikeButton.classList.remove("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось убрать лайк ${err}`));
  } else {
    api
      .addLikeForCard(card._id)
      .then((res) => {
        cardLikeButton.classList.toggle("card__like-button_is-active");
        cardLikeCounter.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось добавить лайк ${err}`));
  }
}

export { createCard, handleDeleteCard, handleLikeCard };
