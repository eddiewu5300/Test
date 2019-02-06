/* eslint-disable no-self-assign */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
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
  hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
  hammertime.on('pan', (evt) => {
    // console.log(evt);
    // console.log('X', evt.deltaX);
    // console.log('Y', evt.deltaY);
    // let lenIndex = lenIndex;
    // let radIndex = radIndex;
    const numRows = colorMap[`${metal}_${medium}`].R.length - 1;
    const numColumns = colorMap[`${metal}_${medium}`].R[0].length - 1;
    const firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
    const firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
    lenIndex = (Math.floor(evt.deltaX * 0.02 + parseInt(lenIndex, 10)));
    radIndex = Math.floor(evt.deltaY * (-0.01) + parseInt(radIndex, 10));


    if (lenIndex > numColumns) {
      console.log('!');
      lenIndex = numColumns;
    }
    if (lenIndex <= 0) {
      console.log('!');
      lenIndex = 1;
    }
    if (radIndex > numRows) {
      console.log('!');
      radIndex = numRows;
    }
    if (radIndex <= 0) {
      console.log('!');
      radIndex = 1;
    }

    let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    if (lengthValue / radiusValue < 2) {
      console.log('ratio of L/R < 2!!!');
      lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;
      input.value = lenIndex;
      lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    if (lengthValue / radiusValue < 2) {
      console.log('ratio of L/R < 2!!!');
      radIndex = Math.floor((lengthValue / 2 - firstRadiusValue) / 2) + 1;
      input2.value = radIndex;
      radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
    }
    input.value = lenIndex;
    input2.value = radIndex;
    const parHeight = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    const parRadius = colorMap[`${metal}_${medium}`].R[radIndex][0];
    // let parHeight = cylinder.getAttribute('height');
    // let parRadius = cylinder.getAttribute('radius');
    // parHeight = (Math.floor(evt.deltaX * 0.02) + parseInt(parHeight, 10));
    // parRadius = Math.floor(evt.deltaY * (-0.01)) + parseInt(parRadius, 10);
    // if (parHeight > lastLengthValue) {
    //   console.log('!');
    //   parHeight = lastLengthValue;
    // }
    // if (parHeight < firstLengthValue) {
    //   console.log('!');
    //   parHeight = firstLengthValue;
    // }
    // if (parRadius > lastRadiusValue) {
    //   console.log('!');
    //   parRadius = lastRadiusValue;
    // }
    // if (parRadius < firstRadiusValue) {
    //   console.log('!');
    //   parRadius = firstRadiusValue;
    // }
    console.log('Height', parHeight);
    console.log('Radius', parRadius);
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
  });
}
touchInteraction();
// hammertime.get('pinch').set({ enable: true });
// hammertime.on('pinch', (evt) => {
//   console.log('start', evt);
//   console.log('X', evt.deltaX);
//   console.log('Y', evt.deltaY);
// });


// hammertime.on('pinchstart', function(evt) {

//   console.log("start",evt)
//   console.log("X",evt.deltaX);
//   console.log("Y",evt.deltaY);

// });
// hammertime.on('pinchend', function(evt) {
//   console.log("end",evt);
//   console.log("X",evt.deltaX);
//   console.log("Y",evt.deltaY);
// });


//   var parHeight = cylinder.getAttribute("height")
//   var parRadius = cylinder.getAttribute("radius")
//   console.log(Math.floor(evt.deltaX) + parseInt(parHeight))
//   parHeight = (Math.floor(evt.deltaX) + parseInt(parHeight));
//   parRadius = Math.floor(evt.deltaY) + parseInt(parRadius);
//   // console.log("height,radius",parHeight,parRadius)
//   cylinder.setAttribute("height",parHeight);
//   cylinder.setAttribute("radius", parRadius);
// });
