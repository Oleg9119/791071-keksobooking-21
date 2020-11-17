const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/preview.js",
    "./js/debounce.js",
    "./js/closeErrorMessage.js",
    "./js/closeSuccessMessage.js",
    "./js/closeErrorUploadMessage.js",
    "./js/onLoad.js",
    "./js/onError.js",
    "./js/onUploadSuccess.js",
    "./js/onUploadError.js",
    "./js/upload.js",
    "./js/download.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/form.js",
    "./js/filter.js",
    "./js/move.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
