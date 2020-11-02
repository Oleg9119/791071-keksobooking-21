'use strict';

(() => {

  const PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const PinOffset = {
    X: PinSize.WIDTH / 2,
    Y: PinSize.HEIGHT
  };

  window.getPin = (pinData) => {
    const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const clonedMapPin = mapPinTemplate.cloneNode(true);
    const clonedMapPinImage = clonedMapPin.querySelector(`img`);

    clonedMapPin.style.left = `${pinData.location.x - PinOffset.X}px`;
    clonedMapPin.style.top = `${pinData.location.y - PinOffset.Y}px`;
    clonedMapPinImage.src = `${pinData.author.avatar}`;
    clonedMapPinImage.alt = `${pinData.offer.title}`;

    clonedMapPin.addEventListener(`click`, () => {
      window.closeCard();
      window.createCard(pinData);
      document.addEventListener(`keydown`, window.onDocumentPressEsc);
      const closeButton = document.querySelector(`.popup__close`);
      closeButton.addEventListener(`click`, window.onClickCloseButton);
    });
    return clonedMapPin;
  };

})();
