'use strict';

(() => {

  const ADS_QUANTITY = 8;
  const MAP_WIDTH = document.querySelector(`.map`).clientWidth;

  window.getRandomAd = (adIndex) => {
    const AdsData = {
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
    const location = {
      x: window.getRandomValue(AdsData.LOCATION_X_MIN, MAP_WIDTH),
      y: window.getRandomValue(AdsData.LOCATION_Y_MIN, AdsData.LOCATION_Y_MAX)
    };
    const ad = {
      author: {
        avatar: `img/avatars/user0${adIndex}.png`
      },
      offer: {
        title: `Заголовок предложения ${adIndex}`,
        address: `${location.x}, ${location.y}`,
        price: window.getRandomValue(AdsData.PRICE_MIN, AdsData.PRICE_MAX),
        type: window.getRandomProperty(AdsData.TYPES),
        rooms: window.getRandomValue(AdsData.ROOMS_MIN_QUANTITY, AdsData.ROOMS_MAX_QUANTITY),
        guests: window.getRandomValue(AdsData.GUESTS_MIN_QUANTITY, AdsData.GUESTS_MAX_QUANTITY),
        checkin: window.getRandomProperty(AdsData.CHECKINS),
        checkout: window.getRandomProperty(AdsData.CHECKOUTS),
        features: window.getRandomSlicedArray(AdsData.FEATURES, AdsData.FEATURES_MIN_QUANTITY, AdsData.FEATURES.length),
        description: `Описание ${adIndex}`,
        photos: window.getRandomSlicedArray(AdsData.PHOTOS, AdsData.PHOTOS_MIN_QUANTITY, AdsData.PHOTOS.length)
      },
      location
    };
    return ad;
  };

  window.getRandomAdsList = (adsQuantity) => {
    const randomAds = [];
    for (let i = 1; i <= adsQuantity; i++) {
      randomAds.push(window.getRandomAd(i));
    }
    return randomAds;
  };

  window.randomAds = window.getRandomAdsList(ADS_QUANTITY);
})();
