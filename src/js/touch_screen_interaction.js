/* eslint-disable no-console */
/* eslint-disable no-self-assign */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-// console */


function touchInteraction() {
  const touchbox = document.querySelector('a-scene');

  const hammertime = new Hammer(touchbox);
  let X1startFromRight = null;
  let Y1startFromUP = null;
  let leftStart = 0;
  let rightStart = 0;
  let upStart = 0;
  let downStart = 0;
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinchstart', (pinchstart) => {
    ga('send', 'event', 'interaction', 'pinch', '3d particle');

    const X1start = pinchstart.pointers[0].clientX;
    const X2start = pinchstart.pointers[1].clientX;
    const Y1start = pinchstart.pointers[0].clientY;
    const Y2start = pinchstart.pointers[1].clientY;
    X1startFromRight = (X1start >= X2start);
    Y1startFromUP = (Y1start <= Y2start);
    if (X1startFromRight) {

      leftStart = X2start;
      rightStart = X1start;
    } else {

      leftStart = X1start;
      rightStart = X2start;
    }
    if (Y1startFromUP) {

      upStart = Y2start;
      downStart = Y1start;
    } else {

      upStart = Y1start;
      downStart = Y2start;
    }

  });

  hammertime.on('pinch', (pinch) => {
    const X1location = pinch.pointers[0].clientX
    const X2location = pinch.pointers[1].clientX
    const Y1location = pinch.pointers[0].clientY
    const Y2location = pinch.pointers[1].clientY
    let leftDelta;
    let rightDelta;
    let upDelta;
    let downDelta;

    if (X1startFromRight) {
      leftDelta = X2location - leftStart;
      rightDelta = X1location - rightStart;

    } else {
      leftDelta = X1location - leftStart;
      rightDelta = X2location - rightStart;
    }
    const totalDeltaX = rightDelta - leftDelta;
    if (Y1startFromUP) {
      upDelta = Y2location - upStart;
      downDelta = Y1location - downStart;

    } else {
      upDelta = Y1location - upStart;
      downDelta = Y2location - downStart;
    }
    const totalDeltaY = upDelta - downDelta;

    const numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    const numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
    const firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
    const firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];

    if ((totalDeltaX % 2) > 0) {

      lenIndex += 1;
    }
    if ((totalDeltaX % 2) < 0) {

      lenIndex -= 1;
    }
    if ((totalDeltaY % 2) > 0) {

      radIndex += 1;
    }
    if ((totalDeltaY % 2) < 0) {

      radIndex -= 1;
    }


    if (lenIndex > numColumns) {

      lenIndex = numColumns;
    }
    if (lenIndex <= 0) {

      lenIndex = 1;
    }
    if (radIndex > numRows) {

      radIndex = numRows;
    }
    if (radIndex <= 0) {

      radIndex = 1;
    }

    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    if (lengthValue / radiusValue < 2) {

      lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;
      input.value = lenIndex;
      lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    if (lengthValue / radiusValue < 2) {

      radIndex = Math.floor((lengthValue / 2 - firstRadiusValue) / 2) + 1;
      input2.value = radIndex;
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    input.value = lenIndex;
    input2.value = radIndex;
    const parHeight = lengthValue;
    const parRadius = radiusValue;


    cylinder.setAttribute('height', parHeight);
    cylinder.setAttribute('radius', parRadius);

    if (selectedTarget) {
      r = colorMap[`${metal}_${medium}`].R[radIndex][lenIndex];
      g = colorMap[`${metal}_${medium}`].G[radIndex][lenIndex];
      b = colorMap[`${metal}_${medium}`].B[radIndex][lenIndex];
      const newColor = `rgb(${r},${g},${b})`;
      selectedTarget.style.fill = newColor;
      // store the current color
      selectedTarget.setAttribute('data-color', newColor);
      selectedTarget.setAttribute('lenIndex', lenIndex);
      selectedTarget.setAttribute('radIndex', radIndex);
    }

    if (medium === 'glass' && metal === 'Au') { yourVlSpec = goldGlassVec; }
    if (medium === 'glass' && metal === 'Ag') { yourVlSpec = silverGlassVec; }
    if (medium === 'water' && metal === 'Au') { yourVlSpec = goldWaterVec; }
    if (medium === 'water' && metal === 'Ag') { yourVlSpec = silverWaterVec; }
    selectedColor(radIndex, lenIndex, numRows, numColumns, yourVlSpec);
  });
}
touchInteraction();

