function openModal(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", handleCloseModalEsc);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened", "popup_is-animated");
  document.removeEventListener("keydown", handleCloseModalEsc);
}

function handleCloseModalOverlay(evt) {
  const modalOpened = evt.target.closest(".popup_is-opened");
  if (modalOpened && evt.target === evt.currentTarget) {
    closeModal(modalOpened);
  }
}

function handleCloseModalEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".popup_is-opened");
    closeModal(modalOpened);
  }
}

export { openModal, closeModal, handleCloseModalOverlay };
