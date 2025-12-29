const fileInput = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');

const previewImage = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  // открываем форму
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  // показываем выбранную фотку в превью
  const url = URL.createObjectURL(file);
  previewImage.src = url;

  // и в превью эффектов (фон)
  effectPreviews.forEach((item) => {
    item.style.backgroundImage = `url("${url}")`;
  });
});
