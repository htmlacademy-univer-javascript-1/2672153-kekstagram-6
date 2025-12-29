const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createPictureElement = (pictureData) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const imgElement = pictureElement.querySelector('.picture__img');
  const likesElement = pictureElement.querySelector('.picture__likes');
  const commentsElement = pictureElement.querySelector('.picture__comments');

  imgElement.src = pictureData.url;
  imgElement.alt = pictureData.description;

  likesElement.textContent = pictureData.likes;
  commentsElement.textContent = pictureData.comments.length;

  return pictureElement;
};

const renderPictures = (picturesData) => {
  const fragment = document.createDocumentFragment();

  picturesData.forEach((pictureData) => {
    fragment.appendChild(createPictureElement(pictureData));
  });

  picturesContainer.append(fragment);
};

export { renderPictures };
