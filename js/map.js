'use strict';

(() => {

  window.map = {
    activateMap: () => {
      const map = document.querySelector(`.map`);
      map.classList.remove(`map--faded`);
    },
    createAds: (ads) => {
      const ADS_MAX_COUNT = 5;
      const mapPinsList = document.querySelector(`.map__pins`);
      const mapPinFragment = document.createDocumentFragment();

      const maxCount = ads.length < ADS_MAX_COUNT ? ads.length : ADS_MAX_COUNT;

      for (let i = 0; i < maxCount; i++) {
        const pin = window.getPin(ads[i]);
        mapPinFragment.appendChild(pin);
      }

      mapPinsList.appendChild(mapPinFragment);
    },
    activatePin: (activePin) => {
      const mapPinActive = document.querySelector(`.map__pin--active`);
      if (mapPinActive) {
        mapPinActive.classList.remove(`map__pin--active`);
      }
      activePin.classList.add(`map__pin--active`);
    },
    removePins: () => {
      const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let i = 0; i < mapPins.length; i++) {
        mapPins[i].remove();
      }
    }
  };
})();
