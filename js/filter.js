'use strict';

(() => {
  const MIN_PRICE = 10000;
  const MAX_PRICE = 50000;

  const mapFilters = document.querySelector(`.map__filters`);
  const housingTypeFilter = mapFilters.querySelector(`#housing-type`);

  const housingPriceFilter = mapFilters.querySelector(`#housing-price`);
  const housingRoomsFilter = mapFilters.querySelector(`#housing-rooms`);
  const housingGuestsFilter = mapFilters.querySelector(`#housing-guests`);

  const housingFeaturesFilter = mapFilters.querySelector(`#housing-features`);
  const housingFeaturesWiFiFilter = housingFeaturesFilter.querySelector(`#filter-wifi`);
  const housingFeaturesDishwasherFilter = housingFeaturesFilter.querySelector(`#filter-dishwasher`);
  const housingFeaturesParkingFilter = housingFeaturesFilter.querySelector(`#filter-parking`);
  const housingFeaturesWasherFilter = housingFeaturesFilter.querySelector(`#filter-washer`);
  const housingFeaturesElevatorFilter = housingFeaturesFilter.querySelector(`#filter-elevator`);
  const housingFeaturesConditionerFilter = housingFeaturesFilter.querySelector(`#filter-conditioner`);

  const chosenFilters = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: new Set()
  };

  const ELEMENTS_TO_FILTERS_MAP = { //  это не перечисление, а словарь
    'housing-type': `type`,
    'housing-price': `price`,
    'housing-rooms': `rooms`,
    'housing-guests': `guests`,
    'filter-wifi': `wifi`,
    'filter-dishwasher': `dishwasher`,
    'filter-parking': `parking`,
    'filter-washer': `washer`,
    'filter-elevator': `elevator`,
    'filter-conditioner': `conditioner`
  };

  const checkFilterAds = (filterType, filterData, filterCondition) => {
    return (filterType === filterCondition || filterData.toString() === filterType);
  };

  const checkPrice = (filterType, filterData) => {
    switch (filterType) {
      case `any`:
        return true;
      case `low`:
        return filterData < MIN_PRICE;
      case `middle`:
        return filterData >= MIN_PRICE && filterData < MAX_PRICE;
      case `high`:
        return filterData >= MAX_PRICE;
      default:
        return false;
    }
  };

  const checkChosenFeatures = (array, feature) => {
    if (array.has(feature)) {
      array.delete(feature);
    } else {
      array.add(feature);
    }
  };

  const checkFeatures = (filterType, filterData) => {
    const checkedFeatures = [...filterType];
    return checkedFeatures.every((elem) => filterData.includes(elem));
  };

  const createFilteredAds = () => {
    window.map.removePins();
    window.card.closeCard();

    const filteredAds = [];
    const allAds = window.onLoad.getAllAds();

    for (let i = 0; i < allAds.length; i++) {
      if (filteredAds.length >= 5) {
        break;
      }
      if (checkFilterAds(chosenFilters.type, allAds[i].offer.type, `any`) &&
        checkFilterAds(chosenFilters.rooms, allAds[i].offer.rooms, `any`) &&
        checkFilterAds(chosenFilters.guests, allAds[i].offer.guests, `any`) &&
        checkPrice(chosenFilters.price, allAds[i].offer.price) &&
        checkFeatures(chosenFilters.features, allAds[i].offer.features)) {
        filteredAds.push(allAds[i]);
      }
    }
    window.map.createAds(filteredAds);
  };

  const onSelectChange = (evt) => {
    const filterName = ELEMENTS_TO_FILTERS_MAP[evt.target.name];
    chosenFilters[filterName] = evt.target.value;
    window.debounce(createFilteredAds);
  };

  const onCheckboxChange = (evt) => {
    const filterName = ELEMENTS_TO_FILTERS_MAP[evt.target.id];
    chosenFilters[filterName] = evt.target.id;
    checkChosenFeatures(chosenFilters.features, filterName);
    window.debounce(createFilteredAds);
  };

  housingTypeFilter.addEventListener(`change`, onSelectChange);
  housingPriceFilter.addEventListener(`change`, onSelectChange);
  housingRoomsFilter.addEventListener(`change`, onSelectChange);
  housingGuestsFilter.addEventListener(`change`, onSelectChange);

  housingFeaturesWiFiFilter.addEventListener(`change`, onCheckboxChange);
  housingFeaturesDishwasherFilter.addEventListener(`change`, onCheckboxChange);
  housingFeaturesParkingFilter.addEventListener(`change`, onCheckboxChange);
  housingFeaturesWasherFilter.addEventListener(`change`, onCheckboxChange);
  housingFeaturesElevatorFilter.addEventListener(`change`, onCheckboxChange);
  housingFeaturesConditionerFilter.addEventListener(`change`, onCheckboxChange);
})();
