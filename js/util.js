'use strict';

(() => {

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
})();
