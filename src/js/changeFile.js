

/* eslint-disable no-console */
const menu = document.querySelector('#change-file-buttons');

menu.addEventListener('click', (evt) => {
  const svgfile = evt.target.getAttribute('value');
  if (svgfile) {
    document.querySelector('#my-stain-glass svg').remove();
    loadSVG(svgfile);
  }
});
