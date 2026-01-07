import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initImageScale, resetImageScale } from './shapes.js';
import { initEffects, resetEffects } from './effects.js';

// ⚠️ Если Pristine подключён через <script> и доступен как window.Pristine,
// то строку импорта удали и используй просто Pristine ниже.
const { Pristine } = window;

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');

// поля для валидации
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

// ✅ 3 разных сообщения (п. 3.2)
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

// 1) Открытие формы — по выбору файла (п.1.2)
fileInput.addEventListener('change', () => {
  openForm();
});

// 2) Закрытие по Esc (п.1.3)
document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape' && !overlay.classList.contains('hidden')) {
    evt.preventDefault();
    closeForm();
    resetFormToDefault();
  }
});

// 3) Закрытие по кнопке cancel (п.3.6)
cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
  resetFormToDefault();
});

// 4) Сабмит через fetch (п.3.1 + 3.4 + 3.5)
form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  // ✅ Валидация (п.3.2)
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
    // ВАЖНО: ничего не сбрасываем — данные должны сохраниться (п.3.5)
    showErrorMessage();
  } finally {
    unblockSubmit();
  }
});
