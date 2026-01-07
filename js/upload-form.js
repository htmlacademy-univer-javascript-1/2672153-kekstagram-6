import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initImageScale, resetImageScale } from './shapes.js';
import { initEffects, resetEffects } from './effects.js';
import { resetPreview } from './upload-preview.js';

const { Pristine } = window;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');

const hashtagInput = form.querySelector('.text__hashtags');

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;

const normalizeHashtags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const validateHashtagFormat = (value) => {
  const tags = normalizeHashtags(value);
  return tags.every((tag) => HASHTAG_REGEX.test(tag));
};

const validateHashtagCount = (value) => {
  const tags = normalizeHashtags(value);
  return tags.length <= MAX_HASHTAGS;
};

const validateHashtagUnique = (value) => {
  const tags = normalizeHashtags(value).map((t) => t.toLowerCase());
  return new Set(tags).size === tags.length;
};

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__error',
});

pristine.addValidator(
  hashtagInput,
  validateHashtagFormat,
  'Введён невалидный хэш-тег'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagCount,
  'Превышено количество хэш-тегов'
);

pristine.addValidator(
  hashtagInput,
  validateHashtagUnique,
  'Хэш-теги повторяются'
);

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  initImageScale();
  initEffects();
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const resetFormToDefault = () => {
  form.reset();
  fileInput.value = '';

  resetPreview();
  resetImageScale();
  resetEffects();
  pristine.reset();
};

const blockSubmit = () => {
  submitButton.disabled = true;
};

const unblockSubmit = () => {
  submitButton.disabled = false;
};

fileInput.addEventListener('change', () => {
  openForm();
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    evt.preventDefault();
    closeForm();
    resetFormToDefault();
  }
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
  resetFormToDefault();
});

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  try {
    blockSubmit();
    await sendPicture(new FormData(form));
    closeForm();
    resetFormToDefault();
    showSuccessMessage();
  } catch (err) {
    showErrorMessage();
  } finally {
    unblockSubmit();
  }
});
