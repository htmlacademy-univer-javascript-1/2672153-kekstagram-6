import { renderPictures } from './miniatures.js';
import { loadPictures } from './api.js';
import { showLoadError } from './load-error.js';
import { initFilters } from './filters.js';

import './upload-form.js';
import './upload-preview.js';

const init = async () => {
  try {
    const photos = await loadPictures();

    // 5.1 «По умолчанию» — сразу рендерим как пришло с сервера
    renderPictures(photos);

    // 5.2 + 5.3 — показываем фильтры и вешаем обработчики с debounce
    initFilters(photos, renderPictures);
  } catch (err) {
    showLoadError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  }
};

init();
