'use strict';

const adForm = document.querySelector(`.ad-form`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapForm = document.querySelector(`.map__filters`);

const activatePage = () => {
  window.form.activate();
  window.setDisabledValue(mapForm, false);
  window.setDisabledValue(adForm, false);
  window.download(window.onLoad.showPins, window.onError);
  window.map.activateMap();
  window.form.setAddress();
};

mapPinMain.addEventListener(`click`, () => {
  activatePage();
});

window.setDisabledValue(mapForm, true);
window.setDisabledValue(adForm, true);
