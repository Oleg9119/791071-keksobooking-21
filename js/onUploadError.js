'use strict';

(() => {
  window.onUploadError = () => {
    const main = document.querySelector(`main`);
    const uploadErrorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
    const clonedUploadError = uploadErrorTemplate.cloneNode(true);

    const closeUploadErrorButton = clonedUploadError.querySelector(`.error__button`);

    main.appendChild(clonedUploadError);

    closeUploadErrorButton.addEventListener(`click`, window.onErrorButtonClick);
    document.addEventListener(`keydown`, window.onDocumentPressEsc);
    document.addEventListener(`click`, window.onBodyClick);
  };
})();
