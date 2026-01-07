import { renderPictures } from './pictures.js';
import { loadPictures } from './api.js';
import { showLoadError } from './load-error.js';
import './upload-form.js';
import './upload-preview.js';

const init = async () => {
  try {
    const photos = await loadPictures();
    renderPictures(photos);
  } catch (err) {
    showLoadError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  }
};

init();

