const EFFECTS = {
  none: {
    filter: null,
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const DEFAULT_EFFECT = 'none';

const imagePreview = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

let currentEffect = DEFAULT_EFFECT;
let sliderCreated = false;

const hideSlider = () => sliderContainer.classList.add('hidden');
const showSlider = () => sliderContainer.classList.remove('hidden');

const applyEffectToImage = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imagePreview.style.filter = '';
    valueElement.value = '';
    hideSlider();
    return;
  }

  imagePreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
  valueElement.value = value; // ✅ пишем в скрытое поле для отправки на сервер
  showSlider();
};

const setSliderForCurrentEffectAndResetToMax = () => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    applyEffectToImage('');
    return;
  }

  // ✅ обновляем диапазон/шаг
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
  });

  // ✅ “100%” по ТЗ = начальное состояние, ставим максимум эффекта
  sliderElement.noUiSlider.set(effect.max);
  applyEffectToImage(effect.max);
};

const onEffectChange = (evt) => {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;

  // ✅ важно: сброс уровня должен срабатывать при переключении фильтра
  setSliderForCurrentEffectAndResetToMax();
};

const onSliderUpdate = () => {
  if (currentEffect === 'none') {
    applyEffectToImage('');
    return;
  }

  const raw = sliderElement.noUiSlider.get();
  const effect = EFFECTS[currentEffect];

  // noUiSlider отдаёт строку — приводим красиво
  const value = effect.step < 1 ? Number(raw).toFixed(1) : String(parseInt(raw, 10));
  applyEffectToImage(value);
};

const initEffects = () => {
  // создаём слайдер только один раз
  if (!sliderCreated) {
    noUiSlider.create(sliderElement, {
      range: {
        min: EFFECTS.chrome.min,
        max: EFFECTS.chrome.max,
      },
      start: EFFECTS.chrome.max,
      step: EFFECTS.chrome.step,
      connect: 'lower',
    });

    sliderElement.noUiSlider.on('update', onSliderUpdate);
    effectsContainer.addEventListener('change', onEffectChange);

    sliderCreated = true;
  }

  // ✅ по умолчанию “Оригинал”
  currentEffect = DEFAULT_EFFECT;
  const noneRadio = effectsContainer.querySelector('input[value="none"]');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  imagePreview.style.filter = '';
  valueElement.value = '';
  hideSlider();
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;

  const noneRadio = effectsContainer.querySelector('input[value="none"]');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  imagePreview.style.filter = '';
  valueElement.value = '';
  hideSlider();

  // слайдер можно оставить созданным, но он скрыт в режиме none
  if (sliderCreated) {
    sliderElement.noUiSlider.set(1);
  }
};

const destroyEffects = () => {
  if (!sliderCreated) {
    return;
  }

  effectsContainer.removeEventListener('change', onEffectChange);
  sliderElement.noUiSlider.off('update', onSliderUpdate);
  sliderElement.noUiSlider.destroy();

  sliderCreated = false;
};

export { initEffects, resetEffects, destroyEffects };
