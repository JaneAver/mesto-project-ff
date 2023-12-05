import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeCard,
} from "./components/card.js";
import {
  openModal,
  closeModal,
  handleCloseModalOverlay,
} from "./components/modal.js";

export const cardTemplate = document.querySelector("#card-template").content;

const cardsList = document.querySelector(".places__list");
function addCards() {
  initialCards.forEach(function (card) {
    cardsList.append(
      createCard(card, handleDeleteCard, handleLikeCard, showCardInModal)
    );
  });
}

const imgModal = document.querySelector(".popup_type_image");
const imageCardModal = imgModal.querySelector(".popup__image");
const captionCardModal = imgModal.querySelector(".popup__caption");
function showCardInModal(card) {
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  captionCardModal.textContent = card.name;
  openModal(imgModal);
}

const profileName = document.querySelector(".profile__title");
const nameInput = document.querySelector(".popup__input_type_name");
const profileJob = document.querySelector(".profile__description");
const jobInput = document.querySelector(".popup__input_type_description");
const profileModal = document.querySelector(".popup_type_edit");
function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(profileModal);
}

const newCardNameInput = document.querySelector(".popup__input_type_card-name");
const newCardLinkInput = document.querySelector(".popup__input_type_url");
const newCardModal = document.querySelector(".popup_type_new-card");
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const newCard = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value,
  };
  cardsList.prepend(
    createCard(newCard, handleDeleteCard, handleLikeCard, showCardInModal)
  );
  closeModal(newCardModal);
  evt.target.reset();
}

function openProfileModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(profileModal);
}

const popupList = [profileModal, newCardModal, imgModal];
popupList.forEach((popup) => {
  popup.addEventListener("click", handleCloseModalOverlay);
});

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", function () {
  openModal(newCardModal);
});

const profileButton = document.querySelector(".profile__edit-button");
profileButton.addEventListener("click", openProfileModal);

const formElementProfile = profileModal.querySelector(".popup__form");
formElementProfile.addEventListener("submit", handleProfileSubmit);

const formElementCard = newCardModal.querySelector(".popup__form");
const closeProfileModalButton = profileModal.querySelector(".popup__close");
formElementCard.addEventListener("submit", handleNewCardSubmit);
closeProfileModalButton.addEventListener("click", () =>
  closeModal(profileModal)
);

const closeNewCardModalButton = newCardModal.querySelector(".popup__close");
closeNewCardModalButton.addEventListener("click", () =>
  closeModal(newCardModal)
);

const closeCardModalButton = imgModal.querySelector(".popup__close");
closeCardModalButton.addEventListener("click", () => closeModal(imgModal));

addCards();
