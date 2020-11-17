'use strict';

window.onError = () => {
  const main = document.querySelector(`main`);
  const downloadErrorTemplate = document.querySelector(`#downloadError`).content.querySelector(`.downloadError`);
  const clonedDownloadError = downloadErrorTemplate.cloneNode(true);

  const clonedDownloadErrorMessage = clonedDownloadError.querySelector(`.downloadError__message`);

  clonedDownloadErrorMessage.textContent = `Ошибка загрузки данных`;

  main.appendChild(clonedDownloadError);
  document.addEventListener(`keydown`, window.onDocumentPressEsc);
};
