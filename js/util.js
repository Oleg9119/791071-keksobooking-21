'use strict';

(() => {
  const adForm = document.querySelector(`.ad-form`);
  const mapForm = document.querySelector(`.map__filters`);

  window.getRandomProperty = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.getRandomValue = (min, max) => {
    return Math.floor(Math.random() * max) + min;
  };

  window.getRandomSlicedArray = (array, min, max) => {
    return array.slice(0, window.getRandomValue(min, max + 1));
  };

  window.onDocumentPressEsc = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.card.closeCard();
      window.closeErrorMessage();
      window.closeSuccessMessage();
      window.closeErrorUploadMessage();
    }
  };

  window.onErrorButtonClick = () => {
    const closeUploadErrorButton = document.querySelector(`.error__button`);
    closeUploadErrorButton.removeEventListener(`click`, window.onErrorButtonClick);
    window.closeErrorUploadMessage();
  };

  window.onBodyClick = () => {
    window.closeSuccessMessage();
    window.closeErrorUploadMessage();
  };

  window.onClickCloseButton = () => {
    window.card.closeCard();
  };

  window.setDisabledValue = (form, isDisabled) => {
    const formChildren = form.children;
    for (let i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = isDisabled;
    }
  };

  window.deactivateMap = () => {
    const map = document.querySelector(`.map`);
    const mapCard = map.querySelector(`.map__card`);
    const mapPinMain = map.querySelector(`.map__pin--main`);
    const mapPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    map.classList.add(`map--faded`);
    if (mapCard) {
      mapCard.style.display = `none`;
    }
    mapPinMain.style.left = `570px`;
    mapPinMain.style.top = `375px`;
    for (let i = 0; i < mapPins.length; i++) {
      mapPins[i].style.display = `none`;
    }
  };

  window.deactivatePage = () => {
    window.deactivateMap();
    window.setDisabledValue(mapForm, true);
    window.setDisabledValue(adForm, true);
    window.form.deactivate();
  };
})();
