import { sendPicture } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { initImageScale, resetImageScale } from './shapes.js';
import { initEffects, resetEffects } from './effects.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('#upload-cancel');
const fileInput = document.querySelector('#upload-file');
const submitButton = document.querySelector('#upload-submit');

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

  // ВАЖНО: когда подключишь масштаб/эффекты - здесь же сбрасывай:
  // scale -> 100%, effect -> none/original, slider hidden и т.д.
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
