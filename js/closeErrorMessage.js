'use strict';

(() => {
  window.closeErrorMessage = () => {
    document.removeEventListener(`keydown`, window.onDocumentPressEsc);
    const downloadError = document.querySelector(`.downloadError`);
    if (downloadError) {
      downloadError.parentNode.removeChild(downloadError);
    }
  };
})();
