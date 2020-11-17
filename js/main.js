'use strict';

const adForm = document.querySelector(`.ad-form`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapForm = document.querySelector(`.map__filters`);

mapPinMain.addEventListener(`click`, () => {
  window.download(window.onLoad.showPins, window.onError);
});

window.setDisabledValue(mapForm, true);
window.setDisabledValue(adForm, true);
