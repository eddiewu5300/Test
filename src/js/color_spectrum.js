/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-self-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */

// loading the vegalite color spectrum
function colorgraph(metal, medium, numRows, numColumns, colorMap, radIndex = 1, lenIndex = 1) {
  const yourVlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
    description: 'A simple bar chart with embedded data.',
    width: 200,
    height: 200,
    // config: { axis: null, labels: null },
    data: {
      values: [],
    },
    encoding: {
      x: {
        field: 'length', type: 'ordinal', scale: { rangeStep: null }, axis: null,
      },
      y: {
        field: 'radius', type: 'ordinal', scale: { rangeStep: null }, axis: null,
      },
    },
    layer: [{
      mark: 'rect',
      encoding: {
        color: {
          condition: {
            test: 'datum.selected',
            value: 'white',
          },
          field: 'color',
          type: 'nominal',
          scale: null,
        },
      },
    }, {
      mark: 'circle',
      size: 500,
      encoding: {

        color: {
          condition: {
            test: 'datum.selected',
            value: 'red',
            size: 500,
          },
          config: { circle: { size: 500 } },
          value: 'rgba(0, 0, 0, 0)',
        },
      },
    }],
  };
  const boxHeight = bottomCtl.clientHeight;
  const boxWidth = bottomCtl.clientWidth;
  for (let r = 1; r <= numRows; r++) {
    for (let l = 1; l <= numColumns; l++) {
      const radius = colorMap[`${metal}_${medium}`].R[r][0];
      const length = colorMap[`${metal}_${medium}`].R[0][l];

      let red = colorMap[`${metal}_${medium}`].R[r][l];
      let green = colorMap[`${metal}_${medium}`].G[r][l];
      let blue = colorMap[`${metal}_${medium}`].B[r][l];

      if (red === '_NaN_') {
        red = 256;
      }
      if (green === '_NaN_') {
        green = 256;
      }
      if (blue === '_NaN_') {
        blue = 256;
      }

      let selected = false;
      if (r === radIndex && l === lenIndex) selected = true;

      yourVlSpec.data.values.push({
        length,
        radius,
        color: `rgb(${red},${green},${blue})`,
        selected,
      });
    }
  }
  if (boxHeight >= boxWidth) {
    yourVlSpec.height = boxHeight;
    yourVlSpec.width = boxHeight;
  } else {
    yourVlSpec.height = boxWidth;
    yourVlSpec.width = boxWidth;
  }

  return yourVlSpec;
}
// show the selected color by red dot
function selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec) {
  for (let i = 0; i < yourVlSpec.data.values.length; i++) {
    yourVlSpec.data.values[i].selected = false;
  }

  tmp = (numColumns * (radIndex - 1) + lenIndex) - 1;
  yourVlSpec.data.values[tmp].selected = true;
  vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
}

lenIndex = lenIndex;
radIndex = radIndex;
metal = metal;
medium = medium;
selectedTarget = selectedTarget;


// store 4 kind of spectrum value in variables
const goldGlassVec = colorgraph('Au', 'glass', colorMap.Au_glass.R.length - 1, colorMap.Au_glass.R[0].length - 1, colorMap);
const silverGlassVec = colorgraph('Ag', 'glass', colorMap.Ag_glass.R.length - 1, colorMap.Ag_glass.R[0].length - 1, colorMap);
const goldWaterVec = colorgraph('Au', 'water', colorMap.Au_water.R.length - 1, colorMap.Au_water.R[0].length - 1, colorMap);
const silverWaterVec = colorgraph('Ag', 'water', colorMap.Ag_water.R.length - 1, colorMap.Ag_water.R[0].length - 1, colorMap);

let vegView = null;
vegaEmbed('#color-spectrum', goldGlassVec, { actions: false }).then((result) => { vegView = result.view; console.log(); });
