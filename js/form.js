'use strict';

(() => {
  const FormsData = {
    ROOMS_MAX_QUANTITY: `100`,
    NOT_FOR_GUESTS_PLACES: `0`
  };

  const MapPinMainCenter = {
    X: window.map.getMainPinSize().WIDTH / 2,
    Y: window.map.getMainPinSize().HEIGHT / 2
  };

  const MapPinMainOffset = {
    X: window.map.getMainPinSize().WIDTH / 2,
    Y: window.map.getMainPinSize().HEIGHT + window.map.getMainPinSize().TIP_HEIGHT
  };

  const adForm = document.querySelector(`.ad-form`);
  const adAddress = adForm.querySelector(`input[name='address']`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  const mapForm = document.querySelector(`.map__filters`);

  const deactivateMap = () => {
    const map = document.querySelector(`.map`);
    const mapCard = map.querySelector(`.map__card`);
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

  const deactivatePage = () => {
    deactivateMap();
    window.setDisabledValue(mapForm, true);
    window.setDisabledValue(adForm, true);
    window.form.deactivate();
  };

  window.form = {
    setAddress: () => {
      const mapPinMainInactiveX = parseInt(mapPinMain.style.left, 10) + MapPinMainCenter.X;
      const mapPinMainInactiveY = parseInt(mapPinMain.style.top, 10) + MapPinMainCenter.Y;
      const mapPinMainActiveXOffset = parseInt(mapPinMain.style.left, 10) + MapPinMainOffset.X;
      const mapPinMainActiveYOffset = parseInt(mapPinMain.style.top, 10) + MapPinMainOffset.Y;
      if (adForm.classList.contains(`ad-form--disabled`)) {
        adAddress.placeholder = `${parseInt(mapPinMainInactiveX, 10)}, ${parseInt(mapPinMainInactiveY, 10)}`;
      } else {
        adAddress.value = `${parseInt(mapPinMainActiveXOffset, 10)}, ${parseInt(mapPinMainActiveYOffset, 10)}`;
      }
    },
    activate: () => {
      validateRoomsAndGuests();
      adForm.classList.remove(`ad-form--disabled`);
    },
    deactivate: () => {
      adForm.reset();
      adForm.classList.add(`ad-form--disabled`);
    }
  };

  const adTitle = adForm.querySelector(`#title`);
  const housingType = adForm.querySelector(`#type`);
  const nightPrice = adForm.querySelector(`#price`);
  const roomsQuantity = adForm.querySelector(`#room_number`);
  const guestsQuantity = adForm.querySelector(`#capacity`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);

  const validateTitleLength = (input) => {
    const adTitleLength = adTitle.value.length;
    if (adTitleLength >= 100) {
      input.setCustomValidity(`Заголовок объявления не должен превышать 100 символов`);
    } else {
      input.setCustomValidity(``);
    }
  };

  adTitle.addEventListener(`input`, (evt) => {
    validateTitleLength(evt.target);
  });

  const validateRoomsAndGuests = () => {
    const roomsCount = roomsQuantity.value;
    const guestsCount = guestsQuantity.value;
    if (guestsCount > roomsCount) {
      roomsQuantity.setCustomValidity(`Количество гостей не должно превышать количество комнат`);
    } else if (roomsCount === FormsData.ROOMS_MAX_QUANTITY && guestsCount !== FormsData.NOT_FOR_GUESTS_PLACES) {
      roomsQuantity.setCustomValidity(`100 комнат не предназначены для гостей`);
    } else if (roomsCount !== FormsData.ROOMS_MAX_QUANTITY && guestsCount === FormsData.NOT_FOR_GUESTS_PLACES) {
      roomsQuantity.setCustomValidity(`Не для гостей предназначены только 100 комнат`);
    } else {
      roomsQuantity.setCustomValidity(``);
    }
  };

  roomsQuantity.addEventListener(`change`, () => {
    validateRoomsAndGuests();
  });

  guestsQuantity.addEventListener(`change`, () => {
    validateRoomsAndGuests();
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
    evt.preventDefault();
    window.upload(new FormData(adForm), () => {
      deactivatePage();
    });
  });

  adForm.addEventListener(`reset`, () => {
    deactivatePage();
    nightPrice.placeholder = `1000`;
  });

  window.form.setAddress();
})();
