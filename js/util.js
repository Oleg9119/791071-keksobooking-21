'use strict';

(() => {
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
    }
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
})();
