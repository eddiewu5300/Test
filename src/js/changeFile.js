

/* eslint-disable no-console */
const menu = document.querySelector('#menu');

menu.addEventListener('click', (evt) => {
  const svgfile = evt.target.getAttribute('value');
  document.querySelector('#my-stain-glass svg').remove();
  loadSVG(svgfile);
});
