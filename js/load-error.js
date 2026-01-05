const showLoadError = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'fixed';
  alert.style.left = 0;
  alert.style.top = 0;
  alert.style.right = 0;
  alert.style.zIndex = 1000;
  alert.style.padding = '12px 16px';
  alert.style.textAlign = 'center';
  alert.style.fontSize = '16px';
  alert.style.backgroundColor = '#d9534f';
  alert.style.color = '#fff';

  alert.textContent = message;
  document.body.append(alert);
};

export { showLoadError };
