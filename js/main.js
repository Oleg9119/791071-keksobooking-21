'use strict';

const MAP = document.querySelector(`.map`);

const adForm = document.querySelector(`.ad-form`);
const adAddress = adForm.querySelector(`input[name='address']`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapForm = document.querySelector(`.map__filters`);

const activatePage = () => {
  window.activateForm(adForm);
  window.setDisabledValue(mapForm, false);
  window.setDisabledValue(adForm, false);
  window.createAds(window.randomAds);
  window.activateMap(MAP);
  window.setAddress(adAddress);
};

mapPinMain.addEventListener(`click`, () => {
  activatePage();
});

window.setDisabledValue(mapForm, true);
window.setDisabledValue(adForm, true);
