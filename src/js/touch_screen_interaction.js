

const touchbox = document.querySelector("a-scene");
first_radius_value = color_map[metal + "_" + medium].R[1][0];
first_length_value = color_map[metal + "_" + medium].R[0][1];
last_radius_value = color_map[metal + "_" + medium].R[num_rows][0];
last_length_value = color_map[metal + "_" + medium].R[0][num_columns];

var hammertime = new Hammer(touchbox);

// hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
// hammertime.on('panend', function (evt) {
//   console.log("end", evt);
//   console.log("X", evt.deltaX);
//   console.log("Y", evt.deltaY);


//   var par_height = cylinder.getAttribute("height")
//   var par_radius = cylinder.getAttribute("radius")
//   // console.log(Math.floor(evt.deltaX) + parseInt(par_height))
//   par_height = (Math.floor(evt.deltaX * 0.5) + parseInt(par_height));
//   par_radius = Math.floor(evt.deltaY * 0.5) + parseInt(par_radius);
//   // console.log("height,radius",par_height,par_radius)
//   if (par_height > last_length_value) {
//     console.log("!")
//     par_height = last_length_value
//   }
//   if (par_height < first_length_value) {
//     console.log("!")
//     par_height = first_length_value
//   }
//   if (par_radius > last_radius_value) {
//     console.log("!")
//     par_radius = last_radius_value
//   }
//   if (par_radius < first_radius_value) {
//     console.log("!")
//     par_radius = first_radius_value
//   }
//   console.log("abc",par_height)
//   console.log("cdf",par_radius)
//   cylinder.setAttribute("height", par_height);
//   cylinder.setAttribute("radius", par_radius);
// });


hammertime.get('pinch').set({ enable: true });
hammertime.on('pinch', function(evt) {

  console.log("start",evt)
  console.log("X",evt.deltaX);
  console.log("Y",evt.deltaY);

});


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


//   var par_height = cylinder.getAttribute("height")
//   var par_radius = cylinder.getAttribute("radius")
//   console.log(Math.floor(evt.deltaX) + parseInt(par_height))
//   par_height = (Math.floor(evt.deltaX) + parseInt(par_height));
//   par_radius = Math.floor(evt.deltaY) + parseInt(par_radius);
//   // console.log("height,radius",par_height,par_radius)
//   cylinder.setAttribute("height",par_height);
//   cylinder.setAttribute("radius", par_radius);
// });

