import { isEscapeKey } from './utils.js';
import { initEffects, resetEffects, destroyEffects } from './effects.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // ✅ включаем эффекты + слайдер
  initEffects();

  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  // ✅ вернуть “Оригинал”, скрыть слайдер, очистить filter и поле value
  resetEffects();

  // ✅ если хочешь прям “с нуля” при каждом открытии — уничтожаем:
  // destroyEffects();

  form.reset();
  fileInput.value = '';

  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

fileInput.addEventListener('change', () => {
  openForm();
});

cancelButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

export { openForm };
