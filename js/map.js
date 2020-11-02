'use strict';

(() => {

  window.activateMap = (map) => {
    map.classList.remove(`map--faded`);
  };

  window.createAds = (ads) => {
    const mapPinsList = document.querySelector(`.map__pins`);
    const mapPinFragment = document.createDocumentFragment();

    for (let i = 0; i < ads.length; i++) {
      const pin = window.getPin(ads[i]);
      mapPinFragment.appendChild(pin);
    }
    mapPinsList.appendChild(mapPinFragment);
  };

})();
