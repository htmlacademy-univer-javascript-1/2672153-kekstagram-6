import { openFullSize } from './fullsize.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

function createPictureElement(pictureData) {
    const pictureElement = pictureTemplate.cloneNode(true);

    const imgElement = pictureElement.querySelector('.picture__img');
    const likesElement = pictureElement.querySelector('.picture__likes');
    const commentsElement = pictureElement.querySelector('.picture__comments');

    imgElement.src = pictureData.url;
    imgElement.alt = pictureData.description;
    likesElement.textContent = pictureData.likes;
    commentsElement.textContent = pictureData.comments.length;

    pictureElement.addEventListener('click', (event) => {
        event.preventDefault();
        openFullSize(pictureData);
    });

    return pictureElement;
}

function renderPictures(picturesData) {
    const fragment = document.createDocumentFragment();

    picturesData.forEach((pictureData) => {
        const miniature = createPictureElement(pictureData);
        fragment.appendChild(miniature);
    });

    picturesContainer.appendChild(fragment);
}

export { renderPictures };
