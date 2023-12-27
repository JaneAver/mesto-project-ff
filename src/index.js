import "./pages/index.css";
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

import * as api from "./components/api.js";
import { clearValidation, enableValidation } from "./components/validation.js";

export const cardTemplate = document.querySelector("#card-template").content;

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const imgCard = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");
const profileModal = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
let profileId = null;
Promise.all([api.getProfileDetails(), api.getCards()])
  .then(([ProfileDetails, Cards]) => {
    profileId = ProfileDetails._id;
    profileImage.style.backgroundImage = `url(\\${ProfileDetails.avatar})`;
    profileName.textContent = ProfileDetails.name;
    profileJob.textContent = ProfileDetails.about;

    Cards.forEach((card) => {
      imgCard.append(
        createCard(
          card,
          handleDeleteCard,
          handleLikeCard,
          showCardInModal,
          profileId
        )
      );
    });
  })
  .catch((error) =>
    console.error("Ошибка получения данных по картам и профилю", error)
  );

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
function openProfileModal() {
  openModal(profileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

const cardModal = document.querySelector(".popup_type_image");
const imageCardModal = cardModal.querySelector(".popup__image");
const captionCardModal = cardModal.querySelector(".popup__caption");
function showCardInModal(card) {
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  captionCardModal.textContent = card.name;
  openModal(cardModal);
}

const avatarModal = document.querySelector(".popup_type_avatar");
const avatarUrlInput = avatarModal.querySelector(".popup__input_type_url");
function handleUpdateAvatarSubmit(evt) {
  function makeRequest() {
    return api.updateAvatar(avatarUrlInput.value).then((result) => {
      profileImage.style.backgroundImage = `url(\\${result.avatar})`;
      closeModal(avatarModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

function handleProfileSubmit(evt) {
  function makeRequest() {
    return api.updateProfile(nameInput.value, jobInput.value).then((result) => {
      profileName.textContent = result.name;
      profileJob.textContent = result.about;
      closeModal(profileModal);
    });
  }
  handleSubmit(makeRequest, evt);
}

const newCardModal = document.querySelector(".popup_type_new-card");
const newCardNameInput = document.querySelector(".popup__input_type_card-name");
const newCardLinkInput = newCardModal.querySelector(".popup__input_type_url");
function handleNewCardSubmit(evt) {
  function makeRequest() {
    return api
      .addCard(newCardNameInput.value, newCardLinkInput.value)
      .then((card) => {
        imgCard.prepend(
          createCard(
            card,
            handleDeleteCard,
            handleLikeCard,
            showCardInModal,
            profileId
          )
        );
        closeModal(newCardModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

function renderLoading(
  submitButton,
  isLoading,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(submitButton, true, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButton, false, initialText);
    });
}

const popupList = [profileModal, newCardModal, cardModal, avatarModal];
popupList.forEach((popup) => {
  popup.addEventListener("click", handleCloseModalOverlay);
});

profileImage.addEventListener("click", function () {
  clearValidation(avatarModal, validationConfig);
  openModal(avatarModal);
});

const newCardButton = document.querySelector(".profile__add-button");
newCardButton.addEventListener("click", function () {
  clearValidation(newCardModal, validationConfig);
  openModal(newCardModal);
});

const profileButton = document.querySelector(".profile__edit-button");
profileButton.addEventListener("click", function () {
  clearValidation(profileModal, validationConfig);
  openProfileModal();
});

const formElementCard = newCardModal.querySelector(".popup__form");
const formElementAvatar = avatarModal.querySelector(".popup__form");
const formElementProfile = profileModal.querySelector(".popup__form");
formElementAvatar.addEventListener("submit", handleUpdateAvatarSubmit);
formElementProfile.addEventListener("submit", handleProfileSubmit);
formElementCard.addEventListener("submit", handleNewCardSubmit);

const closeAvatarModalButton = avatarModal.querySelector(".popup__close");
closeAvatarModalButton.addEventListener("click", () => {
  closeModal(avatarModal);
});

const closeProfileModalButton = profileModal.querySelector(".popup__close");
closeProfileModalButton.addEventListener("click", () => {
  closeModal(profileModal);
});

const closeNewCardModalButton = newCardModal.querySelector(".popup__close");
closeNewCardModalButton.addEventListener("click", () => {
  closeModal(newCardModal);
});

const closeCardModalButton = cardModal.querySelector(".popup__close");
closeCardModalButton.addEventListener("click", () => closeModal(cardModal));

enableValidation(validationConfig);
