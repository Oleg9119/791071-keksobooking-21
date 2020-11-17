'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatarInput = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const housingInput = document.querySelector(`.ad-form__upload input[type=file]`);
const housingPreview = document.querySelector(`.ad-form__photo`);

avatarInput.addEventListener(`change`, () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

housingInput.addEventListener(`change`, () => {
  const file = housingInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((ending) => {
    return fileName.endsWith(ending);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      const housingPreviewImage = document.createElement(`img`);
      housingPreviewImage.style.width = `70px`;
      housingPreviewImage.style.height = `70px`;
      housingPreviewImage.src = reader.result;
      housingPreview.appendChild(housingPreviewImage);
    });

    reader.readAsDataURL(file);
  }
});
