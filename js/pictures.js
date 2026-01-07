import { openBigPicture } from './bigpictures.js';

export const renderPictures = (photos) => {
  const template = document
    .querySelector('#picture')
    .content
    .querySelector('.picture');

  const container = document.querySelector('.pictures');

  // удаляем старые миниатюры, если они уже были (оставляем только блоки, не являющиеся .picture)
  container.querySelectorAll('.picture').forEach((item) => item.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const { url, description, likes, comments } = photo;

    const node = template.cloneNode(true);

    const img = node.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    node.querySelector('.picture__likes').textContent = likes;
    node.querySelector('.picture__comments').textContent = comments.length;

    node.addEventListener('click', () => {
      openBigPicture(photo);
    });

    fragment.appendChild(node);
  });

  container.appendChild(fragment);
};
