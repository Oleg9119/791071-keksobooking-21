'use strict';

(() => {
  const housingTypeFilter = document.querySelector(`#housing-type`);

  let chosenHousingType = `any`;

  const createFilteredAds = () => {
    window.map.removePins();
    window.card.closeCard();

    const filteredAds = [];
    const allAds = window.onLoad.getAllAds();

    for (let i = 0; i < allAds.length; i++) {
      if (filteredAds.length >= 5) {
        break;
      }
      if (chosenHousingType === `any` || allAds[i].offer.type === chosenHousingType) {
        filteredAds.push(allAds[i]);
      }
    }
    window.map.createAds(filteredAds);
  };

  housingTypeFilter.addEventListener(`change`, (evt) => {
    evt.preventDefault();
    chosenHousingType = evt.target.value;

    createFilteredAds();
  });
})();
