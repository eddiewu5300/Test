/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
const touchbox = document.querySelector('a-scene');
firstRadiusValue = colorMap[`${metal}_${medium}`].R[1][0];
firstLengthValue = colorMap[`${metal}_${medium}`].R[0][1];
lastRadiusValue = colorMap[`${metal}_${medium}`].R[numRows][0];
lastLengthValue = colorMap[`${metal}_${medium}`].R[0][numColumns];

const hammertime = new Hammer(touchbox);

hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('pan', (evt) => {
  console.log(evt);
  console.log('X', evt.deltaX);
  console.log('Y', evt.deltaY);

  let lindex = lenIndex;
  let rindex = radIndex;
  lindex = (Math.floor(evt.deltaX * 0.02 + parseInt(lindex, 10)));
  rindex = Math.floor(evt.deltaY * (-0.01) + parseInt(rindex, 10));
  input.value = lindex
  input2.value = rindex
  if (lindex > numColumns) {
    console.log('!');
    lindex = numColumns;
  }
  if (lindex <= 0) {
    console.log('!');
    lindex = 1;
  }
  if (rindex > numRows) {
    console.log('!');
    rindex = numRows;
  }
  if (rindex <= 0) {
    console.log('!');
    rindex = 1;
  }

  const parHeight = colorMap[`${metal}_${medium}`].R[0][lindex];
  const parRadius = colorMap[`${metal}_${medium}`].R[rindex][0];
  lenIndex = lindex;
  radIndex = rindex;


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
  let radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
  let lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
  if (lengthValue / radiusValue < 2) {
    console.log('ratio of L/R < 2!!!');
    lenIndex = (radiusValue * 2 - firstLengthValue) / 2 + 1;
    input.value = lenIndex;
    lengthValue = colorMap[`${metal}_${medium}`].R[0][lenIndex];
    radiusValue = colorMap[`${metal}_${medium}`].R[radIndex][0];
  }
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
