'use strict';

const TYPES_OF_HOUSING_MAP = { // это словарь, а не перечисление
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);

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

const getLocalType = (type) => {
  return TYPES_OF_HOUSING_MAP[type];
};

const filterRequiredFields = (element, condition, cb) => {
  if (condition) {
    return cb(element);
  }
  return element.remove();
};

window.card = {
  createCard: (ad) => {
    const mapFiltersContainer = document.querySelector(`.map__filters-container`);
    const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
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

    filterRequiredFields(clonedMapCardTitle, ad.offer.title, (element) => {
      element.textContent = `${ad.offer.title}`;
    });
    filterRequiredFields(clonedMapCardAddress, ad.offer.address, (element) => {
      element.textContent = `${ad.offer.address}`;
    });
    filterRequiredFields(clonedMapCardPrice, ad.offer.price, (element) => {
      element.textContent = `${ad.offer.price}₽/ночь`;
    });
    filterRequiredFields(clonedMapCardType, ad.offer.type, (element) => {
      element.textContent = `${getLocalType(ad.offer.type)}`;
    });
    filterRequiredFields(clonedMapCardCapacity, ad.offer.rooms && ad.offer.guests, (element) => {
      element.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    });
    filterRequiredFields(clonedMapCardTime, ad.offer.checkin && ad.offer.checkout, (element) => {
      element.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
    });
    filterRequiredFields(clonedMapCardFeatures, ad.offer.features.length, (element) => {
      element.textContent = `${ad.offer.features}`;
    });
    filterRequiredFields(clonedMapCardDescription, ad.offer.description, (element) => {
      element.textContent = `${ad.offer.description}`;
    });
    filterRequiredFields(clonedMapCardPhotos, ad.offer.photos.length, (element) => {
      const mapCardPhotoFragment = renderCardPhotos(element, ad.offer.photos);
      element.appendChild(mapCardPhotoFragment);
    }
    );
    filterRequiredFields(clonedMapCardAvatar, ad.author.avatar, (element) => {
      element.src = `${ad.author.avatar}`;
    });

    mapFiltersContainer.appendChild(clonedMapCard);
  },
  closeCard: () => {
    document.removeEventListener(`keydown`, window.onDocumentPressEsc);
    const card = map.querySelector(`.map__card`);
    if (card) {
      card.parentNode.removeChild(card);
    }
  }
};
