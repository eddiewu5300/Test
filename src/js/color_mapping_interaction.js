/* eslint-disable no-plusplus */
/* eslint-disable quotes */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
// color mapping interaction
// eslint-disable-next-line camelcase
const topCtl = document.querySelector('.top-ctl');
const bottomCtl = document.querySelector('.bottom-ctl');
const colorSpectrum = document.querySelector('.color-spectrum');
const input = document.querySelector('#number1');
const input2 = document.querySelector('#number2');
const input3 = document.getElementById('metal1');
const input4 = document.getElementById('metal2');
const input5 = document.querySelector('#medium1');
const input6 = document.querySelector('#medium2');
const cylinder = document.querySelector('#cylinder');

// global variable, which changes accoss different javascript files
let lenIndex = 1;
let radIndex = 1;
let metal = 'Au';
let medium = 'glass';
let selectedTarget = null;

// get the exteranl svg file and parse it into DOM
async function loadSVG(svgname) {
  let r = 0;
  let g = 0;
  let b = 0;
  let svg = null;
  let numRows = colorMap[`${metal}_${medium}`].R.length - 1;
  let numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
  let firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
  let firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];

  // asyncronize loading svg
  const response = await fetch(`stain_glass_files/${svgname}.svg`);
  const text = await response.text();

  document.querySelector('#my-stain-glass').insertAdjacentHTML('afterBegin', text);
  svg = document.querySelector('svg');

  svg.setAttribute("height", "100%");
  svg.setAttribute("width", "100%");
  // add class for quering when selected
  if (svg) {
    svg.querySelectorAll('polygon, path, rect, g, circle, ellipse').forEach((d) => {
      d.classList.add('color-selector');
    });
  }
  // add attribute to svg
  if (svg) {
    svg.querySelectorAll('.color-selector').forEach((d) => {

      d.setAttribute('data-color', `rgb(${r},${g},${b})`);
      d.setAttribute('metal', metal);
      d.setAttribute('medium', medium);
      d.setAttribute('lenIndex', lenIndex);
      d.setAttribute('radIndex', radIndex);
    });
  }
  // add id on each component for highlight effect purpose
  // exclude first two because first two are the outline of the graph
  svgList = svg.querySelectorAll('.color-selector');
  for (let i = 2; i < svgList.length; i++) {
    if (svgList[i].getAttribute('id')) {
      continue;
    } else {
      svgList[i].setAttribute('id', `id${i}`);
    }
  }

  input.max = numColumns;
  input2.max = numRows;

  // listen the selected item and store the color, value in class
  svg.addEventListener('click', (evt) => {

    const targetColor = evt.target.getAttribute('data-color');
    // add the selected class into the selected component and remove selected from others
    // highlight the first two component in the graph if selected by css
    if (targetColor) {

      Array.from(svg.querySelectorAll('.color-selector')).forEach((d) => {

        d.classList.remove('selected');
      });
      evt.target.classList.add('selected');
      selectedTarget = document.querySelectorAll('.color-selector.selected')[0];

      // reading selected item color
      rgbValue = targetColor
        .substring(0, targetColor.length - 1)
        .substring(4)
        .split(',')
        .map(d => Number(d));
      r = rgbValue[0];
      g = rgbValue[1];
      b = rgbValue[2];
      //highlight the outline of selected item except first two
      id = evt.target.getAttribute('id');
      use = svg.querySelector('use');
      use.setAttribute('xlink:href', `#${id}`);
      use.setAttribute('stroke', 'red');
      use.setAttribute('stroke-width', '10');


      lenIndex = parseInt(evt.target.getAttribute('lenIndex'));
      radIndex = parseInt(evt.target.getAttribute('radIndex'));

      metal = evt.target.getAttribute('metal');

      medium = evt.target.getAttribute('medium');

      // for radio buttom interaciton
      if (metal === 'Au') {
        document.querySelector('#metal1').checked = true;
        cylinder.setAttribute('color', 'gold');
      }
      if (medium === 'glass') {
        document.querySelector('#medium1').checked = true;
      }
      if (metal === 'Ag') {
        document.querySelector('#metal2').checked = true;
        cylinder.setAttribute('color', 'silver');
      }
      if (medium === 'water') {
        document.querySelector('#medium2').checked = true;
      }

      numRows = colorMap[`${metal}_${medium}`].R.length - 1;
      numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;

      input.max = numColumns;
      input2.max = numRows;
      input.value = lenIndex;
      input2.value = radIndex;


      const radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
      const lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];

      const parHeight = lengthValue;
      const parRadius = radiusValue;


      cylinder.setAttribute('height', parHeight);
      cylinder.setAttribute('radius', parRadius);
      // reset the color spectrum
      if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
      if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
      if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
      if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
      selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
    }
  });
  // eventlistener for length
  input.addEventListener('change', (event) => {

    lenIndex = parseInt(event.target.value);
    // checking if the radius of L/R >2
    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
    if (lengthValue / radiusValue < 2) {

      radIndex = Math.floor((lengthValue / 2 - firstRadiusValue) / 2) + 1;
      input2.value = radIndex;
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    const parHeight = lengthValue;
    const parRadius = radiusValue;


    cylinder.setAttribute('height', parHeight);
    cylinder.setAttribute('radius', parRadius);

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];

    const newColor = `rgb(${r},${g},${b})`;

    // get the selected item

    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];

    // set color for svg
    if (selectedTarget) {
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
      // store the current length and radius index
      selectedTarget.setAttribute('lenIndex', lenIndex);
      selectedTarget.setAttribute('radIndex', radIndex);
    }
    // reset the color spectrum
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });
  // listen to the radius slider
  input2.addEventListener('change', (event) => {


    radIndex = parseInt(event.target.value);

    // checking if the ratio of L/R >2
    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
    if (lengthValue / radiusValue < 2) {

      lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;

      if (lenIndex > numColumns) {
        lenIndex = numColumns;
      }
      input.value = lenIndex;
      lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    }

    const parHeight = lengthValue;
    const parRadius = radiusValue;
    cylinder.setAttribute('height', parHeight);
    cylinder.setAttribute('radius', parRadius);

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];
    const newColor = `rgb(${r},${g},${b})`;


    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
      // store the current length and radius index
      selectedTarget.setAttribute('lenIndex', lenIndex);
      selectedTarget.setAttribute('radIndex', radIndex);
    }
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });
  // listion the chnge of radio button for metal
  input3.addEventListener('change', (event) => {

    if (event.target.checked) {
      metal = event.target.value;
    }
    numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;

    input.max = numColumns;
    input2.max = numRows;
    if (radIndex > input2.max) {
      radIndex = input2.max;
    }
    if (lenIndex > input.max) {
      lenIndex = input.max;
    }

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];


    const newColor = `rgb(${r},${g},${b})`;

    cylinder.setAttribute('color', 'gold');

    // get the selected item
    const selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {

      svg.querySelector('.selected').setAttribute('metal', metal);
      const newColor = `rgb(${r},${g},${b})`;
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });

  input4.addEventListener('change', (event) => {


    if (event.target.checked) {
      metal = event.target.value;
    }
    numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
    input.max = numColumns;

    input2.max = numRows;

    if (radIndex > input2.max) {
      radIndex = input2.max;
    }
    if (lenIndex > input.max) {
      lenIndex = input.max;
    }
    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];

    const newColor = `rgb(${r},${g},${b})`;

    cylinder.setAttribute('color', 'silver');
    // get the selected item
    const selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('metal', metal);

      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });


  input5.addEventListener('change', (event) => {


    if (event.target.checked) {
      medium = event.target.value;
    }
    numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;

    input.max = numColumns;
    input2.max = numRows;
    if (radIndex > input2.max) {
      radIndex = input2.max;
    }
    if (lenIndex > input.max) {
      lenIndex = input.max;
    }

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];

    const newColor = `rgb(${r},${g},${b})`;

    // get the selected item

    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('medium', medium);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows - 1, numColumns - 1, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });

  input6.addEventListener('change', (event) => {

    if (event.target.checked) {
      medium = event.target.value;
    }
    numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;

    input.max = numColumns;
    input2.max = numRows;
    if (radIndex > input2.max) {
      radIndex = input2.max;
    }
    if (lenIndex > input.max) {
      lenIndex = input.max;
    }

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];
    const newColor = `rgb(${r},${g},${b})`;


    // get the selected item
    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('medium', medium);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows - 1, numColumns - 1, yourVlSpec);
    vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
  });
}

loadSVG("FISH");
