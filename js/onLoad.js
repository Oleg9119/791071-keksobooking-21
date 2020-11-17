'use strict';

const adForm = document.querySelector(`.ad-form`);
const mapForm = document.querySelector(`.map__filters`);

let allAds;

const activatePage = () => {
  window.form.activate();
  window.setDisabledValue(mapForm, false);
  window.setDisabledValue(adForm, false);
  window.map.activateMap();
  window.form.setAddress();
};

window.onLoad = {
  showPins: (pins) => {
    allAds = pins.filter((pin) => {
      return !!pin.offer;
    });
    activatePage();
    window.map.createAds(pins);
  },
  getAllAds: () => {
    return allAds;
  }
};
