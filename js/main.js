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

const PinSize = {
  WIDTH: 50,
  HEIGHT: 70
};

const PinOffset = {
  X: PinSize.WIDTH / 2,
  Y: PinSize.HEIGHT
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

const createCard = (firstAd) => {
  const mapFiltersContainer = document.querySelector(`.map__filters-container`);
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const mapCardFragment = document.createDocumentFragment();
  const clonedMapCard = mapCardTemplate.cloneNode(true);

  const ClonedMapCardData = {
    title: clonedMapCard.querySelector(`.popup__title`),
    address: clonedMapCard.querySelector(`.popup__text--address`),
    price: clonedMapCard.querySelector(`.popup__text--price`),
    type: clonedMapCard.querySelector(`.popup__type`),
    capacity: clonedMapCard.querySelector(`.popup__text--capacity`),
    time: clonedMapCard.querySelector(`.popup__text--time`),
    features: clonedMapCard.querySelector(`.popup__features`),
    description: clonedMapCard.querySelector(`.popup__description`),
    photos: clonedMapCard.querySelector(`.popup__photos`),
    avatar: clonedMapCard.querySelector(`.popup__avatar`)
  };

  ClonedMapCardData.title.textContent = `${firstAd.offer.title}`;
  ClonedMapCardData.address.textContent = `${firstAd.offer.address}`;
  ClonedMapCardData.price.textContent = `${firstAd.offer.price}₽/ночь`;
  ClonedMapCardData.type.textContent = `${getLocalType(firstAd.offer.type)}`;
  ClonedMapCardData.capacity.textContent = `${firstAd.offer.rooms} комнаты для ${firstAd.offer.guests} гостей`;
  ClonedMapCardData.time.textContent = `Заезд после ${firstAd.offer.checkin}, выезд до ${firstAd.offer.checkout}`;
  ClonedMapCardData.features.textContent = `${firstAd.offer.features}`;
  ClonedMapCardData.description.textContent = `${firstAd.offer.description}`;

  const mapCardPhotoFragment = renderCardPhotos(ClonedMapCardData.photos, firstAd.offer.photos);
  ClonedMapCardData.photos.appendChild(mapCardPhotoFragment);
  ClonedMapCardData.avatar.src = `${firstAd.author.avatar}`;

  mapCardFragment.appendChild(clonedMapCard);
  MAP.insertBefore(mapCardFragment, mapFiltersContainer);
};

const randomAds = getRandomAdsList(AdsData.QUANTITY);
showMap(MAP);
createAds(randomAds);
createCard(randomAds[0]);
