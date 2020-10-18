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

const MAP = document.querySelector(`.map`);
const MAP_WIDTH = MAP.clientWidth;
const MAP_PIN_MAIN_TIP_HEIGHT = 22;

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const PinOffset = {
  X: PinSize.WIDTH / 2,
  Y: PinSize.HEIGHT
};

const MapPinMainSize = {
  WIDTH: 65,
  HEIGHT: 65
};

const MapPinMainOffset = {
  X: MapPinMainSize.WIDTH / 2,
  Y: MapPinMainSize.HEIGHT + MAP_PIN_MAIN_TIP_HEIGHT
};

const getRandomProperty = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * max) + min;
};

const getRandomSlicedArray = (array, min, max) => {
  return array.slice(0, getRandomValue(min, max + 1));
};

const getRandomAd = (adIndex) => {
  const location = {
    x: getRandomValue(AdsData.LOCATION_X_MIN, MAP_WIDTH),
    y: getRandomValue(AdsData.LOCATION_Y_MIN, AdsData.LOCATION_Y_MAX)
  };
  const ad = {
    author: {
      avatar: `img/avatars/user0${adIndex}.png`
    },
    offer: {
      title: `Заголовок предложения ${adIndex}`,
      address: `${location.x}, ${location.y}`,
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
    location
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

const showMap = (map) => {
  map.classList.remove(`map--faded`);
};

const createAds = (randomAdsList) => {
  const mapPinsList = document.querySelector(`.map__pins`);
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const mapPinFragment = document.createDocumentFragment();

  for (let i = 0; i < AdsData.QUANTITY; i++) {
    const clonedMapPin = mapPinTemplate.cloneNode(true);
    const clonedMapPinImage = clonedMapPin.querySelector(`img`);
    clonedMapPin.style.left = `${randomAdsList[i].location.x - PinOffset.X}px`;
    clonedMapPin.style.top = `${randomAdsList[i].location.y - PinOffset.Y}px`;
    clonedMapPinImage.src = `${randomAdsList[i].author.avatar}`;
    clonedMapPinImage.alt = `${randomAdsList[i].offer.title}`;
    mapPinFragment.appendChild(clonedMapPin);
  }
  mapPinsList.appendChild(mapPinFragment);
  return mapPinsList;
};

// const getLocalType = (type) => {
//   const types = {
//     palace: `Дворец`,
//     flat: `Квартира`,
//     house: `Дом`,
//     bungalow: `Бунгало`
//   };
//   return types[type];
// };

// const renderCardPhotos = (clonedPhotos, photosSources) => {
//   const cardPhotoFragment = document.createDocumentFragment();
//   const templatePhoto = clonedPhotos.querySelector(`img`);
//   clonedPhotos.removeChild(templatePhoto);
//   for (let i = 0; i < photosSources.length; i++) {
//     const clonedPhoto = templatePhoto.cloneNode(true);
//     clonedPhoto.src = `${photosSources[i]}`;
//     cardPhotoFragment.appendChild(clonedPhoto);
//   }
//   return cardPhotoFragment;
// };

// const createCard = (firstAd) => {
//   const mapFiltersContainer = document.querySelector(`.map__filters-container`);
//   const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
//   const mapCardFragment = document.createDocumentFragment();
//   const clonedMapCard = mapCardTemplate.cloneNode(true);

//   const clonedMapCardTitle = clonedMapCard.querySelector(`.popup__title`);
//   const clonedMapCardAddress = clonedMapCard.querySelector(`.popup__text--address`);
//   const clonedMapCardPrice = clonedMapCard.querySelector(`.popup__text--price`);
//   const clonedMapCardType = clonedMapCard.querySelector(`.popup__type`);
//   const clonedMapCardCapacity = clonedMapCard.querySelector(`.popup__text--capacity`);
//   const clonedMapCardTime = clonedMapCard.querySelector(`.popup__text--time`);
//   const clonedMapCardFeatures = clonedMapCard.querySelector(`.popup__features`);
//   const clonedMapCardDescription = clonedMapCard.querySelector(`.popup__description`);
//   const clonedMapCardPhotos = clonedMapCard.querySelector(`.popup__photos`);
//   const clonedMapCardAvatar = clonedMapCard.querySelector(`.popup__avatar`);

//   clonedMapCardTitle.textContent = `${firstAd.offer.title}`;
//   clonedMapCardAddress.textContent = `${firstAd.offer.address}`;
//   clonedMapCardPrice.textContent = `${firstAd.offer.price}₽/ночь`;
//   clonedMapCardType.textContent = `${getLocalType(firstAd.offer.type)}`;
//   clonedMapCardCapacity.textContent = `${firstAd.offer.rooms} комнаты для ${firstAd.offer.guests} гостей`;
//   clonedMapCardTime.textContent = `Заезд после ${firstAd.offer.checkin}, выезд до ${firstAd.offer.checkout}`;
//   clonedMapCardFeatures.textContent = `${firstAd.offer.features}`;
//   clonedMapCardDescription.textContent = `${firstAd.offer.description}`;

//   const mapCardPhotoFragment = renderCardPhotos(clonedMapCardPhotos, firstAd.offer.photos);
//   clonedMapCardPhotos.appendChild(mapCardPhotoFragment);
//   clonedMapCardAvatar.src = `${firstAd.author.avatar}`;

//   mapCardFragment.appendChild(clonedMapCard);
//   MAP.insertBefore(mapCardFragment, mapFiltersContainer);
// };

const adForm = document.querySelector(`.ad-form`);
const adAddress = adForm.querySelector(`input[name='address']`);
const mapPinMain = document.querySelector(`.map__pin--main`);
const mapForm = document.querySelector(`.map__filters`);

const setDisabledValue = (form, isDisabled) => {
  const formChildren = form.children;
  for (let i = 0; i < formChildren.length; i++) {
    formChildren[i].disabled = isDisabled;
  }
};

const setAddress = (address) => {
  const mapPinMainXOffset = parseInt(mapPinMain.style.left, 10) + MapPinMainOffset.X;
  const mapPinMainYOffset = parseInt(mapPinMain.style.top, 10) + MapPinMainOffset.Y;
  address.value = `${parseInt(mapPinMainXOffset, 10)}, ${parseInt(mapPinMainYOffset, 10)}`;
};

const activateForm = (form) => {
  form.classList.remove(`ad-form--disabled`);
};

const activatePage = () => {
  activateForm(adForm);
  setDisabledValue(mapForm, false);
  setDisabledValue(adForm, false);
  showMap(MAP);
  createAds(randomAds);
  setAddress(adAddress);
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    activatePage();
  }
});

mapPinMain.addEventListener(`click`, () => {
  activatePage();
});

const roomsQuantity = adForm.querySelector(`#room_number`);
const guestsQuantity = adForm.querySelector(`#capacity`);

const validateRoomsAndGuests = (select) => {
  const roomsCount = roomsQuantity.value;
  const guestsCount = guestsQuantity.value;
  if (guestsCount > roomsCount) {
    select.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
  } else {
    select.setCustomValidity(``);
  }
};

roomsQuantity.addEventListener(`change`, (evt) => {
  validateRoomsAndGuests(evt.target);
});

guestsQuantity.addEventListener(`change`, (evt) => {
  validateRoomsAndGuests(evt.target);
});

const randomAds = getRandomAdsList(AdsData.QUANTITY);
// createCard(randomAds[0]);
setAddress(adAddress);
setDisabledValue(mapForm, true);
setDisabledValue(adForm, true);
