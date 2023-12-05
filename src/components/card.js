import { cardTemplate } from "../index";

function createCard(card, handleDeleteCard, handleLikeCard, showCardInModal) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  cardImage.alt = card.name;
  cardImage.src = card.link;

  const cardTitle = cardItem.querySelector(".card__title");
  cardTitle.textContent = card.name;

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", handleDeleteCard);

  const cardLikeButton = cardItem.querySelector(".card__like-button");
  cardLikeButton.addEventListener("click", handleLikeCard);

  cardImage.addEventListener("click", () => showCardInModal(card));

  return cardItem;
}

function handleDeleteCard(evt) {
  const cardDelete = evt.target.closest(".card");
  cardDelete.remove();
}

function handleLikeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
  if (evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.style.color = "black";
  } else {
    evt.target.style.color = "";
  }
}

export { createCard, handleDeleteCard, handleLikeCard };
