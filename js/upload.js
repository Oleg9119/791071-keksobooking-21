'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
      window.onUploadSuccess();
    });

    xhr.addEventListener(`error`, () => {
      window.onUploadError();
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
