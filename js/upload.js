'use strict';

const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
const TYPE_OF_REQUEST = `POST`;

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

  xhr.open(TYPE_OF_REQUEST, UPLOAD_URL);
  xhr.send(data);
};
