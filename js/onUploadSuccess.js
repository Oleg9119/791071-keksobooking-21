'use strict';

(() => {
  window.onUploadSuccess = () => {
    const main = document.querySelector(`main`);
    const uploadSuccessTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
    const clonedUploadSuccess = uploadSuccessTemplate.cloneNode(true);

    main.appendChild(clonedUploadSuccess);

    document.addEventListener(`keydown`, window.onDocumentPressEsc);
    document.addEventListener(`click`, window.onBodyClick);
  };
})();
