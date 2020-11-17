'use strict';

const DOWNLOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const TYPE_OF_REQUEST = `GET`;

window.download = (onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.open(TYPE_OF_REQUEST, DOWNLOAD_URL);

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
  });

  xhr.addEventListener(`error`, () => {
    onError();
  });

  xhr.send();
};
