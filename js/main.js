
import { loadPictures } from './api.js';
import { renderPictures } from './miniatures.js';
import { showLoadError } from './load-error.js';
import './upload-form.js';
import './upload-preview.js';

loadPictures()
  .then((pictures) => {
    renderPictures(pictures);
  })
  .catch(() => {
    showLoadError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  });
