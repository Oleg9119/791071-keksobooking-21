'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  const MapPinMainCoordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

  const MapPinMainLimits = {
    TOP: MapPinMainCoordinates.Y_MIN - (window.map.getMainPinSize().HEIGHT + window.map.getMainPinSize().TIP_HEIGHT),
    BOTTOM: MapPinMainCoordinates.Y_MAX - (window.map.getMainPinSize().HEIGHT + window.map.getMainPinSize().TIP_HEIGHT),
    LEFT: MapPinMainCoordinates.X_MIN - window.map.getMainPinSize().WIDTH / 2,
    RIGHT: MapPinMainCoordinates.X_MAX - window.map.getMainPinSize().WIDTH / 2
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    const mapCoordinates = map.getBoundingClientRect();

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const coordinates = {
        x: moveEvt.clientX - mapCoordinates.x - window.map.getMainPinSize().WIDTH / 2,
        y: moveEvt.clientY - mapCoordinates.y - window.map.getMainPinSize().HEIGHT / 2
      };

      if (coordinates.x < MapPinMainLimits.LEFT) {
        mapPinMain.style.left = MapPinMainLimits.LEFT + `px`;
      } else if (coordinates.x > MapPinMainLimits.RIGHT) {
        mapPinMain.style.left = MapPinMainLimits.RIGHT + `px`;
      } else {
        mapPinMain.style.left = coordinates.x + `px`;
      }

      if (coordinates.y < MapPinMainLimits.TOP) {
        mapPinMain.style.top = MapPinMainLimits.TOP + `px`;
      } else if (coordinates.y > MapPinMainLimits.BOTTOM) {
        mapPinMain.style.top = MapPinMainLimits.BOTTOM + `px`;
      } else {
        mapPinMain.style.top = coordinates.y + `px`;
      }
      window.form.setAddress();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
