'use strict';

(() => {
  window.closeSuccessMessage = () => {
    document.removeEventListener(`keydown`, window.onDocumentPressEsc);
    document.removeEventListener(`click`, window.onBodyClick);
    const uploadSuccess = document.querySelector(`.success`);
    if (uploadSuccess) {
      uploadSuccess.parentNode.removeChild(uploadSuccess);
    }
  };
})();
