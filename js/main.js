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

const FormsData = {
  ROOMS_MAX_QUANTITY: 100,
  NOT_FOR_GUESTS_PLACES: 0
};

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

const activateMap = (map) => {
  map.classList.remove(`map--faded`);
};

const closeCard = () => {
  const card = MAP.querySelector(`.map__card`);
  card.style.display = `none`;
};

const onDocumentPressEsc = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

const closePreviousCards = () => {
  document.removeEventListener(`keydown`, onDocumentPressEsc);
  const card = MAP.querySelector(`.map__card`);
  if (card) {
    card.parentNode.removeChild(card);
  }
};

const getPin = (pinData) => {
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const clonedMapPin = mapPinTemplate.cloneNode(true);
  const clonedMapPinImage = clonedMapPin.querySelector(`img`);

  clonedMapPin.style.left = `${pinData.location.x - PinOffset.X}px`;
  clonedMapPin.style.top = `${pinData.location.y - PinOffset.Y}px`;
  clonedMapPinImage.src = `${pinData.author.avatar}`;
  clonedMapPinImage.alt = `${pinData.offer.title}`;

  clonedMapPin.addEventListener(`click`, () => {
    closePreviousCards();
    createCard(pinData);
    document.addEventListener(`keydown`, onDocumentPressEsc);
    const closeButton = document.querySelector(`.popup__close`);
    closeButton.addEventListener(`click`, closeCard);
  });

  return clonedMapPin;
};

const createAds = (ads) => {
  const mapPinsList = document.querySelector(`.map__pins`);
  const mapPinFragment = document.createDocumentFragment();

  for (let i = 0; i < AdsData.QUANTITY; i++) {
    const pin = getPin(ads[i]);
    mapPinFragment.appendChild(pin);
  }
  mapPinsList.appendChild(mapPinFragment);
};

const getLocalType = (type) => {
  const types = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
  };
  return types[type];
};

const renderCardPhotos = (clonedPhotos, photosSources) => {
  const cardPhotoFragment = document.createDocumentFragment();
  const templatePhoto = clonedPhotos.querySelector(`img`);
  clonedPhotos.removeChild(templatePhoto);
  for (let i = 0; i < photosSources.length; i++) {
    const clonedPhoto = templatePhoto.cloneNode(true);
    clonedPhoto.src = `${photosSources[i]}`;
    cardPhotoFragment.appendChild(clonedPhoto);
  }
  return cardPhotoFragment;
};

const createCard = (ad) => {
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapCardFragment = document.createDocumentFragment();
  const clonedMapCard = mapCardTemplate.cloneNode(true);

  const clonedMapCardTitle = clonedMapCard.querySelector(`.popup__title`);
  const clonedMapCardAddress = clonedMapCard.querySelector(`.popup__text--address`);
  const clonedMapCardPrice = clonedMapCard.querySelector(`.popup__text--price`);
  const clonedMapCardType = clonedMapCard.querySelector(`.popup__type`);
  const clonedMapCardCapacity = clonedMapCard.querySelector(`.popup__text--capacity`);
  const clonedMapCardTime = clonedMapCard.querySelector(`.popup__text--time`);
  const clonedMapCardFeatures = clonedMapCard.querySelector(`.popup__features`);
  const clonedMapCardDescription = clonedMapCard.querySelector(`.popup__description`);
  const clonedMapCardPhotos = clonedMapCard.querySelector(`.popup__photos`);
  const clonedMapCardAvatar = clonedMapCard.querySelector(`.popup__avatar`);

  clonedMapCardTitle.textContent = `${ad.offer.title}`;
  clonedMapCardAddress.textContent = `${ad.offer.address}`;
  clonedMapCardPrice.textContent = `${ad.offer.price}₽/ночь`;
  clonedMapCardType.textContent = `${getLocalType(ad.offer.type)}`;
  clonedMapCardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  clonedMapCardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  clonedMapCardFeatures.textContent = `${ad.offer.features}`;
  clonedMapCardDescription.textContent = `${ad.offer.description}`;

  const mapCardPhotoFragment = renderCardPhotos(clonedMapCardPhotos, ad.offer.photos);
  clonedMapCardPhotos.appendChild(mapCardPhotoFragment);
  clonedMapCardAvatar.src = `${ad.author.avatar}`;

  mapCardFragment.appendChild(clonedMapCard);
  MAP.insertBefore(mapCardFragment, mapFiltersContainer);
};

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
  createAds(randomAds);
  activateMap(MAP);
  setAddress(adAddress);
};

mapPinMain.addEventListener(`click`, () => {
  activatePage();
});

const housingType = adForm.querySelector(`#type`);
const nightPrice = adForm.querySelector(`#price`);
const roomsQuantity = adForm.querySelector(`#room_number`);
const guestsQuantity = adForm.querySelector(`#capacity`);
const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);

const validateRoomsAndGuests = (select) => {
  const roomsCount = roomsQuantity.value;
  const guestsCount = guestsQuantity.value;
  if (guestsCount > roomsCount) {
    select.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
  } else if (roomsCount === FormsData.ROOMS_MAX_QUANTITY && guestsCount !== FormsData.NOT_FOR_GUESTS_PLACES) {
    select.setCustomValidity(`100 комнат не предназначены для гостей`);
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

housingType.addEventListener(`change`, (evt) => {
  if (evt.target.value === `flat`) {
    nightPrice.min = 1000;
    nightPrice.placeholder = `1000`;
  } else if (evt.target.value === `bungalow`) {
    nightPrice.min = 0;
    nightPrice.placeholder = `0`;
  } else if (evt.target.value === `house`) {
    nightPrice.min = 5000;
    nightPrice.placeholder = `5000`;
  } else if (evt.target.value === `palace`) {
    nightPrice.min = 10000;
    nightPrice.placeholder = `10000`;
  }
});

timeIn.addEventListener(`change`, (evt) => {
  if (evt.target.value === `12:00`) {
    timeOut.value = `12:00`;
  } else if (evt.target.value === `13:00`) {
    timeOut.value = `13:00`;
  } else if (evt.target.value === `14:00`) {
    timeOut.value = `14:00`;
  }
});

timeOut.addEventListener(`change`, (evt) => {
  if (evt.target.value === `12:00`) {
    timeIn.value = `12:00`;
  } else if (evt.target.value === `13:00`) {
    timeIn.value = `13:00`;
  } else if (evt.target.value === `14:00`) {
    timeIn.value = `14:00`;
  }
});

const randomAds = getRandomAdsList(AdsData.QUANTITY);
setDisabledValue(mapForm, true);
setDisabledValue(adForm, true);
