/* eslint-disable no-shadow */
/* eslint-disable no-self-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */


function colorgraph(metal, medium, numRows, numColumns, colorMap, radIndex, lenIndex, yourVlSpec) {
  let yourVlSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v2.0.json',
    description: 'A simple bar chart with embedded data.',
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
  return yourVlSpec
  console.log(yourVlSpec.data.values);
}
lenIndex = lenIndex;
radIndex = radIndex;
metal = metal;
medium = medium;
selectedTarget = selectedTarget;
colorMap = colorMap;
const numRows = colorMap[`${metal}_${medium}`].R.length - 1;
const numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
colorgraph(metal, medium, numRows, numColumns, colorMap, radIndex, lenIndex, yourVlSpec);
vegaEmbed('.bottom-ctl', yourVlSpec, { actions: false });
