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
  console.log('end', evt);
  console.log('X', evt.deltaX);
  console.log('Y', evt.deltaY);


  let parHeight = cylinder.getAttribute('height');
  let parRadius = cylinder.getAttribute('radius');
  // console.log(Math.floor(evt.deltaX) + parseInt(parHeight))
  parHeight = (Math.floor(evt.deltaX * 0.05) + parseInt(parHeight, 10));
  parRadius = Math.floor(evt.deltaY * (-0.05)) + parseInt(parRadius, 10);
  // console.log("height,radius",parHeight,parRadius)
  if (parHeight > lastLengthValue) {
    console.log('!');
    parHeight = lastLengthValue;
  }
  if (parHeight < firstLengthValue) {
    console.log('!');
    parHeight = firstLengthValue;
  }
  if (parRadius > lastRadiusValue) {
    console.log('!');
    parRadius = lastRadiusValue;
  }
  if (parRadius < firstRadiusValue) {
    console.log('!');
    parRadius = firstRadiusValue;
  }
  console.log('abc', parHeight);
  console.log('cdf', parRadius);
  cylinder.setAttribute('height', parHeight);
  cylinder.setAttribute('radius', parRadius);
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
