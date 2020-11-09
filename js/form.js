'use strict';

(() => {
  const MAP_PIN_MAIN_TIP_HEIGHT = 22;

  const FormsData = {
    ROOMS_MAX_QUANTITY: 100,
    NOT_FOR_GUESTS_PLACES: 0
  };

  const MapPinMainSize = {
    WIDTH: 65,
    HEIGHT: 65
  };

  const MapPinMainOffset = {
    X: MapPinMainSize.WIDTH / 2,
    Y: MapPinMainSize.HEIGHT + MAP_PIN_MAIN_TIP_HEIGHT
  };

  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`input[name='address']`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const adFormReset = adForm.querySelector(`.ad-form__reset`);

  window.form = {
    setAddress: () => {
      const mapPinMainXOffset = parseInt(mapPinMain.style.left, 10) + MapPinMainOffset.X;
      const mapPinMainYOffset = parseInt(mapPinMain.style.top, 10) + MapPinMainOffset.Y;
      adAddress.value = `${parseInt(mapPinMainXOffset, 10)}, ${parseInt(mapPinMainYOffset, 10)}`;
    },
    activateForm: () => {
      adForm.classList.remove(`ad-form--disabled`);
    }
  };

  const housingType = adForm.querySelector(`#type`);
  const nightPrice = adForm.querySelector(`#price`);
  const roomsQuantity = adForm.querySelector(`#room_number`);
  const guestsQuantity = adForm.querySelector(`#capacity`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);

  const validateRoomsAndGuests = (select) => {
    const roomsCount = roomsQuantity.value;
    const guestsCount = guestsQuantity.value;
    if (guestsCount > roomsCount) {
      select.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    } else if (roomsCount === FormsData.ROOMS_MAX_QUANTITY && guestsCount !== FormsData.NOT_FOR_GUESTS_PLACES) {
      select.setCustomValidity(`100 комнат не предназначены для гостей`);
    } else {
      select.setCustomValidity(``);
    }
  };

  roomsQuantity.addEventListener(`change`, (evt) => {
    validateRoomsAndGuests(evt.target);
  });

  guestsQuantity.addEventListener(`change`, (evt) => {
    validateRoomsAndGuests(evt.target);
  });

  housingType.addEventListener(`change`, (evt) => {
    if (evt.target.value === `flat`) {
      nightPrice.min = 1000;
      nightPrice.placeholder = `1000`;
    } else if (evt.target.value === `bungalow`) {
      nightPrice.min = 0;
      nightPrice.placeholder = `0`;
    } else if (evt.target.value === `house`) {
      nightPrice.min = 5000;
      nightPrice.placeholder = `5000`;
    } else if (evt.target.value === `palace`) {
      nightPrice.min = 10000;
      nightPrice.placeholder = `10000`;
    }
  });

  timeIn.addEventListener(`change`, (evt) => {
    if (evt.target.value === `12:00`) {
      timeOut.value = `12:00`;
    } else if (evt.target.value === `13:00`) {
      timeOut.value = `13:00`;
    } else if (evt.target.value === `14:00`) {
      timeOut.value = `14:00`;
    }
  });

  timeOut.addEventListener(`change`, (evt) => {
    if (evt.target.value === `12:00`) {
      timeIn.value = `12:00`;
    } else if (evt.target.value === `13:00`) {
      timeIn.value = `13:00`;
    } else if (evt.target.value === `14:00`) {
      timeIn.value = `14:00`;
    }
  });

  adForm.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(adForm), () => {
      window.deactivateMap();
      window.setDisabledValue(mapForm, true);
      window.setDisabledValue(adForm, true);
    });
    evt.preventDefault();
  });

  adFormReset.addEventListener(`click`, () => {
    window.deactivateMap();
    window.setDisabledValue(mapForm, true);
    window.setDisabledValue(adForm, true);
  });
})();
