'use strict';

const AdsData = {
  QUANTITY: 8,
  LOCATION_X_MIN: 0,
  LOCATION_Y_MIN: 130,
  LOCATION_Y_MAX: 630,
  PRICE_MIN: 100,
  PRICE_MAX: 500,
  TYPES: [`palace`, `flat`, `house`, `bungalow`],
  ROOMS_MIN_QUANTITY: 1,
  ROOMS_MAX_QUANTITY: 5,
  GUESTS_MIN_QUANTITY: 1,
  GUESTS_MAX_QUANTITY: 5,
  CHECKINS: [`12:00`, `13:00`, `14:00`],
  CHECKOUTS: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  FEATURES_MIN_QUANTITY: 0,
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
  PHOTOS_MIN_QUANTITY: 0
};

const MAP_WIDTH = document.querySelector(`.map`).clientWidth;

const MapPins = {
  WIDTH: 50,
  HEIGHT: 70
};

const getRandomProperty = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const getRandomSlicedArray = (array, min, max) => {
  return array.slice(0, getRandomValue(min, max));
};

const getRandomAd = (adIndex) => {
  const locationX = getRandomValue(AdsData.LOCATION_X_MIN, MAP_WIDTH);
  const locationY = getRandomValue(AdsData.LOCATION_Y_MIN, AdsData.LOCATION_Y_MAX);
  const ad = {
    author: {
      avatar: `img/avatars/user0${adIndex}.png`
    },
    offer: {
      title: `Заголовок предложения ${adIndex}`,
      address: `${locationX}, ${locationY}`,
      price: getRandomValue(AdsData.PRICE_MIN, AdsData.PRICE_MAX),
      type: getRandomProperty(AdsData.TYPES),
      rooms: getRandomValue(AdsData.ROOMS_MIN_QUANTITY, AdsData.ROOMS_MAX_QUANTITY),
      guests: getRandomValue(AdsData.GUESTS_MIN_QUANTITY, AdsData.GUESTS_MAX_QUANTITY),
      checkin: getRandomProperty(AdsData.CHECKINS),
      checkout: getRandomProperty(AdsData.CHECKOUTS),
      features: getRandomSlicedArray(AdsData.FEATURES, AdsData.FEATURES_MIN_QUANTITY, AdsData.FEATURES.length),
      description: `Описание ${adIndex}`,
      photos: getRandomSlicedArray(AdsData.PHOTOS, AdsData.PHOTOS_MIN_QUANTITY, AdsData.PHOTOS.length)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return ad;
};

const getRandomAdsList = (adsQuantity) => {
  const randomAds = [];
  for (let i = 1; i <= adsQuantity; i++) {
    randomAds.push(getRandomAd(i));
  }
  return randomAds;
};

const showMap = () => {
  const map = document.querySelector(`.map `);
  map.classList.remove(`map--faded`);
};

const createAds = (randomAdsList) => {
  const mapPinsList = document.querySelector(`.map__pins`);
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinFragment = document.createDocumentFragment();
  const mapPinOffsetX = MapPins.WIDTH / 2;
  const mapPinOffsetY = MapPins.HEIGHT;

  for (let i = 0; i < AdsData.QUANTITY; i++) {
    const clonedMapPin = mapPinTemplate.cloneNode(true);
    const clonedMapPinImage = clonedMapPin.querySelector(`img`);
    clonedMapPin.style.left = `${randomAdsList[i].location.x - mapPinOffsetX}px`;
    clonedMapPin.style.top = `${randomAdsList[i].location.y - mapPinOffsetY}px`;
    clonedMapPinImage.src = `${randomAdsList[i].author.avatar}`;
    clonedMapPinImage.alt = `${randomAdsList[i].offer.title}`;
    mapPinFragment.appendChild(clonedMapPin);
  }
  mapPinsList.appendChild(mapPinFragment);
};

const randomAds = getRandomAdsList(AdsData.QUANTITY);
showMap();
createAds(randomAds);
