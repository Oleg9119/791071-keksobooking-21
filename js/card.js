'use strict';

(() => {
  const MAP = document.querySelector(`.map`);

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
    const types = {
      palace: `Дворец`,
      flat: `Квартира`,
      house: `Дом`,
      bungalow: `Бунгало`
    };
    return types[type];
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

      mapFiltersContainer.appendChild(clonedMapCard);
    },
    closeCard: () => {
      document.removeEventListener(`keydown`, window.onDocumentPressEsc);
      const card = MAP.querySelector(`.map__card`);
      if (card) {
        card.parentNode.removeChild(card);
      }
    }
  };
})();
