const isEscapeKey = (evt) => evt.key === 'Escape';

// debounce — по ТЗ фильтров нужно 500мс
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, debounce };
