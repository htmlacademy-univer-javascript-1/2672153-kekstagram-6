const isEscapeKey = (evt) => evt.key === 'Escape';

const showMessage = (templateId, buttonSelector) => {
  const template = document.querySelector(templateId);

  const messageElement = template.content.firstElementChild.cloneNode(true);
  const innerElement = messageElement.querySelector('div');

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (!innerElement.contains(evt.target)) {
      closeMessage();
    }
  }

  messageElement.querySelector(buttonSelector).addEventListener('click', closeMessage);

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.append(messageElement);
};

const showSuccessMessage = () => showMessage('#success', '.success__button');
const showErrorMessage = () => showMessage('#error', '.error__button');

export { showSuccessMessage, showErrorMessage };
