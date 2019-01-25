//color mapping interaction
var top_ctl = document.querySelector(".top-ctl");
var bottom_ctl = document.querySelector(".bottom-ctl");
var input = document.querySelector("#number1");
var input2 = document.querySelector("#number2");
var input3 = document.getElementById("metal1");
var input4 = document.getElementById("metal2");
var input5 = document.querySelector("#medium1");
var input6 = document.querySelector("#medium2");
var cylinder = document.querySelector("#cylinder");

var r = 0;
var g = 0;
var b = 0;
var l_index = 1;
var r_index = 1;
var metal = "Au";
var medium = "glass";
var svg = null;
var num_rows = null;
var num_columns = null;

// get the exteranl svg file and parse it into DOM
async function loadSVG()  {
    const response = await fetch('sample_svg/new.svg');
    const text = await response.text();
    // console.log(text, 'texttexttext');
    document.querySelector(".content").insertAdjacentHTML('afterBegin', text);
    svg = document.querySelector("svg");

    //add attribute to svg
    if(svg){
      Array.from(svg.querySelectorAll(".color-selector")).forEach(d => {
          // console.log(d);
          d.setAttribute("data-color","rgb(" + r + "," + g + "," + b + ")");
          d.setAttribute("metal",metal);
          d.setAttribute("medium",medium);
          d.setAttribute("l_index",l_index);
          d.setAttribute("r_index",r_index);
        })
    }
    // listen the selected item and store the color, value in class
    svg.addEventListener("click", function (evt) {
    //console.log(evt.target);
    const targetColor = evt.target.getAttribute("data-color");

    if (targetColor) {
        // console.log(evt.target.getAttribute("data-color"))
        Array.from(svg.querySelectorAll(".color-selector")).forEach(d => {
        // console.log(d);
        d.classList.remove("selected");
        })
        //set up the selected item's attribute at css
        evt.target.classList.add("selected");
        cylinder.setAttribute("color", targetColor);

        rgb_value = targetColor
        .substring(0, targetColor.length - 1)
        .substring(4)
        .split(",")
        .map(d => Number(d));
        //console.log(rgb_value)
        r = rgb_value[0];
        g = rgb_value[1];
        b = rgb_value[2];

        l_index = parseInt(evt.target.getAttribute("l_index"));
        r_index = parseInt(evt.target.getAttribute("r_index"));



        metal = evt.target.getAttribute("metal");
        //console.log(metal)
        medium = evt.target.getAttribute("medium");
        //console.log(medium)



        if (metal === 'Au') {
        document.querySelector("#metal1").checked = true
        };
        if (medium === 'glass') {
        document.querySelector("#medium1").checked = true
        };
        if (metal === 'Ag') {
        document.querySelector("#metal2").checked = true
        };
        if (medium === 'water') {
        document.querySelector("#medium2").checked = true
        };

        num_rows = color_map[metal + "_" + medium].R.length - 1;
        num_columns = color_map[metal + "_" + medium].R[0].length - 1;

        input.max = num_columns;
        input2.max = num_rows;
        input.value = l_index;
        input2.value = r_index;

        const first_radius_value = color_map[metal + "_" + medium].R[1][0];
        // console.log("rad int",first_radius_value)
        const first_length_value = color_map[metal + "_" + medium].R[0][1];
        // console.log("length int",first_length_value)
        const radius_value = color_map[metal + "_" + medium].R[r_index][0];
        const length_value = color_map[metal + "_" + medium].R[0][l_index];
        console.log("rad val",radius_value)
        const par_height = length_value
        const par_radius =radius_value

        console.log("height radius", par_height,par_radius)
        cylinder.setAttribute("height",par_height)
        cylinder.setAttribute("radius",par_radius)
        // evt.target.setAttribute("data-color", newColor);
        // evt.target.style.fill = newColor;

    }
    });

    input.addEventListener("change", function (event) {
    //console.log(event);
    console.log(event.target.value);

    l_index = parseInt(event.target.value);
    // checking if the radius of L/R >2
    var radius_value = color_map[metal + "_" + medium].R[r_index][0];
    var length_value = color_map[metal + "_" + medium].R[0][l_index];
    const first_radius_value = color_map[metal + "_" + medium].R[1][0];
    if (length_value / radius_value < 2) {
        console.log("ratio of L/R < 2!!!")
        r_index = Math.floor((length_value / 2 - first_radius_value) / 2) + 1
        input2.value = r_index
        radius_value =  color_map[metal + "_" + medium].R[r_index][0];
    }
    const par_height = length_value;
    const par_radius = radius_value;

    console.log("height radius", par_height,par_radius)
    cylinder.setAttribute("height",par_height)
    // cylinder.setAttribute("radius",par_radius)


    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];
    //bottom_ctl.style.background = "rgb(" + r + "," + g + "," + b + ")";
    const newColor = "rgb(" + r + "," + g + "," + b + ")";
    cylinder.setAttribute("color", newColor)
    //get the selected item

    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
        //console.log(selected_target);

        //set color for 3D particle

        //set color for svg
    if(selected_target){
        selected_target.style.fill = newColor;
        //store the current color
        selected_target.setAttribute("data-color", newColor);
        //store the current length and radius index
        selected_target.setAttribute("l_index", l_index);
        selected_target.setAttribute("r_index", r_index);
    }
    });

    input2.addEventListener("change", function (event) {
    //console.log(event);
    //console.log("input2,", event.target.value);

    r_index = parseInt(event.target.value);

    // checking if the ratio of L/R >2
    var radius_value = color_map[metal + "_" + medium].R[r_index][0];
    var length_value = color_map[metal + "_" + medium].R[0][l_index];
    var first_length_value = color_map[metal + "_" + medium].R[0][1];
    if (length_value / radius_value < 2) {
        console.log("ratio of L/R < 2!!!")
        l_index = (radius_value * 2 - first_length_value) / 2 + 1
        input.value = l_index
        length_value = color_map[metal + "_" + medium].R[0][l_index];
    }

    const par_height = length_value
    const par_radius =radius_value
    console.log("height radius", par_height,par_radius)
    // cylinder.setAttribute("height",par_height)
    cylinder.setAttribute("radius",par_radius)

    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];
    const newColor = "rgb(" + r + "," + g + "," + b + ")";
    //set color for 3D particle
    cylinder.setAttribute("color", newColor)

    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
    if(selected_target){
    //set color for svg
    selected_target.style.fill = newColor;
    //store the current color
    selected_target.setAttribute("data-color", newColor);
    //store the current length and radius index
    selected_target.setAttribute("l_index", l_index);
    selected_target.setAttribute("r_index", r_index);
    }
    });

    input3.addEventListener("change", function (event) {
    console.log(metal + "_" + medium)
    if (event.target.checked) {
        metal = event.target.value;
    }
    num_rows = color_map[metal + "_" + medium].R.length - 1;
    num_columns = color_map[metal + "_" + medium].R[0].length - 1;

    input.max = num_columns;
    input2.max = num_rows;
    if(r_index> input2.max){
        r_index = input2.max
    }
    if(l_index> input.max){
        l_index = input.max
    }

    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];


    const newColor = "rgb(" + r + "," + g + "," + b + ")";

    //set color for 3D particle
    cylinder.setAttribute("color", newColor);

    //get the selected item
    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
    if(selected_target){
    // console.log(selected_target);
        svg.querySelector(".selected").setAttribute("metal", metal)
        const newColor = "rgb(" + r + "," + g + "," + b + ")";
        //set color for 3D particle
        cylinder.setAttribute("color", newColor)
        //set color for svg
        selected_target.style.fill = newColor;
        //store the current color
        selected_target.setAttribute("data-color", newColor);
    }

    });

    input4.addEventListener("change", function (event) {
    console.log(metal + "_" + medium)

    if (event.target.checked) {
        metal = event.target.value;

    }
    num_rows = color_map[metal + "_" + medium].R.length - 1;
    num_columns = color_map[metal + "_" + medium].R[0].length - 1;
    input.max = num_columns;

    input2.max = num_rows;

    if(r_index> input2.max){
        r_index = input2.max
    }
    if(l_index> input.max){
        l_index = input.max
    }
    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];

    const newColor = "rgb(" + r + "," + g + "," + b + ")";
    //set color for 3D particle
    cylinder.setAttribute("color", newColor)
    //get the selected item
    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
    if(selected_target){
        svg.querySelector(".selected").setAttribute("metal", metal);
        // console.log(selected_target);
        //set color for svg
        selected_target.style.fill = newColor;
        //store the current color
        selected_target.setAttribute("data-color", newColor);
    }

    });

    input5.addEventListener("change", function (event) {
    console.log(metal + "_" + medium)

    if (event.target.checked) {
        medium = event.target.value;
    }
    num_rows = color_map[metal + "_" + medium].R.length - 1;
    num_columns = color_map[metal + "_" + medium].R[0].length - 1;

    input.max = num_columns;
    input2.max = num_rows;
    if(r_index> input2.max){
        r_index = input2.max
    }
    if(l_index> input.max){
        l_index = input.max
    }

    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];

    const newColor = "rgb(" + r + "," + g + "," + b + ")";
    //set color for 3D particle
    cylinder.setAttribute("color", newColor)
    //get the selected item

    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
    if(selected_target){
        svg.querySelector(".selected").setAttribute("medium", medium)
    //set color for svg
        selected_target.style.fill = newColor;
        //store the current color
        selected_target.setAttribute("data-color", newColor);

    }
    });

    input6.addEventListener("change", function (event) {
    console.log(metal + "_" + medium)
    if (event.target.checked) {
        medium = event.target.value;
    }
    num_rows = color_map[metal + "_" + medium].R.length - 1;
    num_columns = color_map[metal + "_" + medium].R[0].length - 1;

    input.max = num_columns;
    input2.max = num_rows;
    if(r_index> input2.max){
        r_index = input2.max
    }
    if(l_index> input.max){
        l_index = input.max
    }

    r = color_map[metal + "_" + medium].R[r_index][l_index];
    g = color_map[metal + "_" + medium].G[r_index][l_index];
    b = color_map[metal + "_" + medium].B[r_index][l_index];
    const newColor = "rgb(" + r + "," + g + "," + b + ")";
    //set color for 3D particle
    cylinder.setAttribute("color", newColor)

    //get the selected item
    const selected_target = document.querySelectorAll(".color-selector.selected")[0];
    if(selected_target){
        svg.querySelector(".selected").setAttribute("medium", medium)
        //set color for svg
        selected_target.style.fill = newColor;
        //store the current color
        selected_target.setAttribute("data-color", newColor);
    }

    });
}

loadSVG();

