/* eslint-disable quotes */
/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
// color mapping interaction
// eslint-disable-next-line camelcase
const topCtl = document.querySelector('.top-ctl');
const bottomCtl = document.querySelector('.bottom-ctl');
const input = document.querySelector('#number1');
const input2 = document.querySelector('#number2');
const input3 = document.getElementById('metal1');
const input4 = document.getElementById('metal2');
const input5 = document.querySelector('#medium1');
const input6 = document.querySelector('#medium2');
const cylinder = document.querySelector('#cylinder');


let lenIndex = 1;
let radIndex = 1;
let metal = 'Au';
let medium = 'glass';
let selectedTarget = null;

// get the exteranl svg file and parse it into DOM
async function loadSVG() {
  let r = 0;
  let g = 0;
  let b = 0;
  let svg = null;
  let numRows = 24;
  let numColumns = 51;
  let firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
  let firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
  // let lastRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
  // let lastLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
  const response = await fetch('stain_glass_files/BUTTERFLY.svg');
  const text = await response.text();
  // console.log(text, 'texttexttext');
  document.querySelector('#my-stain-glass').insertAdjacentHTML('afterBegin', text);
  svg = document.querySelector('svg');
  svg.setAttribute("height", "100%");
  svg.setAttribute("width", "100%");
  if (svg) {
    svg.querySelectorAll('polygon, path').forEach((d) => {
      // console.log(d);
      d.classList.add('color-selector');
    });
  }
  // add attribute to svg
  if (svg) {
    svg.querySelectorAll('.color-selector').forEach((d) => {
      // console.log(d);
      d.setAttribute('data-color', `rgb(${r},${g},${b})`);
      d.setAttribute('metal', metal);
      d.setAttribute('medium', medium);
      d.setAttribute('lenIndex', lenIndex);
      d.setAttribute('radIndex', radIndex);
    });
  }
  // listen the selected item and store the color, value in class
  svg.addEventListener('click', (evt) => {
    // console.log(evt.target);
    console.log("selected");
    const targetColor = evt.target.getAttribute('data-color');

    if (targetColor) {
      // console.log(evt.target.getAttribute('data-color'))
      Array.from(svg.querySelectorAll('.color-selector')).forEach((d) => {
        // console.log(d);
        d.classList.remove('selected');
      });
      // set up the selected item's attribute at css
      evt.target.classList.add('selected');
      selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
      // cylinder.setAttribute('color', targetColor);

      rgbValue = targetColor
        .substring(0, targetColor.length - 1)
        .substring(4)
        .split(',')
        .map(d => Number(d));
      // console.log(rgbValue)
      r = rgbValue[0];
      g = rgbValue[1];
      b = rgbValue[2];

      lenIndex = parseInt(evt.target.getAttribute('lenIndex'));
      radIndex = parseInt(evt.target.getAttribute('radIndex'));

      metal = evt.target.getAttribute('metal');
      // console.log(metal)
      medium = evt.target.getAttribute('medium');
      // console.log(medium)

      if (metal === 'Au') {
        document.querySelector('#metal1').checked = true;
      }
      if (medium === 'glass') {
        document.querySelector('#medium1').checked = true;
      }
      if (metal === 'Ag') {
        document.querySelector('#metal2').checked = true;
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

      // console.log('length int',firstLengthValue)
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
      const lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
      console.log('rad val', radiusValue);
      const parHeight = lengthValue;
      const parRadius = radiusValue;

      console.log('height radius', parHeight, parRadius);
      cylinder.setAttribute('height', parHeight);
      cylinder.setAttribute('radius', parRadius);
      // evt.target.setAttribute('data-color', newColor);
      // evt.target.style.fill = newColor;
    }
  });

  input.addEventListener('change', (event) => {
    // console.log(event);
    console.log(event.target.value);

    lenIndex = parseInt(event.target.value);
    // checking if the radius of L/R >2
    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    const lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
    if (lengthValue / radiusValue < 2) {
      console.log('ratio of L/R < 2!!!');
      radIndex = Math.floor((lengthValue / 2 - firstRadiusValue) / 2) + 1;
      input2.value = radIndex;
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    const parHeight = lengthValue;
    const parRadius = radiusValue;

    console.log('height radius', parHeight, parRadius);
    cylinder.setAttribute('height', parHeight);
    // cylinder.setAttribute('radius',parRadius)


    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];
    // bottomCtl.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
    const newColor = `rgb(${r},${g},${b})`;
    // cylinder.setAttribute('color', newColor);
    // get the selected item

    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    // console.log(selectedTarget);

    // set color for 3D particle

    // set color for svg
    if (selectedTarget) {
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
      // store the current length and radius index
      selectedTarget.setAttribute('lenIndex', lenIndex);
      selectedTarget.setAttribute('radIndex', radIndex);
    }
  });

  input2.addEventListener('change', (event) => {
    // console.log(event);
    // console.log('input2,', event.target.value);

    radIndex = parseInt(event.target.value);

    // checking if the ratio of L/R >2
    const radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
    if (lengthValue / radiusValue < 2) {
      console.log('ratio of L/R < 2!!!');
      lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;
      input.value = lenIndex;
      lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    }

    const parHeight = lengthValue;
    const parRadius = radiusValue;
    console.log('height radius', parHeight, parRadius);
    // cylinder.setAttribute('height',parHeight)
    cylinder.setAttribute('radius', parRadius);

    r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
    g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
    b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];
    const newColor = `rgb(${r},${g},${b})`;
    // set color for 3D particle
    // cylinder.setAttribute('color', newColor);

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
  });

  input3.addEventListener('change', (event) => {
    console.log(`${metal}_${medium}`);
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

    // set color for 3D particle
    // cylinder.setAttribute('color', newColor);
    cylinder.setAttribute('color', 'gold');

    // get the selected item
    const selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      // console.log(selectedTarget);
      svg.querySelector('.selected').setAttribute('metal', metal);
      const newColor = `rgb(${r},${g},${b})`;
      // set color for 3D particle
      // cylinder.setAttribute('color', newColor);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }

    var yourVlSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
      description: 'A simple bar chart with embedded data.',
      data: {
        values: []
      },
      encoding: {
        x: {field: 'length', type: 'ordinal', scale: { rangeStep: null }},
        y: {field: 'radius', type: 'ordinal', scale: { rangeStep: null }},
      },
      layer: [{
        mark: 'rect',
        encoding: {
          color: {
            field: 'color',
            scale: null
          }
        }
      }, {
        mark: 'circle',
        encoding: {
          color: {
            condition: {
              test: 'datum.selected',
              value: 'cyan'
            },
            value: 'rgba(0, 0, 0, 0)'
          }
        }
      }]
    };

    for (let r = 1; r <= numRows; r++) {

      for (let l = 1; l <= numColumns; l++) {

        const radius = colorMap[`${metal}_${medium}`].R[r][0];
        const length = colorMap[`${metal}_${medium}`].R[0][l];

        const red = colorMap[`${metal}_${medium}`].R[r][l];
        const green = colorMap[`${metal}_${medium}`].G[r][l];
        const blue = colorMap[`${metal}_${medium}`].B[r][l];

        let selected = false;
        if (r === radIndex && l === lenIndex) selected = true;

        yourVlSpec.data.values.push({
          length: length,
          radius: radius,
          color: `rgb(${red},${green},${blue})`,
          selected: selected
        });
      }
    }

    console.log(yourVlSpec.data.values);





    vegaEmbed('.bottom-ctl', yourVlSpec, {"actions": false});






  });

  input4.addEventListener('change', (event) => {
    console.log(`${metal}_${medium}`);

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
    // set color for 3D particle
    // cylinder.setAttribute('color', newColor);
    cylinder.setAttribute('color', 'silver');
    // get the selected item
    const selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('metal', metal);
      // console.log(selectedTarget);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
  });

  input5.addEventListener('change', (event) => {
    console.log(`${metal}_${medium}`);

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
    // set color for 3D particle
    // cylinder.setAttribute('color', newColor);
    // get the selected item

    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('medium', medium);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
  });

  input6.addEventListener('change', (event) => {
    console.log(`${metal}_${medium}`);
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
    // set color for 3D particle
    // cylinder.setAttribute('color', newColor);

    // get the selected item
    selectedTarget = document.querySelectorAll('.color-selector.selected')[0];
    if (selectedTarget) {
      svg.querySelector('.selected').setAttribute('medium', medium);
      // set color for svg
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
    }
  });
}

loadSVG();
