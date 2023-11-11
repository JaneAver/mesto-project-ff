// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template");
const cardContent = cardTemplate.content;
// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function createCard(card, removeCardHandler) {
  const cardContentClone = cardContent.cloneNode(true);
  cardContentClone.querySelector(".card__title").textContent = card.name;
  cardContentClone.querySelector(".card__image").src = card.link;
  cardContentClone.querySelector(
    ".card__image"
  ).alt = `Фотография ${card.name}`;
  cardContentClone
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => removeCardHandler(event));
  return cardContentClone;
}
// @todo: Функция удаления карточки
function removeCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});
