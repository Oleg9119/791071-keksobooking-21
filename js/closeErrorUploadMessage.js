'use strict';

(() => {
  window.closeErrorUploadMessage = () => {
    document.removeEventListener(`keydown`, window.onDocumentPressEsc);
    document.removeEventListener(`click`, window.onBodyClick);
    const uploadError = document.querySelector(`.error`);
    if (uploadError) {
      uploadError.parentNode.removeChild(uploadError);
    }
  };
})();
