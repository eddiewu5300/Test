/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-self-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */


function colorgraph(metal, medium, numRows, numColumns, colorMap, radIndex = 1, lenIndex = 1) {
  const yourVlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
    description: 'A simple bar chart with embedded data.',
    autosize: {
      type: 'fit',
      resize: 'true',
    },
    data: {
      values: [],
    },
    encoding: {
      x: { field: 'length', type: 'ordinal', scale: { rangeStep: null } },
      y: { field: 'radius', type: 'ordinal', scale: { rangeStep: null } },
    },
    layer: [{
      mark: 'rect',
      encoding: {
        color: {
          field: 'color',
          type: 'nominal',
          scale: null,
        },
      },
    }, {
      mark: 'circle',
      encoding: {
        color: {
          condition: {
            test: 'datum.selected',
            value: 'cyan',
          },
          value: 'rgba(0, 0, 0, 0)',
        },
      },
    }],
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
        length,
        radius,
        color: `rgb(${red},${green},${blue})`,
        selected,
      });
    }
  }
  return yourVlSpec;
}

// function selected_color(radIndex, lenIndex, numRows, numColumns, yourVlSpec) {
//   for (let r = 1; r <= numRows; r++) {
//     for (let l = 1; l <= numColumns; l++) {
//       let selected = false;
//       if (r === radIndex && l === lenIndex) selected = true;
//       yourVlSpec.data.values.push(selected)
//     }
//   }
// }

function selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec) {
  for (let i = 0; i < yourVlSpec.data.values.length; i++) {
    yourVlSpec.data.values[i].selected = false;
  }
  tmp = (numColumns * radIndex + lenIndex);
  yourVlSpec.data.values[tmp].selected = true;
  vegaEmbed('#color-spectrum', yourVlSpec, { actions: false });
}

lenIndex = lenIndex;
radIndex = radIndex;
metal = metal;
medium = medium;
selectedTarget = selectedTarget;

// const numRows = colorMap[`${metal}_${medium}`].R.length - 1;
// const numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
const goldGlassVec = colorgraph('Au', 'glass', colorMap.Au_glass.R.length - 1, colorMap.Au_glass.R[0].length - 1, colorMap);
const silverGlassVec = colorgraph('Ag', 'glass', colorMap.Ag_glass.R.length - 1, colorMap.Ag_glass.R[0].length - 1, colorMap);
const goldWaterVec = colorgraph('Au', 'water', colorMap.Au_water.R.length - 1, colorMap.Au_water.R[0].length - 1, colorMap);
const silverWaterVec = colorgraph('Ag', 'water', colorMap.Ag_water.R.length - 1, colorMap.Ag_water.R[0].length - 1, colorMap);
// selected_color(5, 10, colorMap[`Au_glass`].R.length - 1, colorMap[`Au_glass`].R[0].length - 1, goldGlassVec);
vegaEmbed('#color-spectrum', goldGlassVec, { actions: false });
const marks = document.querySelector('.marks');
// marks.setAttribute('style', 'width: 100%; height: 100%;');

// vegaEmbed('#color-spectrum', silverGlassVec, { actions: false });
// vegaEmbed('#color-spectrum', goldGlassVec, { actions: false });
