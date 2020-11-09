'use strict';

(() => {
  const MAP = document.querySelector(`.map`);
  const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  console.log(mapPins)

  window.map = {
    activateMap: () => {
      MAP.classList.remove(`map--faded`);
    },
    createAds: (ads) => {
      const mapPinsList = document.querySelector(`.map__pins`);
      const mapPinFragment = document.createDocumentFragment();

      for (let i = 0; i < ads.length; i++) {
        const pin = window.getPin(ads[i]);
        mapPinFragment.appendChild(pin);
      }
      mapPinsList.appendChild(mapPinFragment);
    }
  };
})();
