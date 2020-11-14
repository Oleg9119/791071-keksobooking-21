'use strict';

(() => {
  let allAds;

  window.onLoad = {
    showPins: (pins) => {
      allAds = pins.filter((pin) => {
        return !!pin.offer;
      });
      window.map.createAds(pins);
    },
    getAllAds: () => {
      return allAds;
    }
  };
})();
