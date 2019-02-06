/* eslint-disable no-console */
/* eslint-disable no-self-assign */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-// console */
lenIndex = lenIndex;
radIndex = radIndex;
metal = metal;
medium = medium;
selectedTarget = selectedTarget;

function touchInteraction() {
  const touchbox = document.querySelector('a-scene');

  // lastRadiusValue = colorMap[`${metal}_${medium}`].R[numRows][0];
  // lastLengthValue = colorMap[`${metal}_${medium}`].R[0][numColumns];
  const hammertime = new Hammer(touchbox);
  let X1startFromRight = null;
  let Y1startFromUP = null;
  let leftStart = 0;
  let rightStart = 0;
  let upStart = 0;
  let downStart = 0;
  hammertime.get('pinch').set({ enable: true });
  hammertime.on('pinchstart', (pinchstart) => {
    // // console.log('start', pinchstart)
    // // console.log('X', pinchstart.deltaX);
    // // console.log('Y', pinchstart.deltaY);
    const X1start = pinchstart.pointers[0].clientX;
    const X2start = pinchstart.pointers[1].clientX;
    const Y1start = pinchstart.pointers[0].clientY;
    const Y2start = pinchstart.pointers[1].clientY;
    X1startFromRight = (X1start >= X2start);
    Y1startFromUP = (Y1start <= Y2start);
    if (X1startFromRight) {
      // // console.log('true')
      leftStart = X2start;
      rightStart = X1start;
    } else {
      // // console.log('false')
      leftStart = X1start;
      rightStart = X2start;
    }
    if (Y1startFromUP) {
      // // console.log('true')
      upStart = Y2start;
      downStart = Y1start;
    } else {
      // // console.log('false')
      upStart = Y1start;
      downStart = Y2start;
    }
    // console.log('left start', leftStart)
    // console.log('right start', rightStart)
    console.log('up start', upStart)
    console.log('down start', downStart)
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
    console.log('Y1', Y1location)
    if (X1startFromRight) {
      leftDelta = X2location - leftStart;
      rightDelta = X1location - rightStart;
      // // console.log('left delta', leftDelta)
      // // console.log('right delta', rightDelta)
      // // console.log('________')
    } else {
      leftDelta = X1location - leftStart;
      rightDelta = X2location - rightStart;
    }
    const totalDeltaX = rightDelta - leftDelta;
    if (Y1startFromUP) {
      upDelta = Y2location - upStart;
      downDelta = Y1location - downStart;
      console.log('up delta', upDelta)
      console.log('down delta', downDelta)
    } else {
      upDelta = Y1location - upStart;
      downDelta = Y2location - downStart;
    }
    const totalDeltaY = upDelta - downDelta;
    console.log('deltaT', totalDeltaY)
    const numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    const numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
    const firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
    const firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
    lenIndex = (Math.floor(totalDeltaX * 0.02 + parseInt(lenIndex, 10)));
    radIndex = (Math.floor(totalDeltaY * (0.01) + parseInt(radIndex, 10)));
    // console.log("rad",radIndex);

    if (lenIndex > numColumns) {
      // console.log('!');
      lenIndex = numColumns;
    }
    if (lenIndex <= 0) {
      // console.log('!');
      lenIndex = 1;
    }
    if (radIndex > numRows) {
      // console.log('!');
      radIndex = numRows;
    }
    if (radIndex <= 0) {
      // console.log('!');
      radIndex = 1;
    }

    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    if (lengthValue / radiusValue < 2) {
      // console.log('ratio of L/R < 2!!!');
      lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;
      input.value = lenIndex;
      lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    if (lengthValue / radiusValue < 2) {
      // console.log('ratio of L/R < 2!!!');
      radIndex = Math.floor((lengthValue / 2 - firstRadiusValue) / 2) + 1;
      input2.value = radIndex;
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    input.value = lenIndex;
    input2.value = radIndex;
    const parHeight = lengthValue;
    const parRadius = radiusValue;

    // console.log('Height', parHeight);
    // console.log('Radius', parRadius);
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
    console.log('________')
  });
}
touchInteraction();

// hammertime.on('pinchend', function(evt) {
//   // console.log("end",evt);
//   // console.log("X",evt.deltaX);
//   // console.log("Y",evt.deltaY);
// });


//   var parHeight = cylinder.getAttribute("height")
//   var parRadius = cylinder.getAttribute("radius")
//   // console.log(Math.floor(evt.deltaX) + parseInt(parHeight))
//   parHeight = (Math.floor(evt.deltaX) + parseInt(parHeight));
//   parRadius = Math.floor(evt.deltaY) + parseInt(parRadius);
//   // // console.log("height,radius",parHeight,parRadius)
//   cylinder.setAttribute("height",parHeight);
//   cylinder.setAttribute("radius", parRadius);
// });
